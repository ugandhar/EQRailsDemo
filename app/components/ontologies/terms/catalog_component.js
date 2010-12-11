require ('catalog_component')

Component('Ontologies.Terms.CatalogComponent', {
  kindOf: CatalogComponent,
  config: {
    model: 'Ontologies.Term',
    idProperty: 'id',
    columns: [
      { header: 'ID', dataIndex: 'id' },
      { header: 'Full ID', dataIndex: 'fullId' },
      'label',
      'type'
    ]
  }
})