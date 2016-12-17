/*
 * This script just flips the lenna image on the horizontal and vertical axis
 * Apache-2.0 License
 * Copyright 2017, David Fekke <david@fekke.com>
 */

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