const header = document.querySelector('.site-header');
const button = document.querySelector('.menu-button');

button.addEventListener('click', () => {
  const open = header.classList.toggle('open');
  button.setAttribute('aria-expanded', String(open));
});

document.querySelectorAll('nav a').forEach(link => link.addEventListener('click', () => {
  header.classList.remove('open');
  button.setAttribute('aria-expanded', 'false');
}));

const navLinks = [...document.querySelectorAll('nav a[href^="#"]')];
const observedSections = navLinks
  .map(link => document.querySelector(link.getAttribute('href')))
  .filter(Boolean);

const setActiveLink = id => {
  navLinks.forEach(link => {
    const isActive = link.getAttribute('href') === `#${id}`;
    link.classList.toggle('active', isActive);
    if (isActive) link.setAttribute('aria-current', 'page');
    else link.removeAttribute('aria-current');
  });
};

const sectionObserver = new IntersectionObserver(entries => {
  const visible = entries
    .filter(entry => entry.isIntersecting)
    .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
  if (visible) setActiveLink(visible.target.id);
}, { rootMargin: '-20% 0px -55% 0px', threshold: [0, .1, .25, .5] });

observedSections.forEach(section => sectionObserver.observe(section));
navLinks.forEach(link => link.addEventListener('click', () => {
  const id = link.getAttribute('href').slice(1);
  setActiveLink(id);
  if (id === 'top') window.scrollTo({ top: 0, behavior: 'smooth' });
}));
