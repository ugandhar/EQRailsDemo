require 'xml'

class OntologiesController < ApplicationController
  def index
    start = (params[:start].to_i || 0)
    limit = (params[:limit].to_i || 50)
    doc =
      open('http://rest.bioontology.org/bioportal/ontologies?email=cgoddard@flmnh.ufl.edu') do |f|
        parser = XML::Parser.string(f.read)
        parser.parse
      end

    debugger
    all_ontology_ids = !request.request_uri.match(/^\/remote/) &&
      Ontology.select(:bioportal_ontology_id).all.collect(&:bioportal_ontology_id)
    all_ontologies =
      doc.find('//success/data/list/ontologyBean').inject([]) {|acc, o|
        ontology_id = o.find('ontologyId').try(:first).try(:inner_xml).to_i

        if !all_ontology_ids || all_ontology_ids.include?(ontology_id)
          acc <<
            { ontology_id:  ontology_id,
              abbreviation: o.find('abbreviation').try(:first).try(:inner_xml)
            }
        end
        acc
      }
    @ontologies = { 
      totalCount: all_ontologies.size,
      ontologies: all_ontologies[start, limit]
    }

    respond_to do |format|
      format.json { render json: @ontologies }
    end
  end

  def show
    respond_to do |format|
      format.js { render js: 'show' }
    end
  end
end