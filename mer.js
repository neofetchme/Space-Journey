function ago(d){
  var e=new Date(d),n=new Date(),y=n.getUTCFullYear()-e.getUTCFullYear(),m=new Date(e);
  m.setUTCFullYear(e.getUTCFullYear()+y);
  if(m>n){y--;m=new Date(e);m.setUTCFullYear(e.getUTCFullYear()+y)}
  return y+" years, "+Math.floor((n-m)/864e5)+" days";
}
function tabs(box,labels,fn){
  labels.forEach(function(l,i){
    var b=document.createElement("button");b.textContent=l;
    b.onclick=function(){fn(i);box.querySelectorAll("button").forEach(function(x,k){x.setAttribute("aria-selected",k===i)})};
    box.appendChild(b);
  });
  box.firstChild.click();
}

// Rover chooser
var R=[
 {n:"Spirit — the stranded geologist",d:"2010-03-22T00:00:00Z",
  s:"Spirit landed in Gusev Crater and found strong evidence that Mars was once much wetter. It was planned to last 90 Martian days but worked for 6 years, 2 months and 19 days, more than 25 times longer. On May 1, 2009 it got stuck in soft soil, and in 2010 NASA turned it into a stationary science station. Then it went silent.",
  f:[["Launch","June 10, 2003"],["Landing","Jan 3, 2004"],["Site","Gusev Crater"],["Last contact","Mar 22, 2010"],["Mission ended","May 25, 2011"],["Distance","4.8 mi (7.73 km)"]]},
 {n:"Opportunity — the long-distance explorer",d:"2018-06-10T00:00:00Z",
  s:"Opportunity landed on Meridiani Planum and worked for almost 15 years, about 60 times its expected life. It found evidence of environments that could have supported microbial life. A planet-wide dust storm in June 2018 covered it and it stopped communicating. NASA declared the mission complete on Feb 13, 2019.",
  f:[["Launch","July 7, 2003"],["Landing","Jan 24, 2004"],["Site","Meridiani Planum"],["Last contact","June 10, 2018"],["Mission ended","Feb 13, 2019"],["Distance","28.06 mi (45.16 km)"]]}
];
var rt=null;
tabs(document.getElementById("rovTabs"),["Spirit","Opportunity"],function(i){
  var r=R[i];
  rTitle.textContent=r.n;rStory.textContent=r.s;
  rFacts.innerHTML=r.f.map(function(x){return "<div><dt>"+x[0]+"</dt><dd>"+x[1]+"</dd></div>"}).join("");
  clearInterval(rt);rClock.textContent=ago(r.d);
});

// Race
raceBtn.onclick=function(){
  document.querySelectorAll(".fill").forEach(function(f){f.style.width="0";void f.offsetWidth;f.style.width=f.dataset.w+"%"});
};

// Timeline
var E=[
 ["s","Jun 10, 2003","Spirit launches from Cape Canaveral."],
 ["o","Jul 7, 2003","Opportunity launches."],
 ["s","Jan 3, 2004","Spirit lands in Gusev Crater and bounces 28 times."],
 ["s","Jan 21, 2004","Contact is lost because of a flash memory problem. Scientists fix it by reformatting the memory and uploading new software."],
 ["o","Jan 24, 2004","Opportunity lands on Meridiani Planum."],
 ["s","Feb 6, 2004","Spirit grinds into the rock Adirondack, the first use of its Rock Abrasion Tool."],
 ["s","Mar 2005","Dust devils blow dust off Spirit’s solar panels. Power rises from about 60% to 93%."],
 ["s","Sep 29, 2005","Spirit reaches the top of Husband Hill."],
 ["s","2007","Spirit finds nearly pure silica at Gertrude Weise."],
 ["s","May 1, 2009","Spirit gets stuck in soft soil."],
 ["s","Mar 22, 2010","Last communication from Spirit."],
 ["s","May 25, 2011","NASA ends efforts to contact Spirit."],
 ["o","Jun 10, 2018","A planet-wide dust storm covers Opportunity. Last communication."],
 ["o","Feb 13, 2019","NASA declares the Opportunity mission complete."]
];
tabs(document.getElementById("tlTabs"),["Both","Spirit","Opportunity"],function(i){
  var k=["b","s","o"][i];
  evts.innerHTML=E.filter(function(e){return k==="b"||e[0]===k}).map(function(e){return '<li class="'+e[0]+'"><b>'+e[1]+'</b> — '+e[2]+"</li>"}).join("");
});

