module Ontologies
  class TermsController < ApplicationController
    def index
      respond_to do |format|
        format.js { render js: 'index' }
      end
    end
  end
end