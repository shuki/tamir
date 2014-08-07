$(function(){
	$.jset.fn.sessionSetup();
	$("#tabs").tabs();
	$("#tabs").height($('.ui-tabs-nav:first', $("#tabs")).height());
	var panel = $($('#panel_template').html()).appendTo($('div#tabs-5'))
		.css({width:474, float:'right'})
		.addClass('rtl');
	$('span.panel-title', panel).html('בתי ספר');
	var table = $('table[id="school"]').appendTo($('div.panel-body', panel));
	
	panel = $($('#panel_template').html()).appendTo($('div#tabs-5'))
		.css({width:624, float:'right'})
		.addClass('rtl');
	$('span.panel-title', panel).html('לשכות רווחה');
	table = $('table[id="welfare_office"]').appendTo($('div.panel-body', panel));
	
	panel = $($('#panel_template').html()).appendTo($('div#tabs-5'))
		.css({width:1098, float:'right'})
		.addClass('rtl');
	$('span.panel-title', panel).html('תרופות');
	table = $('table[id="medicine"]').appendTo($('div.panel-body', panel));
	
	panel = $($('#panel_template').html()).appendTo($('div#tabs-5'))
		.css({width:1098, float:'right'})
		.addClass('rtl');
	$('span.panel-title', panel).html('איבחונים פסיכיאטריים');
	table = $('table[id="psychiatric_diagnosis"]').appendTo($('div.panel-body', panel));
	
	set_panel_img_on_click_handler('div#tabs-5');

	$(window).bind('beforeunload', function(e){
		if($("#timeout").hasClass('ui-dialog-content') && $("#timeout").dialog( "isOpen" ) === true)
			return;
			
		var message = 'נתונים השתנו! האם ברצונך לעזוב את הדף ללא שמירה?',
		stay = false,
		e = e || window.event,
		activeTab = $("#tabs").tabs( "option", "active");
		
		stay = fn_tamir.closeFromsInTab($('div[id="tabs"] ul .ui-tabs-active a'), activeTab);		
		if(stay){
			// For IE and Firefox
			if(e)
				e.returnValue = message;
			return message;			
		}
		
		$('div[id="tabs"] li a.ui-tabs-anchor').each(function(i){
			if(!stay)
				stay = fn_tamir.closeFromsInTab(this, i);
		});

		if(stay){
			if(e)
				e.returnValue = message;
			return message;			
		}
		
		$("#tabs").tabs( "option", "active", activeTab);
 	});
	
	//$("#tabs").width('98%');
	$("#tabs").bind("tabsshow", function(event, ui){
		var patient = $('table[id="patient"]');
		var dormitory = $('table[id="dormitory"]');
		var worker = $('table[id="worker"]');
		var shift_summary = $('table[id="shift_summary"]');
		var school = $('table[id="school"]');
		var welfare_office = $('table[id="welfare_office"]');
		var medicine = $('table[id="medicine"]');
		var psychiatric_diagnosis = $('table[id="psychiatric_diagnosis"]');
		var medical = $('table[id="medical"]');
		var report = $('table[id="report"]');
		//switch(ui.index)
		switch($(ui.panel).attr('id'))
		{
			case 'tabs-1':
				if(!patient.jset('defined'))
					patient.jset($.extend(true, {}, $.jset.defaults, $.jset.fn.getGridDefinition('patient')));
				else
					if(patient.data('pending_reload'))
						patient.jset('reload', [true]);
			break;
			case 'tabs-2':
				if(!dormitory.jset('defined'))
					dormitory.jset($.extend(true, {}, $.jset.defaults, $.jset.fn.getGridDefinition('dormitory')));
				else
					if(dormitory.data('pending_reload'))
						dormitory.jset('reload', [true]);
			break;
			case 'tabs-3':
				if(!worker.jset('defined'))
					worker.jset($.extend(true, {}, $.jset.defaults, $.jset.fn.getGridDefinition('worker')));
				else
					if(worker.data('pending_reload'))
						worker.jset('reload', [true]);
			break;
			case 'tabs-4':
				if(!shift_summary.jset('defined'))
					shift_summary.jset($.extend(true, {}, $.jset.defaults, $.jset.fn.getGridDefinition('shift_summary')));
				else
					if(shift_summary.data('pending_reload'))
						shift_summary.jset('reload', [true]);
			break;
			case 'tabs-5':
				if(!school.jset('defined'))
					school.jset($.extend(true, {}, $.jset.defaults, $.jset.fn.getGridDefinition('school')));
				else
					if(school.data('pending_reload'))
						school.jset('reload', [true]);
						
				if(!welfare_office.jset('defined'))
					welfare_office.jset($.extend(true, {}, $.jset.defaults, $.jset.fn.getGridDefinition('welfare_office')));
				else
					if(welfare_office.data('pending_reload'))
						welfare_office.jset('reload', [true]);
						
				if(!medicine.jset('defined'))
					medicine.jset($.extend(true, {}, $.jset.defaults, $.jset.fn.getGridDefinition('medicine')));
				else
					if(medicine.data('pending_reload'))
						medicine.jset('reload', [true]);
						
				if(!psychiatric_diagnosis.jset('defined'))
					psychiatric_diagnosis.jset($.extend(true, {}, $.jset.defaults, $.jset.fn.getGridDefinition('psychiatric_diagnosis')));
				else
					if(psychiatric_diagnosis.data('pending_reload'))
						psychiatric_diagnosis.jset('reload', [true]);
			break;
			case 'tabs-6':
				if(!medical.jset('defined'))
					medical.jset($.extend(true, {}, $.jset.defaults, $.jset.fn.getGridDefinition('medical')));
				else
					if(medical.data('pending_reload'))
						medical.jset('reload', [true]);
			break;
			case 'tabs-9':
				if(!report.jset('defined'))
					report.jset($.extend(true, {}, $.jset.defaults, $.jset.fn.getGridDefinition('report')));
			break;
			default:
		}
	});

	$("#tabs").trigger('tabsshow', [fn_tamir.currentTab()]);
});

var fn_tamir = {
	apply: function(formid){
		var grid = $(this);
		switch(user_attributes.group){
			case '3':
			case '4':
				$.jset.fn.readonlySet(grid, formid, $($.jset.fn.get_form_field(formid, 'creator')).val() != user_attributes.id);
				break;
			default:
				;
		}
	},
	
	currentTab: function(){
		var currentTabId = $('div[id="tabs"] ul .ui-tabs-active a').attr("href");
		var tui = {};
		tui.panel = $('<div/>');
		tui.panel.attr('id', currentTabId.replace('#', ''));
		return tui;
	},
	
	closeFromsInTab: function(a, i){
		var stay = false;
		var div_id = $(a).attr('href').replace('#', '');
		var currentDiv = $('div[id="' + div_id + '"]');
		var exclude = $("div.ui-jqgrid[id^='gbox_'] div.ui-jqgrid[id^='gbox_']", currentDiv);
		if(currentDiv.find('div[id^="gbox_"]').not(exclude).length > 0){
			$("#tabs").tabs( "option", "active", i );
			currentDiv.find('div[id^="gbox_"]').not(exclude).each(function(){
				var form = $.jset.fn.closeForm($.jset.fn.get_grid_from_container($(this)));
				if(form.is(':visible'))
					stay = true;				
			});
		}
		return stay;
	}
};
