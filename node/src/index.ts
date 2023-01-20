#! /usr/bin/env node
import { program, Option } from 'commander';
import run, { IBuildUnity } from './commands';

/** Create CLI options and definitions */
program
    .version("1.0.0", "-v, --version", "CLI Version")
    .description("A CLI for building an Unity Application")
    .requiredOption('-g, --git <string>', 'Git Repository')
    .addOption(new Option("-b, --buildDevice <string>", "Building device").default('iOS').choices(['iOS', 'Android']))
    .addOption(new Option("-e, --env <string>", "Building environment").default('mac').choices(['mac', 'linux']))
    .addOption(new Option("-o, --outputpath <string>", "Output path").default('./'))
    .addOption(new Option("-uv, --unityVersion <string>", "Unity Version").default('2020.3.42f1'))
    .parse(process.argv);

const options = program.opts();

if (!process.argv.slice(2).length) {
    program.help({ error: true });
}

run(options as IBuildUnity, () => program.outputHelp({ error: true }));


