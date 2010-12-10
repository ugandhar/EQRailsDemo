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
        new Ext.form.TextField({ fieldLabel: 'Entity' }),
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
        new Ext.form.TextField({ fieldLabel: 'Within' })
      ]
    }),
    new Ext.form.FormPanel({
      itemId: 'form-count',
      autoHeight: true,
      border: false,
      hidden: true,
      items: [
        new Ext.form.TextField({ fieldLabel: 'Entity' }),
        new Ext.form.TextField({ fieldLabel: 'Count'  }),
        new Ext.form.TextField({ fieldLabel: 'Within' })
      ]
    }),
    new Ext.form.FormPanel({
      itemId: 'form-qual',
      autoHeight: true,
      border: false,
      hidden: true,
      items: [
        new Ext.form.TextField({ fieldLabel: 'Entity' }),
        new Ext.form.TextField({ fieldLabel: 'Quality'  }),
        new Ext.form.TextField({ fieldLabel: 'Dependent Entity' })
      ]
    }),
    new Ext.form.FormPanel({
      itemId: 'form-measure',
      autoHeight: true,
      border: false,
      hidden: true,
      items: [
        new Ext.form.TextField({ fieldLabel: 'Entity' }),
        new Ext.form.TextField({ fieldLabel: 'Quality'}),
        new Ext.form.TextField({ fieldLabel: 'Dependent Entity' }),
        new Ext.form.TextField({ fieldLabel: 'Value' }),
        new Ext.form.TextField({ fieldLabel: 'Unit' })
      ]
    })
  ]
});