class NavTreePanelComponent < Netzke::Base
  include ComponentExt
  
  js_base_class "Ext.tree.TreePanel"

  config do
    {
      header: false,
      root: {
        text: "Records",
        children: [
          { text: "Characters",
            leaf: true
          },
          { text: "States",
            leaf: true
          }
        ]
      },
      listeners: {
        click: { fn: js_method(:on_click) }
      }
    }
  end

  js_method :on_click
end