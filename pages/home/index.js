import { dinamicModal, showPostModal, editPostModal, createPostModal, deletePostModal, postDeletedModal } from "../../scripts/modal.js";
import { showPost } from "../../scripts/render.js";
import { posts, user } from "../../scripts/database.js";

export const baseURL = "http://localhost:3333/";

export let userInSession = "";

await getTokenFromLocalStorage();

const ulPosts = document.querySelector('.ul__posts');

export async function showPosts(){
    // const arrayPosts = await getPostsOnAPI();
    // arrayPosts.forEach(post => {
    posts.forEach(post => {
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
                Authorization: `Bearer ${token}`,
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

await getUserDataOnAPI();

const verifyPermission = () => {
    if (globalToken == ""){
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
            Authorization: `Bearer ${token}`,
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
            Authorization: `Bearer ${token}`,
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
            Authorization: `Bearer ${token}`,
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
            Authorization: `Bearer ${token}`,
        },
    })
    .then((response) => response.json())
    .then((responseJson) => responseJson)
    .catch((error) => error);

    return response;
};













