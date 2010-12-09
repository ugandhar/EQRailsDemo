require ('catalog_component')

Component('Ontologies.CatalogComponent', {
  kindOf: CatalogComponent,
  config: {
    model: 'Ontology',
    dataURI: '/ontologies',
    columns: [
      'name',
      { header: 'URI', dataIndex: 'uri' }
    ],
    data: {
      ontologies: [
        { ontology_id: 1, name: 'ont1', uri: 'uri1' },
        { ontology_id: 2, name: 'ont2', uri: 'uri2' },
        { ontology_id: 3, name: 'ont3', uri: 'uri3' }
      ]
    }
  }
});