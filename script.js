function $(id){return document.getElementById(id)}

// Scroll reveal
var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add("in");io.unobserve(e.target)}})},{threshold:.12});
document.querySelectorAll(".reveal").forEach(function(el){io.observe(el)});

// Live clock
if($("clock")){
  var end=new Date("1997-09-27T00:00:00Z");
  (function tick(){
    var n=new Date(),y=n.getUTCFullYear()-end.getUTCFullYear(),m=new Date(end);
    m.setUTCFullYear(end.getUTCFullYear()+y);
    if(m>n){y--;m=new Date(end);m.setUTCFullYear(end.getUTCFullYear()+y)}
    var d=Math.floor((n-m)/864e5);
    $("clock").textContent=y+" years, "+d+" days";
  })();
}

// Timeline
if($("steps")){
  var steps=[
    ["Blast off","Dec 4, 1996","A Delta II 7925 rocket launched Mars Pathfinder, with Sojourner folded inside, from Cape Canaveral in Florida."],
    ["Space trip","Months in space","The spacecraft travelled across space to Mars."],
    ["Landing","July 4, 1997","A parachute and giant airbags brought it down in Ares Vallis. It bounced about 15 times."],
    ["Rolling out","Exploring","Sojourner drove down a safe ramp and began studying rocks, soil and weather."],
    ["The end","Sept 27, 1997","The mission ended. Sojourner stayed on Mars."]
  ];
  steps.forEach(function(s,i){
    var b=document.createElement("button");
    b.textContent=s[0];b.setAttribute("role","tab");
    b.onclick=function(){
      $("stepTitle").textContent=s[0]+" · "+s[1];$("stepText").textContent=s[2];
      $("bar").style.width=((i+1)/steps.length*100)+"%";
      document.querySelectorAll("#steps button").forEach(function(x,k){x.setAttribute("aria-selected",k===i)});
    };
    $("steps").appendChild(b);
  });
  $("steps").firstChild.click();
}

// Hotspots
var parts=[
  ["Solar panel","The flat panel on top turned sunlight into power so the rover could work."],
  ["Six wheels","Six wheels let Sojourner roll over rocks and soft sand, leaving tracks across the Martian ground."],
  ["Antenna","The tall antenna sent and received messages between the rover and the lander."]
];
document.querySelectorAll(".hot").forEach(function(b){
  b.onclick=function(){
    var p=parts[b.dataset.k];$("hotTitle").textContent=p[0];$("hotText").textContent=p[1];
    document.querySelectorAll(".hot").forEach(function(x){x.setAttribute("aria-pressed",x===b)});
  };
});

// Airbag bounce
if($("dropBtn")){
  $("dropBtn").onclick=function(){
    var N=+$("dropBtn").dataset.n||15,H=170,hs=[],i;
    for(i=0;i<N;i++)hs.push(H*Math.pow(.72,i));
    var units=[Math.sqrt(hs[0])];
    for(i=1;i<N;i++){units.push(Math.sqrt(hs[i]),Math.sqrt(hs[i]))}
    var total=units.reduce(function(a,b){return a+b},0),t=0,hits=[];
    var kf=[{transform:"translateY(-"+hs[0]+"px)",offset:0,easing:"ease-in"}];
    t+=units[0]/total;kf.push({transform:"translateY(0)",offset:t,easing:"ease-out"});hits.push(t);
    for(i=1;i<N;i++){
      t+=units[2*i-1]/total;kf.push({transform:"translateY(-"+hs[i]+"px)",offset:t,easing:"ease-in"});
      t+=units[2*i]/total;kf.push({transform:"translateY(0)",offset:Math.min(t,1),easing:"ease-out"});hits.push(t);
    }
    var dur=6500;
    $("count").textContent="0";
    $("ball").animate(kf,{duration:dur,fill:"forwards"});
    hits.forEach(function(h,k){setTimeout(function(){$("count").textContent=k+1},h*dur)});
  };
}

// Quiz
if($("quiz")){
  var qs=[
    ["Who is the rover named after?",["Carl Sagan","Sojourner Truth","Ares"],1],
    ["How did Pathfinder land on Mars?",["Rocket legs","Parachute and airbags","A runway"],1],
    ["What was Ares Vallis long ago?",["A volcano","A floodplain","An ocean of ice"],1]
  ],got=0,done=0;
  qs.forEach(function(q){
    var d=document.createElement("div");d.className="quiz-q";
    d.innerHTML="<strong>"+q[0]+"</strong>";
    q[1].forEach(function(o,k){
      var b=document.createElement("button");b.textContent=o;
      b.onclick=function(){
        if(d.dataset.done)return;d.dataset.done=1;done++;
        if(k===q[2]){b.className="ok";got++}else{b.className="no";d.children[q[2]+1].className="ok"}
        if(done===qs.length)$("score").textContent="You scored "+got+" out of "+qs.length+".";
      };
      d.appendChild(b);
    });
    $("quiz").appendChild(d);
  });
}