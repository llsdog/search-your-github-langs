import { GithubMsgController } from "/res/js/GithubMsgController.js"

// Get Username activities
async function getUserActivities(username) {
    try {
        //API交互并序列化
        const apiReposResponse = await fetch(`https://api.github.com/users/${username}/repos`, {headers: {'Accept': 'application/vnd.github.v3+json'}});
        const apiResponse = await fetch(`https://api.github.com/users/${username}`, {headers: {'Accept': 'application/vnd.github.v3+json'}});
        const reposResponse = await apiReposResponse.json();
        const response = await apiResponse.json()

        //创建对象
        const formatResponse = new GithubMsgController(username, response, reposResponse);

        //语言名 : 使用次数 字典创建和排序
        const langs = {};
        formatResponse.apiRepoResponse.forEach(repo => {
            const lang = repo.language;
            if (lang) {
                langs[lang] = (langs[lang] || 0) + 1;
            }
        });

        //A magic algorithm
        return Object.entries(langs).sort((a, b) => b[1] - a[1]);
    } catch (e) {
        console.log(e);
    }
}

//form action
document.getElementById('search-form').addEventListener('submit', async function (event) {
    event.preventDefault();

    const username = this.querySelector('input').value;
    if (!username) return;

    const rankDir = document.getElementById('rank');
    rankDir.innerHTML = '';

    try {
        const sortedLangs = await getUserActivities(username);
        sortedLangs.forEach(([lang, count]) => {
            rankDir.insertAdjacentHTML('beforeend',
                `<div class="bg-white m-2 p-1">
                    <span>${username} 的所有存储库中主要使用了 ${count} 次 ${lang}</span>
                </div>`
            );
        });
    } catch (e) {
        console.error(e);
    }
})





