//interactions

// create an interaction to add to the map that isn't there by default
var interaction = new ol.interaction.DragRotateAndZoom();

$(document).ready(function () {
	map.addInteraction(interaction);
});
