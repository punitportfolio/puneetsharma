// ===================== PRELOADER =====================
(function(){
  const pre = document.getElementById('preloader');
  const pct = document.getElementById('loaderPct');
  if(!pre) return;
  let p = 0;
  const timer = setInterval(()=>{
    p += Math.random()*18;
    if(p >= 100){ p = 100; clearInterval(timer); }
    if(pct) pct.textContent = Math.floor(p) + '%';
  }, 110);
  window.addEventListener('load', ()=>{
    setTimeout(()=>{
      if(pct) pct.textContent = '100%';
      pre.classList.add('hidden');
      document.body.style.overflow = '';
    }, 500);
  });
  document.body.style.overflow = 'hidden';
  // failsafe
  setTimeout(()=>{ pre.classList.add('hidden'); document.body.style.overflow=''; }, 3500);
})();

// ===================== NAVBAR =====================
(function(){
  const nav = document.getElementById('navbar');
  const toggle = document.getElementById('navToggle');
  const links = document.getElementById('navLinks');
  if(nav){
    window.addEventListener('scroll', ()=>{
      nav.classList.toggle('scrolled', window.scrollY > 30);
    });
  }
  if(toggle && links){
    toggle.addEventListener('click', ()=>{
      toggle.classList.toggle('open');
      links.classList.toggle('open');
    });
    links.querySelectorAll('a').forEach(a=>{
      a.addEventListener('click', ()=>{
        toggle.classList.remove('open');
        links.classList.remove('open');
      });
    });
  }
})();

// ===================== SCROLL REVEAL =====================
(function(){
  const items = document.querySelectorAll('.reveal, .reveal-scale');
  if(!items.length) return;
  const io = new IntersectionObserver((entries)=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting){
        entry.target.classList.add('in');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });
  items.forEach(el=>io.observe(el));
})();

// ===================== COUNTERS =====================
(function(){
  const counters = document.querySelectorAll('[data-count]');
  if(!counters.length) return;
  const animate = (el)=>{
    const target = parseFloat(el.getAttribute('data-count'));
    const suffix = el.getAttribute('data-suffix') || '';
    const decimals = el.getAttribute('data-decimals') ? parseInt(el.getAttribute('data-decimals')) : 0;
    const dur = 1600;
    const start = performance.now();
    function tick(now){
      const t = Math.min((now-start)/dur, 1);
      const eased = 1 - Math.pow(1-t, 3);
      const val = target * eased;
      el.textContent = (decimals ? val.toFixed(decimals) : Math.floor(val)) + suffix;
      if(t < 1) requestAnimationFrame(tick);
      else el.textContent = (decimals ? target.toFixed(decimals) : target) + suffix;
    }
    requestAnimationFrame(tick);
  };
  const io = new IntersectionObserver((entries)=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting){
        animate(entry.target);
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });
  counters.forEach(el=>io.observe(el));
})();

// ===================== SKILL BARS =====================
(function(){
  const bars = document.querySelectorAll('.skill-fill');
  if(!bars.length) return;
  const io = new IntersectionObserver((entries)=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting){
        const target = entry.target.getAttribute('data-level');
        requestAnimationFrame(()=>{ entry.target.style.width = target + '%'; });
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });
  bars.forEach(el=>io.observe(el));
})();



// ===================== YEAR =====================
(function(){
  const y = document.querySelectorAll('.year');
  y.forEach(el=> el.textContent = new Date().getFullYear());
})();

// ===================== MARKETING CAROUSEL =====================
(function(){
  const track = document.getElementById('galleryTrack');
  const prev = document.getElementById('galleryPrev');
  const next = document.getElementById('galleryNext');
  if(!track || !prev || !next) return;
  next.addEventListener('click', ()=>{
    track.scrollBy({ left: track.clientWidth, behavior:'smooth' });
  });
  prev.addEventListener('click', ()=>{
    track.scrollBy({ left: -track.clientWidth, behavior:'smooth' });
  });
})();