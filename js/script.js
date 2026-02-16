const hit   = document.getElementById('hit');
const stack = document.getElementById('stack');
const intro = document.getElementById('intro');
const site  = document.getElementById('site');
const music = document.getElementById('music');

hit.addEventListener('click', async () => {

      try { await music.play(); } catch(e){}

      stack.classList.add('open');

      setTimeout(()=>{
        site.classList.add('ready');
      },300);

      setTimeout(()=>{
        intro.classList.add('fade-out');
      },900);

      setTimeout(()=>{
        intro.remove();
      },1300);

}, {passive:true});

