Component('CatalogComponent', {
  kindOf: Ext.grid.GridPanel,
  constructor: function (options) {
    var me = this;
    var columns =
      this.columns.inject([], function (acc, col) {
        acc.push(
          Object.isString(col) ?
            { header: col.capitalize(),dataIndex: col } :
            col
        );
        return acc;
      });
    var storeFields =
      columns.inject([], function (arrOut, column) {
        arrOut.push(column.dataIndex);
        return arrOut;
      });
    
    options.store = new Ext.data.JsonStore({
      autoDestroy: true,
      root: this.model.underscore().pluralize(),
      idProperty: this.idProperty || options.idProperty || this.model.underscore()+'_id',
      fields: storeFields.unshift(this.model.underscore()+'_id') && storeFields,
      data: this.data || options.data
    });
//    options.colModel = new Ext.grid.ColumnModel({
//      defaults: {
//        width: 120,
//        sortable: true
//      },
      options.columns = columns;
//    });
    options.title = this.model.pluralize();
    options.listeners = {
      rowclick: function (grid, rowIndex) {
        window.location.hash = me.dataURI+'/'+grid.getStore().getAt(rowIndex).id;
      }
    };
    Ext.apply(this, options);
  },
  config: {
    viewConfig: {
      forceFit: true,
      tbar: {
        height: 25,
        items: [
          { text: 'New' }
        ]
      }
    },
    sm: new Ext.grid.RowSelectionModel({ singleSelect: true })
  }
});