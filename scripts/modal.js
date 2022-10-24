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

    divModalContainer.append(closeModalButton, content);
    backgroudContainer.appendChild(divModalContainer);
    body.appendChild(backgroudContainer)
}

export function showPostModal(post){
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
    imgPostUser.setAttribute('src', `${post.avatar}`);
    imgPostUser.setAttribute('alt', `${post.user.username}`);

    const h3PostUserName = document.createElement('h3');
    h3PostUserName.classList.add('div__post__header__username');
    h3PostUserName.innerText = `${post.user.username}`;

    const spanPostSeparator = document.createElement('span');
    spanPostSeparator.classList.add('divisor');
    spanPostSeparator.innerText = '|';

    const spanPostDate = document.createElement('span');
    spanPostDate.classList.add('div__post__header__date');
    spanPostDate.innerText = 'Outubro de 2022';

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
    formEditPost.classList.add('form-post');

    const labelEditPostTitle = document.createElement('label');
    labelEditPostTitle.classList.add('label-modal-edit');
    labelEditPostTitle.setAttribute('for', 'textarea-post-title');
    labelEditPostTitle.innerText = 'Tìtulo to post';

    const textareaEditPostTitle = document.createElement('textarea');
    textareaEditPostTitle.setAttribute('name', "textarea-post-title");
    textareaEditPostTitle.setAttribute('id', "textarea-post-title");
    textareaEditPostTitle.setAttribute('cols', "100");
    textareaEditPostTitle.setAttribute('rows', "1");
    textareaEditPostTitle.innerText = `${post.title}`;

    const labelEditPostContent = document.createElement('label');
    labelEditPostContent.classList.add('label-modal-edit');
    labelEditPostContent.setAttribute('for', 'textarea-post-content')
    labelEditPostContent.innerText = 'Conteúdo do post';

    const textareaEditPostContent = document.createElement('textarea');
    textareaEditPostContent.setAttribute('name', "textarea-post-content");
    textareaEditPostContent.setAttribute('id', "textarea-post-content");
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
        event.preventDefault();
    })

    divEditPostButtons.append(buttonEditPostCancel, buttonEditPostSave);
    formEditPost.append(labelEditPostTitle, textareaEditPostTitle, labelEditPostContent, textareaEditPostContent, divEditPostButtons);
    divEditPost.append(h2EditPostTitle, formEditPost);

    return divEditPost;
}

export function createPostModal(){
    const divCreatePost = document.createElement('div');
    divCreatePost.classList.add('edit-post-modal');

    const h2CreatePostTitle = document.createElement('h2');
    h2CreatePostTitle.classList.add('edit-post-modal-title');
    h2CreatePostTitle.innerText = 'Edição';

    const formCreatePost = document.createElement('form');
    formCreatePost.classList.add('form-post');

    const labelCreatePostTitle = document.createElement('label');
    labelCreatePostTitle.classList.add('label-modal-edit');
    labelCreatePostTitle.setAttribute('for', 'textarea-post-title');
    labelCreatePostTitle.innerText = 'Tìtulo to post';

    const textareaCreatePostTitle = document.createElement('textarea');
    textareaCreatePostTitle.setAttribute('name', "textarea-post-title");
    textareaCreatePostTitle.setAttribute('id', "textarea-post-title");
    textareaCreatePostTitle.setAttribute('cols', "100");
    textareaCreatePostTitle.setAttribute('rows', "1");

    const labelCreatePostContent = document.createElement('label');
    labelCreatePostContent.classList.add('label-modal-edit');
    labelCreatePostContent.setAttribute('for', 'textarea-post-content')
    labelCreatePostContent.innerText = 'Conteúdo do post';

    const textareaCreatePostContent = document.createElement('textarea');
    textareaCreatePostContent.setAttribute('name', "textarea-post-content");
    textareaCreatePostContent.setAttribute('id', "textarea-post-content");
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
        event.preventDefault();
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








