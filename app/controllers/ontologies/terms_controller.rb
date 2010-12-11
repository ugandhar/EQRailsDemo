module Ontologies
  class TermsController < ApplicationController
    def index
      doc = open('http://rest.bioontology.org/bioportal/virtual/ontology/1104/all?'+
              '&pagesize=50&pagenum=1&email=cgoddard@flmnh.ufl.edu') { |f| Hpricot(f) }
      @terms =
        (doc/'success/data/page/contents/classBeanResultList/classBean').collect do |c|
          {
           id: (c/'id').first.try(:to_plain_text),
           fullId: (c/'fullId').first.try(:to_plain_text),
           label: (c/'label').first.try(:to_plain_text),
           type: (c/'type').first.try(:to_plain_text),
          }
        end

      respond_to do |format|
        format.js { render js: 'index' }
      end
    end
  end
end