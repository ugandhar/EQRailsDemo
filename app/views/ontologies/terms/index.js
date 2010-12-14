require ('ontologies/terms/catalog_component')

View('Ontologies.Terms.Index', {
  config: {
    components: function () {
      return new Ontologies.Terms.CatalogComponent({ url: this.url })
    }
  }
});