var cache = require('../../dao/cache.js');
var tag = require('../../dao/tag.js');

var sanitizer = require('sanitize-html');
var apiutils = require('./apiUtils.js');

var TagsApiHandler = function () {
};

TagsApiHandler.getTags = function (req, res) {
    tag.getAll(function (result) {
        res.writeHead(200, {"Content-Type": "application/json"});
        res.end(JSON.stringify(result));
    });
};

TagsApiHandler.getForProject = function (req, res) {
    var projectId = sanitizer(req.params.projectId);
    tag.getForProject(projectId, function (result) {
        res.writeHead(200, {"Content-Type": "application/json"});
        res.end(JSON.stringify(result));
    });
};

TagsApiHandler.addTag = function (app) {
    return function (req, res) {
        tag.add(
            sanitizer( req.body.name ),
            sanitizer( req.body.description ),
            function (result , error ) {
                if(result) {
                    cache.refresh(app);
                }
                apiutils.handleResultSet( res, result , error );
            });
    }
};

TagsApiHandler.deleteTags = function (app) {
    return function (req, res) {
        var data = req.body.id ;

        tag.delete( data , function( result , error ) {
            if(result) {
                cache.refresh(app);
            }
            apiutils.handleResultSet( res, result , error );
        });
    }
};

module.exports = TagsApiHandler;