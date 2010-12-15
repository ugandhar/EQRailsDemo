require 'xml'

module Ontologies
  class TermsController < ApplicationController
    def index
      respond_to do |format|
        format.js { render js: 'index' }
        format.all(:json, :xml) {
          start = (params[:start] || 0).to_i
          limit = (params[:limit] || 20).to_i
          start_page = (start / limit) + 1
          doc =
            open("http://rest.bioontology.org/bioportal/virtual/ontology/#{params[:ontology_id]}/all?"+
                 "&pagesize=#{limit}&pagenum=#{start_page}&email=cgoddard@flmnh.ufl.edu") { |f|
              parser = XML::Parser.string(f.read)
              parser.parse
            }
          @terms = {
            totalCount: doc.find('//success/data/page/numResultsTotal').first.inner_xml,
            terms:
              doc.find('//success/data/page/contents/classBeanResultList/classBean').collect do |c|
                {
                 id:     c.find('id').first.try(:inner_xml),
                 fullId: c.find('fullId').first.try(:inner_xml),
                 label:  c.find('label').first.try(:inner_xml),
                 type:   c.find('type').first.try(:inner_xml),
                }
              end
          }
          render json: @terms

        }
      end
    end

    def search
      doc =
        open("http://rest.bioontology.org/bioportal/search/#{params[:query]}?email=cgoddard@flmnh.ufl.edu&ontologyids=#{params[:ontology_id]}") { |f|
          parser = XML::Parser.string(f.read)
          parser.parse
        }
      @terms = {
        totalCount: doc.find('//success/data/page/numResultsTotal').first.inner_xml,
        terms:
          doc.find('//success/data/page/contents/searchResultList/searchBean').collect do |c|
            {
             conceptIdShort:     c.find('conceptIdShort').first.try(:inner_xml),
             contents:           c.find('contents').first.try(:inner_xml),
            }
          end
      }

      respond_to do |format|
        format.json { render json: @terms }
      end
    end
  end
end