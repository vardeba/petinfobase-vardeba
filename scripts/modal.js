const body = document.querySelector('body');

const baseURL = "http://localhost:3333/";

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

    divModalContainer.append(closeModalButton, content);
    backgroudContainer.appendChild(divModalContainer);
    body.appendChild(backgroudContainer)
}

export function showPostModal(post){
    let date =  new Date(post.createdAt);

    const liPost = document.createElement('li');
    liPost.classList.add('li__post');

    const sectionPostHeader = document.createElement('section');
    sectionPostHeader.classList.add('section__post__header');

    const divPostHeaderUser = document.createElement('div');
    divPostHeaderUser.classList.add('post__header__user');

    const figurePostHeader = document.createElement('figure');
    figurePostHeader.classList.add('div__post__header_figure');

    const imgPostUser = document.createElement('img');
    imgPostUser.classList.add('img_user');
    imgPostUser.setAttribute('src', `${post.user.avatar}`);
    imgPostUser.setAttribute('alt', `${post.user.username}`);

    const h3PostUserName = document.createElement('h3');
    h3PostUserName.classList.add('div__post__header__username');
    h3PostUserName.innerText = `${post.user.username}`;

    const spanPostSeparator = document.createElement('span');
    spanPostSeparator.classList.add('divisor');
    spanPostSeparator.innerText = '|';

    const spanPostDate = document.createElement('span');
    spanPostDate.classList.add('div__post__header__date');
    spanPostDate.innerText = `${new Intl.DateTimeFormat('pt-BR', { month: 'long', year: 'numeric'} ).format(date)}`;

    const articlePost = document.createElement('article');
    articlePost.classList.add('div__post__article');

    const articlePostTitle = document.createElement('h2');
    articlePostTitle.classList.add('div__post__article__title');
    articlePostTitle.innerText = `${post.title}`;

    const pPostText = document.createElement('p');
    pPostText.classList.add('div__post__article__p-modal');
    pPostText.innerText = `${post.content}`;

    articlePost.append(articlePostTitle, pPostText);
    figurePostHeader.appendChild(imgPostUser);
    divPostHeaderUser.append(figurePostHeader, h3PostUserName, spanPostSeparator, spanPostDate);
    sectionPostHeader.appendChild(divPostHeaderUser);
    liPost.append(sectionPostHeader, articlePost);

    return liPost;
}

export function editPostModal(post){
    const divEditPost = document.createElement('div');
    divEditPost.classList.add('edit-post-modal');
    divEditPost.setAttribute('id', `${post.id}`);

    const h2EditPostTitle = document.createElement('h2');
    h2EditPostTitle.classList.add('edit-post-modal-title');
    h2EditPostTitle.innerText = 'Edição';

    const formEditPost = document.createElement('form');
    formEditPost.classList.add('form-edit');

    const labelEditPostTitle = document.createElement('label');
    labelEditPostTitle.classList.add('label-modal-edit');
    labelEditPostTitle.setAttribute('for', 'textarea-post-title');
    labelEditPostTitle.innerText = 'Tìtulo to post';

    const textareaEditPostTitle = document.createElement('textarea');
    textareaEditPostTitle.classList.add('textarea-post-title');
    textareaEditPostTitle.setAttribute('name', "textarea-post-title");
    textareaEditPostTitle.setAttribute('id', "title");
    textareaEditPostTitle.setAttribute('cols', "100");
    textareaEditPostTitle.setAttribute('rows', "1");
    textareaEditPostTitle.innerText = `${post.title}`;

    const labelEditPostContent = document.createElement('label');
    labelEditPostContent.classList.add('label-modal-edit');
    labelEditPostContent.setAttribute('for', 'textarea-post-content')
    labelEditPostContent.innerText = 'Conteúdo do post';

    const textareaEditPostContent = document.createElement('textarea');
    textareaEditPostContent.classList.add("textarea-post-content");
    textareaEditPostContent.setAttribute('name', "textarea-post-content");
    textareaEditPostContent.setAttribute('id', "content");
    textareaEditPostContent.setAttribute('cols', "100");
    textareaEditPostContent.setAttribute('rows', "15");
    textareaEditPostContent.innerText = `${post.content}`;

    const divEditPostButtons = document.createElement('div');
    divEditPostButtons.classList.add('edit-form-buttons');

    const buttonEditPostCancel = document.createElement('button');
    buttonEditPostCancel.classList = 'btn-4 cancel-button';
    buttonEditPostCancel.innerText = 'Cancelar';
    buttonEditPostCancel.addEventListener('click', (event) => {
        event.preventDefault();
        const backgroudContainer = document.querySelector('.backgroundModal');
        backgroudContainer.remove();
    })

    const buttonEditPostSave = document.createElement('button');
    buttonEditPostSave.classList = 'btn-1 save-button';
    buttonEditPostSave.setAttribute('id', `${post.id}`);
    buttonEditPostSave.setAttribute('type', 'submit');
    buttonEditPostSave.innerText = 'Salvar Alterações';
    buttonEditPostSave.addEventListener('click', (event) => {
        const idPost = document.querySelector('.edit-post-modal')
        console.log(idPost);
        const form = document.querySelector('.form-edit');
        const elements = [...form.elements];
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            const body = {};
            elements.forEach((elem) => {
                if (elem.tagName == "TEXTAREA" && elem.value !== ""){
                    body[elem.id] = elem.value;
                };
            });
            console.log(body);
            await updatePostOnAPI(body, idPost.id);
            window.location.replace('./index.html')
        });
    })

    divEditPostButtons.append(buttonEditPostCancel, buttonEditPostSave);
    formEditPost.append(labelEditPostTitle, textareaEditPostTitle, labelEditPostContent, textareaEditPostContent, divEditPostButtons);
    divEditPost.append(h2EditPostTitle, formEditPost);

    return divEditPost;
}

