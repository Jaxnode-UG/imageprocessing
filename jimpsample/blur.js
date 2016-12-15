
const Jimp = require('jimp');

Jimp.read('lenna.png')
    .then(image => {
        image
            .clone()
            .gaussian(10)
            .write('lenna-blur.png');
    })
    .catch(err => {
        if (err) console.log(err);
});
