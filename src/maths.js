/*
* Calculates the angle ABC (in radians) 
*
* A first point, ex: {x: 0, y: 0}
* C second point
* B center point
*
* Credit: Imane Fateh via StackOverflow https://stackoverflow.com/questions/17763392/how-to-calculate-in-javascript-angle-between-3-points
*/
function findAngleRadian(A,B,C) {
    var AB = Math.sqrt(Math.pow(B.x-A.x,2)+ Math.pow(B.y-A.y,2));    
    var BC = Math.sqrt(Math.pow(B.x-C.x,2)+ Math.pow(B.y-C.y,2)); 
    var AC = Math.sqrt(Math.pow(C.x-A.x,2)+ Math.pow(C.y-A.y,2));
    return Math.acos((BC*BC+AB*AB-AC*AC)/(2*BC*AB));
}

function findAngleDegrees(A, B, C) {
    return (findAngleRadian(A, B, C) * 180) / Math.PI;
}

module.exports = {
    findAngle: findAngleDegrees
}