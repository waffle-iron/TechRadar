var sinon = require('sinon');
var chai = require('chai');
var expect = chai.expect;

var technology = require('../../../dao/technology.js');
var webTechnologies = require('../../../handlers/web/technologiesWebHandler.js');

describe("Technologies web handler", function() {
    var req, res;

    beforeEach(function() {
        res = {};
        res.render = sinon.spy();
        res.redirect = sinon.spy();
        req = {
            user: { id: 111 },
            params: { id: 222 }
        };
        req.checkParams = function () {}; // this method normally comes from express middleware
        req.validationErrors = function () {}; // this method normally comes from express middleware
        var methods = { 
            isInt: sinon.stub()
        }
        sinon.stub(req, 'checkParams').returns(methods);
    });

    afterEach(function() {
        req.checkParams.restore();
    });

    describe("listTechnologies", function() {
        it("should render list technologies page", function() {
            webTechnologies.listTechnologies(req, res);

            sinon.assert.calledOnce(res.render);
            expect(res.render.args[0][0]).that.is.a('string').to.contain('listTechnologies');
        });
    });
    
    describe("search", function() {
        it("should render search technologies page", function() {
            webTechnologies.search(req, res);

            sinon.assert.calledOnce(res.render);
            expect(res.render.args[0][0]).that.is.a('string').to.contain('searchTechnologies');
        });
    });
    
    describe("add", function() {
        it("should render add technology page", function() {
            webTechnologies.add(req, res);

            sinon.assert.calledOnce(res.render);
            expect(res.render.args[0][0]).that.is.a('string').to.contain('addTechnology');
        });
    });
    
    describe("edit", function() {
        it("should render edit technology page", function() {

            sinon.stub(technology, 'getById', function(userId, num, cb){
                cb({/* dummy technology object */});
            });

            webTechnologies.edit(req, res);

            sinon.assert.calledOnce(res.render);
            expect(res.render.args[0][0]).that.is.a('string').to.contain('editTechnology');
            
            technology.getById.restore();
        });

        it("should NOT render edit technology page if no technology was found", function() {

            sinon.stub(technology, 'getById', function(userId, num, cb){
                cb(null /* missing technology object */);
            });

            webTechnologies.edit(req, res);

            sinon.assert.notCalled(res.render);
            
            technology.getById.restore();
        });

        it("should NOT render edit technology page if validation failed", function() {

            sinon.stub(req, 'validationErrors').returns(true);
            sinon.stub(technology, 'getById', function(userId, num, cb){
                cb({/* dummy technology object */});
            });

            webTechnologies.edit(req, res);

            sinon.assert.notCalled(res.render);

            technology.getById.restore();
            req.validationErrors.restore();
        });
    });
});