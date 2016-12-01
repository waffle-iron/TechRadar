var ApiUtils = function () {
};

/**
 * Standard approach to returning results
 * @param res The response object
 * @param result The result returned from the
 */
ApiUtils.handleResultSet = function(res, result, error) {
    res.writeHead(200, {"Content-Type": "application/json"});

    var data = {};
    if ( result ) {
        data.result = result;
        data.success = true;
    } else {
        data.error = error;
        data.success = false;
    }
    res.end(JSON.stringify(data));
};

/**
 * Standard approach to returning results with flash messages
 *
 * @param req The request object
 * @param res The response object
 * @param result The result returned from the
 * @param error Any errors returned by backend
 */
ApiUtils.handleResultWithFlash = function(req, res, result, error, suppressSuccessFlash) {
    res.writeHead(200, {"Content-Type": "application/json"});

    var data = {};
    if (result) {
        if(!suppressSuccessFlash) {
            req.flash('success', typeof result === "string" ? result : "Request processed successfully!");
        }
        data.result = result;
        data.success = true;
    } else {
        req.flash('danger', error);
        // leaving this to be compatible with old handling
        data.error = error;
        data.success = false;
    }

    data.messages = req.flash();
    res.end(JSON.stringify(data));
};

module.exports = ApiUtils;