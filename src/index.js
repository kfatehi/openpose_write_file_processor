const handleKeypoints = require('./handle-keypoints');

let g_frame = 401;

document.addEventListener('keyup', (_d, e)=>{
    e = e || window.event;

    if (e.keyCode == '38') {
        // up arrow
    }
    else if (e.keyCode == '40') {
        // down arrow
    }
    else if (e.keyCode == '37') {
        // left arrow
        frameBackward();
    }
    else if (e.keyCode == '39') {
        frameForward();
    }
})

async function loadFrame(frame) {
    g_frame = frame;

    let img = document.querySelector('img');

    img.src = `images/output_0${frame}.png`;

    let resp = await fetch(`keypoints/dip_000000000${frame}_keypoints.json`);
    let data = await resp.json();
    console.log(data);

    renderKeypoints(data);
}

function renderKeypoints(data) {
    let keypointsContainer = document.querySelector('#keypoints-container');
    keypointsContainer.innerHTML = "";

    handleKeypoints(data, (err, points)=>{
        if (err) throw err;
        for (let i=0;i<points.length;i++) {
            let {name,x,y,c} = points[i];
            let pDiv = document.createElement('div');
            pDiv.classList = "kp";
            pDiv.style.left = `${x}px`;
            pDiv.style.top = `${y}px`;
            pDiv.innerHTML = `${name},c:${Math.round(c*100)}<br>x:${Math.round(x)},y:${Math.round(y)}`
            keypointsContainer.appendChild(pDiv);
        }
    })
}

let frameStep = 5;
loadFrame(201);

function frameForward() {
    loadFrame(g_frame+frameStep);
}

function frameBackward() {
    loadFrame(g_frame-frameStep);
}