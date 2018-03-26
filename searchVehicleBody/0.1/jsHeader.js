var VehicleSearchBody = function() {
	
	return {
		
		init: function() {
			// Convert list options to list items
			$('#vehicleSearchBody').find('select#make, select#model, select#bodyType, select#series').each(function(){
				
			    var $this = $(this), numberOfOptions = $(this).children('option').length;
			    var selectionName = $(this).attr('name');
			  
			    if(!$this.hasClass('select-hidden')) {
				    $this.addClass('select-hidden'); 
				    $this.wrap('<div class="select disabled" data-name="' + selectionName + '"></div>');
				    $this.after('<div class="select-styled"></div>');
			    }

			    var $styledSelect = $this.next('div.select-styled');
			    $styledSelect.text($this.children('option').eq(0).text());
			  
			    var $list = $('<ul />', {
			        'class': 'select-options'
			    }).insertAfter($styledSelect);
			  
			    for (var i = 0; i < numberOfOptions; i++) {
			        $('<li />', {
			            text: $this.children('option').eq(i).text(),
			            rel: $this.children('option').eq(i).val()
			        }).appendTo($list);
			    }
			  
			    var $listItems = $list.children('li');
			  
			    $styledSelect.click(function(e) {
			        e.stopPropagation();
			        $('div.select-styled.active').not(this).each(function(){
			            $(this).removeClass('active').next('ul.select-options').hide();
			        });
			        $(this).toggleClass('active').next('ul.select-options').toggle();
			    });
			  
			    $listItems.click(function(e) {
			        e.stopPropagation();
			        $styledSelect.text($(this).text()).removeClass('active');
			        $this.val($(this).attr('rel'));
			        $list.hide();
			    });
			  
			    $(document).click(function() {
			        $styledSelect.removeClass('active');
			        $list.hide();
			    });
			});
			
			// Enable make selection
			$('#vehicleSearchBody').find('.select[data-name="make"]').removeClass('disabled');

			// Call make selection onChange
			$('#vehicleSearchBody').find('.select[data-name="make"]')
			.find('.select-options li').on('click', function(e) {
				VehicleSearchBody.changeModel($(this).attr('rel'));
				$('.select[data-name="make"]').attr('data-value', $(this).attr('rel'));
				e.preventDefault();
			});
			
			// Pass selected value to selection text
			$('#vehicleSearchBody').find('.select-options li').on('click', function() {
				$(this).parents('.select').find('.select-styled').text($(this).text());
			});
			
			// Search vehicle submit
			$('#vehicleSearchBody').find(".vehicle-search-btn").click(function(e) {
				var specificSearchVehicle = jQuery(this).hasClass("specific-search-btn");
				e.preventDefault();
				var _parent = jQuery(this).closest('form');
				var modelLabel = "#model";
				var bodyTypeLabel = "#bodyType";
				
				
				if(specificSearchVehicle==true){
					modelLabel = ".model"
					bodyTypeLabel = ".bodyType";
					_parent = jQuery(this).closest('div');
				}
				
				var make = _parent.find("#make");
				var model = _parent.find(modelLabel);
				var bodyType = _parent.find(bodyTypeLabel);
				var series = _parent.find("#series");
				
				var makeId = make.val();
				var bodyTypeId = bodyType.val();
				var modelId = model.val();
				var seriesId = series.val();
				
				if(specificSearchVehicle==true){
					modelId = model.attr("data-id");
				}
				
				if ( (make.val().length > 0 
					&& model.val().length > 0 
					&& bodyType.val().length > 0 
					&& series.val().length > 0) 
					|| (
							makeId.length > 0
							&& bodyTypeId.length > 0
							&& modelId.length > 0
							&& seriesId.length > 0
						)) {
					var subop = "saveLastSearch";
					if(specificSearchVehicle==true){
						subop = "";
					}
					var specificMakeId = 0;
					try { 
						jQuery("#specificMakeId").val();
					} catch(e) {
						console.log(e);
					}
					jQuery.ajax({
						type: 'POST',
						url:location.href.split('?')[0],
						data: {
							op: "cloudmall_widgets.adminCategoryVehicleMaint.adminCategoryVehicleMaint",
							subop: subop,
							makeId: makeId,
							specificMakeId: specificMakeId,
							modelId: modelId,
							bodyTypeId: bodyTypeId,
							seriesId: seriesId
						},
						beforeSend: function() {
							jQuery.blockUI({message : "<img src='/ttsvr/cloudmall/images/global/ajax-loader.gif' alt='ajax loader' />"});
						},
						success: function(data) {
							console.log(data);
							jQuery.unblockUI();
						},
						complete: function() {
							var makeVal = encodeURI(jQuery.trim(make.find(":selected").text()));
							var modelVal = encodeURI(jQuery.trim(model.find(":selected").text()));
							var bodyVal = encodeURI(jQuery.trim(bodyType.find(":selected").text()));
							var seriesVal = encodeURI(jQuery.trim(series.find(":selected").text()));
							
							if(specificSearchVehicle==true){
								makeVal = encodeURI(jQuery.trim(make.find(":selected").text()));
								modelVal = encodeURI(jQuery.trim(model.attr("data-value")));
								bodyVal = encodeURI(jQuery.trim(bodyType.find(":selected").text()));
								seriesVal = encodeURI(jQuery.trim(series.find(":selected").text()));
							}
							
							var link = jQuery("#searchProductListCleanUrl").val() + "/"+
							makeVal+
							"/" + modelVal +
							"/" + bodyVal +
							"/" + seriesVal;
							
							location.href = link.toLowerCase(); 
						}
					});
				}
			});
		
			// Show header shop by vehicle form
			$(".editSearch-btn").click(function() {
		        $("#shopByVehicle").attr("class", "dropdown open");
			});       
		},
		
		// CHANGE MODEL
		changeModel: function(makeId) {
			(function repopulateModel() {
				jQuery.ajax({
					type: 'POST',
					url:location.href,
					data: {
						op: "cloudmall_widgets.adminCategoryVehicleMaint.adminCategoryVehicleMaint",
						subop: "changeModelByMake",
						makeId: makeId
					},
					success: function(data) {
						// If data is empty, call ajax request again
						if (!$.trim(data)){
							repopulateModel();
						} else {
							var optionValue, listValue;
							var optionArray = [], listArray = [];
							
							jQuery.each(data, function(index, model) {
								// Build option and list items
								optionValue = '<option value="' + model.value + '">' + model.label + '</option>';
								listValue = '<li rel="' + model.value + '">' + model.label + '</li>';

								// Push items to the array
								optionArray.push(optionValue);
								listArray.push(listValue);
							});
							
							// Populate option and list items
							$('div.select[data-name="model"]').find('.select-options').html(listArray);
							$('div.select[data-name="model"]').find('select#model').html(optionArray);
						}
					 }, 
					 complete: function() {
						 // Pass selected value to selection text
						 $('#vehicleSearchBody').find('.select-options li').on('click', function() {
							 $(this).parents('.select').find('.select-styled').text($(this).text());
						 });
						 
						 // Trigger on click for new populate items
						 $('#vehicleSearchBody').find('.select[data-name="model"]')
							.find('.select-options li').on('click', function(e) {
								VehicleSearchBody.changeBodyType($(this).attr('rel'));
								$('.select[data-name="model"]').attr('data-value', $(this).attr('rel'));
								e.preventDefault();
							});
						 
						 // Enable model select
						 $('#vehicleSearchBody').find('.select[data-name="model"]').removeClass('disabled');
					 }
				});
			})();
		},

		// CHANGE BODY TYPE
		changeBodyType: function(modelId) {
			(function repopulateBodyType() {
				jQuery.ajax({
					type: 'POST',
					url:location.href,
					data: {
						op: "cloudmall_widgets.adminCategoryVehicleMaint.adminCategoryVehicleMaint",
						subop: "changeBodyTypeByModel",
						modelId: modelId
					},
					success: function(data) {
						// If data is empty, call ajax request again
						if (!$.trim(data)){
							repopulateBodyType();
						} else {
							var optionValue, listValue;
							var optionArray = [], listArray = [];
							
							jQuery.each(data, function(index, model) {
								// Build option and list items
								optionValue = '<option value="' + model.value + '">' + model.label + '</option>';
								listValue = '<li rel="' + model.value + '">' + model.label + '</li>';

								// Push items to the array
								optionArray.push(optionValue);
								listArray.push(listValue);
							});
							
							// Populate option and list items
							$('div.select[data-name="bodyType"]').find('.select-options').html(listArray);
							$('div.select[data-name="bodyType"]').find('select#bodyType').html(optionArray);
						}
					 }, 
					 complete: function() {
						 // Pass selected value to selection text
						 $('#vehicleSearchBody').find('.select-options li').on('click', function() {
							 $(this).parents('.select').find('.select-styled').text($(this).text());
						 });
						 
						 // Trigger on click for new populate items
						 $('#vehicleSearchBody').find('.select[data-name="bodyType"]')
						 .find('.select-options li').on('click', function(e) {
							 VehicleSearchBody.changeSeries($(this).attr('rel'));
							 $('.select[data-name="bodyType"]').attr('data-value', $(this).attr('rel'));
							 e.preventDefault();
						 });
						
						 // Enable body type select
						 $('#vehicleSearchBody').find('.select[data-name="bodyType"]').removeClass('disabled');
					 }
				});
			})();
		},

		// CHANGE SERIES
		changeSeries: function(bodyTypeId) {
			
			(function repopulateSeries() {
				
				var makeId = $('#vehicleSearchBody').find('.select[data-name="make"]').attr('data-value');
				var modelId = $('#vehicleSearchBody').find('.select[data-name="model"]').attr('data-value');
				
				jQuery.ajax({
					type: 'POST',
					url:location.href,
					data: {
						op: "cloudmall_widgets.adminCategoryVehicleMaint.adminCategoryVehicleMaint",
						subop: "changeSeriesByBodyType",
						makeId: makeId,
						modelId: modelId,
						bodyTypeId: bodyTypeId
					},
					success: function(data) {
						// If data is empty, call ajax request again
						if (!$.trim(data)){
							repopulateSeries();
						} else {
							var optionValue, listValue;
							var optionArray = [], listArray = [];
							
							jQuery.each(data, function(index, model) {
								// Build option and list items
								optionValue = '<option value="' + model.value + '">' + model.label + '</option>';
								listValue = '<li rel="' + model.value + '">' + model.label + '</li>';

								// Push items to the array
								optionArray.push(optionValue);
								listArray.push(listValue);
							});
							
							// Populate option and list items
							$('div.select[data-name="series"]').find('.select-options').html(listArray);
							$('div.select[data-name="series"]').find('select#series').html(optionArray);
						}
					 }, 
					 complete: function() {
						// Pass selected value to selection text
						$('#vehicleSearchBody').find('.select-options li').on('click', function() {
							$(this).parents('.select').find('.select-styled').text($(this).text());
						});
						 
						$('.select[data-name="series"]').attr('data-value', bodyTypeId);
						
						// Enable body type select
						$('#vehicleSearchBody').find('.select[data-name="series"]').removeClass('disabled');
					 }
				});
			})();
		}
		
		/*
		changeSeriesSpecific: function(seriesDropdown, modelId) {
			var bodyTypeId = jQuery('option:selected', seriesDropdown).val();
			var parentForm = jQuery(seriesDropdown).closest("div");
			var modelDropdown = jQuery(parentForm).find("select[name='series']");
			
			console.log(parentForm);
			console.log(modelDropdown);
			
			VehicleSearchBody.resetDropdown(modelDropdown, ""); //Refresh dropdown while loading
			
			var subModelDropdown = jQuery(parentForm).find("select[name='submodel']");
			
			
			var makeId = jQuery("#specificMakeId").val();
			var modelId = modelId;
			
			jQuery.ajax({
				type: 'POST',
				url:location.href,
				data: {
					op: "cloudmall_widgets.adminCategoryVehicleMaint.adminCategoryVehicleMaint",
					subop: "changeSeriesByBodyType",
					makeId: makeId,
					modelId: modelId,
					bodyTypeId: bodyTypeId
				},
				 success: function(data) {
					 var vehicleModelList = [];
					 var optionValue;
					 optionValue = '<option value=""></option>';
							jQuery(modelDropdown).parent().find(".dropdown-label").css("display","block");
					 vehicleModelList.push(optionValue);
					 jQuery.each(data, function(index, model) {
						 optionValue = '<option value="' + model.value + '">';
						 optionValue += model.label + '</option>';
						 vehicleModelList.push(optionValue);
					 });
					 jQuery(modelDropdown).html(vehicleModelList);
					 
					 var subModelList = [];
					 var subOptionValue;
					 subOptionValue = '<option value=""></option>';
					 subModelList.push(subOptionValue);
					 jQuery.each(data, function(index, subModel) {
						 if (index != 0 && subModel.submodel != "") {
							 subOptionValue = '<option value="' + subModel.submodel + '">';
							 subOptionValue += subModel.submodel + '</option>';
							 subModelList.push(subOptionValue);
						 }
					 });
					 jQuery(subModelDropdown).html(subModelList);
					 if (subModelList.length > 1) {
						 jQuery(subModelDropdown).show();
					 } else {
						 jQuery(subModelDropdown).hide();
					 }
				 },
				 complete: function() {
				 }
			});
		}
		*/
		
    }

}();
$(function() {
	jQuery(VehicleSearchBody.init());
});