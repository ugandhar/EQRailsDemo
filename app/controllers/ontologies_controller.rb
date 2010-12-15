class OntologiesController < ApplicationController
  def index
    respond_to do |format|
      format.any(:xml, :json) {
        @ontologies = 
          (request.fullpath.match(/^\/remote/) ?
            Remote::Bioportal::Ontology :
            Ontology
          ).
            offset(params[:start].to_i || 0).
            limit( params[:limit].to_i || 50).
            all_hash
        
        render request.format.to_sym => @ontologies
      }
      format.js {
        render js: 'index'
      }
    end
  end

  def new
    respond_to do |format|
      format.js { render js: 'new' }
    end
  end

  def show
    respond_to do |format|

      format.js { render js: 'show' }
    end
  end

  def create
    Ontology.create!(params[:ontology])
    # TODO: need to not just throw validation errors to the application controller
    head :ok
  end
end