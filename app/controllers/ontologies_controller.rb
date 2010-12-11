class OntologiesController < ApplicationController
  def index
    doc =
      open('http://rest.bioontology.org/bioportal/ontologies?email=cgoddard@flmnh.ufl.edu') do |f|
        Hpricot(f)
      end
    @ontologies = { ontologies:
      (doc/'success/data/list/ontologybean').collect{|o|
        { ontology_id: (o/'ontologyid').try(:first).try(:to_plain_text),
          abbreviation: (o/'abbreviation').try(:first).try(:to_plain_text)
        }
      }
    }

    respond_to do |format|
      format.js { render js: 'index' }
    end
  end

  def show
    respond_to do |format|
      format.js { render js: 'show' }
    end
  end
end