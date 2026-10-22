/* Calculadora 50/30/20 (localStorage "site.budget"). Meramente indicativo. */
(function(){
  var KEY="site.budget", IDS=["income","sNeeds","sWants","sSave"];
  function $(id){return document.getElementById(id);}
  function eur(n){return new Intl.NumberFormat(SITE.lang()==="en"?"en-IE":"pt-PT",{style:"currency",currency:"EUR"}).format(n||0);}
  function num(id){var v=parseFloat(String($(id).value).replace(",","."));return isFinite(v)&&v>0?v:0;}
  function render(){
    var inc=num("income"), en=SITE.lang()==="en";
    var B=[["b50",0.5,en?"Needs":"Necessidades","sNeeds"],["b30",0.3,en?"Wants":"Desejos","sWants"],["b20",0.2,en?"Savings / debt":"Poupança / dívidas","sSave"]];
    $("buckets").innerHTML=B.map(function(b){
      var target=inc*b[1], spent=num(b[3]), has=$(b[3]).value!=="", d=target-spent, cmp="";
      if(has&&inc){
        var cls = b[0]==="b20" ? (d<=0?"pos":"neg") : (d>=0?"pos":"neg");
        var txt = b[0]==="b20"
          ? (d<=0?(en?"On track: ":"No bom caminho: ")+eur(spent):(en?"Short by ":"Faltam ")+eur(d))
          : (d>=0?(en?"Under target by ":"Abaixo da meta em ")+eur(d):(en?"Over target by ":"Acima da meta em ")+eur(-d));
        cmp='<div class="small diff '+cls+'">'+(en?"Current: ":"Atual: ")+eur(spent)+" · "+txt+'</div>';
      }
      return '<div class="card bucket '+b[0]+'"><div class="small muted">'+b[2]+' · '+Math.round(b[1]*100)+'%</div><div class="amt">'+eur(target)+'</div>'+cmp+'</div>';
    }).join("");
  }
  function save(){var o={};IDS.forEach(function(i){o[i]=$(i).value;});try{localStorage.setItem(KEY,JSON.stringify(o));}catch(e){}}
  document.addEventListener("DOMContentLoaded",function(){
    try{var o=JSON.parse(localStorage.getItem(KEY)||"{}");IDS.forEach(function(i){if(o[i]!=null)$(i).value=o[i];});}catch(e){}
    render();
    $("budgetForm").addEventListener("input",function(){save();render();});
    $("bReset").addEventListener("click",function(){IDS.forEach(function(i){$(i).value="";});save();render();});
    document.addEventListener("langchange",render);
  });
})();
