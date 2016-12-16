
const Jimp = require('jimp');

Jimp.read('lenna.png').then(image => {
    // Flip along horizontal axis
    image.clone()
        .flip( true, false )
        .write('lenna-flip-horiz.png');
    // Flip along vertical axis
    image.clone()
        .flip( false, true )
        .write('lenna-flip-vert.png');
}).catch(err => {
    console.log(err);
});