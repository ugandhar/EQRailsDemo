root.TreeNavComponent || (root.TreeNavComponent = {});
root.TreeNavComponent.Functions = {
  // START JS METHOD
  onClick: function (n) {
    root.APP.loadView('/'+n.attributes.text.underscore());
  }
  // END JS METHOD
};