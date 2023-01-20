# Unity Builder Prototype - TypeScript
###### By Guilherme Salim.

## Getting Started
### Requirements:
The project requires:
* [Node.js](https://nodejs.org/en/download/) - a javascript runtime built using Chrome's V8 Javascript Engine. You can check if you have Node.js using the following command on your terminal or download it using the previous link:
```sh
node -v
```

* **Unity 2020.3.42** - This code doesn't come with Docker Image, so the proper Unity Editor must be installed through [Unity HUB](https://unity.com/download).

## Installation/Running
This application is build using Typescript (due to a better development experience through Types, interfaces, etc.). Because of that, on your first time running the CLI, you should run:
```sh
npm ci && npm run ts
```
Once compilation is completed, you should be able to use the CLI it locally by running:
```sh
node ./ -g <git_repository_url>
```

When the CLI completes the bulding process, the build and log (_*.tar.gz_ and _*.txt_, respectively) artifacts should be visible in the CLI folder. For a custom directory, use the flag `-o <custom_output_directory_path>`

### Running it globally
To run the script as a global binary, you should also run `npm i -g`. This is required only on your first time to enable the script to be ran globally.

Then, you can call the script globally bu running:
```sh
unityBuild -g <git_repository_url>
```

## Help
The list of available parameters can be seen by running: 

* Globally: `unityBuild -h`
* Locally: `node ./ -h`

## Code Documentation
Check `./src/index.ts` and `./src/commands/index.ts` files

## Code Structure
* **/csScripts** - Folder responsible to store any C# Script that might require to be injected in the code
* **/src** - base TypeScript code. The main function can be seen on `src/index.ts`
* **package.json** - CLI metadata records
* **tsconfig.json** - Typescript configuration file used to compile into ESM modules