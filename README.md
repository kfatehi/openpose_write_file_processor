i just wanted to process openpose's keypoints without modifying openpose itself

https://github.com/CMU-Perceptual-Computing-Lab/openpose/blob/master/doc/02_output.md

i would have preferred it to have dumped out to stdout instead of requiring me to use write_file

but i supported that write_file mechanism here

but i am not sure if this is deteriorating my NVMe's endurance or what.

overall just not too pleased with this and think it's probably more sensible to just modify openpose itself

or to use the python binding discussed here

https://github.com/CMU-Perceptual-Computing-Lab/openpose/blob/master/doc/03_python_api.md

i dunno