export function createPostModal(){
    const ulPosts = document.querySelector('.ul__posts');

    const divCreatePost = document.createElement('div');
    divCreatePost.classList.add('edit-post-modal');

    const h2CreatePostTitle = document.createElement('h2');
    h2CreatePostTitle.classList.add('edit-post-modal-title');
    h2CreatePostTitle.innerText = 'Criando novo post';

    const formCreatePost = document.createElement('form');
    formCreatePost.classList.add('form-post');

    const labelCreatePostTitle = document.createElement('label');
    labelCreatePostTitle.classList.add('label-modal-edit');
    labelCreatePostTitle.setAttribute('for', 'textarea-post-title');
    labelCreatePostTitle.innerText = 'Tìtulo to post';

    const textareaCreatePostTitle = document.createElement('textarea');
    textareaCreatePostTitle.classList.add("textarea-post-title");
    textareaCreatePostTitle.setAttribute('name', "textarea-post-title");
    textareaCreatePostTitle.setAttribute('id', "title");
    textareaCreatePostTitle.setAttribute('cols', "100");
    textareaCreatePostTitle.setAttribute('rows', "1");

    const labelCreatePostContent = document.createElement('label');
    labelCreatePostContent.classList.add('label-modal-edit');
    labelCreatePostContent.setAttribute('for', 'textarea-post-content')
    labelCreatePostContent.innerText = 'Conteúdo do post';

    const textareaCreatePostContent = document.createElement('textarea');
    textareaCreatePostContent.classList.add("textarea-post-content");
    textareaCreatePostContent.setAttribute('name', "textarea-post-content");
    textareaCreatePostContent.setAttribute('id', "content");
    textareaCreatePostContent.setAttribute('cols', "100");
    textareaCreatePostContent.setAttribute('rows', "15");

    const divCreatePostButtons = document.createElement('div');
    divCreatePostButtons.classList.add('edit-form-buttons');

    const buttonCreatePostCancel = document.createElement('button');
    buttonCreatePostCancel.classList = 'btn-4 cancel-button';
    buttonCreatePostCancel.innerText = 'Cancelar';
    buttonCreatePostCancel.addEventListener('click', (event) => {
        event.preventDefault();
        const backgroudContainer = document.querySelector('.backgroundModal');
        backgroudContainer.remove();
    })

    const buttonCreatePostSave = document.createElement('button');
    buttonCreatePostSave.classList = 'btn-1 save-button';
    buttonCreatePostSave.setAttribute('type', "submit");
    buttonCreatePostSave.innerText = 'Criar Post';
    buttonCreatePostSave.addEventListener('click', (event) => {
        // event.preventDefault();
        const form = document.querySelector('.form-post');
        const elements = [...form.elements];
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            const body = {};
            elements.forEach((elem) => {
                if (elem.tagName == "TEXTAREA" && elem.value !== ""){
                    body[elem.id] = elem.value;
                };
            });
            await createPostOnAPI(body);
            window.location.replace('./index.html')
        });
    });

    divCreatePostButtons.append(buttonCreatePostCancel, buttonCreatePostSave);
    formCreatePost.append(labelCreatePostTitle, textareaCreatePostTitle, labelCreatePostContent, textareaCreatePostContent, divCreatePostButtons);
    divCreatePost.append(h2CreatePostTitle, formCreatePost);

    return divCreatePost;
}

