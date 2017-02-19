
/***
 * global Variabes
 * 
 */
var extent, format, wmsSource, osmLayer, layers, view;
var map;
/**
 * End of global variables
 */
function applyMargins() {
    var leftToggler = $(".mini-submenu-left");
    if (leftToggler.is(":visible")) {
        $("#map .ol-zoom")
          .css("margin-left", 0)
          .removeClass("zoom-top-opened-sidebar")
          .addClass("zoom-top-collapsed");
    } else {
        $("#map .ol-zoom")
          .css("margin-left", $(".sidebar-left").width())
          .removeClass("zoom-top-opened-sidebar")
          .removeClass("zoom-top-collapsed");
    }
}

function isConstrained() {
    return $(".sidebar").width() == $(window).width();
}

function applyInitialUIState() {
    if (isConstrained()) {
        $(".sidebar-left .sidebar-body").fadeOut('slide');
        $('.mini-submenu-left').fadeIn();
    }
}

function instantiateGlobalVariables() {
    //An array of numbers representing an extent: [minx, miny, maxx, maxy]
    //extent = [4091020.256326, -15468.942551, 4099588.155744, -11577.705952]; //for farmers

    extent = [-919335.054, -421034.721, 5489455.831, 4323205.57]; //farmcoordinate_to_farmer_evw

    format = 'image/png';

    wmsSource = new ol.source.ImageWMS({
        url: 'http://localhost:8080/geoserver/adims/wms',
        params: { 'LAYERS': 'adims:farmcoordinate_to_farmer_evw' },
        //params: {
        //    'FORMAT': format,
        //    'VERSION': '1.1.1',
        //    tiled: true,
        //    STYLES: 'farmers3',
        //    LAYERS: 'adims:farmcoordinate_to_farmer_evw'
        //},
        serverType: 'geoserver'
        //,crossOrigin: 'anonymous'
    });

    osmLayer = new ol.layer.Tile({
        source: new ol.source.OSM()
    });

    layers = [osmLayer,
        new ol.layer.Image({
            source: wmsSource
        })
    ];

    view = new ol.View({
        center: ol.proj.transform([36.750, -0.123], 'EPSG:4326', 'EPSG:3857'),
        extent: extent,
        zoom: 7
    });
};

function popupFunctions() {
    //Add overlay
    map.addOverlay(overlay);

    //Wire singleclick event to dispayfearuresinfo handler


    /**
     * Add a click handler to the map to render the popup.
     */
    map.on('singleclick', function (evt) {
        //Call function to renderer popup was a single click event is fired up
        displayInfoFeatures(evt);


    });
}


$(function () {
    $('.sidebar-left .slide-submenu').on('click', function () {
        var thisEl = $(this);
        thisEl.closest('.sidebar-body').fadeOut('slide', function () {
            $('.mini-submenu-left').fadeIn();
            applyMargins();
        });
    });

    $('.mini-submenu-left').on('click', function () {
        var thisEl = $(this);
        $('.sidebar-left .sidebar-body').toggle('slide');
        thisEl.hide();
        applyMargins();
    });

    $(window).on("resize", applyMargins);

    //call function to instantiate map objects
    instantiateGlobalVariables();

    /**
     * Create the map.
     */
    map = new ol.Map({
        layers: layers,
        controls: [
            new ol.control.Zoom(),
            new ol.control.FullScreen(),
            //new ol.control.MousePosition(),
            new ol.control.ScaleLine(),
            //new ol.control.ZoomSlider(),
            //new ol.control.ZoomToExtent(),
            new ol.control.Rotate(),
            new ol.control.OverviewMap()
        ],
        //overlays: [overlay],
        target: 'map',
        view: view
    });

    //Call map related components
    popupFunctions();

    applyInitialUIState();
    applyMargins();
});