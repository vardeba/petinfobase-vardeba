const body = document.querySelector('body');

export function dinamicModal(content){
    const backgroudContainer = document.createElement('section');
    backgroudContainer.classList.add('backgroundModal')

    const divModalContainer = document.createElement('div');
    divModalContainer.classList.add("modalContainer");

    const closeModalButton = document.createElement('button');
    closeModalButton.classList = 'btn-7 closeModal';
    closeModalButton.innerText = "X";

    backgroudContainer.addEventListener('click', (event) => {
        const {className} = event.target;
        if (className === "btn-7 closeModal" || className === "backgroundModal"){
            backgroudContainer.remove();
        }
    });

    divModalContainer.appendChild(closeModalButton);
    divModalContainer.appendChild(content);
    backgroudContainer.appendChild(divModalContainer);
    body.appendChild(backgroudContainer)
}














