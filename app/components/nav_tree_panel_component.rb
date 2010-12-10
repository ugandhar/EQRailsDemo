class NavTreePanelComponent < Netzke::Base
  include ComponentExt
  
  js_base_class "Ext.tree.TreePanel"

  config do
    {
      header: false,
      rootVisible: false,
      root: {
        text: "Records",
        id: "records",
        hidden: true,
        children: [
          { text: "Characters",
            id: "/characters",
            children: [
              { text: '', hidden: true }
            ]
          }, {
            text: "Ontologies",
            id: "/ontologies",
            children: [
              { text: '', hidden: true }
            ]
          }
        ]
      },
      listeners: {
        click: { fn: js_method(:on_click) }
      }
    }
  end

  js_method :init_component
  js_method :append_nav_node_for_path
  js_method :node_config_for_path


#  js_method :child_node_for_view
#  js_method :child_to_append_for_view
#  js_method :parent_node_for_view
  js_method :on_click
end