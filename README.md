# Unity Builder Prototype - Shell | TypeScript
###### By Guilherme Salim.

## Getting Started
### Requirements:
The project requires:
* **Unity 2020.3.42** - This code doesn't come with Docker Image, so the proper Unity Editor must be installed through [Unity HUB](https://unity.com/download).

### Running it
Each one of the folders contains its own documentation to support running the CLI
 
## About this project
The goal of this code is to provide a Unity Build CLI to support iOS and Android application based on a git repository.

Initially, the code was built only using Shell due to the straightforward goal. However, it was seen some benefits on using another language such as TypeScript (but could be others as well, such as Ruby, Golang, Node, etc.) to enable a better development experience when adding more features to the pipeline.

Both codes have the same pipeline process, so the output should be compatible.
Within each project, the main coding file contains the required documentation to a first understanding of the code.
### References
In order to accomplish the task, it was used the Unity's official documentation for building an application through the CLI - [Unitor Editor CLI official docs](https://docs.unity3d.com/Manual/EditorCommandLineArguments.html)

### Features
1. Build Unity Application and store artifacts in desired path (default for `./`  - can be set through the flag `-o <your custom path>`)
2. Support to Mac and Linux environment using Unity Hub (default to `mac` - can be set through the flag `-e <mac|linux>`)
3. Support to iOS and Android builds (default to `iOS` - can be set through the flag `-b <iOS|Android>`)
4. Support to multiple Unity Editor versions (default to `2022.3.42f1` - can be set through the flag `-uv <custom unity version>`)

### Limitation
Due to the time constraints to develop this solution, some limitations of these prototypes are:
- It uses an injected script to perform a custom build based on the arguments provided
- It supports only Linux and Mac environment
- It requires that the application contains a single scene `"Assets/Scenes/SampleScene.unity"`, in case of additional or custom scenes, it requires manual changes on `<node|shell>/csScripts/BuildScript.cs:27`

### Next Steps
Besides working on the limitation listed above, some of the next features/code improvements are:
* Docker container - run the build pipeline inside a docker container. (Reference: [Game.CI](https://game.ci/docs/docker/customize-docker-images))
* Include support to multiple source control (tfvc, git, etc)
* [Typescript] Unit tests - add unit tests around each minor function to ensure stability of the code

### Time Tracking
In order to develop both CLIs (coding, documentation, clean-up, and manual testing), it took me:
* Bash: 1h37 minutes
* TypeScript: 2h03 minutes
