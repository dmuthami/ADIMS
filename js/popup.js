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
			    'propertyName': 'idnumber,name,krapin,entity_type,gender,phoneno,address,adimsid'
			});
    if (url) {
        console.log("URL: " + url);
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
                    /***/
                    info.push(result[i].get('idnumber'));                    
                    info.push(result[i].get('name'));
                    info.push(result[i].get('krapin'));
                    info.push(result[i].get('entity_type'));
                    info.push(result[i].get('gender'));
                    info.push(result[i].get('phoneno'));
                    info.push(result[i].get('address'));
                    info.push(result[i].get('adimsid'));
                  
                }
                console.log("info arr: " + info);
                //var me = info.join(', ');

                var str = '<b>Id No: </b>' + info[0] + '<br>' +
					'<b>Name: </b>' + info[1] +
					'<b>KRA pin: </b>' + info[2] + '<br>' +
					'<b>Entity Type: </b>' + info[3] + '<br>' +
					'<b>Gender: </b>' + info[4] + '<br>' +
					'<b>Phone No: </b>' + info[5] + '<br>' +
					'<b>Address: </b>' + info[6] + '<br>' +
                    '<b>ADIMS ID: </b>' + info[7] + '<br>'

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
    //map.addOverlay(overlay);

});
