root.TreeNavComponent || (root.TreeNavComponent = {});
root.TreeNavComponent.Functions = {
  // START JS METHOD
  initComponent: function () {
    var me = this;
    RUBY['js_full_class_name'].superclass.initComponent.call(this);

    APP.on('viewChange', function (app, view) {

      var afterNavNodeAppended = function (navNode) {
        navNode.ensureVisible()
        navNode.select()
        navNode.expand()
      }
      var navNode = me.getNodeById(view.getRoute().getPath());
      if(!navNode) {
        me.appendNavNodeForRoute(view.getRoute(), { onSuccess: afterNavNodeAppended })
      } else {
        afterNavNodeAppended(navNode)
      }
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
  appendNavNodeForRoute: function (route, options) {
    options || (options = {})
    var me = this
    var appendedNode;
    var parentRoute = route.getParentRoute();
    var parentNode = this.getNodeById(parentRoute.getPath());
    var afterParentAppended = function (parentNode) {
      parentNode.expand();
      appendedNode = me.getNodeById(route.getPath())
      if(!appendedNode) {
        var afterServerFetch = function (nodeConfigOpts, myOpts) {
          appendedNode = parentNode.appendChild(me.nodeConfigForRoute(route, nodeConfigOpts))
          myOpts.onSuccess && myOpts.onSuccess(appendedNode)
        }
        if(route.getPath().match(/\d+$/)) {
          new Ajax.Request(route.getPath(), {
            method: 'get',
            requestHeaders: {
              Accept: 'application/json'
            },
            parameters: {
              select: [ 'id', 'label' ].join(',')
            },
            onSuccess: function (transport) {
              var nodeConfigOpts = { label: Object.values(transport.responseJSON).first().label.truncate(20) }
              afterServerFetch(nodeConfigOpts, options)
            }
          })
        } else {
          afterServerFetch({}, options)
        }
      } else {
        options.onSuccess && options.onSuccess(appendedNode)
      }
      
    }
    if(!parentNode) {
      me.appendNavNodeForRoute(parentRoute, { onSuccess: afterParentAppended })
    } else {
      afterParentAppended(parentNode)
    }
    
  },
  // END JS METHOD

  // START JS METHOD
  nodeConfigForRoute: function (route, options) {
    options || (options = {})
    var component
    var routeName = route.controller.camelize();
    if(route.action) { routeName = routeName+'.'+route.action.camelize() }
    switch (routeName) {
      case 'Characters.Show':
        component = {
          id: route.path,
          text: 'Character: '+(options.label || '?')+'',
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
          text: 'State: '+(options.label || '?')+'',
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
          text: 'New',
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