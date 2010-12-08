class CharactersController < ApplicationController
  def index
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
