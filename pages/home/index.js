import { dinamicModal, showPostModal, editPostModal, createPostModal, deletePostModal, postDeletedModal } from "../../scripts/modal.js";
import { showPost } from "../../scripts/render.js";
import { posts, user } from "../../scripts/database.js";

export const baseURL = "http://localhost:3333/";

export let userInSession = "";

const ulPosts = document.querySelector('.ul__posts');

const header = document.querySelector('.header__header');

await getUserDataOnAPI();

showUserTag(userInSession);

function showUserTag(user){
    let userToshow = createUserTag(user);
    header.insertAdjacentElement('beforeend', userToshow);
}

function createUserTag(user){
    const nav = document.createElement('nav');
    nav.classList.add ('header__nav');

    const button = document.createElement('button');
    button.classList = "create-post-modal header__nav__button btn-1";
    button.innerText = "Criar publicação";

    const div1 = document.createElement('div');
    div1.classList.add('header__nav__div');

    const figure = document.createElement('figure');
    figure.classList.add('header__nav__div__figure');

    const img = document.createElement('img');
    img.classList.add('img__username');
    img.setAttribute('src', `${user.avatar}`);
    img.setAttribute('alt', `Foto de ${user.username}`);

    const div2 = document.createElement('div');
    div2.classList.add('header__div__username__sign-out');

    const div3 = document.createElement('div');
    div3.classList.add('div__header__username')

    const username = document.createElement('span');
    username.classList.add('span__header__username');
    username.innerText = `@${user.username}`;

    const div4 = document.createElement('div');
    div4.classList.add('div__header__sign-out');

    const logout = document.createElement('span');
    logout.classList.add('sign-out');
    logout.innerText = "Sair da conta"
    div4.addEventListener('click', () => {
        localStorage.clear();
        verifyPermission();
    })

    div4.appendChild(logout);
    div3.appendChild(username);
    div2.append(div3, div4);
    figure.appendChild(img);
    div1.append(figure, div2);
    nav.append(button, div1);

    return nav;
}

export async function showPosts(){
    const arrayPosts = await getPostsOnAPI();
    arrayPosts.forEach(post => {
        let newPost = showPost(post);
        ulPosts.appendChild(newPost);
    });
}

showPosts();

export async function createPost(){
    const createPostButton = document.querySelector('.create-post-modal');
    createPostButton.addEventListener('click', () => {
        dinamicModal(createPostModal());
    })
}

createPost();

async function getTokenFromLocalStorage(){
    const localStorageTokenJSON = localStorage.getItem('userToken');
    if (localStorageTokenJSON){
        const localStorageData = JSON.parse(localStorageTokenJSON);
        return localStorageData;
    };
}

async function getUserDataOnAPI(){
    const token = await getTokenFromLocalStorage();
    try{
        const user = await fetch(`${baseURL}users/profile`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token.token}`,
            },
        });
        if (user.ok == false){
            throw new Error('Algo deu errado!');
        }else{
            const response = await user.json();
            userInSession = await response;
            console.log(userInSession);
        };
    }catch(err){
        console.log(err);
    };
};

const verifyPermission = async () => {
    const tokenLocalSorage = await getTokenFromLocalStorage();
    if (!tokenLocalSorage){
        window.location.replace("../login/index.html");
    };
};

verifyPermission();

export async function getPostsOnAPI(){
    const token = await getTokenFromLocalStorage();
    const posts = await fetch(`${baseURL}posts`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token.token}`,
        },
    })
    .then((response) => response.json())
    .then((responseJson) => responseJson)
    .catch((error) => error);

    return posts;
};

export async function createPostOnAPI(data){
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

export async function updatePostOnAPI(data, postId){
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

export async function deletePostOnAPI(postId){
    const token = await getTokenFromLocalStorage();
    const response = await fetch(`${baseURL}posts/${postId}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token.token}`,
        },
    })
    .then((response) => response.json())
    .then((responseJson) => responseJson)
    .catch((error) => error);

    return response;
};






