// this server will let me step through each frame, delivering the frame
// and the associated keypoints which i can then render onto the frame
// so i can get a visual of wtf this data is about

const express = require('express');
const app = express();
app.use(express.static('public'));
app.listen(3000, '0.0.0.0');