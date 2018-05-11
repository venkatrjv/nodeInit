const task = require('./Tasks');
const upload = require("../node-training/multer");
const excel = require("../node-training/excel");
const about = require("../views/view");
const login = require("../routes/login");

module.exports = {
    task: task,
    upload: upload,
    excel: excel,
    about: about,
    login: login
}