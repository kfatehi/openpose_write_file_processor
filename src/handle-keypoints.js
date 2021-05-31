const { JOINT_NAMES } = require('./constants');
const { findAngle } = require('./maths');

const initialHumanState = {
    jointPoints: {},
    anglesOfInterest: {},
    exerciseCount: {
        dips: 0
    },
    doing: "nothing"
};

let humanState = initialHumanState;

module.exports = function(keypointsContainer, callback) {
    if (keypointsContainer.people.length == 0) {
        humanState = initialHumanState;
        return callback(null, []);
    }
    const kps = keypointsContainer.people[0].pose_keypoints_2d;

    let points = [];

    for (let i = 0; i < kps.length ; i+= 3) {
        let [x, y, c] = kps.slice(i, i+3);
        let point = {
            i:i/3,
            name: JOINT_NAMES[i/3],
            c,
            x,
            y
        };
        humanState.jointPoints[JOINT_NAMES[i/3]] = point;
        points.push(point);
    }


    humanState.anglesOfInterest["LeftArm"] = findAngle(
        humanState.jointPoints['LShoulder'],
        humanState.jointPoints['LElbow'],
        humanState.jointPoints['LWrist']
    )

    humanState.anglesOfInterest["RightArm"] = findAngle(
        humanState.jointPoints['RShoulder'],
        humanState.jointPoints['RElbow'],
        humanState.jointPoints['RWrist']
    )

    humanState.anglesOfInterest["WristsToPelvis"] = findAngle(
        humanState.jointPoints['LWrist'],
        humanState.jointPoints['MidHip'],
        humanState.jointPoints['RWrist']
    )

    const angle = (name)=> humanState.anglesOfInterest[name]

    if (
        (humanState.doing == "nothing" || humanState.doing == "dip-return")
        && angle("RightArm") < 90
        && angle("LeftArm") < 90
        && angle("WristsToPelvis") < 100
    ) {
        humanState.doing = "dip-enter"
    }

    
    if (
        humanState.doing == "dip-enter"
        && angle("RightArm") > 110
        && angle("LeftArm") > 110
        && angle("WristsToPelvis") > 110
    ) {
        humanState.doing = "dip-return"
        humanState.exerciseCount["dips"]+=1
    }


    // if (leftArmAngle < 90 && rightArmAngle < 90 && wristPelvisAngle < 100) {
    //     console.log("it's probably a dip")
    // }

    console.log(humanState.anglesOfInterest, humanState.doing, humanState.exerciseCount);

    callback(null, points);
}