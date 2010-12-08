var root = this;

String.prototype.slashify = function () {
  var str = this.gsub('.', '/');
  return (str.underscore());
}

function Component (full_name, options) {
  var name_arr = full_name.split('.')
  var last_name = name_arr.pop();
  var module =
    name_arr.inject(root, function (module, name) {
      return (module[name] || (module[name] = {}));
    });
  var config = Object.extend(options.config, { listeners: options.listeners });
  var copy = Ext.extend(options.kind_of, {
    initComponent: function () {
      Ext.apply(this, config);
      module[last_name].superclass.initComponent.apply(this, arguments);
    }
  });
  module[last_name] = copy;
  Ext.reg(full_name.slashify(), module[last_name]);
}

function View (full_name, options) {
  var name_arr = full_name.split('.')
  var last_name = name_arr.pop();
  var module =
    name_arr.inject(root, function (module, name) {
      return (module[name] || (module[name] = {}));
    });
  module[last_name] = options
}