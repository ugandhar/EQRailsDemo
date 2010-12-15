class CreateOntologiesTable < ActiveRecord::Migration
  def self.up
    execute %{
      CREATE TABLE ontologies (
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
