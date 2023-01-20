using UnityEditor;

public class BuildScript 
{
    private static string GetArg(string name)
    {
        var args = System.Environment.GetCommandLineArgs();
        for (int i = 0; i < args.Length; i++)
        {
            if (args[i] == name && args.Length > i + 1)
            {
                return args[i + 1];
            }
        }
        return null;
    }

    [MenuItem("Custom Utilities/Build")]
    static void PerformBuild()
    {
        string outputPath = GetArg("-outputPath");
        UnityEditor.BuildTarget buildTarget = GetArg("-buildTarget") == "iOS" ? BuildTarget.iOS : BuildTarget.Android;

        BuildPlayerOptions buildPlayerOptions = new BuildPlayerOptions {
            locationPathName = outputPath,
            target = buildTarget,
            scenes = new[] { "Assets/Scenes/SampleScene.unity" },
        };
        
        BuildPipeline.BuildPlayer(buildPlayerOptions);
    }
}