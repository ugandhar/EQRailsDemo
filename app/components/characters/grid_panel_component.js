Component('Characters.GridPanelComponent', {
  kind_of: Ext.grid.GridPanel,
  config: {
    store: new Ext.data.JsonStore({
      autoDestroy: true,
      root: 'characters',
      idProperty: 'character_id',
      fields: [
        'character_id', 'name'
      ],
      data: {
        characters: [
          { id: 1, name: 'chr1' },
          { id: 2, name: 'chr2' },
          { id: 3, name: 'chr3' },
          { id: 4, name: 'chr4' },
          { id: 5, name: 'chr5' }
        ]
      }
    }),
    colModel: new Ext.grid.ColumnModel({
      defaults: {
        width: 120,
        sortable: true
      },
      columns: [
        { dataIndex: 'name' }
      ]
    }),
    viewConfig: {
      forceFit: true
    },
    sm: new Ext.grid.RowSelectionModel({ singleSelect: true }),
    title: 'Characters'
  },
  listeners: {
    click: function () {
      APP.loadView('/characters/1');
    }
  }
});