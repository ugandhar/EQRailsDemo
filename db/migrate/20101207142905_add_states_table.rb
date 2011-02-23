class AddStatesTable < ActiveRecord::Migration
  def self.up
#    execute %{
#      CREATE TABLE states
#      (
#        state_id serial NOT NULL,
#        character_id integer NOT NULL,
#        "name" character varying NOT NULL,
#        PRIMARY KEY (state_id)
#      );
#    }
  end

  def self.down
  end
end
