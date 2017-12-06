import geoblaze from 'geoblaze';
import GeoRasterLayer from 'georaster-layer-for-leaflet';
import chroma from 'chroma-js';

const RasterService = {
    
    create_raster(input) {
        return new Promise(resolve => {
            geoblaze.load(input).then(georaster => {
                try {
                    let options = {
                        georaster: georaster,
                        opacity: 0.7
                    };
                    let raster = new GeoRasterLayer(options);
                    resolve(raster);
                } catch (error) {
                    console.error("error:", error);
                }
            });
        });
    }
}

export default RasterService;