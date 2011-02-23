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

    def show
      doc =
        Nokogiri::XML(
          open(
            "http://rest.bioontology.org/bioportal/virtual/ontology/#{params[:ontology_id]}?email=cgoddard@flmnh.ufl.edu"
          )
        )
      version_id = doc.xpath('//success/data/ontologyBean/id').first.content
      ontology_label = doc.xpath('//success/data/ontologyBean/displayLabel').first.content
      doc =
        Nokogiri::XML(
          open(
            "http://rest.bioontology.org/bioportal/concepts/#{version_id}?conceptid=#{params[:id]}&email=cgoddard@flmnh.ufl.edu"
          )
        )
      out = {
        term: doc.xpath('//success/data/classBean/label').first.content,
        id: doc.xpath('//success/data/classBean/id').first.content,
        ontologyLabel: ontology_label,
        definition: doc.xpath('//success/data/classBean/definitions/string').first.content
      }
      respond_to do |format|
        format.json { render json: out }
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
             ontologyId:         c.xpath('ontologyId').first.try(:content),
             contents:           c.xpath('contents').first.try(:content)
            }
          end
      }

      respond_to do |format|
        format.json { render json: @terms }
      end
    end
  end
end