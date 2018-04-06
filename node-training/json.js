const fs = require("fs");

var json = {
    id: 1,
    name: "String"
}

var jsonString = JSON.stringify(json);
fs.writeFileSync("./note.json", jsonString);

var readJson = fs.readFileSync("./note.json");
var parseJson = JSON.parse(readJson);
console.log(parseJson.name);