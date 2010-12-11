require ('ontologies/catalog_component')

View('Ontologies.Index', {
  components:
    new Ontologies.CatalogComponent({
      data: 'RUBY("@ontologies.to_json")'.evalJSON()
    })
});

