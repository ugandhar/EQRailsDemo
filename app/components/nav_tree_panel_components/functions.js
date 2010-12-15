root.TreeNavComponent || (root.TreeNavComponent = {});
root.TreeNavComponent.Functions = {
  // START JS METHOD
  initComponent: function () {
    var me = this;
    RUBY['js_full_class_name'].superclass.initComponent.call(this);

    APP.on('viewChange', function (app, view) {

      var navNode = me.getNodeById(view.getRoute().getPath());
      if(!navNode) { navNode = me.appendNavNodeForRoute(view.getRoute()) }
      navNode.ensureVisible();
      navNode.select();
      navNode.expand();
    });

//      me.ensureNodeVisibleForView(view);
//      var node = me.nodeForView(view);
//      node.select();
//
//
//
//      var nodeToAdd = me.childToAppendForView(view);
//      if(nodeToAdd) {
//        var parentNode = me.parentNodeForView(me, view);
//        if(!parentNode) {
//        }
//        parentNode.expand(false, true, function () {
//          parentNode.appendChild(nodeToAdd);
//          var childNode = me.childNodeForView(me, view);
//          childNode.ensureVisible();
//          childNode.select();
//          childNode.expand();
//        });
//      }
    
    //Ext.History.on('change', this.processHistory, this);
  },
  // END JS METHOD

  // START JS METHOD
  appendNavNodeForRoute: function (route) {
    var appendedNode;
    var parentRoute = route.getParentRoute();
    var parentNode = this.getNodeById(parentRoute.getPath());
    if(!parentNode) {
      parentNode = this.appendNavNodeForRoute(parentRoute);
    }
    parentNode.expand();
    appendedNode = this.getNodeById(route.getPath());
    if(!appendedNode) {
      appendedNode = parentNode.appendChild(this.nodeConfigForRoute(route));
    }
    return appendedNode;
  },
  // END JS METHOD

  // START JS METHOD
  nodeConfigForRoute: function (route) {
    var component
    var routeName = route.controller.camelize();
    if(route.action) { routeName = routeName+'.'+route.action.camelize() }
    switch (routeName) {
      case 'Characters.Show':
        component = {
          id: route.path,
          text: 'Character: ?',
          children: [
            { id: route.path+'/states',
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
          id: route.path,
          text: 'State: ?',
          children: [
            { id: route.path+'/phenotypes',
              text: 'Phenotypes',
              children: [
                { hidden: true }
              ]
            }
          ]
        };
        break;
      case 'Phenotypes.New':
        component = {
          id: route.path,
          text: 'New: ?',
          children: [
            { hidden: true }
          ]
        };
        break;
      case 'Ontologies.New':
        component = {
          id: route.path,
          text: 'New Ontology',
          children: [
            { hidden: true }
          ]
        };
        break;
      case 'Ontologies.Show':
        component = {
          id: route.path,
          text: 'Ontology: ?',
          children: [
            { id: route.path+'/terms',
              text: 'Terms',
              children: [
                { hidden: true }
              ]
            }
          ]
        }
        break;
      default:
        alert("couldn't find config for path "+route.path);
    }
    return component;
  },
  // END JS METHOD

  // START JS METHOD
  onClick: function (n) {
    window.location.hash = n.attributes.id;
  }
  // END JS METHOD
};