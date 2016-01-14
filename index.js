const fs = require('fs');
const zlib = require('zlib');

compress((err) => {
  decompress((err) => {
    console.log('done');
  });
});

function compress(done) {
  const zip = zlib.createGzip();
  const sourceFile = fs.createReadStream('test.txt');
  const compressedFile = fs.createWriteStream('test.txt.gz');
  console.log('compressing');
  sourceFile
    .pipe(zip)
    .on('error', onErr('zip'))
    .pipe(compressedFile)
    .on('error', onErr('compressedFile'))
    .on('close', done);
}

function decompress(done) {
  const unzip = zlib.createGunzip();
  const sourceFile2 = fs.createReadStream('test.txt.gz');
  const uncompressedFile = fs.createWriteStream('test-uncompressed.txt');
  console.log('decompressing');
  sourceFile2
    .pipe(unzip)
    .on('error', onErr('unzip'))
    .pipe(uncompressedFile)
    .on('error', onErr('uncompressedFile'))
    .on('close', done);
}

function onErr(name) {
  return (err) => {
    console.error(`Error at ${name}`);
    throw err;
  };
}
