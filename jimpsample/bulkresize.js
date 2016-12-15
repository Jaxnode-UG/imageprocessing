/*
 * This script rezises images to fit within 800 x 800, and it adds a JaxNode watermark
 * Apache-2.0 License
 * Copyright 2017, David Fekke <david@fekke.com>
 */
 
const fs = require('fs');
const Jimp = require('jimp');
const ProgressBar = require('progress');
const resizeRule = require('./resizerule');

var jaxnodeBug = Jimp.read('../jaxnode.png', (err, jaxnode) => {
    if (err) console.log(err);

    fs.readdir('../hirez', (err, files) => {
        if (err) console.log(err);

        let bar = new ProgressBar('Processing images [:bar] :rate/bps :percent :etas', { 
            total: files.length, 
            complete: '=',
            incomplete: ' ',
            width: 20,
        });

        files.forEach((file) => {
            Jimp.read('../hirez/' + file).then(image => {
                let position = resizeRule(image.bitmap.width, image.bitmap.height, 800);
                image.clone().scaleToFit(800, 800)
                .composite(jaxnode.clone().fade(0.5), position.x, position.y)
                .write('../output/' + file);
                bar.tick();
            }).catch(err => {
                console.log(err);
            });
        });
    });
});
