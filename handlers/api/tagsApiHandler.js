var tag = require('../../dao/tag.js');

var sanitizer = require('sanitize-html');
var apiutils = require('./apiUtils.js');
var tagValidator = require('../../shared/validators/tagValidator.js');

var TagsApiHandler = function () {
};

TagsApiHandler.getTags = function (req, res) {
    tag.getAll(function (result, error) {
        apiutils.handleResultSet(res, result, error);
    });
};

TagsApiHandler.getForProject = function (req, res) {
    var projectId = sanitizer(req.params.projectId);
    tag.getForProject(projectId, function (result, error) {
        apiutils.handleResultSet(res, result, error);
    });
};

TagsApiHandler.addTag = function(app) {
    return function (req, res) {

    var tagName = sanitizer(req.body.name);

    var validationResult = tagValidator.validateTagName(tagName);
    if (!validationResult.valid) {
        res.writeHead(200, {"Content-Type": "application/json"});
        var data = {};
        data.error = validationResult.message;
        data.success = false;
        res.end(JSON.stringify(data));
        return;
    }

    tag.add(
        tagName,
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
        var tagName = sanitizer(req.body.name);

        var validationResult = tagValidator.validateTagName(tagName);
        if (!validationResult.valid) {
            res.writeHead(200, {"Content-Type": "application/json"});
            var data = {};
            data.error = validationResult.message;
            data.success = false;
            res.end(JSON.stringify(data));
            return;
        }

        tag.update(tagId, tagName, function (result, error) {
            apiutils.handleResultSet(res, result, error);
        });
    }
};

module.exports = TagsApiHandler;