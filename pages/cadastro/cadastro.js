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
        console.log(err);
    };
};











