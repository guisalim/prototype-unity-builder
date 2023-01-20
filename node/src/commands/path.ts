import { promisify } from 'util'
import { exec } from "child_process";
import path from 'path';


const execute = promisify(exec);

export const clearPath = async (pathdir: string): Promise<void> => {
    if (pathdir === path.resolve()) {
        throw new Error('Cannot delete root folder');
    }
    await execute(`rm -rf ${pathdir}`);
}

export const getTmpBuildFolder = async (buildPath: string): Promise<string> => {
    let tmpPath: string = '';
    if (!buildPath) {
        throw new Error('Cannot delete empty path');
    } else if (path.isAbsolute(buildPath)) {
        tmpPath = buildPath;
    } else {
        tmpPath = path.join(path.resolve(), buildPath);
    }

    await clearPath(tmpPath);
    return tmpPath;
}

export const getOutputDirectory = (outputPath: string): string => path.resolve(outputPath);
