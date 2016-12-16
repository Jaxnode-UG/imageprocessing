/*
 * This script just reads in the lenna image and console.logs the object
 * Apache-2.0 License
 * Copyright 2017, David Fekke <david@fekke.com>
 */

const Jimp = require('jimp');

Jimp.read('lenna.png').then(image => {
    console.log(image);
}).catch(err => {
    console.log(err);
});