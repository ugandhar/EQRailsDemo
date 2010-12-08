class StatesController < ApplicationController
  def index
    respond_to do |format|
      format.js
    end
  end
end