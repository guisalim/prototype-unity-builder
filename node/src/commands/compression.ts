import { promisify } from 'util'
import { exec } from "child_process";
import { existsSync } from 'fs';
import path from 'path';
const execute = promisify(exec);

export const compressBuildAsTarGz = async (buildPath: string): Promise<string> => {
    if (!existsSync(buildPath)) {
        throw new Error(`Unity Editor could not be found on ${buildPath}`);
    }

    const tarFilename = `build.tar.gz`;
    await execute(`rm -f ${tarFilename} && tar -czvf ${tarFilename} ${buildPath}`);
    return path.join(path.resolve(), tarFilename);
}