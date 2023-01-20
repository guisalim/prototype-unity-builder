import { promisify } from 'util'
import { exec } from "child_process"; 
import { existsSync } from 'fs';
const execute = promisify(exec);

export const getUnityEditorPath = (version: string, environment: string): string => {
    let path: string = '';

    switch (environment) {
        case 'linux':
            path = `/Applications/Unity/Hub/Editor/${version}/Unity.app/Contents/Linux/Unity`;
            break;
        case 'mac':
            path = `/Applications/Unity/Hub/Editor/${version}/Unity.app/Contents/MacOS/Unity`;
            break;
        default:
            throw new Error(`Environment ${environment} not available.`);
    }

    if (!existsSync(path)) {
        throw new Error(`Unity Editor could not be found on ${path}`);
    }

    return path;
}

export const runBuildingUnityApp = async (
    unityEditorPath: string,
    buildTarget: string,
    projectPath: string,
    logpath: string,
    outputpath: string,
): Promise<void> => {
    await execute(`${unityEditorPath} \
        -quit -batchmode \
        -buildTarget ${buildTarget} \
        -projectpath ${projectPath} \
        -logFile ${logpath} \
        -executeMethod BuildScript.PerformBuild \
        -outputPath ${outputpath}
    `);
}