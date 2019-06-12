const fs = require("fs");
const path = require("path");
const convertCSV = require("csvtojson");


//------NPM Module Code-------//
const moduleCode = () => {
  convertCSV()
    .fromFile(path.join(__dirname, "customer-data.xls"))
    .then((jsonObj) => {
      fs.writeFile("module-converted.json", JSON.stringify(jsonObj, null, 2), (err) => console.log(err));
    });
}

moduleCode();


//------Manual Code-------//
//------Notice - This will not work if the csv file contains commas within the values----//
const manualCode = () => {

  fs.readFile(path.join(__dirname, "customer-data.xls"), "utf-8", (err, data) => {
    if (err) return console.log(err);

    //Split all lines into an array
    var lines = data.split("\n");

    //Remove all whitespace
    lines = lines.map(function (line) {
      return line.trim();
    });

    //Create an array to store objects
    var result = [];

    //Split headers into an array
    var headers = lines[0].split(",");

    //Loop over lines excluding header line - start at index 1
    for (var i = 1; i < lines.length; i++) {

      //Create object for each json index
      var obj = {};

      //Split each line into its own array
      var currentline = lines[i].split(",");

      //Loop over headers
      for (var j = 0; j < headers.length; j++) {
        //Assign headers as object properties and lines as values
        obj[headers[j]] = currentline[j];
      }

      //Push json object into result array
      result.push(obj);

    }

    //Stringify result
    let final = JSON.stringify(result, null, 2);

    //Write converted file to disk
    fs.writeFile("manual-converted.json", final, (err) => console.log(err));
  });

}

manualCode();