export function deletePostModal(post){
    const divDeletePostModal = document.createElement('div');
    divDeletePostModal.classList.add('delete-post-modal');
    divDeletePostModal.setAttribute('id', `${post.id}`);

    const h2DeletePostModalTitle = document.createElement('h2');
    h2DeletePostModalTitle.classList.add('delete-post-modal-title');
    h2DeletePostModalTitle.innerText = "Confirmação de exclusão";

    const h1DeletePostModalAlert = document.createElement('h1');
    h1DeletePostModalAlert.classList.add('delete-post-modal-alert');
    h1DeletePostModalAlert.innerText = "Tem certeza que deseja excluir esse post";

    const pDeletePostModalAtention = document.createElement('p');
    pDeletePostModalAtention.classList.add('delete-post-modal-atention');
    pDeletePostModalAtention.innerText = "Essa ação não poderá ser desfeita, então pedimos que tenha cautela antes de concluir";

    const divDeletePostModalButtons = document.createElement('div');
    divDeletePostModalButtons.classList.add('delete-buttons');

    const buttonDeletePostModalCancel = document.createElement('button');
    buttonDeletePostModalCancel.classList = "btn-4 cancel-button";
    buttonDeletePostModalCancel.innerText = "Cancelar";
    buttonDeletePostModalCancel.addEventListener('click', (event) => {
        event.preventDefault();
        const backgroudContainer = document.querySelector('.backgroundModal');
        backgroudContainer.remove();
    })

    const buttonDeletePostModalDelete = document.createElement('button');
    buttonDeletePostModalDelete.classList = "btn-6 delete-button";
    buttonDeletePostModalDelete.setAttribute('id', `${post.id}`);
    buttonDeletePostModalDelete.innerText = "Sim, excluir este post";
    buttonDeletePostModalDelete.addEventListener('click', (event) => {
        event.preventDefault();
    });

    divDeletePostModalButtons.append(buttonDeletePostModalCancel, buttonDeletePostModalDelete);
    divDeletePostModal.append(h2DeletePostModalTitle, h1DeletePostModalAlert, pDeletePostModalAtention, divDeletePostModalButtons);

    return divDeletePostModal;
}

export function userSuccessModal(){
    const divSuccessModal = document.createElement('div');
    divSuccessModal.classList.add('successModal');

    const divHeaderSuccessModal = document.createElement('div');
    divHeaderSuccessModal.classList.add('headerSuccessModal');

    const imgHeaderSuccessModal = document.createElement('img');
    imgHeaderSuccessModal.setAttribute('src', "../../assets/success.svg");
    imgHeaderSuccessModal.setAttribute('alt', "Conta criada com sucesso");


    const pAcountCreatedSuccessModal = document.createElement('div');
    pAcountCreatedSuccessModal.classList.add('acountCreated');
    pAcountCreatedSuccessModal.innerText = "Sua conta foi criada com sucesso!";

    const pRedirectMessageSuccessModal = document.createElement('div');
    pRedirectMessageSuccessModal.classList.add('redirectMessage');
    pRedirectMessageSuccessModal.innerHTML = `Agora você pode acessar os conteúdos utilizando seu usuário e senha na página de login: <a href="../login/index.html">Acessar página de login</a>`;

    divHeaderSuccessModal.append(imgHeaderSuccessModal, pAcountCreatedSuccessModal);
    divSuccessModal.append(divHeaderSuccessModal, pRedirectMessageSuccessModal);

    return divSuccessModal;
}

