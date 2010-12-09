Component('CatalogComponent', {
  kindOf: Ext.grid.GridPanel,
  constructor: function (options) {
    var storeFields =
      this.columns.inject([], function (arrOut, column) {
        arrOut.push(column.dataIndex || column);
        return arrOut;
      });
    var columns =
      this.columns.inject([], function () {

      });
    options.store = new Ext.data.JsonStore({
      autoDestroy: true,
      root: this.model.underscore().pluralize(),
      idProperty: this.model.underscore()+'_id',
      fields: storeFields.unshift(this.model.underscore()+'_id') && storeFields,
      data: this.data
    });
    options.colModel = new Ext.grid.ColumnModel({
      defaults: {
        width: 120,
        sortable: true
      },
      columns: this.columns
    });
    options.title = this.model.pluralize();
    options.listeners = {
      click: function () {
        // get params
        APP.loadView('/ontologies/1');
      }
    };
    Ext.apply(this, options);
  },
  config: {
    viewConfig: {
      forceFit: true
    },
    sm: new Ext.grid.RowSelectionModel({ singleSelect: true })
  }
});