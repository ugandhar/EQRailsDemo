class ApplicationController < ActionController::Base
  protect_from_forgery

  private

  def render options = {}
    if(options[:js])
      f = File.read("app/views/characters/#{options[:js]}.js")
      f.sub!(/require \(['"][\w\/]+['"]\)/, File.read('app/components/characters/grid_panel_component.js'))
      render text: f
    else
      super
    end
  end

  def rescue_action exception
    render text: exception
  end
end
