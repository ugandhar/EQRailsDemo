var root = this;

String.prototype.slashify = function () {
  var str = this.gsub('.', '/');
  return (str.underscore());
}

String.prototype.pluralize = function () {
  var pluralized;
  if (this.match(/y$/)) {
    pluralized = this.slice(0, -1)+'ies';
  } else {
    pluralized = this+'s';
  }

  return pluralized;
}

String.prototype.singularize = function () {
  var singularized;
  if (this.match(/s$/)) {
    singularized = this.slice(0, -1);
  }
  return singularized;
}

function Component (fullName, options) {
  var nameArr = fullName.split('.')
  var lastName = nameArr.pop();
  var module =
    nameArr.inject(root, function (module, name) {
      return (module[name] || (module[name] = {}));
    });
  var config = Object.extend(options.config, { 
    listeners: options.listeners
  });
  var newComponent = function () {
    Ext.apply(this, config);
    if (options.constructor) {
      options.constructor.call(this, Object.extend(config, arguments[0]));
    }
    module[lastName].superclass.constructor.apply(this, arguments);
  };
  Ext.extend(newComponent, options.kindOf);
  Ext.reg(fullName.slashify(), newComponent);
  module[lastName] = newComponent;
}

function View (fullName, options) {
  var nameArr = fullName.split('.');
  var lastName = nameArr.pop();
  var module =
    nameArr.inject(root, function (module, name) {
      return (module[name] || (module[name] = {}));
    });
  options.viewName = fullName;
  module[lastName] = options
}

Route = {
  fromPath: function (path) {
    var splitPath =
      path.
        sub(/^\//, '').
        split('/');
    var route =
      splitPath.
//        reject(function (part, i) { return (i % 2 == 1) }).
        inject(Routes.PATHS_TO_ROUTES, function (acc, part, i) {
          return (
            part.match(/^\d+$/) ?
              i == (splitPath.size() - 1)? // is last in array
                acc[':id'] :
                acc[':'+splitPath[i-1].singularize()+'_id'] :
              acc[part]
          )
        });
    return route;
  },

  fromControllerAction: function (controller, action) {
    return (Routes.CONTROLLERS_ACTIONS_TO_ROUTES[controller][action])
  }
  
}