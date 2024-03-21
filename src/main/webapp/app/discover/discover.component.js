fetch('navbar.component.html')
  .then(response => response.text())
  .then(html => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');
    const nav = doc.querySelector('.navbar');
  })
  .catch(error => console.error('Error fetching content:', error));

function setNavHeight() {
  //const nav = document.querySelector('nav');
  const root = document.querySelector(':root');
  root.style.setProperty('--navHeight', '${nav.clientHeight * 0}px');
}
window.addEventListener('resize', setNavHeight);
window.addEventListener('DOMContentLoaded', setNavHeight);
//this will hopefully make sure the sidebar doesn't overlap with the nav bar but it currently doesn't work
