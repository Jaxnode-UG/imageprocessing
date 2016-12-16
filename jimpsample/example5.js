/*
 * This script applies a guassian blur of 10 pixels and applies a sepia filter
 * Apache-2.0 License
 * Copyright 2017, David Fekke <david@fekke.com>
 */

const Jimp = require('jimp');

Jimp.read('lenna.png')
    .then(image => {
        image
            .clone()
            .gaussian(10)
            .sepia()
            .write('lenna-blur.png');
    })
    .catch(err => {
        if (err) console.log(err);
});
