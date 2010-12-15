Component('CatalogComponent', {
  kindOf: Ext.grid.GridPanel,
  constructor: function (options) {
    var me = this;
    var url = this.url || options.url;
    var data = this.data || options.data;
    var pageSize = this.pageSize || options.pageSize || 50;
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

    var storeCfg = {
      autoDestroy: true,
      remoteSort: true,
      root: this.model.demodulize().underscore().pluralize(),
      idProperty: this.idProperty || options.idProperty || this.model.demodulize().underscore()+'_id',
      fields: storeFields
    };
    if(!data) {
      storeCfg = Object.extend(storeCfg, {
        url: url,
        restful: true,
        totalProperty: 'totalCount',
        remoteSort: true
      });
    } else {
      storeCfg.data = data
    }
    options.store = new Ext.data.JsonStore(storeCfg);

    if(!data) {
      options.bbar = new Ext.PagingToolbar({
        pageSize: pageSize,
        store: options.store,
        displayInfo: true,
        displayMsg: 'Displaying '+this.model.demodulize().underscore().pluralize()+' {0} - {1} of {2}',
        emptyMsg: "No "+this.model.demodulize().underscore().pluralize()+" to display"
      });
    }
    
//    options.colModel = new Ext.grid.ColumnModel({
//      defaults: {
//        width: 120,
//        sortable: true
//      },
    options.columns = columns;
//    });
    options.loadMask = true;
    options.title = options.title || this.title || this.model.demodulize().pluralize();
    options.listeners || (options.listeners = {})
    options.listeners.rowclick || (options.listeners.rowclick =
      function (grid, rowIndex) {
        window.location.hash = grid.url+'/'+grid.getStore().getAt(rowIndex).id;
      });
    options.listeners.afterrender || (options.listeners.afterrender =
      function () {
        if(!data) {
          options.store.load({ params: { start: 0, limit: pageSize } });
        }
      });
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