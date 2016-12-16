
const Jimp = require('jimp');

Jimp.read('lenna.png').then(image => {
    console.log(image);
}).catch(err => {
    console.log(err);
});