var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();

var security = require('../../utils/security.js');

var handler = require('../../handlers/api/tagsApiHandler.js');

var ApiTagRoutes = function () {
};

ApiTagRoutes.createRoutes = function (self) {
    
    self.app.get('/api/tags', security.isAuthenticated, handler.getTags);
    self.app.get('/api/tags/:projectId', security.isAuthenticated, handler.getForProject);
    self.app.post('/api/tag', security.canEdit, handler.addTag(self.app));
    self.app.delete('/api/tag', security.canEdit, jsonParser, handler.deleteTags(self.app));

};

module.exports = ApiTagRoutes;