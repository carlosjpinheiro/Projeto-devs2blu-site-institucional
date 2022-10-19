//script por Carlos J. Pinheiro

const cadastroButton = document.querySelector('.cadastroButton');
const cadastroForm = document.querySelector('#cadastroForm');
const loginForm = document.querySelector('#loginForm');
const loginButton = document.querySelector('.loginButton');
const callLogin = document.querySelector('#callLogin');
const logoutButton = document.querySelector('#callLogout');

//funcao de cadastro no modal, guarda dados de acesso no sessionStorage
cadastroButton.addEventListener('click', () => {
    let dados = (sessionStorage.USUARIOS) ? JSON.parse(sessionStorage.USUARIOS) : [];

    let emailCadastro = document.querySelector('#emailCadastro').value;
    let passwordCadastro = document.querySelector('#passwordCadastro').value;
    let nomeCadastro = document.querySelector('#nomeCadastro').value;

    let usuario = {
        "nome": nomeCadastro,
        "email": emailCadastro,
        "password": hashed(passwordCadastro)
    }
    dados.push(usuario)
    sessionStorage.setItem('USUARIOS', JSON.stringify(dados));

    cadastroForm.reset();
})

//funcao de login no sistema

loginButton.addEventListener('click', () => {
    let emailLogin = document.querySelector('#emailLogin').value;
    let passwordLogin = document.querySelector('#passwordLogin').value
    let dados = (sessionStorage.USUARIOS) ? JSON.parse(sessionStorage.USUARIOS) : [];
    let temAcesso = 0;

    for (const i in dados) {
        if (emailLogin === dados[i].email) {
            if (dados[i].password === hashed(passwordLogin)) {
                document.cookie = "logged=true";
                injectContent();
                temAcesso = 1;
                break
            } else {
                alert('Erro nas credenciais de acesso.')
                temAcesso = 1;
                break
            }
        } 
    }
    if (temAcesso == 0) {alert('Erro nas credenciais de acesso.')}

    loginForm.reset()
})

//funcao que alterna entre botao de login e logout

function trocaBotao(estado) {
    if (estado == 'logout') {
        let button = document.createElement('button');
        button.setAttribute("type", "button");
        button.setAttribute("class", "btn btn-primary");
        button.setAttribute("id", "callLogout");
        button.innerHTML = 'Logout';
        callLogin.parentNode.replaceChild(button, callLogin)
        button.addEventListener('click', () => {
            document.cookie = "logged=false";
            injectContent()
        })
    } else {
        let button = document.querySelector('#callLogout');
        button.parentNode.replaceChild(callLogin, button);
    }
}

//funcao para gerar um hash basico da senha (nao seguro, apenas para demonstração)

let hashed = function (string) {
    let hash = 0;
    let i;
    let chr;
    if (string.length === 0) return hash;
    for (i = 0; i < string.length; i++) {
        chr = string.charCodeAt(i);
        hash = (hash * 31) + chr;
        hash |= 0; // Converte para integer de 32bit
    }
    return hash.toString(16);
}