import { deletePostModal, dinamicModal, editPostModal, showPostModal } from "./modal.js";
import { userInSession } from "../pages/home/index.js";

export function showPost(post){
    let date =  new Date(post.createdAt);

    const liPost = document.createElement('li');
    liPost.classList.add('li__post');
    liPost.setAttribute('id', `${post.id}`);

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

    const divPostHeaderButtons = document.createElement('div');
    divPostHeaderButtons.classList.add('post__header__buttons');

    const editPostHeaderButton = document.createElement('button');
    editPostHeaderButton.classList = 'btn-2 post__header__editButton openModalEdit';
    editPostHeaderButton.innerText = 'Editar'
    if (userInSession.id != post.user.id){
        editPostHeaderButton.classList.remove('show-btn');
        editPostHeaderButton.classList.add('hide-btn');
    }else{
        editPostHeaderButton.classList.remove('hide-btn');
        editPostHeaderButton.classList.add('show-btn');
    }
    editPostHeaderButton.addEventListener('click', () => {
        dinamicModal(editPostModal(post));
    })

    const deletePostHeaderButton = document.createElement('button');
    deletePostHeaderButton.classList = 'btn-3 post__header__deleteButton openModalDelete';
    deletePostHeaderButton.innerText = 'Excluir';
    if (userInSession.id != post.user.id){
        deletePostHeaderButton.classList.remove('show-btn');
        deletePostHeaderButton.classList.add('hide-btn');
    }else{
        deletePostHeaderButton.classList.remove('hide-btn');
        deletePostHeaderButton.classList.add('show-btn');
    }
    deletePostHeaderButton.addEventListener('click', () => {
        dinamicModal(deletePostModal(post));
    })

    const articlePost = document.createElement('article');
    articlePost.classList.add('div__post__article');

    const articlePostTitle = document.createElement('h2');
    articlePostTitle.classList.add('div__post__article__title');
    articlePostTitle.innerText = `${post.title}`;

    const pPostText = document.createElement('p');
    pPostText.classList.add('div__post__article__p');
    pPostText.innerText = `${post.content}`;

    const spanOpenModal = document.createElement('span');
    spanOpenModal.classList.add('div__post__article__modal')
    spanOpenModal.setAttribute('id', `${post.id}`)
    spanOpenModal.innerText = 'Acessar publicação';
    spanOpenModal.addEventListener('click', () => {
        dinamicModal(showPostModal(post));
    })

    articlePost.append(articlePostTitle, pPostText, spanOpenModal);
    divPostHeaderButtons.append(editPostHeaderButton, deletePostHeaderButton);
    figurePostHeader.appendChild(imgPostUser);
    divPostHeaderUser.append(figurePostHeader, h3PostUserName, spanPostSeparator, spanPostDate);
    sectionPostHeader.append(divPostHeaderUser, divPostHeaderButtons);
    liPost.append(sectionPostHeader, articlePost);

    return liPost;
}






























