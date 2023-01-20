# Unity Builder Prototype - Shell
###### By Guilherme Salim.

## Getting Started
### Requirements:
The project requires:
* [Unity 2020.3.42](unityhub://2020.3.42f1/7ade1201f527) - This code doesn't come with Docker Image, so the proper Unity Editor must be installed through [Unity HUB](https://unity.com/download).

### Running it
the folders contains its own documentation to support running the CLI
 
## About this project
The goal of this code is to provide a Unity Build CLI to support iOS and Android application based on a git repository.

The code was built only using Shell due to the straightforward goal. However, it can be developed in another language to enable a better development experience when adding more features to the pipeline.

Within each project, the main coding file contains the required documentation to a first understanding of the code.

### References
In order to accomplish the task, it was used the Unity's official documentation for building an application through the CLI - [Unitor Editor CLI official docs](https://docs.unity3d.com/Manual/EditorCommandLineArguments.html)

### Limitation
Due to the time constraints to develop this solution, some limitations of these prototypes are:
- It uses an injected script to perform a custom build based on the arguments provided
- It requires that the application contains a single scene `"Assets/Scenes/SampleScene.unity"`, in case of additional or custom scenes, it requires manual changes on `shell/csScripts/BuildScript.cs:27`

### Next Steps
Besides working on the limitation listed above, some of the next features/code improvements are:
* Docker container - run the build pipeline inside a docker container. (Reference: [Game.CI](https://game.ci/docs/docker/customize-docker-images))

