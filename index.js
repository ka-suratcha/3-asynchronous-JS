// ---- Promise concept of furture value, value that we expecting to receive some time in the duture
// ---- get data (doing in bg) and return when ready
// ---- pending promise -> hasnt gotten back data
// ---- result promise -> fullfilled promise: has a result
//                     -> rejected promise when there an error
// ---- nice to separate successful result and error case [then() and catch()]

// .get() return promise
// .then() fullfilled promise (success)
// .catch() rejected promisee (failed/error)

const fs = require('fs');
const { resolve } = require('path');
const superagent = require('superagent');
const { reject } = require('superagent/lib/request-base');

// create func for return promise
const readFilePro = filePath => {
    return new Promise((resolve, reject) => {
        fs.readFile(filePath, (err, data) => {
            if (err) reject('I cloud not find that file'); // var pass in reject() will be availble as arg in then()
            resolve(data); //var pass in resolve() will be availble as arg in then()
        })
    })
}

const writeFilePro = (filePath, data) => {
    return new Promise((resolve, reject) => {
        fs.writeFile(filePath, data, err => {
            if (err) reject('could not write file');
            resolve('success');
        })
    })
}

// flat structure of chain promises
readFilePro(`${__dirname}/dogg.txt`) // read file
    .then(data => {
        console.log(`Breed: ${data}`);
        return superagent.get(`https://dog.ceo/api/breed/${data}/images/random`) // 
    })
    .then(res => {
        console.log(res.body.message);
        return writeFilePro('dog-img.txt', res.body.message);

    }).then(() => {
        console.log('rng dog image saved to file!');

    })
    .catch(err => {
        console.log(err);
    });

// fs.readFile(`${__dirname}/dog.txt`, (err, data) => {
//     console.log(`Breed: ${data}`);
//     if (err) return console.log(err.message);

//     // .get() return promise
//     // .then() fullfilled promise (success)
//     // .catch() rejected promisee (failed/error)
//     superagent
//         .get(`https://dog.ceo/api/breed/${data}/images/random`)
//         .then(res => {
//             console.log(res.body.message);

//             fs.writeFile('dog-img.txt', res.body.message, err => {
//                 if (err) return console.log(err.message);
//                 console.log('rng dog image saved to file!');
//             });
//         }).catch(err => {
//             console.log(err.message);
//         })
// })