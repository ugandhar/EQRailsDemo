# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended to check this file into your version control system.

ActiveRecord::Schema.define(:version => 20101214183911) do

  create_table "characters", :primary_key => "character_id", :force => true do |t|
    t.string "name", :limit => nil, :null => false
  end

  create_table "ontologies", :id => false, :force => true do |t|
    t.integer "bioportal_ontology_id", :null => false
  end

  create_table "states", :primary_key => "state_id", :force => true do |t|
    t.integer "character_id",                :null => false
    t.string  "name",         :limit => nil, :null => false
  end

end
