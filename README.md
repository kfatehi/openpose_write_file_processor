# openpose_write_file_processor

Using the write_file mechanism (using a RAM disk, ideally) to parse the keypoints per frame.

Goal is to track at-home exercises and ship the data to timescaledb to view in grafana.

Reference for the keypoints:

https://github.com/CMU-Perceptual-Computing-Lab/openpose/blob/master/doc/02_output.md

## features

* dip counter


## server

there is a server for looking at data per frame of some video

it requires converting the source to an image sequence, e.g.:

ffmpeg -i ..\video\dip.mp4 output_%04d.png

