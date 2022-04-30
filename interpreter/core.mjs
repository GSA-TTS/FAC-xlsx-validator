const SUCCESS = "OK";
const FAILURE = "KO";

class Result { 
    constructor (wb, rule, msg) {
        this.wb = wb;
        this.rule = rule;
        this.message = msg;
    }
};

class Success extends Result {};
class Failure extends Result {};

/* Exports */
// https://www.sitepoint.com/understanding-module-exports-exports-node-js/
export {Result, Success, Failure};