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
        let count = 0;
        response.forEach(r => {
            count += r.stargazers_count;
        })
        return count;
    }

}