/* Checklist + tracker de candidaturas (localStorage "site.checklist", "site.apps"). */
(function(){
  var CK="site.checklist", AP="site.apps", E=function(s){return SITE.esc(s);};
  var GROUPS=[
    {pt:"1. Preparação",en:"1. Preparation",items:[["Atualizar o CV e adaptá-lo à vaga","Update your CV and tailor it to the role"],["Preparar uma carta de apresentação / motivação","Prepare a cover / motivation letter"],["Atualizar o perfil do LinkedIn","Update your LinkedIn profile"],["Reunir certificados, diplomas e portefólio","Gather certificates, diplomas and portfolio"],["Pedir referências (ex-chefes, professores)","Ask for references (former managers, teachers)"]]},
    {pt:"2. Candidatura",en:"2. Applying",items:[["Ler o anúncio todo e anotar requisitos e prazo","Read the whole post, note requirements and deadline"],["Pesquisar a empresa (missão, produtos, notícias)","Research the company (mission, products, news)"],["Usar palavras-chave do anúncio no CV","Use keywords from the post in your CV"],["Rever ortografia e enviar o CV em PDF","Proofread and send the CV as PDF"],["Registar a candidatura no tracker","Log the application in the tracker"]]},
    {pt:"3. Entrevista",en:"3. Interview",items:[["Preparar respostas: “fale-me de si”, pontos fortes e fracos","Prepare answers: “tell me about yourself”, strengths and weaknesses"],["Preparar 2–3 exemplos concretos (método STAR)","Prepare 2–3 concrete examples (STAR method)"],["Preparar perguntas para fazer à empresa","Prepare questions to ask the company"],["Testar câmara/microfone ou planear o trajeto","Test camera/mic or plan your route"]]},
    {pt:"4. Depois",en:"4. Afterwards",items:[["Enviar email de agradecimento em 24 h","Send a thank-you email within 24 h"],["Fazer follow-up se não houver resposta em 1–2 semanas","Follow up if no reply in 1–2 weeks"],["Atualizar o estado no tracker","Update the status in the tracker"]]}
  ];
  var STATUS=[["por","Por enviar","To apply","#9ca3af"],["enviada","Enviada","Applied","#4f46e5"],["entrevista","Entrevista","Interview","#d97706"],["oferta","Oferta","Offer","#16a34a"],["recusada","Recusada","Rejected","#dc2626"]];
  function get(k,d){try{return JSON.parse(localStorage.getItem(k)||"null")||d;}catch(e){return d;}}
  function put(k,v){try{localStorage.setItem(k,JSON.stringify(v));}catch(e){}}
  var done=get(CK,{}), apps=get(AP,[]);
  function $(id){return document.getElementById(id);}
  function en(){return SITE.lang()==="en";}
  function renderChecklist(){
    var total=0,n=0;
    $("checklist").innerHTML=GROUPS.map(function(g,gi){
      return '<div class="check-group"><h3>'+E(en()?g.en:g.pt)+'</h3>'+g.items.map(function(it,ii){
        var id=gi+"-"+ii,c=!!done[id]; total++; if(c)n++;
        return '<label class="check-item'+(c?" done":"")+'"><input type="checkbox" data-id="'+id+'"'+(c?" checked":"")+'><span>'+E(en()?it[1]:it[0])+'</span></label>';}).join("")+'</div>';
    }).join("");
    var pct=Math.round(n/total*100); $("ckBar").style.width=pct+"%";
    $("ckText").textContent=n+"/"+total+(en()?" done (":" concluídos (")+pct+"%)";
  }
  function stName(k){var s=STATUS.find(function(x){return x[0]===k;})||STATUS[0];return en()?s[2]:s[1];}
  function renderApps(){
    $("aStatus").innerHTML=STATUS.map(function(s){return '<option value="'+s[0]+'">'+(en()?s[2]:s[1])+'</option>';}).join("");
    $("aStatus").value="enviada";
    $("appRows").innerHTML=apps.map(function(a,i){
      var col=(STATUS.find(function(x){return x[0]===a.status;})||STATUS[0])[3];
      var co=a.link&&/^https?:\/\//i.test(a.link)?'<a href="'+E(a.link)+'" target="_blank" rel="noopener noreferrer">'+E(a.company)+'</a>':E(a.company);
      return '<tr><td>'+co+'</td><td>'+E(a.role)+'</td><td>'+E(a.date)+'</td><td><span class="status-pill" style="background:'+col+'"></span><select data-i="'+i+'" aria-label="Estado">'+
        STATUS.map(function(s){return '<option value="'+s[0]+'"'+(s[0]===a.status?" selected":"")+'>'+(en()?s[2]:s[1])+'</option>';}).join("")+'</select></td><td>'+E(a.notes)+'</td>'+
        '<td><button type="button" class="btn danger sm" data-del="'+i+'" aria-label="Apagar">✕</button></td></tr>';}).join("");
    $("emptyMsg").textContent=apps.length?"":(en()?"No applications yet. Add your first one above.":"Ainda sem candidaturas. Adicione a primeira acima.");
    $("stats").innerHTML='<div class="stat"><b>'+apps.length+'</b>'+(en()?"Total":"Total")+'</div>'+STATUS.slice(1).map(function(s){
      return '<div class="stat"><b>'+apps.filter(function(a){return a.status===s[0];}).length+'</b>'+(en()?s[2]:s[1])+'</div>';}).join("");
  }
  function csv(){
    var rows=[["Empresa","Funcao","Data","Estado","Link","Notas"]].concat(apps.map(function(a){return [a.company,a.role,a.date,stName(a.status),a.link,a.notes];}));
    var txt="\ufeff"+rows.map(function(r){return r.map(function(c){c=String(c==null?"":c);return /[",;\n]/.test(c)?'"'+c.replace(/"/g,'""')+'"':c;}).join(";");}).join("\n");
    var url=URL.createObjectURL(new Blob([txt],{type:"text/csv;charset=utf-8"}));
    var a=document.createElement("a");a.href=url;a.download="candidaturas.csv";document.body.appendChild(a);a.click();a.remove();setTimeout(function(){URL.revokeObjectURL(url);},1000);
  }
  document.addEventListener("DOMContentLoaded",function(){
    $("aDate").value=new Date().toISOString().slice(0,10);
    renderChecklist(); renderApps();
    $("checklist").addEventListener("change",function(ev){var id=ev.target.dataset.id;if(!id)return;if(ev.target.checked)done[id]=1;else delete done[id];put(CK,done);renderChecklist();});
    $("ckReset").addEventListener("click",function(){done={};put(CK,done);renderChecklist();});
    $("appForm").addEventListener("submit",function(ev){ev.preventDefault();
      apps.unshift({company:$("aCompany").value.trim(),role:$("aRole").value.trim(),date:$("aDate").value,status:$("aStatus").value,link:$("aLink").value.trim(),notes:$("aNotes").value.trim()});
      put(AP,apps);["aCompany","aRole","aLink","aNotes"].forEach(function(i){$(i).value="";});renderApps();});
    $("appRows").addEventListener("change",function(ev){var i=ev.target.dataset.i;if(i==null)return;apps[+i].status=ev.target.value;put(AP,apps);renderApps();});
    $("appRows").addEventListener("click",function(ev){var b=ev.target.closest("[data-del]");if(!b)return;if(!confirm(en()?"Delete this application?":"Apagar esta candidatura?"))return;apps.splice(+b.dataset.del,1);put(AP,apps);renderApps();});
    $("csvBtn").addEventListener("click",csv);
    document.addEventListener("langchange",function(){renderChecklist();renderApps();});
  });
})();
