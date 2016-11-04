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
 * Update a tag
 * @param tagId Tag's ID
 * @param name Tag's name
 * @param done Function to call when stored
 * @returns ID of the row created
 */
Tag.update = function (tagId, name, done) {
    var params = [tagId, name];
    var sql = "UPDATE tags SET name=$2 WHERE id=$1"; 

    dbhelper.insert(sql, params,
        function (result) {
            done(true);
        },
        function (error) {
            console.log(error);
            done(null, error);
        });
};

/**
 * Delete a set of links of tags with projects
 * @param ids Ids of tag-project links
 * @param done
 */
Tag.detachFromProject = function (ids, done) {

    var params = [];
    for (var i = 1; i <= ids.length; i++) {
        params.push('$' + i);
    }

    var sql = "DELETE FROM tag_project_link WHERE id IN (" + params.join(',') + "  )";

    dbhelper.query(sql, ids,
        function (result) {
            done(true);
        },
        function (error) {
            console.error(error);
            done(null, error);
        });
};

/**
 * Attach a set of tags to a project
 * @param {Number} projectId ID of the project to which the tags will be attached
 * @param {Number[]} tagIds IDs of tag-project links
 * @param done
 */
Tag.attachToProject = function (projectId, tagIds, done) {

    var sql = `INSERT INTO tag_project_link(tagid, projectid) VALUES`;

    var params = [projectId];
    params.push.apply(params, tagIds);

    var placeholderPairs = tagIds.map(function(tagId, index) {
        // gives us (tagId, projectId) placeholders to insert after the VALUES statement
        return "($" + (index + 2) + ", $1)"; // tagId placeholders start from $2
    });

    sql += " " + placeholderPairs.join();
    sql += ` ON CONFLICT DO NOTHING`;

    dbhelper.query(sql, params,
        function (result) {
            done(true);
        },
        function (error) {
            console.error(error);
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
            done(null, error);
        });
};

/**
 * Get all tags
 * @param done Function to call with the results
 */
Tag.getAll = function (done) {
    dbhelper.getAllFromTable("tags", done);
};

/**
 * Get all tags for a project
 * @param done Function to call with the results
 */
Tag.getForProject = function (projectId, done) {
    var sql = `SELECT t.*, tpl.id AS linkid FROM tags t
        INNER JOIN tag_project_link tpl ON tpl.tagid=t.id
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