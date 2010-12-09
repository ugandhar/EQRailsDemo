require ('catalog_component')

Component('Characters.CatalogComponent', {
  kindOf: CatalogComponent,
  config: {
    model: 'Character',
    dataURI: '/characters',
    data: {
      characters: [
        { character_id: 1, name: 'chr1' },
        { character_id: 2, name: 'chr2' },
        { character_id: 3, name: 'chr3' },
        { character_id: 4, name: 'chr4' },
        { character_id: 5, name: 'chr5' }
      ]
    },
    columns: [
      'name'
    ]
  }
});