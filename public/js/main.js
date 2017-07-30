try {

    /* Want modal to pop up immediately */
    $(".modal").modal();

    console.log("starting main.js");

 //    var map = L.map('map').setView([0, 0], 2);
 //    map.options.minZoom = 2;

 //    var OpenStreetMap_Mapnik = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
	// maxZoom: 19,
	// attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
 //    });

 //    OpenStreetMap_Mapnik.addTo(map);


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


        fetch(input_url).then(
            r => r.arrayBuffer(),
            (error) => {
                var domain = new URL(input_url).host;
                var error_message = "GeoTIFF.io could not get the file from " + domain + ".  This is often because a website's security prevents cross domain requests.  Download the file and load it manually.";
                if (swal) swal("Oops", error_message, "error");
                else alert(error_message);
            }
        ).then(function(buffer) {
            if (buffer) {
                $(".modal").modal('hide');
                var s = L.ScalarField.fromGeoTIFF(buffer);
                let layer = L.canvasLayer.scalarField(s).addTo(map);
                var layer_bounds = layer.getBounds();
                map.flyToBounds(layer_bounds);
                L.rectangle(layer_bounds, {
                    color: "#ff0000",
                    fillOpacity: 0,
                    weight: 1
                }).addTo(map);
            }
       });

    });

    load_style("https://unpkg.com/leaflet-geosearch@2.4.0/dist/style.css"),
        load_style("https://unpkg.com/leaflet-geosearch@2.4.0/assets/css/leaflet.css")

} catch (error) {
    console.error(error);
}


