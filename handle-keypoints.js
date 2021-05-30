module.exports = function(keypointsContainer, callback) {
    if (keypointsContainer.people.length == 0) return;
    const kp = keypointsContainer.people[0].pose_keypoints_2d;
    // [582.349,507.866,0.845918,746.975,631.307,0.587007,...],

    let leftShoulder = {x:kp[5],y:kp[5+1]}
    let leftElbow = {x:kp[6],y:kp[6+1]}
    let rightShoulder = {x:kp[2],y:kp[2+1]}
    let rightElbow = {x:kp[3],y:kp[3+1]}
    
    console.log({
        leftShoulderElbowDiffY: leftElbow.y - leftShoulder.y
    })
 
    callback();
}