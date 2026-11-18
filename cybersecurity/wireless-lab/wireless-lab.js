/* Sanchez Electronics / Wireless Visual Lab
   Educational schematics only. No Wi-Fi, network or attack APIs are used. */
(() => {
  "use strict";
  const $ = id => document.getElementById(id);
  const topics = {
    connection: {kicker:"CISCO SLIDES 16–18",title:"How a client joins Wi-Fi",section:"5.1 / WIRELESS COMMUNICATIONS",steps:4,foot:"DISCOVER / AUTHENTICATE / ASSOCIATE",desc:"Cisco’s three-stage classroom model. Modern secure Wi-Fi also performs security and key-exchange steps."},
    airtime: {kicker:"CISCO SLIDE 15",title:"Sharing the wireless channel",section:"5.1 / CSMA/CA",steps:5,foot:"LISTEN / CONTEND / TRANSMIT / ACK",desc:"Conceptual example of wireless channel access. Timing is illustrative, not a packet-level protocol emulator."},
    frames: {kicker:"CISCO SLIDE 14",title:"Inside an 802.11 frame",section:"5.1 / WIRELESS FRAMES",steps:4,foot:"HEADER / PAYLOAD / ERROR CHECK",desc:"Fields shown conceptually. Actual frame formats and address use vary with the frame type."},
    infrastructure: {kicker:"CISCO SLIDE 19",title:"From one AP to a campus WLAN",section:"5.1 / WIRELESS DEVICES",steps:3,foot:"ACCESS POINT / LIGHTWEIGHT AP / WLC",desc:"Simplified management and traffic paths. Network design varies across deployments."},
    threats: {kicker:"CISCO SLIDES 22–25",title:"What can threaten a WLAN?",section:"5.2 / WLAN THREATS",steps:4,foot:"CONFIDENTIALITY / INTEGRITY / AVAILABILITY",desc:"Safe classroom scenarios only. These diagrams do not generate interference or intercept actual traffic."}
  };
  const state = {topic:"connection",step:0,discovery:"passive",security:"correct",rts:false,busy:false,field:0,layout:"campus",threat:"interception"};
  const fields = [
    ["Frame Control","Identifies the kind of frame and carries control flags."],
    ["Duration","Can indicate how long the medium is reserved."],
    ["Address 1","Commonly identifies the immediate receiver."],
    ["Address 2","Commonly identifies the immediate transmitter."],
    ["Address 3","Used for an additional relevant MAC address in many frame layouts."],
    ["Sequence Control","Supports sequencing and fragmentation."],
    ["Address 4","Present only in particular four-address frame formats; often absent."],
    ["Payload","The information/data being carried, when present."],
    ["FCS","Helps the receiver detect errors in the frame."]
  ];
  const esc = txt => String(txt).replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;");
  const phone = (x,y,label="CLIENT") => '<g transform="translate('+x+' '+y+')"><rect x="0" y="0" width="63" height="114" rx="10" class="device"/><rect x="7" y="12" width="49" height="84" rx="3" fill="#e4f2f3"/><circle cx="32" cy="104" r="3" fill="#82a9b1"/><path d="M22 8H42" stroke="#a9c4c9" stroke-width="2"/><text x="32" y="133" text-anchor="middle" class="boldtext">'+esc(label)+'</text></g>';
  const ap = (x,y,label="ACCESS POINT",bad=false) => '<g transform="translate('+x+' '+y+')"><rect x="0" y="31" width="118" height="70" rx="10" class="'+(bad?'':'device')+'" fill="'+(bad?'#eed7d3':'#ffffff')+'" stroke="'+(bad?'#b9786f':'#66848b')+'" stroke-width="1.6"/><path d="M26 31V0M90 31V0" stroke="'+(bad?'#b9786f':'#66848b')+'" stroke-width="3" stroke-linecap="round"/><path d="M43 21Q58 6 73 21M51 26Q58 19 65 26" stroke="'+(bad?'#b9786f':'#74aebb')+'" stroke-width="2.5" fill="none"/><circle cx="24" cy="82" r="4" fill="#71aeb8"/><text x="58" y="121" text-anchor="middle" class="boldtext">'+esc(label)+'</text></g>';
  const cloud = (x,y,label="NETWORK") => '<g transform="translate('+x+' '+y+')"><path d="M19 78C-7 77 -4 39 21 36C22 10 61 4 73 30C100 25 110 45 105 60C102 74 88 78 73 78Z" fill="#fff" stroke="#77969b" stroke-width="1.6"/><text x="53" y="55" text-anchor="middle" class="boldtext">'+esc(label)+'</text></g>';
  const line = (x1,y1,x2,y2,kind="normal") => '<path d="M'+x1+' '+y1+'L'+x2+' '+y2+'" fill="none" class="'+(kind==='bad'?'danger-link moving':kind==='good'?'active-link moving':'dash-line')+'"/>';
  const note = (x,y,s,ink="#57717a") => '<text x="'+x+'" y="'+y+'" text-anchor="middle" font-size="12" fill="'+ink+'">'+esc(s)+'</text>';
  const pill = (x,y,label,bad=false) => '<g><rect x="'+x+'" y="'+y+'" width="'+(Math.max(110,label.length*7.6+20))+'" height="34" rx="17" fill="'+(bad?'#f0dcd7':'#fff')+'" stroke="'+(bad?'#c68b80':'#abcdd1')+'"/><text x="'+(x+12)+'" y="'+(y+22)+'" font-size="12">'+esc(label)+'</text></g>';
  const svg = (inner) => '<svg viewBox="0 0 790 340" preserveAspectRatio="xMidYMid meet" role="img" aria-label="Interactive schematic illustration, described in adjacent teaching notes" xmlns="http://www.w3.org/2000/svg"><defs><marker id="arrow-ok" markerWidth="8" markerHeight="8" refX="5" refY="3" orient="auto"><path d="M0 0L6 3L0 6Z" fill="#6ba7b2"/></marker><marker id="arrow-bad" markerWidth="8" markerHeight="8" refX="5" refY="3" orient="auto"><path d="M0 0L6 3L0 6Z" fill="#ba796e"/></marker></defs>'+inner+'</svg>';
  function connectionView(){
    const step=state.step, active=state.discovery==="active",wrong=state.security==="wrong";
    const link=step>=1?line(187,151,357,151,wrong&&step>=2?'bad':'good'):'';
    const upper=active?pill(230,56,"PROBE REQUEST →"):pill(222,56,"← BEACON FRAME");
    let scene=phone(100,104)+ap(392,100)+cloud(635,129,"LAN");
    scene+=line(511,167,635,167);
    if(step===0)scene+=upper+line(187,151,357,151,"good");
    if(step>=1)scene+=link;
    if(step===1)scene+=pill(240,212,"802.11 AUTHENTICATION");
    if(step===2)scene+=pill(236,212,wrong?"SECURITY FAILED":"SECURITY CHECK",wrong);
    if(step===3)scene+=pill(228,212,wrong?"NOT CONNECTED":"ASSOCIATED ✓",wrong);
    scene+=note(397,319,active?"Active scan: device sends probes.":"Passive scan: AP sends beacons.");
    const texts=[
      ["Find the network.","An access point advertises its WLAN in beacon frames. A client may also actively send probe requests.","A wireless client and access point can discover one another before a connection is established.","What is the difference between passive and active discovery?"],
      ["Start authentication.","Cisco’s simplified sequence places 802.11 authentication after discovery.","Authentication at this stage is part of the 802.11 joining procedure, not necessarily the Wi-Fi password check.","Does seeing a network name mean you have joined it?"],
      [wrong?"Security settings do not match.":"Check security.","The client must use compatible security settings and, for a protected network, valid credentials.","In secure WLANs, association and security handshakes are additional details beyond the simple three-stage diagram.","What happens if the password or security settings are incorrect?"],
      [wrong?"Connection blocked.":"Association established.","The client is associated with the AP and, when required, security is successfully established.","Joining the AP alone is not the same as receiving an IP address or having internet connectivity.","Can a phone be joined to Wi-Fi but still have no internet?"]
    ];
    return {scene,meta:texts[step]};
  }
  function airtimeView(){
    const step=state.step;
    const y=100;
    const stations=[phone(62,90,"CLIENT A"),phone(267,90,"CLIENT B"),ap(570,85,"ACCESS POINT")];
    let scene=stations.join("");
    const timeline='<g><path d="M91 244H694" stroke="#8caeb5" stroke-width="2"/><text x="93" y="232" class="smalltext">AIRTIME →</text></g>';
    const blocks=[
      ['A LISTENS', '#b9d6dc',115,95],['BACKOFF', '#d8d0c2',236,100],['A TRANSMITS','#8dbdc5',358,130],['ACK','#bddacc',518,75]
    ];
    scene+=timeline;
    blocks.forEach((p,i)=>{const col=step>=i+1?p[1]:"#e1e8e7";scene+='<rect x="'+p[2]+'" y="254" width="'+p[3]+'" height="36" rx="4" fill="'+col+'" stroke="#c2d2d2"/>'+note(p[2]+p[3]/2,277,p[0])});
    if(step===0)scene+=pill(380,38,state.busy?"CHANNEL BUSY":"CHANNEL IDLE");
    if(step===1)scene+=pill(365,38,"LISTEN BEFORE SEND");
    if(step===2)scene+=pill(352,38,"RANDOM BACKOFF");
    if(step===3)scene+=line(146,153,556,153,"good")+pill(351,38,state.rts?"OPTIONAL RTS / CTS":"SEND DATA");
    if(step===4)scene+=line(556,180,146,180,"good")+pill(373,38,"ACK RETURNED");
    if(state.busy&&step<3)scene+=pill(360,205,"OTHER TRAFFIC DETECTED");
    const texts=[
      ["One channel, many clients.","Multiple wireless devices share airtime on the same radio channel.","A station cannot reliably detect a collision while it is transmitting, so Wi-Fi uses collision avoidance.","Why is wireless different from two computers on separate Ethernet switch links?"],
      ["Listen before sending.","The station senses whether the wireless channel is busy before trying to transmit.","Carrier Sense is the CS in CSMA/CA. A busy channel causes the device to defer.","Should the device send immediately when it hears another transmission?"],
      ["Wait to avoid collisions.","After the required channel-access waiting period, devices use randomized backoff to reduce simultaneous attempts.","Different waiting values help competing stations avoid speaking at exactly the same moment.","Why would random waiting be useful when two phones want to send?"],
      ["Send the data.","After gaining access to the shared medium, a station transmits its wireless frame.","RTS/CTS can optionally coordinate certain transmissions, but it is not used for every Wi-Fi frame.","Does CSMA/CA make collisions impossible?"],
      ["Confirm reception.","The receiver can acknowledge a successfully received unicast data frame. A missing expected ACK can trigger retry logic.","An ACK reports successful frame receipt at the link layer; it does not guarantee the website or app processed the data.","What might a client do if its expected ACK never arrives?"]
    ];
    return {scene,meta:texts[step]};
  }
  function framesView(){
    const names=["Control","Duration","Address 1","Address 2","Address 3","Sequence","Address 4","Payload","FCS"];
    const widths=[78,69,86,86,86,84,82,107,65];let x=33,rects="";
    names.forEach((name,i)=>{const w=widths[i],selected=state.field===i;
      rects+='<g data-field="'+i+'" role="button" tabindex="0" aria-label="'+esc(fields[i][0]+": "+fields[i][1])+'"><rect class="frame-field'+(selected?' selected':'')+'" x="'+x+'" y="125" width="'+(w-3)+'" height="95" rx="3" fill="'+(selected?'#9ecad3':i===7?'#d8ebed':i===8?'#e5d8c6':'#fff')+'"/><text x="'+(x+(w-3)/2)+'" y="163" text-anchor="middle" font-size="10" class="boldtext">'+esc(name)+'</text><text x="'+(x+(w-3)/2)+'" y="191" text-anchor="middle" class="smalltext">'+String(i+1).padStart(2,"0")+'</text></g>';
      x+=w;
    });
    let scene='<text x="33" y="70" class="boldtext">802.11 WIRELESS FRAME — CONCEPTUAL FIELD MAP</text><path d="M35 87H755" stroke="#aac7cd"/>'+rects;
    scene+=pill(75,255,"HEADER / CONTROL")+pill(475,255,"DATA / PAYLOAD")+pill(666,255,"FCS");
    scene+=note(394,325,"Click any field to learn what it does.  Address 4 is not present in every frame.");
    const [name,desc]=fields[state.field];
    const texts=[
      ["Follow the frame structure.","An 802.11 frame is organized into header information, possible payload data and error-checking information.","Wireless frames have more addressing and control fields than a basic Ethernet frame.","What information must travel along with the actual message?"],
      ["Inspect the header.","Select the header fields to see how receiving, transmitting, timing and control information are represented.","The roles of different address fields depend on which direction the frame moves in the distribution system.","Why might a wireless frame need several MAC addresses?"],
      ["Inspect the payload.","The payload is the carried data, when the frame type has one.","Management and control frames may differ; not all frames carry application data.","Which portion of the frame is the information being delivered?"],
      ["Check for errors.","The Frame Check Sequence helps the receiver detect corruption during transmission.","FCS detects errors; it does not decrypt the payload or correct corrupted data by itself.","If a wireless frame arrives corrupted, what field helps detect it?"]
    ];
    const info=texts[state.step];
    return {scene,meta:[name+" — "+desc,info[1],"Selected field: "+name+". "+desc,info[3]]};
  }
  function infrastructureView(){
    let scene="", mode=state.layout,step=state.step;
    if(mode==="home"){
      scene+=phone(92,98,"PHONE")+phone(230,98,"LAPTOP")+ap(440,96,"HOME ROUTER");
      scene+=line(167,152,430,152,"good")+line(302,162,430,162,"good")+cloud(638,122,"WAN")+line(556,170,628,170);
      scene+=pill(324,45,"ONE INTEGRATED DEVICE");
    }else{
      scene+=phone(25,83,"STUDENT")+phone(140,83,"TEACHER");
      scene+=ap(330,80,"LIGHTWEIGHT AP 1")+ap(540,80,"LIGHTWEIGHT AP 2");
      scene+=line(101,146,319,146,"good")+line(213,155,319,155,"good");
      scene+='<rect x="345" y="245" width="230" height="61" rx="6" fill="#fff" stroke="#73989f" stroke-width="2"/>';
      scene+=note(460,271,"WLAN CONTROLLER");
      scene+=note(460,288,"CENTRALIZED MANAGEMENT");
      scene+=line(393,179,426,244,step>=1?"good":"normal")+line(602,179,512,244,step>=1?"good":"normal");
      if(step===2)scene+=pill(390,29,"SAME CAMPUS WLAN SETTINGS");
    }
    const texts=[
      ["Start with the access point.","Home wireless routers commonly combine routing, wired switching and access-point functions.","An AP provides wireless connectivity; a home router can combine several jobs in one box.","What three jobs might your home Wi-Fi router perform?"],
      ["Manage multiple access points.","Larger organizations can centrally manage lightweight APs through a wireless LAN controller.","In real deployments, management and user-data traffic can follow different paths depending on architecture.","Why would an IT department want to manage dozens of APs together?"],
      ["Keep settings consistent.","A controller helps administrators monitor and manage multiple APs centrally.","Central management helps operations but does not automatically guarantee security.","Can centrally managed wireless networks still be misconfigured?"]
    ];
    return {scene,meta:texts[step]};
  }
  function threatsView(){
    const threat=state.threat,step=state.step;
    let scene=phone(65,98,"VICTIM")+ap(330,90,"APPROVED AP")+cloud(632,122,"NETWORK");
    scene+=line(146,151,309,151,"good")+line(448,168,629,168,"good");
    const texts={
      interception:[
        ["Wireless signals reach beyond walls.","Other radios within range may receive wireless transmissions.","Receiving a signal is not the same as decrypting its contents.","Could someone outside the building detect our Wi-Fi?"],
        ["Traffic might be intercepted.","An observer may collect transmitted radio frames, depending on circumstances.","Appropriate encryption protects the contents of traffic against passive eavesdropping.","Why is encryption useful if radio signals travel openly?"],
        ["Encryption protects content.","Secure Wi-Fi and application protocols protect data from unauthorized reading.","WPA2/WPA3 are important at the WLAN layer; HTTPS adds end-to-end protection for web content.","Does capturing encrypted frames automatically reveal passwords?"],
        ["Reduce the exposure.","Use modern wireless security, strong credentials, and trusted encrypted application connections.","The network name (SSID) is not a secret and does not provide meaningful encryption.","What should be protected: the SSID or the traffic content?"]
      ],
      rogue:[
        ["Someone adds equipment.","An employee connects an AP to the organization's wired network without IT approval.","A rogue AP can be installed with good intentions yet still expose the organization.","Can a well-meaning employee introduce a security risk?"],
        ["The access point is unauthorized.","The device is a rogue AP because it is connected without authorization.","'Rogue AP' describes an unauthorized infrastructure device; it is not synonymous with an evil twin.","Does a router have to be malicious to count as rogue?"],
        ["Policy and monitoring matter.","Administrators should discover, remove or approve unauthorized devices and enforce network access policies.","A personal phone hotspot is not automatically a rogue AP connected to the internal LAN.","Why must IT know which devices connect to the school network?"],
        ["Secure the environment.","Use an authorized wireless deployment and monitoring appropriate to the organization.","Unauthorized APs can accidentally bypass intended security settings.","What checks could prevent unapproved access points?"]
      ],
      evil:[
        ["A familiar network name appears.","An attacker can advertise a WLAN name that imitates a legitimate SSID.","An SSID alone does not verify the identity of an access point.","If two networks have the same name, are they equally trustworthy?"],
        ["A device connects to a fake AP.","A victim may accidentally connect to the attacker's lookalike wireless network.","This is the evil twin concept. Strong authentication can make impersonation harder.","Is choosing the strongest signal a reliable security check?"],
        ["Traffic may cross an attacker.","If the attacker becomes an intermediary, they may inspect or attempt to alter some communication.","End-to-end encryption such as properly validated HTTPS can still protect protected content.","Does an evil twin automatically decrypt every HTTPS page?"],
        ["Recognize the warning signs.","Verify public WLAN details, avoid unknown lookalike networks, and respect certificate warnings.","Evil twin refers to AP impersonation; MitM refers to an attacker's position between communicating parties.","How are evil twin and man-in-the-middle related?"]
      ],
      dos:[
        ["Wireless communication is shared.","Wireless networks depend on usable spectrum and correctly configured equipment.","An outage is not automatically evidence of an attacker.","If Wi-Fi slows down, must the cause be malicious?"],
        ["Interference causes trouble.","Interference or congestion can make the wireless channel unreliable.","Nearby devices and environmental conditions can affect availability.","What household device might interfere with 2.4 GHz Wi-Fi?"],
        ["Intentional disruption differs.","Malicious interference can reduce availability, but accidental interference can cause similar symptoms.","DoS is intentional disruption; accidental interference is not itself a cyberattack.","What evidence would you need before alleging an attack?"],
        ["Investigate safely.","Check configuration, channel congestion, equipment health, and potential sources of interference.","Never attempt intentional RF interference or jamming in a classroom.","What should an administrator investigate first?"]
      ]
    };
    if(threat==="interception"){
      scene+=line(209,107,300,50,"bad")+pill(284,21,"RADIO OBSERVER",true);
      if(step>=1)scene+=pill(230,220,step>=2?"ENCRYPTED CONTENT":"FRAMES OBSERVED",step<2);
    }else if(threat==="rogue"){
      scene+=ap(330,90,"ROGUE AP",true);
      scene+=line(448,168,629,168,step>=1?"bad":"normal");
      scene+=pill(248,22,"UNAUTHORIZED DEVICE",true);
      if(step>=2)scene+=pill(260,245,"IT POLICY / MONITORING");
    }else if(threat==="evil"){
      scene+=ap(236,84,"EVIL TWIN",true);
      scene+=line(146,151,215,151,"bad")+line(354,155,437,155,"bad");
      scene+=pill(228,26,"SAME SSID",true);
      if(step>=2)scene+=pill(255,244,"ATTACKER BETWEEN ENDPOINTS",true);
    }else{
      scene+=pill(255,27,step>=2?"POSSIBLE INTENTIONAL DoS":"INTERFERENCE / CONGESTION",step>=2);
      scene+='<g transform="translate(255 220)" fill="none" stroke="#bd766b" stroke-width="2.5"><path d="M0 19Q25 -4 50 19M10 28Q25 15 40 28M23 37H27"/></g>';
      scene+=pill(398,230,"CHANNEL UNRELIABLE",true);
    }
    return {scene,meta:texts[threat][step]};
  }
  const views={connection:connectionView,airtime:airtimeView,frames:framesView,infrastructure:infrastructureView,threats:threatsView};
  function controlButton(label,attr,key,val){
    return '<button type="button" '+attr+'="'+esc(val)+'" aria-pressed="'+String(state[key]===val)+'">'+esc(label)+'</button>';
  }
  function renderControls(){
    let html="";
    if(state.topic==="connection")html='<div class="control-grid"><label>Discover the access point</label>'+controlButton("Passive · beacons","data-discovery","discovery","passive")+controlButton("Active · probes","data-discovery","discovery","active")+'<label>Wireless security settings</label>'+controlButton("Correct settings","data-security","security","correct")+controlButton("Wrong credentials","data-security","security","wrong")+'</div>';
    if(state.topic==="airtime")html='<div class="control-grid"><label>Channel status</label>'+controlButton("Idle channel","data-busy","busy",false)+controlButton("Busy channel","data-busy","busy",true)+'<label>Show optional RTS/CTS</label>'+controlButton("Standard example","data-rts","rts",false)+controlButton("RTS/CTS example","data-rts","rts",true)+'</div>';
    if(state.topic==="frames")html='<div class="control-grid"><label>Inspect the wireless frame</label>'+fields.map((f,i)=>controlButton(f[0],"data-field","field",i)).join("")+'</div>';
    if(state.topic==="infrastructure")html='<div class="control-grid"><label>Network type</label>'+controlButton("Single home AP","data-layout","layout","home")+controlButton("Managed campus","data-layout","layout","campus")+'</div>';
    if(state.topic==="threats")html='<div class="control-grid"><label>Choose a threat to visualize</label>'+controlButton("Data interception","data-threat","threat","interception")+controlButton("Rogue access point","data-threat","threat","rogue")+controlButton("Evil twin / MitM","data-threat","threat","evil")+controlButton("DoS / interference","data-threat","threat","dos")+'</div>';
    $("lab-controls").innerHTML=html;
  }
  function render(){
    const topic=topics[state.topic],result=views[state.topic]();
    document.querySelectorAll("[data-topic]").forEach(b=>{const sel=b.dataset.topic===state.topic;b.classList.toggle("active",sel);b.setAttribute("aria-selected",String(sel));b.tabIndex=sel?0:-1;});
    $("stage-kicker").textContent=topic.kicker;
    $("stage-title").textContent=topic.title;
    $("aside-section").textContent=topic.section;
    $("aside-index").textContent=String(state.step+1).padStart(2,"0");
    $("aside-title").textContent=result.meta[0];
    $("aside-description").textContent=result.meta[1];
    $("insight-text").textContent=result.meta[2];
    $("teacher-prompt").textContent=result.meta[3];
    $("diagram-visual").innerHTML=svg(result.scene);
    $("diagram-caption").textContent=topic.desc;
    $("foot-title").textContent=topic.foot;
    $("foot-description").textContent=topic.desc;
    $("step-counter").textContent="STEP "+String(state.step+1).padStart(2,"0")+" / "+String(topic.steps).padStart(2,"0");
    $("previous-step").disabled=state.step===0;
    $("next-step").disabled=state.step===topic.steps-1;
    renderControls();
    $("diagram-visual").querySelectorAll("[data-field]").forEach(n=>{
      const act=()=>{state.field=Number(n.getAttribute("data-field"));render()};
      n.addEventListener("click",act);
      n.addEventListener("keydown",e=>{if(e.key==="Enter"||e.key===" "){e.preventDefault();act()}});
    });
  }
  document.querySelectorAll("[data-topic]").forEach(b=>b.addEventListener("click",()=>{state.topic=b.dataset.topic;state.step=0;render()}));
  $("previous-step").addEventListener("click",()=>{state.step=Math.max(0,state.step-1);render()});
  $("next-step").addEventListener("click",()=>{state.step=Math.min(topics[state.topic].steps-1,state.step+1);render()});
  $("reset-lab").addEventListener("click",()=>{state.step=0;state.discovery="passive";state.security="correct";state.busy=false;state.rts=false;state.field=0;state.layout="campus";state.threat="interception";render()});
  $("lab-controls").addEventListener("click",e=>{
    const b=e.target.closest("button");if(!b)return;
    for(const [key,attr,transform] of [["discovery","data-discovery",v=>v],["security","data-security",v=>v],["busy","data-busy",v=>v==="true"],["rts","data-rts",v=>v==="true"],["field","data-field",v=>Number(v)],["layout","data-layout",v=>v],["threat","data-threat",v=>v]]){
      if(b.hasAttribute(attr)){state[key]=transform(b.getAttribute(attr));if(key==="threat")state.step=0;render();return}
    }
  });
  $("fullscreen-btn").addEventListener("click",()=>{if(document.fullscreenElement){document.exitFullscreen?.()}else{$("visual-lab").requestFullscreen?.().catch(()=>{})}});
  document.addEventListener("keydown",e=>{
    if(["INPUT","TEXTAREA","SELECT"].includes(document.activeElement?.tagName))return;
    if(e.target.closest("button")&&["ArrowRight","ArrowLeft"].includes(e.key))return;
    if(e.key==="ArrowRight"){state.step=Math.min(topics[state.topic].steps-1,state.step+1);render();e.preventDefault()}
    if(e.key==="ArrowLeft"){state.step=Math.max(0,state.step-1);render();e.preventDefault()}
  });
  render();
})();
