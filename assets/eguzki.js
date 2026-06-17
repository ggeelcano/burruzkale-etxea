// Demos estilo Eguzkilore — G&G Elcano
const header=document.getElementById('header');
addEventListener('scroll',()=>header.classList.toggle('scrolled',scrollY>40));
const burger=document.getElementById('burger'),menu=document.getElementById('menu');
burger.addEventListener('click',()=>menu.classList.toggle('open'));
menu.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>menu.classList.remove('open')));
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}}),{threshold:.12});
document.querySelectorAll('.reveal').forEach(el=>io.observe(el));
function animateNum(el){
  const target=parseFloat(el.dataset.target);const dec=parseInt(el.dataset.decimals||'0',10);
  const suffix=el.dataset.suffix||'';const sep=el.dataset.sep==='1';const dur=1500;let start=null;
  function fmt(v){let s=dec?v.toFixed(dec).replace('.',','):Math.round(v).toString();if(sep)s=s.replace(/\B(?=(\d{3})+(?!\d))/g,'.');return s+suffix;}
  function step(t){if(!start)start=t;const p=Math.min((t-start)/dur,1);const e=1-Math.pow(1-p,3);el.textContent=fmt(target*e);if(p<1)requestAnimationFrame(step);else el.textContent=fmt(target);}
  requestAnimationFrame(step);
}
const numIO=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){animateNum(e.target);numIO.unobserve(e.target)}}),{threshold:.5});
document.querySelectorAll('.num[data-target]').forEach(el=>numIO.observe(el));
const lb=document.getElementById('lightbox'),lbImg=document.getElementById('lbImg');
document.querySelectorAll('.gallery-grid img').forEach(img=>img.addEventListener('click',()=>{lbImg.src=img.src;lb.classList.add('open')}));
document.getElementById('lbClose').addEventListener('click',()=>lb.classList.remove('open'));
lb.addEventListener('click',e=>{if(e.target===lb)lb.classList.remove('open')});
const f=document.getElementById('resForm');
if(f){
  const wa=f.dataset.wa,nombre=f.dataset.name||'el alojamiento';
  f.addEventListener('submit',e=>{
    e.preventDefault();
    const g=id=>{const el=document.getElementById(id);return el?el.value:'';};
    const n=g('nombre')||'—',ent=g('entrada')||'—',sal=g('salida')||'—',per=g('personas'),tel=g('tel')||'—',msg=g('msg');
    let t=`Hola! Quiero consultar disponibilidad en ${nombre}.%0A%0A`+
          `👤 Nombre: ${n}%0A📅 Entrada: ${ent}%0A📅 Salida: ${sal}%0A👥 Personas: ${per}%0A📞 Tel: ${tel}`;
    if(msg)t+=`%0A📝 ${msg}`;
    window.open(`https://wa.me/${wa}?text=${t}`,'_blank');
  });
}
