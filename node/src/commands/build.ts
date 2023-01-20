import path from 'path';
import { move } from 'fs-extra'; 
import { existsSync, mkdirSync } from 'fs';
import chalk from 'chalk';

export const moveFilesToPath = async (files: string[] = [], destination: string): Promise<void> => {
    if (!existsSync(destination)) {
        console.log(chalk.yellow('Creating destination folder'));
        mkdirSync(destination);
    }
    for(let file of files) {
        const filename = path.basename(file)
        console.log(chalk.white(`Moving ${file} to ${destination}/${filename}`));
        await move(file, `${destination}/${filename}`)
    }
}