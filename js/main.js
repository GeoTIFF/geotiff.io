try {
    console.log("starting main.js");
    var map = L.map('map').setView([0, 0], 2);
    map.options.minZoom = 2;

    var OpenStreetMap_Mapnik = L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
	maxZoom: 19,
	attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });

    OpenStreetMap_Mapnik.addTo(map);

    $(".modal").modal();

    $('#go').on('click', function (e) {
        console.log("GO!");
        var url_to_raster = $("#url-to-raster").val().trim();
        if (url_to_raster) {
            var input_url = url_to_raster;
        }

        var files = $("#file").get(0).files;
        if (files.length > 0) {
            var file = files[0];
            console.log("file:", file);
            var input_url = URL.createObjectURL(file);
        }

        console.log("input_url:", input_url);


        fetch(input_url).then(r => r.arrayBuffer()).then(function(buffer) {
            var s = L.ScalarField.fromGeoTIFF(buffer);
            let layer = L.canvasLayer.scalarField(s).addTo(map);
        });

         $(".modal").modal('hide');


        /* if we did leaflet-geottiff instead */
        /*var leaflet = L.leafletGeotiff(
            url=input_url,
            options={
                band: 0,
                displayMin: 0,
                displayMax: 30,
                name: 'Wind speed',
                colorScale: 'rainbow',
                clampLow: false,
                clampHigh: true,
                //vector:true,
                arrowSize: 20,
            }
        ).addTo(map);
        */

    });
    

} catch (error) {
    console.error(error);
}


