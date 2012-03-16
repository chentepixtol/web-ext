
var defaultMargins = {
	'top': 5,
	'right': 5,
	'bottom': 5,
	'left': 5
}


var sayHello = function(){
	Ext.Msg.alert('Dialog', 'Hola');
}

Ext.onReady(function(){
	
    addTab = function(){
        main.add({
            title: this.title,
			padding: 5,
            id: 'tab' + this.getItemId(),
            closable: true,
            autoLoad: this.url
        }).show();
    }

	
	var formPanel = new Ext.FormPanel({
		region: 'center',
		frame: true,
		bodyStyle: 'padding: 5px;',
		margins: defaultMargins,
		items: [{
			xtype: 'datefield',
			fieldLabel: 'Fecha de Nacimiento',
			name: 'birthdate' 
		}],
		buttons: [{
			text: 'save',
			handler: function(b, e){
				formPanel.getForm().submit({
					url: 'save.php',
					success: function(form, action){
						Ext.Msg.alert('Respuesta', action.result.msg);
						win.hide();
					},
					failure: function(){
						Ext.Msg.alert('fallo');
						win.hide();
					}
				});
			}
		},{
			text: 'cancel', 
			handler: function(b, e){
				win.hide();
			}
		}]
	});
	
	
	var win = new Ext.Window({
		id: 'window1',
		title: 'Nueva Ventana',
		closable: true,
		layout: 'border',
		width: 480,
		height: 320,
		plain: true,
		closeAction: 'hide',
		items: [formPanel]
	});
	
	var mainItem = new Ext.Panel({
	    title: 'Principal',
	    contentEl: 'main',
	    closable: false
	});
	
	var menuTop = new Ext.menu.Menu({
		id: 'menuTop',
		text: 'menu',
		items:['-',{
			text: 'Html',
			iconCls: 'icon-tag',
			handler: sayHello
		},'-']
	});
	
	var tbar = new Ext.Toolbar({
		id: 'tbar1',
		items: [ '-', {
			text: 'menu',
			menu: menuTop,
			iconCls: 'icon-transmit'
		}, {
			text: 'action1',
			iconCls: 'icon-add',
			handler: sayHello
		},'-',{
			text: 'action2',
			iconCls: 'icon-delete',
			handler: sayHello
		}]
	});
	
	var bbar = new Ext.Toolbar({
		id: 'bbar1',
		items: [{
			id: 'buttonGear',
			text: 'Action',
			iconCls: 'icon-database-gear',
			iconAlign: 'bottom',
			scale: 'medium'
		}]
	});
	
	
	var buttonGear = Ext.getCmp('buttonGear');
	buttonGear.on('click', function(){
		win = Ext.getCmp('window1');
		if(win.hidden)
		  win.show(this.getEl());
		else
		  win.hide(this.getEl());
	});
	
	
	var main = new Ext.TabPanel({
	    region: 'center',
	    margins: '5 5 5 5',
	    activeTab: 0,
		tbar: tbar,
		bbar: bbar,
	    enableTabScroll: true,
	    defaults: {
	        autoScroll: true
	    },
	    items: [ mainItem ]
	});
	
	var button1 = new Ext.Button({
		text: 'dialog',
		scale: 'medium',
		iconCls: 'icon-add',
		iconAlign: 'top',
		handler: function(b, e){
			Ext.Msg.alert('dialog', 'Mensaje');
		}
	});
	
	var button2 = new Ext.Button({
		text: 'show window',
		scale: 'medium',
		iconCls: 'icon-add',
		iconAlign: 'left',
		handler: function(b, e){
			win.show();
		}
	});
	
    var button3 = new Ext.Button({
        text: 'New Tab',
		title: 'boton 3',
		url: 'boton3.php',
        handler: addTab
    });
	
	var button4 = new Ext.Button({
		text: 'new pestana',
		title: 'boton 4',
		url: 'boton4.php',
		handler: addTab
	});
	
	
	var menu1 = new Ext.Panel({
		title: 'Menu 1',
		layout: {
			type: 'vbox',
			align: 'stretch',
			padding: 5,
		},
		items: [button3, button4],
		buttons: [button1, button2]
	});
	
	var storeBank = new Ext.data.ArrayStore({
		fields: [{
			name: 'id_bank'
		},{
			name: 'name'
		}]
	});
	
	
	
	
	
    var buttonCatalog1 = new Ext.Button({
        id: 'buttonCatalog1',
        text: 'Catalog1',
        iconCls: 'icon-application-list',
        padding: 5,
        handler: function(b, e){
        
            var bankData = [];
            
            Ext.Ajax.request({
                url: 'banks.php',
                success: function(response, opts){
                    bankData = Ext.decode(response.responseText);
                    storeBank.loadData(bankData);
                    
                    var gridBank = new Ext.grid.GridPanel({
                        store: storeBank,
                        layout: {
                            type: 'vbox',
                            align: 'stretch'
                        },
						style: {
							'text-align': 'center'
						},
                        width: 'auto',
						margins: defaultMargins,
						padding: 5,
                        height: 320,
                        columns: [{
                            id: 'id_bank',
                            header: 'ID',
                            dataIndex: 'id_bank',
                            sortable: true,
                            width: 60
                        }, {
                            header: 'Nombre',
                            dataIndex: 'name',
                            sortable: true,
                            width: 120
                        }]
                    });
                    
                    var win2 = new Ext.Window({
                        id: 'windowCatalog1',
                        title: 'Catalog 1',
                        height: 350,
                        width: 210,
                        items: [gridBank]
                    }).show(b.getEl());
                },
                failure: function(){
                    bankData = [[1, 'error']];
                }
            });
            
            
        }
    });
	var menu2 = new Ext.Panel({
		title: 'Menu 2',
		layout: {
			type: 'vbox',
			align: 'stretch',
			padding: 5
		},
		items: [buttonCatalog1]
	});
	
	var accordion = new Ext.Panel({
        region: 'west',
        margins: '5 5 5 5',
        title: 'Menu Principal',
        split: true,
        collapsible: false,
        width: 190,
        layout: 'accordion',
        layoutConfig: {
            animate: true,
            hideCollapseTool: true
        },
        items: [menu1, menu2]
    });
    
	var menulink = new Ext.Panel({
		title: 'menu de enlace',
	});
	
    var accordion2 = new Ext.Panel({
        region: 'east',
        width: 170,
        minSize: 175,
        maxSize: 400,
        collapsible: true,
        collapsed: true,
		hideCollapseTool: false,
		title: 'Otros',
		titleCollapse: false,
        margins: '5 5 5 5',
        cmargins:'5 5 5 5',
        layout: 'accordion',
        layoutConfig: {
            animate: true
        },
        items: [ menulink ]
    });
	
	var viewport = new Ext.Viewport({
        layout: 'border',
        items: [ accordion, accordion2, main ]
    });

	
});
