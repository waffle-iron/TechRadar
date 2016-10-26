var sinon = require('sinon');
var chai = require('chai');
var expect = chai.expect;

var versionsDao = require('../../../dao/softwareVersions.js');
var apiutils = require('../../../handlers/api/apiUtils.js');
var apiVersions = require('../../../handlers/api/softwareVersionsApiHandler.js');

describe("Software versions api handler", function() {
    var req, res;

    beforeEach(function() {
        req = res = {};
        res.end = sinon.spy();
        res.writeHead = sinon.spy();
    });

    describe("getAllVersionsForTechnology", function() {
        var getAllForTechnologySpy,
            testData = { technology: '1' };

        beforeEach(function() {
            req.params = {
                technology: testData.technology
            };
            getAllForTechnologySpy = sinon.stub(versionsDao, 'getAllForTechnology', function (technology, cb) {
                cb(testData.technology);
            });
            sinon.stub(apiutils, 'handleResultSet');
        });

        afterEach(function() {
            versionsDao.getAllForTechnology.restore();
            apiutils.handleResultSet.restore();
        });

        it("should call softwareVersions dao with proper data", function() {
            apiVersions.getAllVersionsForTechnology(req, res);

            sinon.assert.calledOnce(versionsDao.getAllForTechnology);
            expect(getAllForTechnologySpy.getCalls()[0].args[0]).that.is.a('string').to.equal(req.params.technology);
        });
    });

    describe("addVersion", function() {
        var addVersionSpy,
            testData = { technology: '1', name: '4.0.0-alpha' };

        beforeEach(function() {
            req.body = {
                technology: testData.technology,
                name: testData.name
            };
            addVersionSpy = sinon.stub(versionsDao, 'add', function (technology, name, cb) {
                cb(testData.technology, testData.name);
            });
            sinon.stub(apiutils, 'handleResultSet');
        });

        afterEach(function() {
            versionsDao.add.restore();
            apiutils.handleResultSet.restore();
        });

        it("should call softwareVersions dao with proper data", function() {
            apiVersions.addVersion(req, res);

            sinon.assert.calledOnce(versionsDao.add);
            expect(addVersionSpy.getCalls()[0].args[0]).that.is.a('string').to.equal(req.body.technology);
            expect(addVersionSpy.getCalls()[0].args[1]).that.is.a('string').to.equal(req.body.name);
        });
    });

    describe("updateVersion", function() {
        var updateVersionSpy,
            testData = { version: '1', name: '4.0.0-alpha' };

        beforeEach(function() {
            req.body = {
                version: testData.version,
                name: testData.name
            };
            req.checkBody = function () {}; // this method normally comes from express middleware
            req.validationErrors = function () {}; // this method normally comes from express middleware
            updateVersionSpy = sinon.stub(versionsDao, 'update', function (version, name, cb) {
                cb(testData.version, testData.name);
            });
            sinon.stub(apiutils, 'handleResultSet');
            var methods = { 
                isInt: sinon.stub(),
                notEmpty: sinon.stub() 
            }
            sinon.stub(req, 'checkBody').returns(methods);
        });

        afterEach(function() {
            versionsDao.update.restore();
            apiutils.handleResultSet.restore();
        });

        it("should call softwareVersions dao with proper data", function() {
            apiVersions.updateVersion(req, res);

            sinon.assert.calledOnce(versionsDao.update);
            expect(updateVersionSpy.getCalls()[0].args[0]).that.is.a('string').to.equal(req.body.version);
            expect(updateVersionSpy.getCalls()[0].args[1]).that.is.a('string').to.equal(req.body.name);
        });

        it("should not update when validation fails", function() {
            sinon.stub(req, 'validationErrors').returns(true);

            apiVersions.updateVersion(req, res);

            sinon.assert.notCalled(versionsDao.update);

            req.validationErrors.restore();
        });
    });

    describe("deleteVersions", function() {
        var deleteVersionsSpy,
            testData = { versions: [1, 22, 333] };

        beforeEach(function() {
            req.body = {
                versions: testData.versions
            };
            deleteVersionsSpy = sinon.stub(versionsDao, 'delete', function (versions, cb) {
                cb(testData.versions);
            });
            sinon.stub(apiutils, 'handleResultSet');
        });

        afterEach(function() {
            versionsDao.delete.restore();
            apiutils.handleResultSet.restore();
        });

        it("should call softwareVersions dao with proper data", function() {
            apiVersions.deleteVersions(req, res);

            sinon.assert.calledOnce(versionsDao.delete);
            expect(deleteVersionsSpy.getCalls()[0].args[0]).that.is.an('array').to.equal(testData.versions);
        });
    });
});
