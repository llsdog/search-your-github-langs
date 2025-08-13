// Get Username activities
async function getUserActivities(username) {
    try {
        //fetch repos
        const response = await fetch(`https://api.github.com/users/${username}/repos`, {
            headers: {
                'Accept': 'application/vnd.github.v3+json'
            }
        });

        //check response
        if (!response.ok) {
            throw new Error(`视奸失败!Github朝你扔过来了一个${response.status}`);
        }

        //Parse data
        const repos = await response.json();
        const langs = {};

        repos.forEach(repo => {
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





