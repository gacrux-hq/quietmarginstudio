/* Gerador de CV — tudo local (localStorage "site.cv"). */
(function(){
  var KEY="site.cv", E=function(s){return SITE.esc(s);}, T=function(a,b){return SITE.t(a,b);};
  var FIELDS=["name","title","email","phone","location","link","summary","skills","languages"];
  var state={tpl:"classico",exp:[],edu:[]};
  function $(id){return document.getElementById(id);}
  function load(){try{var s=JSON.parse(localStorage.getItem(KEY)||"null");if(s)state=Object.assign(state,s);}catch(e){}}
  function save(){try{localStorage.setItem(KEY,JSON.stringify(state));}catch(e){}}
  var SAMPLE={tpl:"moderno",name:"Ana Silva",title:"Desenvolvedora Backend Júnior",email:"ana.silva@email.pt",phone:"+351 912 345 678",location:"Aveiro, Portugal",link:"linkedin.com/in/anasilva",
    summary:"Licenciada em Engenharia Informática, com experiência em APIs REST e bases de dados. Procuro integrar uma equipa onde possa crescer e contribuir com soluções fiáveis.",
    skills:"Python, Node.js, SQL, Docker, Git, Trabalho em equipa",languages:"Português (nativo), Inglês (C1), Espanhol (B1)",
    exp:[{role:"Estagiária de Desenvolvimento",org:"Empresa Exemplo, Lda.",dates:"2025 – Presente",desc:"Desenvolvimento de APIs em Node.js.\nAutomatização de relatórios internos."},
         {role:"Monitora de Programação",org:"Universidade",dates:"2023 – 2024",desc:"Apoio a alunos do 1.º ano em Python."}],
    edu:[{role:"Licenciatura em Engenharia Informática",org:"Universidade de Aveiro",dates:"2021 – 2024",desc:""}]};
  function entryHTML(kind,i,e){
    var en=SITE.lang()==="en";
    var l = kind==="exp" ? [en?"Role":"Cargo",en?"Company":"Empresa"] : [en?"Degree / course":"Curso / grau",en?"School":"Instituição"];
    return '<div class="entry" data-kind="'+kind+'" data-i="'+i+'"><button type="button" class="btn danger sm rm" data-rm="1" aria-label="Remover">✕</button>'+
      '<div class="row"><div><label>'+l[0]+'</label><input data-k="role" value="'+E(e.role)+'"></div><div><label>'+l[1]+'</label><input data-k="org" value="'+E(e.org)+'"></div></div>'+
      '<label>'+(en?"Dates":"Datas")+'</label><input data-k="dates" value="'+E(e.dates)+'" placeholder="2024 – 2025">'+
      '<label>'+(en?"Description":"Descrição")+'</label><textarea data-k="desc">'+E(e.desc)+'</textarea></div>';
  }
  function renderEntries(){
    $("expList").innerHTML=state.exp.map(function(e,i){return entryHTML("exp",i,e);}).join("");
    $("eduList").innerHTML=state.edu.map(function(e,i){return entryHTML("edu",i,e);}).join("");
  }
  function fillForm(){FIELDS.forEach(function(f){$(f).value=state[f]||"";});$("tpl").value=state.tpl||"classico";renderEntries();}
  function tags(s){var a=(s||"").split(",").map(function(x){return x.trim();}).filter(Boolean);return a.length?'<ul class="tags">'+a.map(function(x){return "<li>"+E(x)+"</li>";}).join("")+"</ul>":"";}
  function items(list){return list.filter(function(e){return e.role||e.org;}).map(function(e){
    return '<div class="item"><div class="h"><span>'+E(e.role)+'</span><span>'+E(e.dates)+'</span></div>'+(e.org?'<div class="sub">'+E(e.org)+'</div>':"")+(e.desc?'<div class="d">'+E(e.desc)+'</div>':"")+'</div>';}).join("");}
  function sec(t,html){return html?"<h2>"+t+"</h2>"+html:"";}
  function preview(){
    var s=state, p=$("cvPreview");
    var contacts=[s.email,s.phone,s.location,s.link].filter(Boolean).map(E);
    var H={exp:T("Experiência","Experience"),edu:T("Formação","Education"),sk:T("Competências","Skills"),lg:T("Línguas","Languages"),sum:T("Perfil","Profile"),ct:T("Contactos","Contact")};
    var head='<h1>'+(E(s.name)||'<span class="empty">'+T("O seu nome","Your name")+'</span>')+'</h1>'+(s.title?'<div class="title">'+E(s.title)+'</div>':"");
    var sum=s.summary?'<p class="d" style="white-space:pre-line">'+E(s.summary)+'</p>':"";
    p.className="cv-paper tpl-"+(s.tpl==="moderno"?"moderno":"classico");
    if(s.tpl==="moderno"){
      p.innerHTML='<div class="side">'+sec(H.ct,contacts.length?'<div class="contacts">'+contacts.join("<br>")+'</div>':"")+sec(H.sk,tags(s.skills))+sec(H.lg,tags(s.languages))+'</div>'+
        '<div class="main">'+head+sec(H.sum,sum)+sec(H.exp,items(s.exp))+sec(H.edu,items(s.edu))+'</div>';
    } else {
      p.innerHTML=head+(contacts.length?'<div class="contacts">'+contacts.join(" · ")+'</div>':"")+sec(H.sum,sum)+sec(H.exp,items(s.exp))+sec(H.edu,items(s.edu))+sec(H.sk,tags(s.skills))+sec(H.lg,tags(s.languages));
    }
  }
  function onInput(ev){
    var t=ev.target;
    if(FIELDS.indexOf(t.id)>=0) state[t.id]=t.value;
    else if(t.id==="tpl") state.tpl=t.value;
    else { var ent=t.closest(".entry"); if(ent&&t.dataset.k){ state[ent.dataset.kind][+ent.dataset.i][t.dataset.k]=t.value; } }
    save(); preview();
  }
  document.addEventListener("DOMContentLoaded",function(){
    load(); fillForm(); preview();
    $("cvForm").addEventListener("input",onInput); $("tpl").addEventListener("change",onInput);
    $("cvForm").addEventListener("click",function(ev){var b=ev.target.closest("[data-rm]");if(!b)return;var ent=b.closest(".entry");state[ent.dataset.kind].splice(+ent.dataset.i,1);save();renderEntries();preview();});
    $("addExp").addEventListener("click",function(){state.exp.push({role:"",org:"",dates:"",desc:""});save();renderEntries();});
    $("addEdu").addEventListener("click",function(){state.edu.push({role:"",org:"",dates:"",desc:""});save();renderEntries();});
    $("printBtn").addEventListener("click",function(){var t=document.title;if(state.name)document.title="CV - "+state.name;window.print();document.title=t;});
    $("sampleBtn").addEventListener("click",function(){if(state.name&&!confirm(T("Substituir os seus dados pelo exemplo?","Replace your data with the sample?")))return;state=JSON.parse(JSON.stringify(SAMPLE));save();fillForm();preview();});
    $("clearBtn").addEventListener("click",function(){if(!confirm(T("Apagar todos os dados do CV?","Delete all CV data?")))return;state={tpl:state.tpl,exp:[],edu:[]};save();fillForm();preview();});
    document.addEventListener("langchange",function(){renderEntries();preview();});
  });
})();
