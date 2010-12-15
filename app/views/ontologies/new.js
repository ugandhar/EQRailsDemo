require ('ontologies/catalog_component')

View('Ontologies.New', {
  config: {
    components: function () {
      return new Ontologies.CatalogComponent({
        url: '/remote/bioportal/ontologies',
        listeners: {
          rowclick: function (grid, rowIndex) {
            alert('hello');
          }
        }
      })
    }
  }

});