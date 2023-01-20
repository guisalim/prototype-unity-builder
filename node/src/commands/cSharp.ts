import { existsSync } from 'fs';
import { copy } from 'fs-extra';
import path from 'path';

export const injectCsScript = async (projectPath: string): Promise<string> => {
    const csScriptPath = `${projectPath}/Assets/Editor/CustomBuilderScripts`;

    await copy(path.join(path.resolve(), `./csScripts`), csScriptPath);

    if (!existsSync(csScriptPath)) {
        throw new Error(`C# Script could not be found on ${csScriptPath}`);
    }

    return csScriptPath
}