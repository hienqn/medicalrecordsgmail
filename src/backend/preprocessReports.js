var fs = require('fs');
var path = require('path');

// make Promise version of fs.readdir()
fs.readdirAsync = function(dirname) {
    return new Promise(function(resolve, reject) {
        fs.readdir(dirname, function(err, filenames){
            if (err) 
                reject(err); 
            else 
                resolve(filenames);
        });
    });
};

// make Promise version of fs.readFile()
fs.readFileAsync = function(filename, enc) {
    const resolveData = {};
    return new Promise(function(resolve, reject) {
        fs.readFile(filename, enc, function(err, data){
            if (err) 
                reject(err); 
            else
                resolveData[path.basename(filename)] = data;
                resolve(resolveData);
        });
    });
};

// utility function, return Promise
function getFile(filename) {
    return fs.readFileAsync(filename, 'utf8');
}


// start a blank wordToFilenameMap.json file
fs.writeFile('./wordToFilenameMap.json', '', function(){console.log('done')});
fs.writeFile('./nameFileToTextMap.json', '', function(){console.log('done')});
fs.writeFile('./initialTags.json', '', function(){console.log('done')});

// read all text files in the directory, filter out those needed to process, and using Promise.all to time when all async readFiles has completed. 
fs.readdirAsync(__dirname + '/medicalreports').then(function (filenames){
    filenames = filenames.map(file => __dirname + `/medicalreports/${file}`)
    return Promise.all(filenames.map(getFile));
  }).then(function (files){
    const summaryFiles = {};
    const mapNameToText = {};
    const initialTags = {};
    files.forEach(function(file) {
      Object.assign(mapNameToText, file);
      const fileName = path.basename(Object.keys(file)[0]);
      initialTags[fileName] = {'active': [], 'inactive' : ['goodreport', 'conditionpresent']};
      const data = Object.values(file)[0];
      let allwords = data.match(/\w+/g).map(word => word.trim().toLowerCase()).filter(word => word !== '');
      allwords.map(
        word => {
          if (summaryFiles[word]) {
            if (!summaryFiles[word].includes(fileName)) {
              summaryFiles[word].push(fileName);
            }
          } else {
            summaryFiles[word] = [fileName];
          }
        }
      );
    });

    fs.appendFile("./wordToFilenameMap.json", JSON.stringify(summaryFiles, null, 4), function(err) {
        if(err) {
          return console.log(err);
        }
    });

    
    fs.appendFile("./initialTags.json", JSON.stringify(initialTags, null, 4), function(err) {
        if(err) {
          return console.log(err);
        }
    });


    fs.appendFile("./nameFileToTextMap.json", JSON.stringify(mapNameToText, null, 4), function(err) {
      if(err) {
        return console.log(err);
      }
    });
  })
  .catch(e => console.log(e))

