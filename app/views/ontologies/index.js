require ('ontologies/catalog_component')

View('Ontologies.Index', {
  config: {
    components: function () {
      return new Ontologies.CatalogComponent({ url: this.url });
    }
  }
});

