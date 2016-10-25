var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();

var security = require('../../utils/security.js');

var handler = require('../../handlers/api/tagsApiHandler.js');

var ApiTagRoutes = function () {
};

ApiTagRoutes.createRoutes = function (self) {
    
    self.app.get('/api/tags', security.isAuthenticated, handler.getTags);
    self.app.get('/api/project/:projectId/tags', security.isAuthenticated, handler.getForProject);
    self.app.post('/api/tag', security.canEdit, handler.addTag(self.app));
    self.app.post('/api/project/:projectId/tags', security.canEdit, handler.attachTagsToProject(self.app));
    self.app.put('/api/tag', security.canEdit, handler.updateTag(self.app));
    self.app.delete('/api/tags', security.canEdit, jsonParser, handler.deleteTags(self.app));
    self.app.delete('/api/tags/project', security.canEdit, jsonParser, handler.detachTagsFromProject(self.app));

};

module.exports = ApiTagRoutes;