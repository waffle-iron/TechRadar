var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();

var security = require('../../utils/security.js');

var handler = require('../../handlers/api/tagsApiHandler.js');

var ApiTagRoutes = function () {
};

ApiTagRoutes.createRoutes = function (self) {
    
    self.app.get('/api/tags', security.isAuthenticated, handler.getTags);
    self.app.get('/api/project/:projectId/tags/all', security.isAuthenticated, handler.getAllWithOptionalProjectId);
    self.app.get('/api/project/:projectId/tags/forProject', security.isAuthenticated, handler.getForProject);
    self.app.post('/api/tag', security.canEdit, handler.addTag);
    self.app.put('/api/tag', security.canEdit, handler.updateTag);
    self.app.put('/api/project/:projectId/tags', security.canEdit, jsonParser, handler.reassignTagsToProject);
    self.app.delete('/api/tags', security.canEdit, jsonParser, handler.deleteTags);
};

module.exports = ApiTagRoutes;
