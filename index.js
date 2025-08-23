import { getUserInfo } from "/res/js/GithubMsgController.js"

const btn = document.getElementById('search-button');
const input = document.getElementById('search-input');

btn.addEventListener('click', async() => {
    const formatInfo =await getUserInfo(input.value.trim());
    sessionStorage.setItem('userinfo', JSON.stringify(formatInfo));
    location.href = `/res/html/result.html`;
})




