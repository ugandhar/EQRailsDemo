require ('ontologies/terms/catalog_component')

View('Ontologies.Terms.Index', {
  components:
    new Ontologies.Terms.CatalogComponent({
      data: 'RUBY("@terms.to_json")'.evalJSON()
    })
});