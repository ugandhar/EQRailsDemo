class CharactersController < ApplicationController
  include Restful::Responder

  def index
    respond_to do |format|
      format.any(:xml, :json) {
        @characters =
          (@resource = Character).
            offset(params[:start].to_i || 0).
            limit( params[:limit].to_i || 50)

        render request.format.to_sym => @characters
      }
      format.js { render js: 'index' }
    end
  end

  def show
    
    respond_to do |format|
      format.any(:xml, :json) {
        parse(params)
        @character =
          (@resource = Character.scoped).
            apply_finder_options(prepare(params, for: :finder)).
            find(params[:id])
        render request.format.to_sym => @character
      }
      format.js { render js: 'show' }
    end
  end
end
