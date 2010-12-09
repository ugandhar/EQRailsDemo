class PhenotypesController < ApplicationController
  def index
    respond_to do |format|
      format.js { render js: 'index' }
    end
  end

  def new
    respond_to do |format|
      format.js { render js: 'new' }
    end
  end
end