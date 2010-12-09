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
    debugger;
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
  options['view_name'] = fullName;
  module[lastName] = options
}