// Map
var M=[["Gusev Crater (Spirit)","Spirit landed here on Jan 3, 2004, at about 14.6° south, 175.5° east. The landing site was later named Columbia Memorial Station."],
       ["Meridiani Planum (Opportunity)","Opportunity landed here on Jan 24, 2004, on the opposite side of Mars. Mineral deposits seen from orbit hinted at a wetter past."]];
document.querySelectorAll("#map .hot").forEach(function(b){
  b.onclick=function(){mTitle.textContent=M[b.dataset.k][0];mText.textContent=M[b.dataset.k][1];
    document.querySelectorAll("#map .hot").forEach(function(x){x.setAttribute("aria-pressed",x===b)})};
});

// Discoveries
var D=[
 ["2004","Different bedrock","Spirit found a surprising variety of rocks in Columbia Hills. Some had been altered by water."],
 ["2005","Dust devil movies","Spirit filmed spinning columns of dust, showing how wind shapes Mars."],
 ["2006","Home Plate explosion","Layers at Home Plate suggest an ancient explosive event, volcanic or from an impact."],
 ["2006","Sulfur-rich soil","Bright soil at Tyrone held lots of sulfur and a trace of water, from volcanic vents or evaporated water."],
 ["2007","Nearly pure silica","At Gertrude Weise, Spirit’s dragging wheel uncovered silica, likely made by hot springs or steam vents."],
 ["Opportunity","Layers and blueberries","At Eagle Crater, Endurance Crater and Burns Cliff, layered rocks and hematite “blueberries” revealed a watery past."]
];
disc.innerHTML=D.map(function(d){return "<button><small>"+d[0]+"</small><h3>"+d[1]+"</h3><p>"+d[2]+"</p></button>"}).join("");
disc.querySelectorAll("button").forEach(function(b){b.onclick=function(){b.classList.toggle("open")}});

// Instruments
var I=[["Pancam","Two cameras that made detailed 3-D panoramas in many wavelengths."],["Navcam","Navigation cameras for studying terrain and steering."],["Mini-TES","Measured minerals and heat from a distance."],["Mössbauer","Identified minerals that contain iron."],["APXS","Worked out which elements are in rocks and soil."],["Microscopic Imager","Extreme close-ups of rocks, down to about 0.1 mm."],["RAT","Rock Abrasion Tool. It ground away dust and weathered rock, making a hole about 45 mm wide and 5 mm deep, through hard volcanic rock in about two hours."],["Magnets","Collected magnetic dust for study."]];
I.forEach(function(x,i){
  var b=document.createElement("button");b.textContent=x[0];
  b.onclick=function(){iTitle.textContent=x[0];iText.textContent=x[1];inst.querySelectorAll("button").forEach(function(y,k){y.setAttribute("aria-pressed",k===i)})};
  inst.appendChild(b);
});
inst.firstChild.click();

// Rover parts
var P=[["Camera head","Pancam and Navcam sit on the tall mast, giving the rover its eyes."],["Antenna","Sent and received messages with Earth and Mars orbiters."],["Solar panels","Turned sunlight into power. Dust on them was a constant problem."],["Wheels","Six wheels carried the rover. When one stopped working, Spirit’s drag-wheel even uncovered silica."]];
document.querySelectorAll("[data-p]").forEach(function(b){
  b.onclick=function(){var p=P[b.dataset.p];pTitle.textContent=p[0];pText.textContent=p[1];
    document.querySelectorAll("[data-p]").forEach(function(x){x.setAttribute("aria-pressed",x===b)})};
});

