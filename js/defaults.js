$(function(){
	$.extend($.validator.messages, {
	  required: 'שדה חובה',
	  email: 'איימל לא תקין'
	});
		
	$.extend(true, $.jset.defaults, {
		editor:{
			directionality : 'rtl',
			language : 'he_IL',
			menubar : false,
			//toolbar: 'fontselect fontsizeselect bold italic underline forecolor backcolor alignleft aligncenter alignright bullist numlist outdent indent blockquote removeformat',
			toolbar: 'print preview fontsizeselect bold italic underline forecolor backcolor alignleft aligncenter alignright bullist numlist outdent indent blockquote removeformat',
			plugins : 'textcolor print preview'
/*			  plugins: [
			            'advlist autolink lists link image charmap print preview hr anchor pagebreak',
			            'searchreplace wordcount visualblocks visualchars code fullscreen',
			            'insertdatetime media nonbreaking save table contextmenu directionality',
			            'emoticons template paste textcolor colorpicker textpattern imagetools'
			          ],
			          //toolbar1: 'insertfile undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image',
			          toolbar: 'print preview media | forecolor backcolor emoticons'
*/
		},
		control:{
			align: 'right',
			checkbox: {
				searchoptions:{
					value: {0:'לא', 1:'כן'},
				}
			},
			datepicker: {
				region: 'he'
			},
			selectbox:{
				align: 'right'
			},
			selectbox_plus:{
				align: 'right',
				editoptions: {
					settings:{
						search_default:[{name:'id', value:''}],
						single_record: {
							active: true,
							displayAlert: false,
							mode: '',
							options:{
								closeOnEscape: false,
								closeAfterEdit: false,
								closeAfterAdd: false,
								drag: false,
								resize: false,
								viewPagerButtons: false,
								editCaption: 'ערוך',
								addCaption: 'הוסף'
							}
						}
					}
				}
			},
			text:{
				align:'right'
			},
			textarea:{
				align:'right'
			},
			varchar:{
				align:'right'
			},
			editor:{
				align:'right',
				editoptions:{
					directionality : 'rtl'
				}
			},
			upload_file:{
				align:'right',
				formatoptions:{
					picture_lable: 'תמונה',
					file_lable: 'קובץ'
				},
				editoptions:{
					custom_options:{
						row_height: '80',
						max_width: '200',
						browse_title: 'העלה קובץ',
						delete_title: 'הסר קובץ',
						show_image: false,
						show_target: false,
						show_link: false,
						show_icon: true,
					}
				},
				formoptions:{
					label_hide: false
				}
			}
		},
		persist: true,
		clearPersist: {
			navButtonAdd: true
		},
		clearFilterToolbar:{
			navButtonAdd: true,
			options: {
				caption: '',
				title: 'נקה שדות סינון',
				buttonicon: 'ui-icon-cancel',
				position: 'last'
			}
		},
		'export':{
			navButtonAdd: true,
			options: {
				caption: '',
				title: 'ייצא לאקסל',
				buttonicon: 'ui-icon-star',
				position: 'last'
			},
			associative:'both'
		},
		'import':{
			navButtonAdd: user_attributes.group == 1
		},
		copy:{
			navButtonAdd: true,
			confirm: true,
			showFormInit: null,
			properties: {
				closeAfterAdd: true,
				editCaption: $.jset.nav.copyCaption,
				viewPagerButtons: false,
				onclickSubmit: $.jset.fn.onclickSubmit
			},
			clear_id: true,
			options: {
				caption: '',
				title: $.jset.nav.copy,
				buttonicon: 'ui-icon-copy',
				position: 'first'
			}
		},
		help:{
			hide: false,
			navButtonAdd: false,
			dialog: {
				title: 'הסבר'
			}
		},
	    grid: {
	    	direction: 'rtl',
		    width: $(window).width() - 24,
		    height: $(window).height() - 150,
			rownumWidth: 30
	  	},
	  	navigation:{
			options : {
				del: user_attributes.group == 1,
				search: true,
				view: false
			},
			edit:{
				checkOnUpdate:true
			},
			add:{
				checkOnUpdate:true
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
