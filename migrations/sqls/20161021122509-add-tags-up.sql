CREATE TABLE tags (
    id SERIAL PRIMARY KEY,
    name VARCHAR(32)
);

CREATE UNIQUE INDEX tags_name_unique_lowercase_idx 
    ON tags(LOWER(name));

CREATE TABLE tag_project_link(
            id SERIAL PRIMARY KEY,
            tagid INTEGER references tags(id) ON DELETE CASCADE,
            projectid INTEGER references projects(id) ON DELETE CASCADE
            
);

ALTER TABLE tag_project_link 
    ADD UNIQUE (projectid, tagid);