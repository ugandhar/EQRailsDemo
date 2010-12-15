Component('Ontologies.Terms.ComboBox', {
  kindOf: Ext.form.ComboBox,
  config: {
    forceSelection: true,
    displayField: 'contents',
    minChars: 0,
    typeAhead: true,
    valueField: 'conceptIdShort',
    store: new Ext.data.JsonStore({
      autoDestroy: true,
      remoteSort: true,
      root: 'terms',
      idProperty: 'conceptIdShort',
      fields: [ 'conceptIdShort', 'contents' ],
      url: '/ontologies/'+
        'RUBY("@ontology_ids.to_json")'.evalJSON().join(',')+
        '/terms/search',
      restful: true,
      totalProperty: 'totalCount'
    })
  }
});