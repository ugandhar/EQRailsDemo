require ('/characters/states/catalog_component')

View('Characters.States.Index', {
  config: {
    components: function () {
      return new Characters.States.CatalogComponent({ url: this.url })
    }
  }
});

