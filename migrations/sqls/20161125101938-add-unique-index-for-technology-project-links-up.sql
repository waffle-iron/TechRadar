ALTER TABLE technology_project_link 
    DROP CONSTRAINT IF EXISTS 
    technology_project_link_technologyid_projectid_software_ver_key;

CREATE UNIQUE INDEX unique_technology_project_link
	ON  technology_project_link(
        coalesce(technologyid,-1),
        coalesce(projectid,-1),
        coalesce(software_version_id,-1)
    );