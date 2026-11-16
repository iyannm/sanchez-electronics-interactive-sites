/* RAID visualizations are educational models; the diagram shows sample data layout. */
(()=>{'use strict';
const BASE={
'0':{name:'RAID 0',capacity:2,disks:[['A1','B1','C1','D1'],['A2','B2','C2','D2']],method:'Striping spreads data across two disks. Faster access is possible, but there is no redundancy: either drive failing breaks the array.',works:failed=>failed.size===0},
'1':{name:'RAID 1',capacity:1,disks:[['A','B','C','D'],['A','B','C','D']],method:'Mirroring stores identical data on both disks. One failed disk can be replaced while the other holds a complete copy.',works:failed=>failed.size<2},
'5':{name:'RAID 5',capacity:3,disks:[['A1','B1','C1','P4'],['A2','B2','P3','D1'],['A3','P2','C2','D2'],['P1','B3','C3','D3']],method:'Striping with distributed parity provides the equivalent of one disk of redundancy. A four-disk RAID 5 array tolerates any one disk failure, not two.',works:failed=>failed.size<=1},
'10':{name:'RAID 10',capacity:2,disks:[['A1','B1','C1','D1'],['A1','B1','C1','D1'],['A2','B2','C2','D2'],['A2','B2','C2','D2']],method:'Two mirrored pairs (1–2, 3–4) are striped together. The array survives failures only if at least one disk remains working in each pair.',works:failed=>!(failed.has(0)&&failed.has(1))&&!(failed.has(2)&&failed.has(3))}
};
let level='0',failed=new Set();
const $=id=>document.getElementById(id);
function update(){const d=BASE[level],works=d.works(failed),status=failed.size===0?'Healthy — data available':works?'Degraded — data available':'Array failed — data unavailable';
document.querySelectorAll('[data-level]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.level===level)));
$('disk-count').textContent=`${String(d.disks.length).padStart(2,'0')} disks · 01 TB each`;
$('drives').style.gridTemplateColumns=`repeat(${d.disks.length},minmax(0,1fr))`;
$('drives').replaceChildren(...d.disks.map((chunks,i)=>{const button=document.createElement('button');button.type='button';button.className='drive';button.setAttribute('aria-label',`Disk ${i+1}: ${failed.has(i)?'failed':'working'}. Click to toggle.`);button.setAttribute('aria-pressed',String(failed.has(i)));button.dataset.disk=String(i);const head=document.createElement('span');head.className='drivehead';const title=document.createElement('strong');title.textContent=`DISK ${i+1}`;const tag=document.createElement('em');tag.textContent=failed.has(i)?'FAILED':'1 TB / ONLINE';head.append(title,tag);button.append(head);chunks.forEach(c=>{const block=document.createElement('span');block.className='block'+(c.startsWith('P')?' parity':'');block.textContent=c;button.append(block)});if(failed.has(i)){const chip=document.createElement('span');chip.className='failedchip';chip.textContent='✕  DRIVE FAILED';button.append(chip)}button.addEventListener('click',()=>{failed.has(i)?failed.delete(i):failed.add(i);update()});return button}));
$('status').textContent=status;$('status').className=works?'ok':'bad';$('status-line').classList.toggle('danger',!works);$('capacity').textContent=`${d.capacity} TB`;$('failed').textContent=`${failed.size} / ${d.disks.length}`;$('method').textContent=d.method;
$('description').textContent=failed.size===0?'All drives are operating normally. Click a drive to test a failure.':works?'Enough remaining drives preserve the data. The array is degraded; repair is still needed.':'The failed-drive combination exceeds this RAID level’s protection. The array is no longer available.';}
function setLevel(key,arr=[]){level=key;failed=new Set(arr);update();}
document.querySelectorAll('[data-level]').forEach(button=>button.addEventListener('click',()=>setLevel(button.dataset.level)));
$('reset').addEventListener('click',()=>setLevel(level));
const tests={zero:['0',[0]],one:['1',[0]],five1:['5',[0]],five2:['5',[0,1]],ten13:['10',[0,2]],ten12:['10',[0,1]]};
document.querySelectorAll('[data-preset]').forEach(button=>button.addEventListener('click',()=>{const [key,arr]=tests[button.dataset.preset];setLevel(key,arr);document.querySelector('.labgrid').scrollIntoView({behavior:'smooth',block:'start'});}));
$('copy-state').addEventListener('click',async()=>{const d=BASE[level];const copy=`${d.name} / ${d.capacity} TB usable / Failed disks: ${[...failed].map(x=>x+1).join(', ')||'none'} / ${d.works(failed)?(failed.size?'DEGRADED — data available':'HEALTHY — data available'):'ARRAY FAILED — data unavailable'}`;const b=$('copy-state');try{await navigator.clipboard.writeText(copy);b.textContent='Observation copied ✓';}catch{b.textContent='Copy unavailable';}setTimeout(()=>b.textContent='Copy observation',2000)});
const config=window.SANCHEZ_CONFIG||{};if(typeof config.formUrl==='string'&&/^https:\/\/docs\.google\.com\/forms\//.test(config.formUrl)){const link=$('form-link');link.href=config.formUrl;link.hidden=false;$('form-pending').hidden=true;}
update();
})();
