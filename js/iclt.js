$(function() {

	//get json data (do this once to save requests)
	var json_url = window.location.href + "json_data.php";
	var data;
	
	$.ajax({
        'async': false,
        'global': false,
        'url': json_url,
        'dataType': "json",
        'success': function (json) {
            data = json;
        }
    });
	

	//on radio selection, close current container and change header to match then open next section
	
	$('.sectionOption').parent('.ui-radio').click(radioClicked);


	function radioClicked() {
		console.log(this);
		//get label text
		var labelText = $(this).children('label').find('.ui-btn-text').text()
		
		//find section header
		var sectionBlock = $(this).parents('.ui-collapsible')
		var sectionHeader = sectionBlock.find('h3').find('.ui-btn-text')
		var sectionHeaderStatus = sectionHeader.find('.ui-collapsible-heading-status');
		
		//modify section header (and put back 'tooltip')
		sectionHeader.text(labelText).append(sectionHeaderStatus);
		
		//collapse this section
		sectionBlock.trigger('collapse');
		
		//open next section
		sectionBlock.next().trigger('expand');
	}




	//on ticket type selection, reload results for services
	
	$('.types').click(function(){
		var serviceType = $(this).attr('value').toLowerCase(); //lowercase to match json data
		
		//reset services label
		//find service section header
		var sectionHeader = $('#serviceCollapsible').find('h3').find('.ui-btn-text')
		var sectionHeaderStatus = sectionHeader.find('.ui-collapsible-heading-status');
		//modify section header (and put back 'tooltip')
		sectionHeader.text("Service").append(sectionHeaderStatus);

		//build services list
		var serviceList = $('#serviceList .ui-controlgroup-controls');
		serviceList.children().remove();
		
		
		var serviceHTML = "";
				
	
		for (serviceKey in data['services']) {
			var service = data['services'][serviceKey];
			if (service[serviceType] == true) {
				serviceName = service['name'];
				serviceId = serviceName.toLowerCase().replace(" ",".");
				serviceList.append('<input type="radio" name="service" id="service_' + serviceId + '" value="' + serviceName + '" class="sectionOption services"> \
					<label for="service_' + serviceId + '">' + serviceName + '</label>');
			}
		}
		
		//insert services list to fieldset
		$('#serviceCollapsible').trigger('create');

		//register click events
		serviceList.find('.ui-radio').click(radioClicked);


	});
	
	//on service selection, reload results for categories (filter by ticket type)

});
