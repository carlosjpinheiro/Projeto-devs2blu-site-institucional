async function injectContent() {
  let url = location.href;
  file = url.split('=');
  let view = file[1] ? file[1] : 'inicio';
  if (view == 'usuario') {
    injectRestrita();
  } else {
    const resp = await fetch(`views/${view}.html`);
    const html = await resp.text();
    let inject = document.getElementById('content');
    inject.innerHTML = html;
  }
  let cookie = document.cookie;
  if(cookie == 'logged=true') {
    trocaBotao('logout');
  } else {
    trocaBotao('login');
  }
}

async function injectRestrita() {
  let cookie = document.cookie;
  if(cookie == 'logged=true') {
    const resp = await fetch(`views/usuario.html`);
    const html = await resp.text();
    let inject = document.getElementById('content');
    inject.innerHTML = html;
  } else{
    let div = document.createElement('div');
    div.classList = 'fs-3 fw-bold text-dark position-absolute top-50 start-50 translate-middle';
    div.innerText = 'Realize o login para acessar a área restrita';
    let inject = document.getElementById('content');
    inject.innerHTML = '';
    inject.appendChild(div);
  }
}

injectContent();

ScrollReveal().reveal('#particles-js');
