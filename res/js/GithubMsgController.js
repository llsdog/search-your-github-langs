//Format传入的API数据
export class GithubMsgController {
    constructor(userName, apiResponse, apiRepoResponse) {
        this.userName = userName;
        this.apiResponse = apiResponse; //一级节点username 先把api传回来的数据搞到手😋
        this.apiRepoResponse = apiRepoResponse; //二级节点username/repos

        this.createdTime = this.apiResponse.created_at.slice(0, 10); //格式化时间, 格式: 0000-00-00
        this.publicReposNumber = this.apiResponse.public_repos; //公共仓库数量
        this.starsNumber = this.countStars(this.apiRepoResponse); //总star数
        this.name = this.apiResponse.name; //名称
        this.id = this.apiResponse.id; //id
        this.bio = this.apiResponse.bio; //bio
    }

    //统计公有仓库总Star(我勒个counting stars啊)
    countStars(response) {
        return response.reduce((c, r) => c + (r.stargazers_count || 0), 0);
    }
}

export async function getUserInfo(userName) {
    //API抓信息
    const [userResponse, userReposResponse] = await Promise.all([
        fetch(`https://api.github.com/users/${userName}`, {
            headers: { Accept: 'application/vnd.github.v3+json'},
        }),
        fetch(`https://api.github.com/users/${userName}/repos`, {
            headers: { Accept: 'application/vnd.github.v3+json'},
        }),
    ]);

    if (!userResponse.ok || !userReposResponse.ok) {
        console.log("API交互失败");
    }

    const [userJson, userReposJson] = await Promise.all([
        userResponse.json(),
        userReposResponse.json(),
    ]);

    //创建并返回对象
    return new GithubMsgController(userName, userJson, userReposJson);
}