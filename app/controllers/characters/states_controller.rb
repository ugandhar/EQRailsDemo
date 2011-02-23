module Characters
  class StatesController < ApplicationController
    include Restful::Responder
    
    def index
      respond_to do |format|
        format.any(:xml, :json) {
          @states =
            (@resource = Character.find(params[:character_id]).states).
              offset(params[:start].to_i || 0).
              limit( params[:limit].to_i || 50)

          render request.format.to_sym => @states
        }
        format.js { render js: 'index' }
      end
    end

    def show
      respond_to do |format|
        format.any(:xml, :json) {
          parse(params)
          @state =
            (@resource = State.scoped).
              apply_finder_options(prepare(params, for: :finder)).
              find(params[:id])
          render request.format.to_sym => @state
        }
        format.js { render js: 'show' }
      end
    end
  end
end