class AddCharactersTable < ActiveRecord::Migration
  def self.up
    execute %{
      CREATE TABLE characters
      (
         character_id serial NOT NULL,
         "name" character varying NOT NULL,
          PRIMARY KEY (character_id)
      );
    }
  end

  def self.down
    execute %{
      DROP TABLE characters;
    }
  end
end
