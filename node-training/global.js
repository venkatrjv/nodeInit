const Joi = require('joi');

js_yyyy_mm_dd_hh_mm_ss = () => {
    now = new Date();
    year = "" + now.getFullYear();
    month = "" + (now.getMonth() + 1);
    if (month.length == 1) {
        month = "0" + month;
    }
    day = "" + now.getDate();
    if (day.length == 1) {
        day = "0" + day;
    }
    hour = "" + now.getHours();
    if (hour.length == 1) {
        hour = "0" + hour;
    }
    minute = "" + now.getMinutes();
    if (minute.length == 1) {
        minute = "0" + minute;
    }
    second = "" + now.getSeconds();
    if (second.length == 1) {
        second = "0" + second;
    }
    return year + "-" + month + "-" + day + " " + hour + "-" + minute + "-" + second;
}

getAppPath = () => {
    // var appPath = __dirname.split('\\')
    // appPath.pop();
    // return appPath.join("\\");
    return path.dirname(require.main.filename || process.mainModule.filename);
}

//
// ──────────────────────────────────────────────────────────────────── CATCH ─────
catchOperation = (error, next) => {
    var err = {
        "status": 400,
        message: error
    };
    return next(err);
}

//
// ─────────────────────────────────────────────────────────────── VALIDATION ─────
validationSchema = (body, schema, next) => {
    const result = Joi.validate(body, schema);
    if (result.error) {
        result.error["status"] = 400;
        return next(result.error);
    }
    return true;
}

//
// ────────────────────────────────────────────────────────────────────── GET ─────
getOperation = (res, rows) => {
    if (rows.length === undefined) {
        return res.status(400).json({
            "status": 400,
            "message": "Requested parameter mismatch"
        });
    } else {
        return res.json(rows[0]);
    }
}

//
// ────────────────────────────────────────────────────────────────────── GET ─────
postOperation = (res, rows) => {
    if (rows.length === undefined) {
        return res.status(400).json({
            "status": 400,
            "message": "Requested parameter mismatch"
        });
    } else {
        return res.json(rows);
    }
}

//
// ────────────────────────────────────────────────────────────────────── GET ─────
getOperationSingle = (res, rows) => {
    if (rows.length === undefined) {
        return res.status(400).json({
            "status": 400,
            "message": "Requested parameter mismatch"
        });
    } else {
        return res.json(rows);
    }
}

module.exports = {
    "js_yyyy_mm_dd_hh_mm_ss": js_yyyy_mm_dd_hh_mm_ss,
    "getAppPath": getAppPath,
    "catchOperation": catchOperation,
    "validationSchema": validationSchema,
    "getOperation": getOperation,
    "getOperationSingle": getOperationSingle,
    "postOperation": postOperation
}