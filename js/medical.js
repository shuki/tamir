$.jset.fn.registerGridDefinition('medical', {
  	source: 'medical',
  	item_name: 'תיק רפואי',
	load_edit_record: false,
	persist:false,
	template: {
		use: true,
		columns: user_attributes.group == 3 ? 1 : 3
	},
	filterToolbar:{
		hide: false,
		navButtonAdd: false
	},
	copy:{
		navButtonAdd: false
	},
	'export':{
		navButtonAdd: false
	},
	onInitializeForm: function(formid){
		var grid = $(this);
		$(formid).closest('.ui-jqdialog').offset({ top: -1});
		$.jset.fn.append_fields_td(formid, 'first_name', 1);
		if($.jset.fn.get_column(grid, 'dormitory').hidden != 1 || $.jset.fn.get_column(grid, 'dormitory').edithidden == 1)
			$.jset.fn.append_fields_td(formid, 'dormitory', 1);
	},
	beforeShowForm: function(formid){
	},
	afterclickPgButtons : function (whichbutton, formid, rowid){
	},
	afterSubmit: function(response, postdata){
		//$('table.jset_table[id="patient"]').jset('pending_reload');
		//$('table.jset_table[id="people"]').jset('pending_reload');
		return [true];
	},
    grid: {
	    sortname: 'first_name',
	    sortorder: 'asc'
    	//width: 1084,
    	//height: 100
  	},
  	navigation:{
		options : {
			add: false,
			del: false,
			search: false,
			view: false
		},
		edit:{
		},
		add:{
		},
		del:{
		},
		search:{
		},
		view:{
		}
	}
});
