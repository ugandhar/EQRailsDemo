require ('/characters/catalog_component')

View('Characters.Index', {
  config: {
    components: function () {
      return new Characters.CatalogComponent({ url: this.url })
    }
  }
});

