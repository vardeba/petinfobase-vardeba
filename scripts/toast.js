import { postDeletedModal, userSuccessModal } from "./modal.js";

export const toast = (title) => {
    const body = document.querySelector('body');

    const container = document.createElement('div');
    container.classList.add('toast-container');

    if (title == "acount"){
        container.appendChild(userSuccessModal());
    }else{
        container.appendChild(postDeletedModal());
    }

    body.appendChild(container);

}