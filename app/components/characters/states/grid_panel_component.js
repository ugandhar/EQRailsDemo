Component('Characters.States.GridPanelComponent', {
  kindOf: Ext.grid.GridPanel,
  config: {
    store: new Ext.data.JsonStore({
      autoDestroy: true,
      root: 'states',
      idProperty: 'state_id',
      fields: [
        'state_id', 'name'
      ],
      data: {
        states: [
          { state_id: 1, name: 'state1' },
          { state_id: 2, name: 'state2' },
          { state_id: 3, name: 'state3' }
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
    title: 'States'
  },
  listeners: {
    click: function () {
      APP.loadView('/characters/1/states/1');
    }
  }
});