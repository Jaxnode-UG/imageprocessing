/*
 * This script just flips the lenna image on the horizontal and vertical axis
 * Apache-2.0 License
 * Copyright 2017, David Fekke <david@fekke.com>
 */

const Jimp = require('jimp');

Jimp.read('../hirez/revoevom.jpg').then(image => {
    // Flip along vertical axis
    image.clone()
        .scaleToFit(800, 800)
        .flip(true, false)
        .quality(60)
        .write('moveover.jpg');
}).catch(err => {
    console.log(err);
});