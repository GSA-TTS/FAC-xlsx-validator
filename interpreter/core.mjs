const SUCCESS = "OK";
const FAILURE = "KO";

class Result { 
    constructor (wb, rule, msg) {
        this.wb = wb;
        this.rule = rule;
        this.message = msg;
    }
};

class Success extends Result {
    constructor (wb, rule, msg) {
        super(wb,rule,msg);
        this.type = SUCCESS;
    }
};
class Failure extends Result {
    constructor (wb, rule, msg) {
        super(wb,rule,msg);
        this.type = FAILURE;
    }
};

/* Exports */
// https://www.sitepoint.com/understanding-module-exports-exports-node-js/
export {SUCCESS, FAILURE, Result, Success, Failure};
//exports.Result = Result;
//exports.Success = Success;
//exports.Failure = Failure;