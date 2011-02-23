require ('catalog_component')

Component('Characters.States.CatalogComponent', {
  kindOf: CatalogComponent,
  config: {
    model: 'Characters.State',
    idProperty: 'id',
//    data: {
//      states: [
//        { state_id: 1, name: 'state1' },
//        { state_id: 2, name: 'state2' },
//        { state_id: 3, name: 'state3' }
//      ]
//    },
    columns: [
      'id',
      'name'
    ]
  }
});