export function postDeletedModal(){
    const divDeleteSuccessModal = document.createElement('div');
    divDeleteSuccessModal.classList.add('deleteSuccessModal');

    const divHeaderDeleteSuccessModal = document.createElement('div');
    divHeaderDeleteSuccessModal.classList.add('headerDeleteSuccessModal');

    const imgHeaderDeleteSuccessModal = document.createElement('img');
    imgHeaderDeleteSuccessModal.setAttribute('src', "../../assets/success.svg");
    imgHeaderDeleteSuccessModal.setAttribute('alt', "Post deletado com sucesso!");


    const pDeletePostSuccessModal = document.createElement('div');
    pDeletePostSuccessModal.classList.add('acountCreated');
    pDeletePostSuccessModal.innerText = "Post deletado com sucesso!";

    const pDeletedPostMessageSuccessModal = document.createElement('div');
    pDeletedPostMessageSuccessModal.classList.add('redirectMessage');
    pDeletedPostMessageSuccessModal.innerText = "O post selecionado para exclusão foi deletado, a partir de agora não aparecerá no seu feed";

    divHeaderDeleteSuccessModal.append(imgHeaderDeleteSuccessModal, pDeletePostSuccessModal);
    divDeleteSuccessModal.append(divHeaderDeleteSuccessModal, pDeletedPostMessageSuccessModal);

    return divDeleteSuccessModal;
}

export function userNotFoundModal(){
    const divUserNotFoundModal = document.createElement('div');
    divUserNotFoundModal.classList.add('successModal');

    const divHeaderUserNotFoundModal = document.createElement('div');
    divHeaderUserNotFoundModal.classList.add('headerSuccessModal');

    const imgHeaderUserNotFoundModal = document.createElement('img');
    imgHeaderUserNotFoundModal.setAttribute('src', "../../assets/errorIcon.png");
    imgHeaderUserNotFoundModal.setAttribute('alt', "Erro!");


    const pUserNotFoundModal = document.createElement('div');
    pUserNotFoundModal.classList.add('acountNotFound');
    pUserNotFoundModal.innerText = "Usuário não encontrado";

    const pRedirectMessageUserNotFoundModal = document.createElement('div');
    pRedirectMessageUserNotFoundModal.classList.add('redirectMessage');
    pRedirectMessageUserNotFoundModal.innerHTML = `Verifique se digitou o usuário e senha corretamente. Caso não ainda não seja registrado: <a href="../cadastro/index.html">Acessar página de cadastro</a>`;

    divHeaderUserNotFoundModal.append(imgHeaderUserNotFoundModal, pUserNotFoundModal);
    divUserNotFoundModal.append(divHeaderUserNotFoundModal, pRedirectMessageUserNotFoundModal);

    return divUserNotFoundModal;
}

export function alreadyModal(){
    const divAlreadyModal = document.createElement('div');
    divAlreadyModal.classList.add('deleteSuccessModal');

    const divHeaderAlreadyModal = document.createElement('div');
    divHeaderAlreadyModal.classList.add('headerDeleteSuccessModal');

    const imgHeaderAlreadyModal = document.createElement('img');
    imgHeaderAlreadyModal.setAttribute('src', "../../assets/errorIcon.png");
    imgHeaderAlreadyModal.setAttribute('alt', "Usuário já Existe");


    const pTitleAlreadyModal = document.createElement('div');
    pTitleAlreadyModal.classList.add('acountCreated');
    pTitleAlreadyModal.innerText = "Algo deu errado!";

    const pAlreadyModal = document.createElement('div');
    pAlreadyModal.classList.add('redirectMessage');
    pAlreadyModal.innerText = "Talvez já exista um usuário com os dados informados! Verifique os dados e tente novamente.";

    divHeaderAlreadyModal.append(imgHeaderAlreadyModal, pTitleAlreadyModal);
    divAlreadyModal.append(divHeaderAlreadyModal, pAlreadyModal);

    return divAlreadyModal;
}



async function getTokenFromLocalStorage(){
    const localStorageTokenJSON = localStorage.getItem('userToken');
    if (localStorageTokenJSON){
        const localStorageData = JSON.parse(localStorageTokenJSON);
        return localStorageData;
    };
}



async function createPostOnAPI(data){
    const token = await getTokenFromLocalStorage();
    const response = await fetch(`${baseURL}posts/create`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token.token}`,
        },
        body: JSON.stringify(data),
    })
    .then((response) => response.json())
    .then((responseJson) => responseJson)
    .catch((error) => error);
    return response;
};

async function updatePostOnAPI(data, postId){
    const token = await getTokenFromLocalStorage();
    const response = await fetch(`${baseURL}posts/${postId}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token.token}`,
        },
        body: JSON.stringify(data),
    })
    .then((response) => response.json())
    .then((responseJson) => responseJson)
    .catch((error) => error);
    return response;
};
















