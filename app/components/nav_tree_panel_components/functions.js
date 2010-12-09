root.TreeNavComponent || (root.TreeNavComponent = {});
root.TreeNavComponent.Functions = {
  // START JS METHOD
  initComponent: function () {
    var me = this;
    RUBY['js_full_class_name'].superclass.initComponent.call(this);

    APP.on('viewChange', function (app, view) {
      var nodeToAdd = me.childToAppendForView(view);
      if(nodeToAdd) {
        var parentNode = me.parentNodeForView(me, view);
        parentNode.expand(false, true, function () {
          parentNode.appendChild(nodeToAdd);
          var childNode = me.childNodeForView(me, view);
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
  parentNodeForView: function (me, view) {
    var node;
    switch(view.viewName) {
      case 'Characters.Show':
        node = me.getNodeById('/characters');
        break;
      case 'Characters.States.Show':
        node = me.getNodeById('/characters/1/states');
        break;

    }
    return node;
  },
  // END JS METHOD

  // START JS METHOD
  childNodeForView: function (me, view) {
    var node;
    switch (view.viewName) {
      case 'Characters.Show':
        node = me.getNodeById('/characters/1');
        break;
      case 'Characters.States.Show':
        node = me.getNodeById('/characters/1/states/1');
        break;
    }
    return node;
  },
  // END JS METHOD


  // START JS METHOD
  childToAppendForView: function (view) {
    var component;
    switch (view.viewName) {
      case 'Characters.Show':
        component = {
          id: '/characters/1',
          text: 'chr1',
          children: [
            { id: '/characters/1/states',
              text: 'States',
              children: [
                { hidden: true }
              ]
            }
          ]
        };
        break;
      case 'Characters.States.Show':
        component = {
          id: '/characters/1/states/1',
          text: 'state1',
          children: [
            { id: '/characters/1/states/1/phenotypes',
              text: 'Phenotypes'
            }
          ]
        };
        break;
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