# Unity Builder Prototype - Shell
###### By Guilherme Salim.

## Getting Started
### Requirements:
The project requires:
* [Unity 2020.3.42](unityhub://2020.3.42f1/7ade1201f527) - This code doesn't come with Docker Image, so the proper Unity Editor must be installed through [Unity HUB](https://unity.com/download).

## Installation/Running
This CLI is build using Shell script (due to a better performance). You should be able to use the CLI it locally by running:
```sh
./build.sh -g <git_repository_url>
```

Once the CLI is completed, the build and log (_*.tar.gz_ and _*.txt_, respectively) artifacts should be visible in the CLI folder. For a custom directory, use the flag `-o <custom_output_directory_path>`

## Help
The list of available parameters can be seen by running: 

* Locally: `./build.sh  -h`

## Code Documentation
Check `./build.sh` file

## Code Structure
* **/csScripts** - Folder responsible to store any C# Script that might require to be injected in the code
* **build.sh** - CLI Shell code