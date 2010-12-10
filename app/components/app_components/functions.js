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

    this.currentHash = '#';
    this.hashObserver = new PeriodicalExecuter(function (pe) {
      if(APP.currentHash != window.location.hash) {
        APP.currentHash = window.location.hash;
        APP.loadView(APP.currentHash.slice(1));
      }
    }, 0.2);

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
    var route = Route.forPath(path);
//    var splitPath = path.slice(1).split('/');
//    var evenPath = splitPath.reject(function (res, i) { return (i % 2 == 1) });
    var mod =
      route.controller.split('/').inject(root, function (module, part) {
        return ((module && module[part.camelize()]) || null);
      });
    var action = route.action;
    var viewType = mod && mod[action.capitalize()];
    if (viewType) {
      var view = new viewType({ path: path });
      var mainPanel = root.APP.getComponent('app-panel').getComponent('main-panel');
      mainPanel.removeAll(true);
      mainPanel.add(view.components);
      if(APP.currentHash != '#'+path)      { APP.currentHash = '#'+path }
      if(window.location.hash != '#'+path) { window.location.hash = path }
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