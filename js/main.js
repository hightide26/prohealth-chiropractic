gsap.registerPlugin(ScrollTrigger);

// Nav scroll state
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 20);
}, { passive: true });

// Mobile burger
const burger = document.getElementById('navBurger');
const navLinks = document.getElementById('navLinks');
burger?.addEventListener('click', () => {
  const open = navLinks.style.display === 'flex';
  navLinks.style.display = open ? 'none' : 'flex';
  navLinks.style.flexDirection = 'column';
  navLinks.style.position = 'absolute';
  navLinks.style.top = '68px';
  navLinks.style.left = '0';
  navLinks.style.right = '0';
  navLinks.style.background = '#fff';
  navLinks.style.padding = '20px 24px 24px';
  navLinks.style.borderBottom = '1px solid #D6E4F0';
  navLinks.style.gap = '18px';
  navLinks.style.zIndex = '99';
});

// GSAP scroll animations
document.querySelectorAll('[data-gsap]').forEach(el => {
  const type = el.dataset.gsap;
  const delay = parseFloat(el.dataset.delay || 0);

  // Set initial hidden state
  const initProps = { opacity: 0 };
  if (type === 'fade-up')    { initProps.y = 32; }
  if (type === 'fade-right') { initProps.x = -32; }
  if (type === 'fade-left')  { initProps.x = 32; }
  gsap.set(el, initProps);

  // Animate to visible
  const toProps = { opacity: 1, x: 0, y: 0, duration: 0.75, delay, ease: 'power3.out' };

  const inHero = el.closest('.hero');
  if (inHero) {
    gsap.to(el, toProps);
  } else {
    gsap.to(el, {
      ...toProps,
      scrollTrigger: {
        trigger: el,
        start: 'top 88%',
        toggleActions: 'play none none none',
      },
    });
  }
});
