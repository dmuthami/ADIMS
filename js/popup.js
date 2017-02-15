/**
 * Elements that make up the popup.
 */
var container = document.getElementById('popup');
var content = document.getElementById('popup-content');
var closer = document.getElementById('popup-closer');

/**
 * Create an overlay to anchor the popup to the map.
 */
var overlay = new ol.Overlay(/** @type {olx.OverlayOptions} */({
			element: container,
			autoPan: true,
			autoPanAnimation: {
				duration: 250
			}
		}));

/**
 * Add a click handler to hide the popup.
 * @return {boolean} Don't follow the href.
 */
closer.onclick = function () {
	overlay.setPosition(undefined);
	closer.blur();
	return false;
};
infoFormat = 'text/javascript'; //  'text/javascript'

function displayInfoFeatures(evt) {
	var coordinate = evt.coordinate;
	//-----------Trial code goes here---
	var viewResolution = view.getResolution();
	var viewProjection = view.getProjection();

	var url = wmsSource.getGetFeatureInfoUrl(
			evt.coordinate, viewResolution, viewProjection, {
			'INFO_FORMAT': infoFormat,
			'propertyName': 'PLOT_NO,surname,other_name,category,insured,amount_ins,claim_stat,AREA_HA'
		});
	if (url) {
		var parser = new ol.format.GeoJSON();
		$.ajax({
			url: url,
			type: 'POST',
			dataType: 'jsonp',
			jsonpCallback: 'parseResponse'
		}).then(function (response) {
			var result = parser.readFeatures(response);
			console.log(result);
			if (result.length) {
				var info = [];
				for (var i = 0, ii = result.length; i < ii; ++i) {
					info.push(result[i].get('PLOT_NO'));
					info.push(result[i].get('surname'));
					info.push(result[i].get('other_name'));
					info.push(result[i].get('category'));
					info.push(result[i].get('insured'));
					info.push(result[i].get('amount_ins'));
					info.push(result[i].get('claim_stat'));
					info.push(result[i].get('AREA_HA'));
				}
				console.log("info arr: " + info);
				//var me = info.join(', ');

				var str = '<b>Parcel No: </b>' + info[0] + '<br>' +
					'<b>Owner: </b>' + info[1] + " " + info[2] + '<br>' +
					'<b>Category: </b>' + info[3] + '<br>' +
					'<b>Insured: </b>' + info[4] + '<br>' +
					'<b>Amount Insured: </b>' + info[5] + '<br>' +
					'<b>Claim Status: </b>' + info[5] + '<br>' +
					'<b>Area(Ha): </b>' + info[5] + '<br>'
					content.innerHTML = str;
				//console.log("url: " + url);
			} else {
				var str = "You might have clicked on a basemap. We are not at the moment able to pull attribute data from a basemap layer";
				content.innerHTML = str + '&nbsp;';
			}
		});
		overlay.setPosition(coordinate);
	}
}

$(document).ready(function () {
	//Map add overlay
	map.addOverlay(overlay);

});
