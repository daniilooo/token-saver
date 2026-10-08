'use strict';
const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');
const {execFileSync} = require('node:child_process');
function project(cwd) {
  try { return execFileSync('git', ['-C',cwd,'rev-parse','--show-toplevel'], {encoding:'utf8',stdio:['ignore','pipe','ignore']}).trim(); }
  catch { return path.resolve(cwd); }
}
function atomic(file, value) {
  const tmp = file+'.'+crypto.randomUUID()+'.tmp';
  fs.writeFileSync(tmp, JSON.stringify(value,null,2), {mode:0o600});
  fs.renameSync(tmp,file);
}
function control(action, cwd) {
  const root=project(cwd), dir=path.join(root,'.token-saver'), config=path.join(dir,'config.json');
  if(action==='active') {
    fs.mkdirSync(dir,{recursive:true,mode:0o700});
    const ignore=path.join(root,'.gitignore');
    const prev=fs.existsSync(ignore)?fs.readFileSync(ignore,'utf8'):'';
    if(!prev.split(/\r?\n/).includes('/.token-saver/')) fs.appendFileSync(ignore,(prev&&!prev.endsWith('\n')?'\n':'')+'\n# Token Saver local logs and settings\n/.token-saver/\n');
    atomic(config,{enabled:true,level:'aggressive',minChars:4000});
    return 'Token Saver active: '+root+'\nLogs: .token-saver/logs/ (gitignored).';
  }
  if(action==='off') {
    if(fs.existsSync(config)) atomic(config,{...JSON.parse(fs.readFileSync(config)),enabled:false});
    return 'Token Saver disabled. Existing logs retained.';
  }
  if(action==='stats') {
    let original=0,compact=0,count=0;
    const logs=path.join(dir,'logs');
    if(fs.existsSync(logs)) for(const name of fs.readdirSync(logs)) if(name.endsWith('.json')) {
      const data=JSON.parse(fs.readFileSync(path.join(logs,name)));
      original+=data.originalChars;compact+=data.compactChars;count++;
    }
    return JSON.stringify({compactedCommands:count,originalChars:original,compactChars:compact,characterReductionPercent:original?+(100*(1-compact/original)).toFixed(2):0,measurement:'characters; not billed tokens'},null,2);
  }
  return fs.existsSync(config)?fs.readFileSync(config,'utf8'):'Token Saver inactive for '+root;
}
const tools = /\b(mvnw?|gradlew?|npm|npx|yarn|pnpm|ng|vite|webpack|jest|vitest|pip3?|poetry|uv|pytest|ruff|mypy|dotnet|nuget|go|cargo|composer|phpunit|artisan|bundle|rspec|rails|docker|podman|kubectl|helm|terraform|terragrunt|ansible|aws|az|gcloud|git|psql|mysql|sqlplus|sqlite3|apt|dnf|journalctl|systemctl|act)\b/i;
const relevant = /\b(error|failed|failure|fatal|exception|traceback|warning|warn|unhealthy|refused|denied|panic|caused by|assert|expected|actual|tests? run|tests?:|passed|skipped|build success|build failure|successfully|time:|duration|plan:|apply complete|resources:)\b|\b(?:TS\d{4}|CS\d{4})\b|error\[E\d+\]|^\s*(?:FAIL|PASS|E\s|F\s)|^\s*(?:at\s+|File ")/i;
const noise = /^(?:\[INFO\]\s*)?(?:Downloading|Downloaded|Progress|Pulling|Extracting|Collecting|Fetching)\b/i;
function compact(command, stdout, stderr, level) {
  const max={normal:12000,aggressive:6000,extreme:3000}[level]||6000;
  const lines=(stdout+'\n'+stderr).replace(/\x1b\[[0-?]*[ -/]*[@-~]/g,'').split(/\r?\n/);
  const selected=new Set();
  for(let i=0;i<Math.min(3,lines.length);i++) selected.add(i);
  for(let i=Math.max(0,lines.length-8);i<lines.length;i++) selected.add(i);
  lines.forEach((line,i)=>{if(relevant.test(line)&&!noise.test(line)) for(let j=Math.max(0,i-1);j<=Math.min(lines.length-1,i+2);j++)selected.add(j);});
  const counts=new Map();
  for(const i of [...selected].sort((a,b)=>a-b)) {
    const line=lines[i]; if(line.trim()&&!noise.test(line)) counts.set(line,(counts.get(line)||0)+1);
  }
  const body=[...counts].map(([line,n])=>line+(n>1?` [selected occurrences: ${n}]`:'')).join('\n');
  const excerpt=body.length>max?body.slice(0,Math.floor(max*.7))+'\n[excerpt budget reached]\n'+body.slice(-Math.floor(max*.3)):body;
  return `TOKEN SAVER — ${command.match(tools)?.[1]||'generic'} excerpt; status not inferred\n${excerpt}`;
}
function hook(event) {
  if(event.hook_event_name!=='PostToolUse'||event.tool_name!=='Bash') return null;
  const root=project(process.env.CLAUDE_PROJECT_DIR||event.cwd||process.cwd());
  const dir=path.join(root,'.token-saver'), config=path.join(dir,'config.json');
  if(!fs.existsSync(config)) return null;
  const cfg=JSON.parse(fs.readFileSync(config));
  const response=event.tool_response, command=event.tool_input?.command||'';
  if(!cfg.enabled||/TOKEN_SAVER=off\b/.test(command)||command.includes('token-saver.cjs')||command.includes('.token-saver/logs'))return null;
  if(!response||typeof response.stdout!=='string'||typeof response.stderr!=='string'||typeof response.interrupted!=='boolean'||typeof response.isImage!=='boolean'||response.isImage||response.interrupted)return null;
  // Preserve semantic data, diffs and machine-readable results by default.
  if(/\bgit\s+(diff|show|log)\b|\b(psql|mysql|sqlplus|sqlite3)\b|(?:--json|--output[= ]+json|\s-o[= ]+json)\b/.test(command)||/^\s*[\[{]/.test(response.stdout)&&(()=>{try{JSON.parse(response.stdout);return true;}catch{return false;}})())return null;
  const originalChars=response.stdout.length+response.stderr.length;
  if(originalChars<(Number(cfg.minChars)||4000)) return null;
  const logs=path.join(dir,'logs');fs.mkdirSync(logs,{recursive:true,mode:0o700});
  const id=Date.now()+'-'+crypto.randomUUID();
  const file=path.join(logs,id+'.json');
  const output=compact(command,response.stdout,response.stderr,cfg.level)+'\nFull tool response: '+file;
  if(output.length>=originalChars)return null;
  // Persist exact tool response before replacing it; write failure leaves original visible.
  fs.writeFileSync(file,JSON.stringify({command,toolResponse:response,originalChars,compactChars:output.length},null,2),{flag:'wx',mode:0o600});
  return {hookSpecificOutput:{hookEventName:'PostToolUse',updatedToolOutput:{...response,stdout:output,stderr:''}}};
}
function aliases(cwd) {
  const dest=path.join(project(cwd),'.claude','commands');fs.mkdirSync(dest,{recursive:true});
  for(const action of ['active','off','stats','status']) {
    const file=path.join(dest,'token-saver-'+action+'.md');
    if(fs.existsSync(file)) throw Error('Refusing to overwrite '+file);
  }
  for(const action of ['active','off','stats','status']) fs.writeFileSync(path.join(dest,'token-saver-'+action+'.md'),`---\ndescription: Token Saver ${action}\n---\nInvoke the installed /token-saver:${action} skill now and report its result.\n`);
  return 'Project aliases installed. Restart Claude Code to discover them.';
}
if(require.main===module) {
  const action=process.argv[2]||'status';
  if(action==='hook') {
    try { const result=hook(JSON.parse(fs.readFileSync(0,'utf8')));if(result)console.log(JSON.stringify(result)); }
    catch { /* fail open: never hide output when parsing or persistence fails */ }
  } else {
    try { console.log(action==='install-aliases'?aliases(process.cwd()):control(action,process.cwd())); }
    catch(error){console.error(error.message);process.exitCode=1;}
  }
}
module.exports={hook,compact,control,project,aliases};
