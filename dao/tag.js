var pg = require('pg');
var dbhelper = require('../utils/dbhelper.js');


var Tag = function () {
};


/**
 * Add a new tag
 * @param name Tag's name
 * @param done Function to call when stored
 * @returns ID of the row created
 */
Tag.add = function (name, done) {
    var sql = "INSERT INTO tags (name) values ($1) returning id";

    dbhelper.insert(sql, [name],
        function (result) {
            done(result.rows[0].id);
        },
        function (error) {
            console.log(error);
            done(null, error);
        });
};

/**
 * Delete a set of tags using their ID numbers
 * @param ids
 * @param done
 */
Tag.delete = function (ids, done) {

    var params = [];
    for (var i = 1; i <= ids.length; i++) {
        params.push('$' + i);
    }

    var sql = "DELETE FROM tags WHERE id IN (" + params.join(',') + "  )";

    dbhelper.query(sql, ids,
        function (result) {
            done(true);
        },
        function (error) {
            console.error(error);
            done(false, error);
        });
};

/**
 * Get all tags
 * @param done Function to call with the results
 */
Tag.getAll = function (done) {
    var sql = `SELECT * FROM tags`

    dbhelper.query(sql, null,
        function (results) {
            done(results);
        },
        function (error) {
            console.error(error);
            done(null, error);
        });
};

/**
 * Get all tags for a project
 * @param done Function to call with the results
 */
Tag.getForProject = function (projectId, done) {
    var sql = `SELECT t.* FROM tags t
        LEFT OUTER JOIN tag_project_link tpl ON tpl.tagid=t.id
        WHERE tpl.projectid=$1`;

    dbhelper.query(sql, [projectId],
        function (results) {
            done(results);
        },
        function (error) {
            console.error(error);
            done(null, error);
        });
};


module.exports = Tag;