import { toast } from "../../scripts/toast.js";

const baseURL = "http://localhost:3333/";

export let globalToken = "";

const eventLogin = () => {
    const form = document.querySelector('form');

    const elements = [...form.elements];

    form.addEventListener("submit", async (e) => {
        e.preventDefault();
        const body = {};
        elements.forEach((elem) => {
            if (elem.tagName == "INPUT" && elem.value !== ""){
                body[elem.id] = elem.value
            };
        });
        await login(body);
    });
};

eventLogin();

function loginAnimationStart(){
    const button = document.querySelector('.btn-login');
    button.innerHTML = '';
    const img = document.createElement('img');
    img.setAttribute('src', '../../assets/spinner.svg');
    img.setAttribute('alt', "spinner");
    img.classList.add('loading');
    button.appendChild(img);
}

function loginAnimationStop(){
    const button = document.querySelector('.btn-login');
    button.innerHTML = '';
    button.classList = "btn-1 mrg_bt btn-login";
    button.innerText = "Acessar";
};

function goToRegister(){
    const register = document.querySelector('.back-to-cadastro');
    register.addEventListener('click', () => {
        window.location.replace('../cadastro/index.html');
    })
}

goToRegister();

async function login(body){
    const wrongPassword = document.querySelector('.wrong-password');
    try {
        loginAnimationStart();
        const request = await fetch(`${baseURL}login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
        });
        if (request.ok == false){
            throw new Error("Algo deu errado!")
        }else{
            const response = await request.json();
            const userToken = JSON.stringify(response);
            localStorage.setItem("userToken", userToken);
            setTimeout(() => {
                window.location.replace("../../pages/home/index.html");
            }, 2000);
            return response;
        }
    }catch(err){
        toast("notAcount")
        wrongPassword.classList.remove('hide-wrong-password');
        wrongPassword.classList.add('show-wrong-password');
        loginAnimationStop();
    };
};







