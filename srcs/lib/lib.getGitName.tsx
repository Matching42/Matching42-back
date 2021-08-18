import axios from 'axios';

const getGitName: (gitLink: string[]) => Promise<string> = async (gitLink) => {
    const gitRepoName = gitLink[gitLink.length - 1];
    try {
        await axios({
            method: 'get',
            url: `https://api.github.com/repos/${process.env.ORG_NAME}/${gitRepoName}`,
            headers: {
                Accept: 'application/vnd.github.v3+json',
                Authorization: `token ${process.env.GIT_TOKEN}`,
            },
        });
        return gitRepoName;
    } catch (e) {
        throw new Error(`team repository : ${gitRepoName} does not exist in github`);
    }
};

export default getGitName;
