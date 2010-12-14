class ApplicationController < ActionController::Base
  before_filter :respond_to_js, except: [ 'netzke' ]
  protect_from_forgery

  private

  def respond_to_js
    if request.format.js?
      render js: action_name
      false
    else
      true
    end
  end

  def render options = {}
    if(options[:js])
      render text: concat_js("app/views/#{self.class.to_s.underscore.sub('_controller', '')}/#{options[:js]}.js")      
    else
      super
    end
  end

  def concat_js filename
    f = File.read(filename)
    f.sub!(/RUBY\(['"](.+?)['"]\)/) do
      eval($1)
    end
    f.sub!(/require \(['"]([\w\/]+)['"]\)/) do
      concat_js("app/components/#{$1}.js")
    end
    f
  end

  def rescue_action exception
    render text: exception
  end
end
