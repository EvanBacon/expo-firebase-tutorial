#!/bin/bash

./gradlew ${1:-installDevMinSdkDevKernelDebug} --stacktrace && adb shell am start -n com.evanbacon.youtube/host.exp.exponent.MainActivity
