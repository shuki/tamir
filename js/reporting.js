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
			//var grid = $(this);
			if(fn_reporting.parent_id)
				params['_fields_'].push({name: 'parent', value: fn_reporting.parent_id});
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
  		item_name: 'דיווח ממשרד הרווחה',
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
		loadComplete: function(data){
/*			var grid = $('table#reporting_item');
			if(fn_reporting.parent_id){
				fn_reporting.parent_id = false;
				grid[0].triggerToolbar();
			}*/
		},
		onInitializeForm: function(formid){			
			$($.jset.fn.get_form_field(formid, 'date')).on('change', function(){
				var value = $(this).val();
				if(value){
					var parts = value.split('/');
					$($.jset.fn.get_form_field(formid, 'month')).val(parts[1].replace(/^0+/, ''));
					$($.jset.fn.get_form_field(formid, 'year')).val(parts[2]);
				}
				else
				{
					$($.jset.fn.get_form_field(formid, 'month')).val('');
					$($.jset.fn.get_form_field(formid, 'year')).val('');
				}
			});
		},
		beforeShowForm: function(formid){
			var grid = $(this);
			if(grid.data('form_action') == 'add')
				$($.jset.fn.get_form_field(formid, 'date')).trigger('change');			
		},
		loadCompleteInit: function(data){
		},
		beforeSubmit: function(postdata, formid){
			if(postdata.file == undefined)
				return [true];
				
			var grid = $(this);
			var savedData = grid.jqGrid('getFormSavedData');
			fn_reporting.recreate_items = (postdata.file && savedData.file != postdata.file);
			fn_reporting.reload_grid = savedData.file != postdata.file;
			return [true];
		},
		afterSubmit: function(response, postdata, frmoper, obj){
			if(frmoper === undefined)
				return [true];
							
			fn_reporting.parent_id = frmoper == 'add' ? obj.id : false;			
			var grid = $('table#reporting_item');
			if(fn_reporting.recreate_items){
				var filename = postdata['file'].split('/')[1];
				$.jset.fn.import(grid, filename, function(data){
					if(data.error !== undefined){
						alert(data.error);
						return;
					}
					
					if(data > 0)
						setTimeout (function(){ 
					       grid[0].triggerToolbar();
					    },0);

						//grid[0].triggerToolbar();
					alert(data + ' ' + $.jset.messages.recordsAdded);
				});
			}
			else if(fn_reporting.reload_grid)
				grid[0].triggerToolbar();
		
			return [true];
		},
		afterSubmitError: function(response, postdata, frmoper, obj){
			var message = obj.error.message;
			switch(obj.error.info[1]){
				case 1062: 
					message = 'קיים כבר דיווח לחודש זה.';
					break;
				default:
					;
			}
			return [false, message];
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
	reload_grid: false,
	parent_id: false
};

/*function pad(str, max) {
  str = str.toString();
  return str.length < max ? pad("0" + str, max) : str;
}*/
