ALTER TABLE technologies DROP CONSTRAINT IF EXISTS technology_name_constr;
CREATE UNIQUE INDEX technology_name_unique_lowercase_idx ON technologies(LOWER(name));