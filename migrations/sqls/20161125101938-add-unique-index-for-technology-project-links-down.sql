ALTER TABLE technology_project_link 
    ADD UNIQUE (technologyid, projectid, software_version_id);

DROP INDEX unique_technology_project_link;