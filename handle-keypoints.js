module.exports = function(keypointsContainer, callback) {
    if (keypointsContainer.people.length == 0) return;
    const keypoints = keypointsContainer.people[0].pose_keypoints_2d;
    // [582.349,507.866,0.845918,746.975,631.307,0.587007,...],

    console.log(keypoints)

    // get shoulders 
    // get elbows
    
    callback();
}