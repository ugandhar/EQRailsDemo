require ('catalog_component')

Component('Ontologies.CatalogComponent', {
  kindOf: CatalogComponent,
  config: {
    model: 'Ontology',
    dataURI: '/ontologies',
    columns: [
      { header: 'Ontology ID', dataIndex: 'ontology_id' },
      'abbreviation'
    ]
  }
});