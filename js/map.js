var extent = [4091020.256326, -15468.942551, 4099588.155744, -11577.705952];

var format = 'image/png';

var wmsSource = new ol.source.ImageWMS({
    url: 'http://localhost:8080/geoserver/adims/wms',
    params: {
        'FORMAT': format,
        'VERSION': '1.1.1',
        tiled: true,
        STYLES: 'farmers3',
        LAYERS: 'adims:farmers3_evw'
    },
    serverType: 'geoserver'
    //,crossOrigin: 'anonymous'
});

var osmLayer = new ol.layer.Tile({
    source: new ol.source.OSM()
});

var layers = [osmLayer,
	new ol.layer.Image({
	    source: wmsSource
	})
];

var view = new ol.View({
    center: ol.proj.transform([36.750, -0.123], 'EPSG:4326', 'EPSG:3857'),
    extent: extent,
    zoom: 14
});
/**
 * Create the map.
 */
var map = new ol.Map({
    layers: layers,
    //overlays: [overlay],
    target: 'map',
    controls: [
		new ol.control.Zoom(),
		new ol.control.FullScreen(),
		new ol.control.MousePosition(),
		new ol.control.ScaleLine(),
		new ol.control.ZoomSlider(),
		new ol.control.ZoomToExtent(),
		new ol.control.Rotate(),
		new ol.control.OverviewMap()
    ],
    view: view
});

/**
 * Add a click handler to the map to render the popup.
 */
map.on('singleclick', function (evt) {
    //Call function to renderer popup was a single click event is fired up
    displayInfoFeatures(evt);
});

