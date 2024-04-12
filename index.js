// ---- Promise concept of furture value, value that we expecting to receive some time in the duture
// ---- get data (doing in bg) and return when ready
// ---- pending promise -> hasnt gotten back data
// ---- result promise -> fullfilled promise: has a result
//                     -> rejected promise when there an error
// ---- nice to separate successful result and error case [then() and catch()]

const fs = require('fs');
const superagent = require('superagent');

const http = require('http');

fs.readFile(`${__dirname}/dog.txt`, (err, data) => {
    console.log(`Breed: ${data}`);
    if (err) return console.log(err.message);

    // .get() return promise
    // .then() fullfilled promise (success)
    // .catch() rejected promisee (failed/error)
    superagent
        .get(`https://dog.ceo/api/breed/${data}/images/random`)
        .then(res => {
            console.log(res.body.message);

            fs.writeFile('dog-img.txt', res.body.message, err => {
                if (err) return console.log(err.message);
                console.log('rng dog image saved to file!');
            });
        }).catch(err => {
            console.log(err.message);
        })
})