require ('catalog_component')

Component('Phenotypes.CatalogComponent', {
  kindOf: CatalogComponent,
  config: {
    model: 'Phenotype',
    columns: [
      'name'
    ],
    data: {
      phenotypes: [
        { phenotype_id: 1, name: 'pheno1' },
        { phenotype_id: 2, name: 'pheno2' },
        { phenotype_id: 3, name: 'pheno3' }
      ]
    },
    tbar: [
      { text: 'New',
        handler: function () {
          APP.loadView('/characters/1/states/1/phenotypes/new')
        }
      }
    ]
  }
});