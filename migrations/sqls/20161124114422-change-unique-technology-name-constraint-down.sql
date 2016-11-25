DROP INDEX IF EXISTS technology_name_unique_lowercase_idx;
ALTER TABLE technologies ADD CONSTRAINT technology_name_constr UNIQUE (name);