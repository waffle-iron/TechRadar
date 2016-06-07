var handler = require('../../handlers/web/technologiesWebHandler');

var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();

var passport = require('passport');
var security = require('../../utils/security.js');

var TechnologyRoutes = function () {
};


TechnologyRoutes.createRoutes = function (self) {

    /**
     * List all the technologies
     */
    self.app.get('/technologies', security.isAuthenticatedAdmin,  handler.listTechnologies );

    /**
     * Show the technology search page
     */
    self.app.get('/technology/search', security.isAuthenticated, jsonParser, handler.search );

    /**
     * Add a new technology
     */
    self.app.get('/technology/add', security.isAuthenticated, handler.add );

    /**
     * Edit a technology
     */
    self.app.get('/technology/:id/edit', security.isAuthenticated, handler.edit );

    /**
     * Show a specific technology by id
     */
    self.app.get('/technology/:id', security.isAuthenticated, handler.getTechnology );

    /**
     * Show the status history for a technology
     */
    self.app.get('/technology/:id/statushistory', security.isAuthenticated, handler.getStatusHistory );

    /**
     * Show the vote history for a technology
     */
    self.app.get('/technology/:id/votehistory', security.isAuthenticated,  handler.getVotes );

    /**
     * Show all of the status updates for a technology
     */
    self.app.get('/technology/:id/updatestatus', security.isAuthenticatedAdmin, handler.updateHistory );

    /**
     * Show the projects for a specified technology
     */
    self.app.get('/technology/:id/projects', security.isAuthenticated, handler.addProject );

}

module.exports = TechnologyRoutes;