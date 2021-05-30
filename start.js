const { spawn } = require('child_process');
const chokidar = require('chokidar');
const mkdirp = require('mkdirp');
const rimraf = require('rimraf');
const path = require('path');
const fs = require('fs');
const handleKeypoints = require('./handle-keypoints');
const q = require('queue')({
    autostart: true,
    concurrency: 1
})

const DATA_DIR = path.join(__dirname, 'data');
const OP_WORKDIR = path.join(__dirname, 'openpose');
const OPBIN = path.join(__dirname, 'openpose', 'bin', 'OpenPoseDemo.exe');

const process = (path) => (callback) => {
    fs.readFile(path, (err, data) => {
        if (err) {
            console.error(err.stack)
            return callback(err);
        }
        handleKeypoints(JSON.parse(data.toString()), (err)=>{
            if (err) {
                console.error(err.stack)
                return callback(err);
            }
            fs.unlink(path, (err)=>{
                if (err) {
                    console.error(err.stack)
                }
                callback(err);
            });
        })
    })
}

rimraf.sync(DATA_DIR);
mkdirp.sync(DATA_DIR);
q.on('error', (err) =>{
    console.error(err.stack);
    process.exit(1);
})
chokidar.watch(DATA_DIR).on('all', (event, path) => {
    if (event == "add")
        q.push(process(path))
});
spawn(OPBIN, ['--write_json', DATA_DIR], { cwd: OP_WORKDIR, stdio: 'inherit' });