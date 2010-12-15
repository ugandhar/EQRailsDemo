class NavTreePanelComponent < Netzke::Base
  include ComponentExt
  
  js_base_class "Ext.tree.TreePanel"

  config do
    {
      rootVisible: false,
      root: {
        text: "Records",
        id: "/",
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
          },
          { text: "Remote",
            id: "/remote",
            children: [
              { text: "BioPortal",
                id: "/remote/bioportal",
                children: [
                  {
                    text: "Ontologies",
                    id: "/remote/bioportal/ontologies",
                    children: [
                      { text: "", hidden: true }
                    ]
                  }
                ]
              }
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
  js_method :append_nav_node_for_route
  js_method :node_config_for_route


#  js_method :child_node_for_view
#  js_method :child_to_append_for_view
#  js_method :parent_node_for_view
  js_method :on_click
end