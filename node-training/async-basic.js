const request = require("request");
const yargs = require("yargs");

const argv = yargs.option({
        a: {
            demand: true,
            alias: 'address',
            describe: "Address is required",
            string: true
        }
    })
    .help()
    .alias('help', 'h')
    .argv;

// console.log(argv);
var encode = encodeURIComponent(argv.a);
request({
    url: `http://maps.googleapis.com/maps/api/geocode/json?address=${encode}`,
    json: true
}, (error, res, body) => {
    // console.log(body);

    if (error) {
        console.log("Unable to connect");
    } else if (body.status === "ZONE_RESULTS" || body.results.length == 0) {
        console.log("Result not found");
    } else if (body.status === "OK") {
        console.log(JSON.stringify(res, undefined, 2));
    }
})