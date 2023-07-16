(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))n(e);new MutationObserver(e=>{for(const r of e)if(r.type==="childList")for(const c of r.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&n(c)}).observe(document,{childList:!0,subtree:!0});function o(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerPolicy&&(r.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?r.credentials="include":e.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function n(e){if(e.ep)return;e.ep=!0;const r=o(e);fetch(e.href,r)}})();const s="https://646e69389c677e23218ba227.mockapi.io/Products";fetch(s).then(i=>i.json()).then(i=>{d(i),a()});function a(){document.querySelectorAll(".detailButton").forEach(t=>{t.addEventListener("click",function(){const o=t.getAttribute("data-product-id");window.location.href=`/detail/detail.html?id=${o}`})})}function d(i){document.querySelector(".content").innerHTML=i.map(t=>`<div class="card" style="width: 18rem;">
          <img src="${t.image}" class="card-img-top" alt="...">
          <div class="card-body">
              <h5 class="card-title">${t.name}</h5>
              <span>
                <p class="card-text">$ ${t.price}</p>
                <a  data-product-id="${t.id}" class="btn btn-primary btn-success detailButton">Detail</a>
              </span>
           </div>
        </div>
    </div>`).join("")}