// Quiz
var Q=[["Which rover drove about 45 km?",["Spirit","Opportunity","Sojourner"],1],
 ["What happened to Spirit in 2009?",["It got stuck in soft soil","It flew away","It reached the Moon"],0],
 ["What did the rovers search for?",["Gold","Evidence of past water","Aliens in cities"],1],
 ["How many times did Spirit bounce on landing?",["15","28","90"],1]],g=0,dn=0;
Q.forEach(function(q){
  var d=document.createElement("div");d.className="quiz-q";d.innerHTML="<strong>"+q[0]+"</strong>";
  q[1].forEach(function(o,k){
    var b=document.createElement("button");b.textContent=o;
    b.onclick=function(){
      if(d.dataset.done)return;d.dataset.done=1;dn++;
      if(k===q[2]){b.className="ok";g++}else{b.className="no";d.children[q[2]+1].className="ok"}
      if(dn===Q.length)scoreMer.textContent="You scored "+g+" out of "+Q.length+".";
    };
    d.appendChild(b);
  });
  quizMer.appendChild(d);
});

// Opportunity trail
var O=[
 ["Eagle Crater","Opportunity began in Eagle Crater, studying layered rocks that hinted at a watery past."],
 ["Endurance Crater","It spent about six months here. The rock layers showed evidence of past water and changing conditions."],
 ["Burns Cliff","It investigated Burns Cliff and other exposed layers of rock, reading Mars’s history like pages in a book."],
 ["Blueberries","It studied hematite-rich spherules nicknamed “blueberries”, linked to water-related processes."],
 ["The marathon","It became the first human-made vehicle to travel a marathon distance on another world, 28.06 miles (45.16 km) in total."]
];
tabs(document.getElementById("oTabs"),O.map(function(x){return x[0]}),function(i){oTitle.textContent=O[i][0];oText.textContent=O[i][1]});
lifeBtn.onclick=function(){document.querySelectorAll("#life .fill").forEach(function(f){f.style.width="0";void f.offsetWidth;f.style.width=f.dataset.w+"%"})};

// Dust storm
stormR.oninput=function(){
  var v=+stormR.value;
  stormO.style.opacity=v/100*.9;stormP.textContent=(100-v)+"%";
  stormM.textContent=v<35?"Clear sky. The rover is working.":v<80?"Dust is blocking the sunlight. Power is dropping.":"Almost no sunlight. On June 10, 2018, Opportunity sent its last message.";
};

// Compare three rovers
var C=[
 ["Landing",[["Sojourner","July 4, 1997 at Ares Vallis. A parachute and giant airbags cushioned it. About 15 bounces at 31 mph."],["Spirit","Jan 3, 2004 in Gusev Crater. A parachute, heat shield, retrorockets and four airbags. 28 bounces."],["Opportunity","Jan 24, 2004 at Meridiani Planum, on the opposite side of Mars, with the same style of landing system."]]],
 ["How long",[["Sojourner","Built for about a week. It kept going for nearly three months."],["Spirit","Planned for 90 Martian days. It worked 6 years, 2 months and 19 days."],["Opportunity","Worked for almost 15 years, about 60 times its expected life."]]],
 ["The lesson",[["Sojourner","Innovation: a brand new landing idea worked."],["Spirit","Persistence: it kept doing science even when stuck."],["Opportunity","Endurance: it went the distance, one marathon and more."]]]
];
tabs(document.getElementById("cmpTabs"),C.map(function(x){return x[0]}),function(i){
  cmp.innerHTML=C[i][1].map(function(r){return "<article><h3>"+r[0]+"</h3><p>"+r[1]+"</p></article>"}).join("");
});