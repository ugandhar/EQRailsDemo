class PhenotypesController < ApplicationController

  def index
    respond_to do |format|
      format.js { render js: 'index' }
    end
  end

  def new
    @ontology_ids = Ontology.all.collect(&:ontology_id)
    respond_to do |format|
      format.js { render js: 'new' }
    end
  end
end