require ('ontologies/catalog_component')

View('Ontologies.New', {
  config: {
    components: function () {
      return new Ontologies.CatalogComponent({
        url: '/remote/bioportal/ontologies',
        title: 'Select an ontology to add',
        tbar: false,
        listeners: {
          rowclick: function (grid, rowIndex) {
            Ext.Ajax.request({
              url: '/ontologies',
              params: { 'ontology[bioportal_ontology_id]': grid.getStore().getAt(rowIndex).id },
              success: function () {
                alert('good work');
              },
              failure: function () {
                alert('bad work');
                // FIXME: I need to be handled
              }
            });
          }
        }
      })
    }
  }

});