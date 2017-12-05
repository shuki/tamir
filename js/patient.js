$(function(){
	$.jset.fn.registerGridDefinition('patient', {
	  	source: 'patient',
	  	item_name: 'חניך',
		load_edit_record: false,
		reopen_after_add: true,
		spacing: '10px',
		persist:true,
		template: {
			use: true,
			columns: 3
		},
		filterToolbar:{
			hide: false,
			navButtonAdd: false,
		},
		copy:{
			properties: {
				editCaption: 'העתק'
			},
			options: {
				title: 'העתק'
			}
		},
		help:{
			hide: false,
			navButtonAdd: true
		},
		columnChooser:{
			navButtonAdd: true
		},
		clearPersist: {
			navButtonAdd: true
		},
		onInitializeForm: function(formid){
			var grid = $(this);
			$(formid).closest('.ui-jqdialog').offset({ top: -1});
			$.jset.fn.append_fields(formid, 'birth_date', 1);
			if($.jset.fn.get_column(grid, 'dormitory').hidden != 1 || $.jset.fn.get_column(grid, 'dormitory').edithidden == 1)
				$.jset.fn.append_fields(formid, 'dormitory', 1);
			
			$.jset.fn.get_form_field(formid, 'age').css('width', '16px');
			$.jset.fn.get_form_field(formid, 'birth_date').on('change.patient', function(){
				$.jset.fn.get_form_field(formid, 'age').val('');
			});
		},
		afterSubmit: function(response, postdata){
			return [true];
		},
	    grid: {
		    sortname: 'first_name',
		    sortorder: 'asc',
	  	},
	  	navigation:{
			options : {
				del: user_attributes.group == 1,
			},
			edit:{
			},
			add:{
				closeAfterAdd: false
			},
			del:{
			},
			search:{
			},
			view:{
			}
		}
	});
	
	$.jset.fn.registerGridDefinition('exceptional_event_main', {
		source: 'exceptional_event_main',
		item_name:'אירוע חריג',
		load_edit_record: false,
		reopen_after_add: true,
		search_default:[],
		searchall: true,
		persist:false,
		template: {
			use: true,
			columns: 1
		},
		help:{
			hide: false,
			navButtonAdd: true
		},
		onInitializeForm: function(formid){
			$(formid).closest('.ui-jqdialog').offset({ top: -1});
			$.jset.fn.append_fields_td(formid, 'date', 3);
			$.jset.fn.append_fields_td(formid, 'patient_id', 2);
			$.jset.fn.append_fields_td(formid, 'patient_involved', 1);
			//$(formid).closest('.ui-jqdialog').offset({ top: -400});
		},
		beforeShowForm: function(formid){
			var grid = $(this);
			if(grid.data('form_action') ==  'add')
				$.jset.fn.get_form_field(formid, 'time').val($.jset.fn.format_time($.jset.fn.get_form_field(formid, 'time').val(), true, false));
		},
		afterShowForm: function(formid){
			var grid = $(this);
			//$(formid).closest('.ui-jqdialog').offset({ left: 200});
		},
	        grid: {
			    width: $(window).width() - 24,
			    height: $(window).height() - 161,
		        sortname: 'date',
		        sortorder: 'desc'
	          },
	      navigation:{
			options : {
				del: user_attributes.group == 1,
			},
			edit:{
				checkOnUpdate:true
			},
			add:{
				checkOnUpdate:true
			}
	    }
	});
});