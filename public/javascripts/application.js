var root = this;

String.prototype.camelize = function (lowFirstLetter) {
  var out = this;
  if(!lowFirstLetter) {
    out = this.capitalize();
  }
  out = out.gsub(/_([a-z])/, function (match) { return match[1].capitalize() });
  out = out.gsub(/\/([a-z])/, function (match) { return ('/'+match[1].capitalize()) });
  out = out.gsub(/\//, '.')
  return out;
};

String.prototype.slashify = function () {
  var str = this.gsub('.', '/');
  return (str.underscore());
};

String.prototype.pluralize = function () {
  var pluralized;
  if (this.match(/y$/)) {
    pluralized = this.slice(0, -1)+'ies';
  } else {
    pluralized = this+'s';
  }

  return pluralized;
};

String.prototype.singularize = function () {
  var singularized;
  if (this.match(/ies$/)) {
    singularized = this.slice(0, -3)+'y';
  } else if (this.match(/s$/)) {
    singularized = this.slice(0, -1);
  }
  return singularized;
};

String.prototype.demodulize = function () {
  return this.split('.').pop()
};

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

function View (fullName, proto) {
  var nameArr = fullName.split('.');
  var lastName = nameArr.pop();
  var module =
    nameArr.inject(root, function (module, name) {
      return (module[name] || (module[name] = {}));
    });
  var config = proto.config;
  proto.viewName = fullName;
  module[lastName] = function (opts) {
    this.path = opts.path;
    this.url = opts.path;
    this.components = config ?
      Object.isFunction(config.components) ?
        config.components.apply(this) :
        config.components :
      proto.components;
  }
  module[lastName].prototype = {
    getRoute: function () {
      return Route.forPath(this.path)
    }
  };
}

Route = function (routeHash) {
  Object.extend(this, routeHash);
}
Object.extend(Route, {
  forPath: function (path) {
    var nippedPath = path.sub(/^\//, '');
    var splitPath =
      nippedPath.blank() ?
        [] :
        nippedPath.split('/');
    var routeHash =
      splitPath.
        inject(Routes.PATHS_TO_ROUTES, function (acc, part, i) {
          return (
            part.match(/^[\d,]+$/) ?
              i == (splitPath.size() - 1)? // is last in array
                acc[':id'] :
                acc[':'+splitPath[i-1].singularize()+'_id'] :
              acc[part]
          )
        });
    return new Route(Object.extend(routeHash, { path: path }));
  },

  fromControllerAction: function (controller, action) {
    return new Route(Routes.CONTROLLERS_ACTIONS_TO_ROUTES[controller][action])
  }
  
});
Route.prototype = {
  getParentRoute: function () {
    var splitPath = this.path.split('/');
    splitPath.pop();
    if(splitPath.size() == 1) { splitPath.push('') } // this is used to return '/' when at home path
    return Route.forPath(splitPath.join('/'));
  },

  getPath: function () {
    return this.path
  }
}

HashObserver = Class.create(Abstract.TimedObserver, {
  getValue: function() {
    return window.location.hash;
  }
});

Ext.Ajax.defaultHeaders = {
  'Accept': 'application/json'
};
