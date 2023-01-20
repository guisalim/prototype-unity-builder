#!/bin/bash

set -e

# Set a helper message
usage="Build an iOS Unity application from Git Repository where:

    FLAG        |    Description    |       Required/Default
----------------|-------------------|------------------------------
   -e           |    Environment    |      Default: mac
                |   (mac/linux)     |      
                |                   |      
   -g           |    Git url        |      Required
                |                   |      
   -b           |    BuildDevice    |      Default: iOS
                |   (iOS/Android)   |      
                |                   |      
   -o           |    Output path    |      Default: ./
                |                   |     
   -v           |    Unity Version  |      Default: 2020.3.42f1
                |                   |      
----------------|-------------------|------------------------------

"

# Setting default parameters
BUILD=iOS
ENV=mac
ENVS_AVAILABLE=(mac linux win)
LOGS=$(pwd)/logs.txt
OUTPUT=$(pwd)
UNITY_VERSION=2020.3.42f1

# Get the options
options=':e:he:g:o:l:v:'
while getopts $options option; do
    case $option in
    b | buildDevice) BUILD=${OPTARG} ;;
    e | environment) ENV=${OPTARG} ;;
    g | git) GIT=${OPTARG} ;;
    h | help)
        echo "$usage"
        exit
        ;;
    l | logs) LOGS=${OPTARG} ;;
    o | output) OUTPUT=${OPTARG} ;;
    v | version) VERSION=${OPTARG} ;;
    esac
done

# mandatory arguments
if [ -z "${GIT}" ]; then
    echo "$usage" >&2
    exit 1
fi

# define Unity Editor path
case $ENV in
linux)
    UNITY_PATH=/Applications/Unity/Hub/Editor/$UNITY_VERSION/Unity.app/Contents/Linux/Unity
    ;;
mac)
    UNITY_PATH=/Applications/Unity/Hub/Editor/$UNITY_VERSION/Unity.app/Contents/MacOS/Unity
    ;;
esac

# check if environment is valid
if [ -z "$UNITY_PATH" ]; then
    echo "Environment ${ENV} not available." >&2
    exit 1
elif [ ! -f $UNITY_PATH ]; then
    echo "Unity Editor could not be found on ${UNITY_PATH}." >&2
    exit 1
else
    (which git) || (
        echo "Can't find git installed in your machine. Make sure to install it." >&2
        exit 1
    )
fi

# cloning github repository
BASENAME=$(basename ${GIT%.*})
echo "Cloning repository (overwriting if already exists) to ${BASENAME}"
rm -rf ./$BASENAME
git clone $GIT $BASENAME --quiet

# define the project path
PROJECT=$(pwd)/$BASENAME

# injecting build script into the project (considering a static path)
echo Copying BuildScript file into projectpath
BUILD_SCRIPT_PATH=$PROJECT/Assets/Editor/CustomBuilderScripts
cp -R ./csScripts $BUILD_SCRIPT_PATH

# cleaning any potential output folder that already exists within the repository
TEMP_FILE=build
TEMP_FOLDER=$(pwd)/$TEMP_FILE
echo Cleaning pre-existing $TEMP_FOLDER folder
rm -rf $TEMP_FOLDER

# run default Unity building script
echo Building application
$UNITY_PATH \
    -quit -batchmode \
    -buildTarget $BUILD \
    -projectpath $PROJECT \
    -logFile $LOGS \
    -executeMethod BuildScript.PerformBuild \
    -outputPath $TEMP_FOLDER

# compressing building output
BASH_FILE=$BASENAME.tar.gz
rm -f $BASH_FILE
echo Compressing $OUTPUT to $BASH_FILE
tar -czf $BASH_FILE ./$TEMP_FILE

# clean temp folder and git repository to reduce memory usage
echo Cleaning up temp directory and git repo downloaded
rm -rf $TEMP_FOLDER
rm -rf $PROJECT

# move files to output path
echo Moving logs and build to path
OUTPUT=$OUTPUT/$BASENAME
if [ ! -d $OUTPUT ]; then
    echo Creating folder $OUTPUT
    mkdir -p $OUTPUT
fi
mv ./$BASH_FILE $OUTPUT/$BASH_FILE
mv $LOGS $OUTPUT/logs.txt
