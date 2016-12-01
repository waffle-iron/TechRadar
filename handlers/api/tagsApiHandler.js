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

TagsApiHandler.getAllWithOptionalProjectId = function (req, res) {
    var projectId = sanitizer(req.params.projectId);
    tag.getAllWithOptionalProjectId(projectId, function (result, error) {
        apiutils.handleResultSet(res, result, error);
    });
};

TagsApiHandler.getForProject = function (req, res) {
    var projectId = sanitizer(req.params.projectId);
    tag.getAllForProject(projectId, function (result, error) {
        apiutils.handleResultSet(res, result, error);
    });
};

TagsApiHandler.addTag = function (req, res) {
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
};

TagsApiHandler.deleteTags = function (req, res) {
    var tagIds = req.body.tags;

    tag.delete(tagIds, function (result, error) {
        apiutils.handleResultSet(res, result, error);
    });
};

TagsApiHandler.reassignTagsToProject = function (req, res) {
    var tagIds = req.body.tags;
    var projectId = sanitizer(req.params.projectId);

    tag.reassignToProject(projectId, tagIds, function (result, error) {
        apiutils.handleResultSet(res, result, error);
    });
};

TagsApiHandler.updateTag = function (req, res) {
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
};

module.exports = TagsApiHandler;
