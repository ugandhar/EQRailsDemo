require ('ontologies/terms/combo_box')

View('Phenotypes.New', {
  components: [
    new Ext.form.FormPanel({
      autoHeight: true,
      border: false,
      items: [
//        new Ext.form.TextField({
//          id: 'field-entity',
//          fieldLabel: 'Entity'
//        }),
        new Ext.form.RadioGroup({
          fieldLabel: 'Type',
          columns: 1,
          items: [
            {
              boxLabel: 'Presence / absence',
              name: 'field-type',
              value: 'pa'
            }, {
              boxLabel: 'Count',
              name: 'field-type',
              value: 'count'
            }, {
              boxLabel: 'Qualitative',
              name: 'field-type',
              value: 'qual'
            }, {
              boxLabel: 'Measurement',
              name: 'field-type',
              value: 'measure'
            }
          ],
          listeners: {
            change: function (radioGroup, checked) {
              radioGroup.items.each(function (item) {
                if(item != checked) { item.hide() }
                
              })
              var formItemId = 'form-'+checked.value;
              var parent = radioGroup.findParentBy(function (parent) { return parent.getComponent(formItemId) });
              var formToShow = parent.getComponent(formItemId);
              formToShow.show();
            }
          }
        })
      ]
    }),
    new Ext.form.FormPanel({
      itemId: 'form-pa',
      autoHeight: true,
      border: false,
      hidden: true,
      items: [
        new Ontologies.Terms.ComboBox({
          fieldLabel: 'Entity'
        }),
//        new Ext.form.TextField({ fieldLabel: 'Entity' }),
        new Ext.form.Radio({
          name: 'field-presence',
          boxLabel: 'Present',
          value: 'present'
        }),
        new Ext.form.Radio({
          name: 'field-presence',
          boxLabel: 'Absent',
          value: 'absent'
        }),
        new Ext.form.ComboBox({
          fieldLabel: 'Within',
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
            url: '/ontologies/1107/terms/search',
            restful: true,
            totalProperty: 'totalCount'
          })
        })
      ]
    }),
    new Ext.form.FormPanel({
      itemId: 'form-count',
      autoHeight: true,
      border: false,
      hidden: true,
      items: [
        new Ext.form.ComboBox({
          fieldLabel: 'Entity',
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
            url: '/ontologies/1107/terms/search',
            restful: true,
            totalProperty: 'totalCount'
          })
        }),
        new Ext.form.TextField({ fieldLabel: 'Count'  }),
        new Ext.form.ComboBox({
          fieldLabel: 'Within',
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
            url: '/ontologies/1107/terms/search',
            restful: true,
            totalProperty: 'totalCount'
          })
        })
      ]
    }),
    new Ext.form.FormPanel({
      itemId: 'form-qual',
      autoHeight: true,
      border: false,
      hidden: true,
      items: [
        new Ext.form.ComboBox({
          fieldLabel: 'Entity',
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
            url: '/ontologies/1107/terms/search',
            restful: true,
            totalProperty: 'totalCount'
          })
        }),
        new Ext.form.ComboBox({
          fieldLabel: 'Quality',
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
            url: '/ontologies/1107/terms/search',
            restful: true,
            totalProperty: 'totalCount'
          })
        }),
        new Ext.form.ComboBox({
          fieldLabel: 'Dependent Entity',
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
            url: '/ontologies/1107/terms/search',
            restful: true,
            totalProperty: 'totalCount'
          })
        })
      ]
    }),
    new Ext.form.FormPanel({
      itemId: 'form-measure',
      autoHeight: true,
      border: false,
      hidden: true,
      items: [
        new Ext.form.ComboBox({
          fieldLabel: 'Entity',
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
            url: '/ontologies/1107/terms/search',
            restful: true,
            totalProperty: 'totalCount'
          })
        }),
        new Ext.form.ComboBox({
          fieldLabel: 'Quality',
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
            url: '/ontologies/1107/terms/search',
            restful: true,
            totalProperty: 'totalCount'
          })
        }),
        new Ext.form.ComboBox({
          fieldLabel: 'Dependent Entity',
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
            url: '/ontologies/1107/terms/search',
            restful: true,
            totalProperty: 'totalCount'
          })
        }),
        new Ext.form.TextField({ fieldLabel: 'Value' }),
        new Ext.form.TextField({ fieldLabel: 'Unit' })
      ]
    })
  ]
});