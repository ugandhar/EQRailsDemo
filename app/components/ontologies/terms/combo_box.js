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
                requestHeaders: {
                  Accept: 'application/json'
                },
                onSuccess: function (transport) {
                  cbox.tooltip || (cbox.tooltip =
                    new Ext.ToolTip({
                      target: cbox.innerList,
                      html: 
                        "<div>Basic Info</div>"+
                        "<table>"+
                        "<tr>"+
                        "<td valign='top'>Term:</td>"+
                        "<td>"+transport.responseJSON.term+"</td>"+
                        "</tr>"+
                        "<tr>"+
                        "<td>ID:</td>"+
                        "<td>"+transport.responseJSON.id+"</td>"+
                        "</tr>"+
                        "<tr>"+
                        "<td>Ontology:</td>"+
                        "<td>"+transport.responseJSON.ontologyLabel+"</td>"+
                        "</tr>"+
                        "<tr>"+
                        "<td valign='top'>Definition:</td>"+
                        "<td>"+transport.responseJSON.definition+"</td>"+
                        "</tr>"+
                        "</table>"
                    })
                  )
                  cbox.tooltip.show()
                }
              }
            )
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