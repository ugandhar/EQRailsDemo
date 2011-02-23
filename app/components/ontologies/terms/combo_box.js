Component('Ontologies.Terms.ComboBox', {
  kindOf: Ext.form.ComboBox,
  config: {
    tpl: '<tpl for="."><div data-ontology-id="{ontologyId}"  data-concept-id="{conceptIdShort}" class="x-combo-list-item">{contents}</div></tpl>',
    forceSelection: true,
    displayField: 'contents',
    minChars: 3,
    typeAhead: true,
    valueField: 'conceptIdShort',
    plugins: [ {
      init: function (cbox) {
        cbox.on('expand', function (cbox) {
          cbox.mouseoverHandler = function (event) {
            var target = event.target
            new Ajax.Request(
              Route.forPathname('ontology_term_path').getInterpolatedPath({
                ontology_id: target.readAttribute('data-ontology-id'),
                id: target.readAttribute('data-concept-id')
              }), {
                method: 'get',
                onSuccess: function () { 
                  alert('you have achieved success!')
                }
              }
            )
            alert(event.target)
          }
          cbox.innerList.on('mouseover', cbox.mouseoverHandler)
        })
        cbox.on('collapse', function (cbox) {
          cbox.innerList.un('mouseover', cbox.mouseoverHandler)
        })
    } } ],
    store: new Ext.data.JsonStore({
      autoDestroy: true,
      remoteSort: true,
      root: 'terms',
      idProperty: 'conceptIdShort',
      fields: [ 'conceptIdShort', 'ontologyId', 'contents' ],
      url: '/ontologies/'+
        'RUBY("@ontology_ids.to_json")'.evalJSON().join(',')+
        '/terms/search',
      restful: true,
      totalProperty: 'totalCount'
    })
  }
});