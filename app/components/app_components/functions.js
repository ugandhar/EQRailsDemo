root.AppComponent || (root.AppComponent = {});
root.AppComponent.Functions = {
  // START JS METHOD
  initComponent: function () {
    root.APP = this;
    RUBY['js_full_class_name'].superclass.initComponent.call(this);

    // If we are given a token, load the corresponding component, otherwise load the last loaded component
    var currentToken = Ext.History.getToken();
    if (currentToken != "") {
      //this.processHistory(currentToken);
    } else {
      var lastLoaded = this.initialConfig.componentToLoad; // passed from the server
      if (lastLoaded) Ext.History.add(lastLoaded);
    }


    this.addEvents('viewChange');

    //Ext.History.on('change', this.processHistory, this);

    // Setting the "busy" indicator for Ajax requests
    Ext.Ajax.on('beforerequest', function(){this.findById('main-statusbar').showBusy()}, this);
    Ext.Ajax.on('requestcomplete', function(){this.findById('main-statusbar').hideBusy()}, this);
    Ext.Ajax.on('requestexception', function(){this.findById('main-statusbar').hideBusy()}, this);

    // Initialize history
    Ext.History.init();
  },
  // END JS METHOD

  //// START JSMETHOD
  processHistory: function (token) {
    if (token) {
      this.loadComponent({name:token, container:'main-panel'});
    } else {
      Ext.getCmp('main-panel').removeChild();
    }
  },
  //// END JSMETHOD

  // START JS METHOD
  instantiateComponent: function (config) {
    this.findById('main-panel').instantiateChild(config);
  },
  // END JS METHOD

  // START JS METHOD
  appLoadComponent: function (name) {
    Ext.History.add(name);
  },
  // END JS METHOD

  // START JS METHOD
  loadComponentByAction: function (action) {
    this.appLoadComponent(action.component || action.name);
  },
  // END JS METHOD

  // START JS METHOD
  onToggleConfigMode: function (params) {
    this.toggleConfigMode();
  },
  // END JS METHOD

  // START JS METHOD
  showMasqueradeSelector: function () {
  },
  // END JS METHOD

  // START JS METHOD
  loadView: function (path) {
    var me = this;
    var route = Route.fromPath(path);
//    var splitPath = path.slice(1).split('/');
//    var evenPath = splitPath.reject(function (res, i) { return (i % 2 == 1) });
    var mod =
      route.controller.split('/').inject(root, function (module, part) {
        return ((module && module[part.camelize()]) || null);
      });
    var action = route.action;
    var view = mod && mod[action.capitalize()];
    if (view) {
      var mainPanel = root.APP.getComponent('app-panel').getComponent('main-panel');
      mainPanel.removeAll(true);
      mainPanel.add(view.components);
      mainPanel.doLayout();
      this.fireEvent('viewChange', this, view);
    } else {
      new Ajax.Request(
        path,
        { method: 'get',
          onSuccess: function (transport) {
            eval(transport.responseText);
            me.loadView(path);
          }
        },
      this);
    }
  }
  // END JS METHOD
};