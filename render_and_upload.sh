#!/bin/bash

# Generates the video
echo "Generating video..."
npx remotion render PromoVideo out/video.mp4 --scale 0.5

# Uploads it to tmpfiles.org
echo "Uploading video..."
curl -s -F "file=@out/video.mp4" https://tmpfiles.org/api/v1/upload
