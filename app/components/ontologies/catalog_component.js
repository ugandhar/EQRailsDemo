require ('catalog_component')

Component('Ontologies.CatalogComponent', {
  kindOf: CatalogComponent,
  config: {
    model: 'Ontology',
    columns: [
      { header: 'Ontology ID', dataIndex: 'ontology_id' },
      'abbreviation'
    ],
    tbar: [
      { text: 'Add',
        handler: function (button) {
          window.location.hash = '/ontologies/new';
        }
      }
    ]
  }
});