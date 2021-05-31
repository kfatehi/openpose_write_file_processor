const { spawn } = require('child_process');
const chokidar = require('chokidar');
const mkdirp = require('mkdirp');
const rimraf = require('rimraf');
const path = require('path');
const fs = require('fs');
const handleKeypoints = require('./src/handle-keypoints');
const q = require('queue')({
    autostart: true,
    concurrency: 1
})

const DATA_DIR = path.join("R:", 'data');
const OP_WORKDIR = path.join(__dirname, 'openpose');
const OPBIN = path.join(__dirname, 'openpose', 'bin', 'OpenPoseDemo.exe');

const DEFAULT_OPTIONS = {
    autodelete: true
}

const process = (path, options=DEFAULT_OPTIONS) => (callback) => {
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
            if (!options.autodelete) return callback();
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
        q.push(process(path, { autodelete: false }))
});
//spawn(OPBIN, ['--write_json', DATA_DIR], { cwd: OP_WORKDIR, stdio: 'inherit' });
// spawn(OPBIN, ['--help'], { cwd: OP_WORKDIR, stdio: 'inherit' });
spawn(OPBIN, ['--video', __dirname+'\\video\\dip.mp4', '--write_json', DATA_DIR], { cwd: OP_WORKDIR, stdio: 'inherit' });