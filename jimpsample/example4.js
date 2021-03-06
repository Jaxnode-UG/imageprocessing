/*
 * This script just fetches the images from our meetup, resizes and watermarks.
 * Apache-2.0 License
 * Copyright 2017, David Fekke <david@fekke.com>
 */

const fetch = require('node-fetch');
const Jimp = require('jimp');
const fs = require('fs');
const ProgressBar = require('progress');
const resizeRule = require('./resizerule');
const checkForOut = require('./checkforoutput.js');
const photosURL = 'https://api.meetup.com/Jax-Node-js-UG/photos?&sign=true&photo-host=public&page=30&key=' + process.env.meetupapi_key;

checkForOut();

fetch(photosURL).then(results => {
    return results.json();
}).then(json => {

    Jimp.read('../jaxnode.png', (err, jaxnode) => {
        if (err) console.log(err);

        let bar = new ProgressBar('Processing images [:bar] :rate/bps :percent :etas', { 
                total: json.length, 
                complete: '=',
                incomplete: ' ',
                width: 50,
            });

        json.forEach(node => {
            const parts = node.highres_link.split('/');
            const filename = parts[parts.length - 1];
            Jimp.read(node.highres_link).then(image => {
                let position = resizeRule(image.bitmap.width, image.bitmap.height, 800);
                image.clone()
                    .scaleToFit(800, 800)
                    .composite(jaxnode.clone().fade(0.5), position.x, position.y)
                    .write('../output/' + filename, (err) => { 
                    if (err) {
                        console.log(err);
                    } 
                });
                bar.tick();
            }).catch(err => {
                if (err) {
                    console.log(err); 
                }
            });
        });
    });
}).catch(err => {
    if (err) {
        console.log(err); 
    }
});
