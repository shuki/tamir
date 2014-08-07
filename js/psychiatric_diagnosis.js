$.jset.fn.registerGridDefinition('psychiatric_diagnosis', {
  	source: 'psychiatric_diagnosis',
  	item_name: 'איבחון פסיכיאטרי',
	load_edit_record: false,
	persist:false,
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
		//$('table.jset_table[id="patient"]').jset('pending_reload');
		//$('table.jset_table[id="people"]').jset('pending_reload');
		return [true];
	},
    grid: {
	    sortname: 'disorder',
	    sortorder: 'asc',
    	width: 1084,
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
