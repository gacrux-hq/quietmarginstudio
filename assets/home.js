(function(){
  function render(){
    var C = window.SITE_CONFIG, box = document.getElementById("products"); if(!box||!C) return;
    var en = SITE.lang()==="en", E = SITE.esc;
    box.innerHTML = C.products.map(function(p){
      var t = en ? p.en : p.pt;
      return '<article class="card product"><div class="ico" aria-hidden="true">'+p.icon+'</div><h3>'+E(t[0])+'</h3><p>'+E(t[1])+'</p>'+
        '<a class="btn sm sec" href="'+E(p.url||C.shopUrl||"#")+'" rel="noopener">'+(en?"View template":"Ver modelo")+' →</a></article>';
    }).join("");
  }
  document.addEventListener("langchange", render);
  document.addEventListener("DOMContentLoaded", render);
})();
