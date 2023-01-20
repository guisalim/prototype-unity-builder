import { moveFilesToPath } from './build';
import { compressBuildAsTarGz } from './compression';
import { injectCsScript } from './cSharp';
import { getUnityEditorPath, runBuildingUnityApp } from './editor';
import { cloneRepoToPath, getRepoBasename } from './gitRepository';
import { clearPath, getTmpBuildFolder, getOutputDirectory } from './path';
import chalk from 'chalk';

export interface IBuildUnity {
    buildDevice: string;
    env: string;
    git: string;
    outputpath: string;
    unityVersion: string;
}

export default async ({ buildDevice, env, outputpath, unityVersion, git }: IBuildUnity, throwHelperFunction: any) => {
    try {
        // 1. Get Unity Hub's path for the unity version
        const unityEditorPath = getUnityEditorPath(unityVersion, env);

        // 2. Clone Repository locally
        const repoPath = await cloneRepoToPath(git);

        // 3. Get basename of the project on github (based on the URL)
        const gitProjectName = getRepoBasename(git);

        // 4. Inject C# Script into the project (Assets/Editor/**CustomBuilderScripts**)
        await injectCsScript(repoPath);

        // 5. Ensure a clean build folder
        const buildFolderName = 'build/';
        const buildPath = await getTmpBuildFolder(`./${buildFolderName}`);

        // 6. Run Build process
        const logFilePath = `./logs.txt`;
        await runBuildingUnityApp(unityEditorPath, buildDevice, repoPath, logFilePath, buildPath);

        // 7. Compress the generated build
        const compressedFilePath = await compressBuildAsTarGz(buildFolderName);

        // 8. Remove build folder and repository once compressed build is already completed
        await clearPath(buildPath);
        await clearPath(repoPath);

        // 9. Move Artifacts (Logs and *.tar.gz) to the output folder
        const outputDir = `${getOutputDirectory(outputpath)}/${gitProjectName}`;
        await moveFilesToPath([compressedFilePath, logFilePath], outputDir);

        // 10. CLI output
        console.log(chalk.green.bold(`Unity Application successfully built!`));
        console.log(chalk.green(`Directory: ${outputDir}`));
    } catch (error: any) {
        throwHelperFunction();
        throw error;
    }

}