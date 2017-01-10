$.jset.fn.registerGridDefinition('welfare_office', {
  	source: 'welfare_office',
  	item_name: 'לשכת רווחה',
	load_edit_record: false,
	template: {
		use: true,
		columns: 3
	},
	filterToolbar:{
		hide: false,
		navButtonAdd: false
	},
	copy:{
		navButtonAdd: user_attributes.group == 1,
	},
	onInitializeForm: function(formid){
		$(formid).closest('.ui-jqdialog').offset({ top: -1});
	},
	beforeShowForm: function(formid){
		fn_tamir.apply.call(this, formid);
	},
	afterclickPgButtons : function (whichbutton, formid, rowid){
		fn_tamir.apply.call(this, formid);
	},
	afterSubmit: function(response, postdata){
		$('table.jset_table[id="patient"]').jset('pending_reload');
		//$('table[id="people"]').jset('pending_reload');
		return [true];
	},
    grid: {
	    sortname: 'name',
	    sortorder: 'asc',
    	width: 610,
    	height: 100
  	},
  	navigation:{
		options : {
			add: user_attributes.group == 1,
			del: user_attributes.group == 1,
			search: false,
			view: false
		},
		edit:{
			checkOnUpdate:true
		},
		add:{
			checkOnUpdate:true
			//closeAfterAdd: false
		},
		del:{
		},
		search:{
		},
		view:{
		}
	}
});
