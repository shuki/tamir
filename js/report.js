$.jset.fn.registerGridDefinition('report', {
  	source: 'report', 
	load_edit_record: false,
	persist:false,
	copy:{
		navButtonAdd: false,
	},
	help:{
		hide: false,
		navButtonAdd: true,
		dialog: {
			autoOpen: false,
			title: 'הסבר',
			width: 600,
			position: 'top'
		},
		options: {
			caption:'',
			title:'הסבר', 
			buttonicon :'ui-icon-lightbulb', 
			position: 'last'
		}
	},
	filterToolbar:{
		hide: false,
		navButtonAdd: false,
		options: {
			searchOperators: true,
			searchOnEnter: false,
			stringResult: true,
			defaultSearch: 'cn',
				beforeSearch: function(){
					var $t = $(this);
					var postData = $t.jqGrid('getGridParam','postData');
				}
			}
		},
		columnChooser:{
		navButtonAdd: true,
		options: {
			caption: '',
			title: 'בחר עמודות',
			buttonicon: 'ui-icon-calculator',
			position: 'last'
		},
		multiselect:{
		    locale: {
		        addAll: 'הצג את כל העמודות',
		        removeAll: 'הסתר את כל העמודות',
		        itemsCount: 'עמודות מוצגות'
		    }
		},
		col:{
		    width: 420,
		    modal: true,
		    msel_opts: {dividerLocation: 0.5},
		    dialog_opts: {
		        minWidth: 470,
		        minHeight: 370,
		        show: 'blind',
		        hide: 'explode'
		    }
		}
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
	    sortname: 'name',
	    sortorder: 'asc',
    	width:500
  	},
  	navigation:{
		options : {
			add:false,
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
});
