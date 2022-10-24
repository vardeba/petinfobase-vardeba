import { userSuccessModal } from "../../scripts/modal.js";
import { toast } from "../../scripts/toast.js";

const baseURL = "http://localhost:3333/";

const eventRegister = () => {
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
        await createUser(body);
    });
};

eventRegister();

async function createUser(body){
    try{
        loginAnimationStart();
        const request = await fetch(`${baseURL}users/create`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
        });
        if (request.ok == false){
            throw new Error("Algo deu errado!")
        }else{
            toast("acount");
            setTimeout(() => {
                window.location.replace("../../pages/login/index.html");
            }, 4000);
        }
    }catch(err){
        toast("already");
        loginAnimationStop();
        console.log(err);
    };
};

function loginAnimationStart(){
    const button = document.querySelector('.btn-register');
    button.innerHTML = '';
    const img = document.createElement('img');
    img.setAttribute('src', '../../assets/spinner.svg');
    img.setAttribute('alt', "spinner");
    img.classList.add('loading');
    button.appendChild(img);
}

function loginAnimationStop(){
    const button = document.querySelector('.btn-register');
    button.innerHTML = '';
    button.classList = "btn-1 btn-register";
    button.innerText = "Cadastrar";
};

function goToLogin(){
    const backToLogin = document.querySelectorAll('.back-to-login');
    backToLogin.forEach((btn) => {
        btn.addEventListener('click', () => {
            window.location.replace('../login/index.html');
        })
    })
}

goToLogin();









