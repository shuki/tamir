$(function(){
	var reporting_item_settings = {
		source: 'reporting_item',
		template: {
			use: true,
			columns: 1
		},
		filter:[{
			source: 'id',
			target: 'parent'
		}],
		'import':{
			navButtonAdd: false,
		},
		beforeImport: function(params){
			var grid = $(this);
			//params['_fields_'].push({name: 'id_number', value: 6666});
		},
		copy:{
			navButtonAdd: false
		},
		help:{
			hide: false,
			navButtonAdd: false
		},
		filterToolbar:{
			hide: false,
			navButtonAdd: false
		},
		columnChooser:{
			navButtonAdd: true
		},
		beforeShowForm: function(formid){
		},
		loadCompleteInit: function(data){
		},
		beforeSubmit: function(postdata, formid){
			return [true];
		},
		beforeRequest: function(){
		},
	    grid: {
	    	height: 150,
    		width: 1084
	  	},
	  	navigation:{
			options : {
				add: false,
				edit: false,
				del: false,
				search: false,
				view: false,
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
	};

	$.jset.fn.registerGridDefinition('reporting', {
	  	source: 'reporting', 
		load_edit_record: false,
		template: {
			use: true,
			columns: 1
		},
		detail: [{
			elem: '#reporting_item',
			settings: reporting_item_settings
		}],
		persist: false,
		copy:{
			navButtonAdd: false
		},
		'import':{
			navButtonAdd: false,
		},
		help:{
			hide: false,
			navButtonAdd: true
		},
		filterToolbar:{
			hide: false,
			navButtonAdd: false
		},
		columnChooser:{
			navButtonAdd: true
		},
		beforeShowForm: function(formid){
		},
		loadCompleteInit: function(data){
		},
		beforeSubmit: function(postdata, formid){
			var grid = $(this);
			var savedData = grid.jqGrid('getFormSavedData');
			fn_reporting.recreate_items = (postdata.file && savedData.file != postdata.file);
			fn_reporting.reload_grid = savedData.file != postdata.file;
			return [true];
		},
		afterSubmit: function(response, postdata, frmoper){
			var grid = $('table#reporting_item');
			if(fn_reporting.recreate_items){
				var filename = postdata['file'].split('/')[1];
				$.jset.fn.import(grid, filename, function(data){
					if(data.error !== undefined){
						alert(data.error);
						return;
					}
					
					if(data > 0)
						grid[0].triggerToolbar();
					alert(data + ' ' + $.jset.messages.recordsAdded);
				});
			}
			else if(fn_reporting.reload_grid)
				grid[0].triggerToolbar();
		
			return [true];
		},
		beforeRequest: function(){
		},
	    grid: {
	    	height: 150,
    		width: 1084
	  	},
	  	navigation:{
			options : {
				search: false,
				view: false,
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
});

var fn_reporting= {
	recreate_items: false,
	reload_grid: false
};
