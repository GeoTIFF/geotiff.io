try {

    /* Want modal to pop up immediately, unless preloading a raster */
    var search_params = new URLSearchParams(window.location.search);
    var url = search_params.get("url");
    if (!url) {
        $(".modal").modal();
    }

    console.log("starting main.js");

 //    var map = L.map('map').setView([0, 0], 2);
 //    map.options.minZoom = 2;

 //    var OpenStreetMap_Mapnik = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
	// maxZoom: 19,
	// attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
 //    });

 //    OpenStreetMap_Mapnik.addTo(map);

    load_style("https://unpkg.com/leaflet-geosearch@2.4.0/dist/style.css"),
    load_style("https://unpkg.com/leaflet-geosearch@2.4.0/assets/css/leaflet.css")

} catch (error) {
    console.error(error);
}


