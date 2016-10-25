var handler = require('../../handlers/web/projectsWebHandler');
var security = require('../../utils/security.js');

var ProjectRoutes = function () {
};


ProjectRoutes.createRoutes = function (self) {

    /**
     * Add new project page
     */
    self.app.get('/project/add', security.canEdit, handler.add);

    /**
     * Add new Technology to the project
     */
    self.app.get('/project/:projectId/technology/add', security.canEdit, handler.addTechnology);

    /**
     * Add new Technology to the project
     */
    self.app.get('/project/:projectId/technology/remove', security.canEdit, handler.removeTechnology);


    /**
     * Edit project page
     */
    self.app.get('/project/:projectId/edit', security.isAuthenticatedAdmin, handler.edit);

    /**
     * Show project radar page
     */
    self.app.get('/project/:projectId', security.isAuthenticated, handler.showRadar);

    /**
     * Show project tags
     */
    self.app.get('/project/:projectId/tags', security.isAuthenticated, handler.editTags);

    /**
     * Select tags and attach them to a project
     */
    self.app.get('/project/:projectId/tags/attach', security.isAuthenticated, handler.attachTags);

    /**
     * List projects page
     */
    self.app.get('/projects', security.isAuthenticated, handler.list);


}


module.exports = ProjectRoutes;