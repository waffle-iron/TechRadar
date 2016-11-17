var comments = require('../../dao/comments.js');
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();
var security = require('../../utils/security.js');
var handler = require('../../handlers/api/commentApiHandler.js');

var ApiCommentRoutes = function () {
};

ApiCommentRoutes.createRoutes = function (self) {

    /**
     * Add a new comment for a technology
     */
    self.app.post('/api/comments', security.canAddComments, jsonParser, handler.addComment );

    /**
     * Update a comment for a technology
     */
    self.app.put('/api/comments', security.canAddComments, jsonParser, handler.updateComment);

    /**
     * Delete comments
     */
    self.app.delete('/api/comments', security.isAuthenticatedAdmin, jsonParser, handler.deleteComment );


};

module.exports = ApiCommentRoutes;