class CreateOntologiesTable < ActiveRecord::Migration
  def self.up
    execute %{
      CREATE TABLE ontologies (
        ontology_id SERIAL NOT NULL,
        bioportal_ontology_id integer NOT NULL
      );
    }
  end

  def self.down
    execute %{
      DROP TABLE ontologies;
    }
  end
end
