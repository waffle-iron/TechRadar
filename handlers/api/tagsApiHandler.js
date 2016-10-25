var tag = require('../../dao/tag.js');

var sanitizer = require('sanitize-html');
var apiutils = require('./apiUtils.js');

var TagsApiHandler = function () {
};

TagsApiHandler.getTags = function (req, res) {
    tag.getAll(function (result) {
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify(result));
    });
};

TagsApiHandler.getForProject = function (req, res) {
    var projectId = sanitizer(req.params.projectId);
    tag.getForProject(projectId, function (result) {
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify(result));
    });
};

TagsApiHandler.addTag = function(app) {
    return function (req, res) {
        req.checkBody('name', "Name cannot be blank.").notEmpty();

        var errors = req.validationErrors();
        if (errors) {
            res.end(JSON.stringify({success: false, error: errors}));
            return;
        }

        tag.add(
            sanitizer(req.body.name),
            function (result, error) {
                apiutils.handleResultSet(res, result, error);
        });
    }
};

TagsApiHandler.deleteTags = function (app) {
    return function (req, res) {
        var tagIds = req.body.tags;

        tag.delete(tagIds, function (result, error) {
            apiutils.handleResultSet(res, result, error);
        });
    }
};

TagsApiHandler.attachTagsToProject = function (app) {
    return function (req, res) {

        req.checkBody('tags', "tagIds can't be empty").notEmpty();

        var errors = req.validationErrors();
        if (errors) {
            res.end(JSON.stringify({success: false, error: errors}));
            return;
        }
        var tagIds = req.body.tags;
        var projectId = sanitizer(req.params.projectId);

        tag.attachToProject(projectId, tagIds, function (result, error) {
            apiutils.handleResultSet(res, result, error);
        });
    }
};

TagsApiHandler.detachTagsFromProject = function (app) {
    return function (req, res) {
        var linkIds = req.body.tags;

        tag.detachFromProject(linkIds, function (result, error) {
            apiutils.handleResultSet(res, result, error);
        });
    }
};

TagsApiHandler.updateTag = function (app) {
    return function (req, res) {
        var tagId = sanitizer(req.body.tag);
        var name = sanitizer(req.body.name);

        tag.update(tagId, name, function (result, error) {
            apiutils.handleResultSet(res, result, error);
        });
    }
};

module.exports = TagsApiHandler;