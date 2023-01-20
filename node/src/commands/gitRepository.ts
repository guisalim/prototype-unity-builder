import { promisify } from 'util'
import { exec } from "child_process";
import path from 'path';
import url from 'url';
import { clearPath } from './path';

const execute = promisify(exec);

export const cloneRepoToPath = async (git: string): Promise<string> => {
    let pathdir: string = '';
    try {
        const repoName = getRepoBasename(git) ?? 'repository';
        pathdir = path.join(path.resolve(), `./${repoName}`);
        await clearPath(pathdir);
        await execute(`git clone ${git} ${repoName}`);
    } catch (error: any) {
        throw new Error(`Error cloning Repo: ${error.message}`);
    }
    return pathdir;
}

export const getRepoBasename = (git: string): string => {
    try {
        const parsed = url.parse(git);
        return path.parse(parsed.pathname ?? '').name ?? '';
    } catch (error: any) {
        throw new Error(`Error getting Repo basename ${error.message}`);
    }
}
