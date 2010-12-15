class AppComponent < Netzke::Base
  include ComponentExt
  
  js_base_class "Ext.Viewport"
  js_property :layout, :border

  def self.include_js
    res = []
    ext_examples = Netzke::Core.ext_location.join("examples")
    res << ext_examples.join("ux/statusbar/StatusBar.js")
    #res << "#{File.dirname(__FILE__)}/basic_app/statusbar_ext.js"
  end

  class_attribute :login_url
  self.login_url = "/login"

  class_attribute :logout_url
  self.logout_url = "/logout"

  config do
    {
      :region => 'center',
      :layout => 'border',
      :items => [
        {
          :region => 'north',
          :height => 40,
          :html => %Q{
            <div>
              EQ demo app
            </div>
          }
        },{
          :id => 'app-panel',
          :region => 'center',
          :layout => 'border',
          :defaults => {
            :split => true
          },
          :items => [
            {
              :id => 'main-panel',
              :region => 'center',
              :layout => 'fit',
            }, {
              id: 'nav-panel',
              region: 'west',
              header: false,
              layout: 'fit',
              width: 250,
              collapsible: true,
              collapseMode: 'mini',
              items: [{
                title: 'Navigation',
                class_name: 'NavTreePanelComponent',
              }]
            }, {
              region: 'south',
              layout: 'fit',
              collapsible: true,
              collapsed: true,
              collapseMode: 'mini',
              header: false,
              height: 100,
            }, {
              region: 'east',
              layout: 'fit',
              collapsible: true,
              collapsed: true,
              collapseMode: 'mini',
              header: false,
              width: 100,
            }, {
              region: 'north',
              layout: 'fit',
              collapsible: true,
              collapsed: true,
              collapseMode: 'mini',
              header: false,
              height: 100
            }

          ]
        }
      ]
    }
  end
  
  js_method :init_component

  #js_method :process_history

  js_method :instantiate_component

  js_method :app_load_component

  js_method :load_component_by_action

  js_method :on_toggle_config_mode

  js_method :load_view

  

  def user_menu
    [:logout.action
    ]
  end

  def initialize(*args)
    super

    if session[:netzke_just_logged_in] || session[:netzke_just_logged_out]
      session[:config_mode] = false
      session[:masq_world] = session[:masq_user] = session[:masq_roles] = nil
    end

    strong_children_config.deep_merge!(:mode => :config) if session[:config_mode]
  end


  action :masquerade_selector, :text => "Masquerade as ...", :handler => :show_masquerade_selector

  action :toggle_config_mode do
    {:text => "#{session[:config_mode] ? "Leave" : "Enter"} config mode"}
  end

  action :login, :icon => :door_in

  action :logout, :icon => :door_out

  action :characters, :text => "Characters", :handler => :load_component_by_action

  # HTML required for Ext.History to work
  def js_component_html
    super << %Q{
<form id="history-form" class="x-hidden">
<input type="hidden" id="x-history-field" />
<iframe id="x-history-frame"></iframe>
</form>
}
  end

  #
  # Interface section
  #

  endpoint :characters do |params|
    {
      :main_panel => { :set_text => "Hello there" }
    }
  end

  endpoint :toggle_config_mode do |params|
    session = Netzke::Base.session
    session[:config_mode] = !session[:config_mode]
    {:js => "window.location.reload();"}
  end

  endpoint :masquerade_as do |params|
    session = Netzke::Base.session
    session[:masq_world] = params[:world] == "true"
    session[:masq_role] = params[:role].try(:to_i)
    session[:masq_user] = params[:user].try(:to_i)
    {:js => "window.location.reload();"}
  end
end