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

$.jset.fn.registerGridDefinition('external_worker_main', {
  	source: 'external_worker_main',
  	searchall: true,
  	item_name: 'מטפל/ת בקהילה',
	load_edit_record: false,
	template: {
		use: true,
		columns: 2
	},
	filterToolbar:{
		hide: false,
		navButtonAdd: false
	},
	copy:{
		navButtonAdd: user_attributes.group == 1,
	},
	onInitializeForm: function(formid){
	},
	beforeShowForm: function(formid){
		fn_tamir.apply.call(this, formid);
		if($.jset.fn.get_form_field(formid, 'position').val() != '')
			$.jset.fn.disable_field(formid, 'position');
	},
	afterclickPgButtons : function (whichbutton, formid, rowid){
		fn_tamir.apply.call(this, formid);
		if($.jset.fn.get_form_field(formid, 'position').val() != '')
			$.jset.fn.disable_field(formid, 'position');
	},
	afterSubmit: function(response, postdata){
		$('table.jset_table[id="patient"]').jset('pending_reload');
		//$('table[id="people"]').jset('pending_reload');
		return [true];
	},
    grid: {
	    sortname: 'name',
	    sortorder: 'asc',
	    width: $(window).width() - 24,
	    height: $(window).height() - 176,
  	},
  	navigation:{
		options : {
			add: true,
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
