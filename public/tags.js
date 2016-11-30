$(function() {
    window.TechRadar = window.TechRadar || {};

    /**
     * Make a call to get all tags 
     */
    TechRadar.getAllTags = function (done) {
        $.ajax({
            type: "GET",
            url: '/api/tags',
            contentType: "application/json",
            success: function(result) {
                if(result.success) {
                    done(result.result); // get the nested results
                } else {
                    console.log('Error getting tags.');
                    done(null, new Error('Error getting tags'));
                }
            }
        });
    }

    /**
     * Return a string (HTML) that represents a tag as a <span> element with an anchor
     * @param tag Contains id and name of a tag
     */
    TechRadar.convertTagToHtml = function(tag) {
        return '<a href="/projects/tag/' + 
            tag.id + '"><span class="tag label label-info">' + 
            tag.name + '</span></a> ';
    }
});
