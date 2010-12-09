class ApplicationController < ActionController::Base
  protect_from_forgery

  private

  def render options = {}
    if(options[:js])
      render text: concat_js("app/views/#{self.class.to_s.underscore.sub('_controller', '')}/#{options[:js]}.js")      
    else
      super
    end
  end

  def concat_js filename
    f = File.read(filename)
    f.sub!(/require \(['"]([\w\/]+)['"]\)/) do
      concat_js("app/components/#{$1}.js")
    end
    f
  end

  def rescue_action exception
    render text: exception
  end
end
