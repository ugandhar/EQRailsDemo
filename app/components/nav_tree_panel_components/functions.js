root.TreeNavComponent || (root.TreeNavComponent = {});
root.TreeNavComponent.Functions = {
  // START JS METHOD
  initComponent: function () {
    var me = this;
    RUBY['js_full_class_name'].superclass.initComponent.call(this);

    APP.on('viewChange', function (app, view) {
      if(view.viewName == 'Characters.Show') {
        var parentNode = me.getNodeById('/characters');
        parentNode.expand(false, true, function () {
          parentNode.appendChild({
            id: '/characters/1',
            text: 'chr1',
            children: [
              { id: '/characters/1/states',
                text: 'States'
              }
            ]
          });
          var childNode = me.getNodeById('/characters/1')
          childNode.ensureVisible();
          childNode.select();
          childNode.expand();
        });
      }
    });
    //Ext.History.on('change', this.processHistory, this);
  },
  // END JS METHOD

  // START JS METHOD
  componentForView: function (view) {
    var component;
    switch (view) {
      case 'Characters.Show':
        component = {
          id: '/characters/1',
          text: 'chr1',
          children: [
            { id: '/characters/1/states',
              text: 'States'
            }
          ]
        };
      case 'Characters.States.Show':
        component = {
          id: '/characters/1/states/1',
          text: 'state1',
          children: [
            { id: '/characters/1/states/1/eq_statements',
              text: 'EQ Statements'
            }
          ]
        }
    }
    return component;
  },
  // END JS METHOD

  // START JS METHOD
  onClick: function (n) {
    root.APP.loadView(n.attributes.id);
  }
  // END JS METHOD
};