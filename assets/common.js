/* Comum: marca, idioma (PT/EN), navegação, ano. Sem tracking. */
(function(){
  var C = window.SITE_CONFIG || {brand:"Quiet Margin Studio"};
  var KEY = "site.lang";
  function getLang(){ try{ return localStorage.getItem(KEY) || "pt"; }catch(e){ return "pt"; } }
  function setLang(l){
    document.documentElement.setAttribute("data-lang", l);
    document.documentElement.setAttribute("lang", l === "en" ? "en" : "pt-PT");
    try{ localStorage.setItem(KEY, l); }catch(e){}
    document.querySelectorAll("[data-ph-pt]").forEach(function(el){
      el.placeholder = el.getAttribute(l === "en" ? "data-ph-en" : "data-ph-pt") || "";
    });
    var b = document.getElementById("langBtn"); if (b) b.textContent = l === "en" ? "PT" : "EN";
    document.dispatchEvent(new CustomEvent("langchange", {detail:l}));
  }
  window.SITE = { lang:getLang, setLang:setLang, t:function(pt,en){ return getLang()==="en"?en:pt; },
    esc:function(s){ return String(s==null?"":s).replace(/[&<>"']/g,function(c){return {"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c];}); } };
  document.addEventListener("DOMContentLoaded", function(){
    document.querySelectorAll("[data-brand]").forEach(function(el){ el.textContent = C.brand; });
    document.querySelectorAll("[data-shop-link]").forEach(function(el){ el.href = C.shopUrl || "#"; });
    document.querySelectorAll("[data-year]").forEach(function(el){ el.textContent = new Date().getFullYear(); });
    var here = location.pathname.split("/").pop() || "index.html";
    document.querySelectorAll("nav.main a").forEach(function(a){ if (a.getAttribute("href") === here) a.setAttribute("aria-current","page"); });
    var b = document.getElementById("langBtn");
    if (b) b.addEventListener("click", function(){ setLang(getLang()==="en"?"pt":"en"); });
    setLang(getLang());
  });
})();
