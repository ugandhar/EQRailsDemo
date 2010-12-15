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
            Nokogiri::XML(
              open(
                "http://rest.bioontology.org/bioportal/virtual/ontology/#{
                params[:ontology_id]
                }/all?&pagesize=#{
                limit
                }&pagenum=#{
                start_page
                }&email=cgoddard@flmnh.ufl.edu"
              )
            )
          @terms = {
            totalCount: doc.xpath('//success/data/page/numResultsTotal').first.content,
            terms:
              doc.xpath('//success/data/page/contents/classBeanResultList/classBean').collect do |c|
                {
                 id:     c.xpath('id').first.try(:content),
                 fullId: c.xpath('fullId').first.try(:content),
                 label:  c.xpath('label').first.try(:content),
                 type:   c.xpath('type').first.try(:content),
                }
              end
          }
          render json: @terms

        }
      end
    end

    def search
      doc =
        Nokogiri::XML(
          open(
            "http://rest.bioontology.org/bioportal/search/#{
            params[:query]
            }?email=cgoddard@flmnh.ufl.edu&ontologyids=#{
            params[:ontology_id]
            }"
          )
        )
      @terms = {
        totalCount: doc.xpath('//success/data/page/numResultsTotal').first.content,
        terms:
          doc.xpath('//success/data/page/contents/searchResultList/searchBean').collect do |c|
            {
             conceptIdShort:     c.xpath('conceptIdShort').first.try(:content),
             contents:           c.xpath('contents').first.try(:content),
            }
          end
      }

      respond_to do |format|
        format.json { render json: @terms }
      end
    end
  end
end