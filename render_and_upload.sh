#!/bin/bash

# Generates the video
echo "Generating video..."
npx remotion render MyComp out/video.mp4

# Uploads it to tmpfiles.org
echo "Uploading video..."
curl -s -F "file=@out/video.mp4" https://tmpfiles.org/api/v1/upload
