import { postDeletedModal, userSuccessModal, userNotFoundModal, alreadyModal } from "./modal.js";

export const toast = (title) => {
    const body = document.querySelector('body');

    const container = document.createElement('div');
    container.classList.add('toast-container');

    if (title == "acount"){
        container.appendChild(userSuccessModal());
    }
    if (title == "notAcount"){
        container.appendChild(userNotFoundModal());
    }
    if (title == "already"){
        container.appendChild(alreadyModal());
    }
    if (title == "post"){
        container.appendChild(postDeletedModal());
    }

    body.appendChild(container);

}