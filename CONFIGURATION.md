# CONFIGURATION
This document describes how you can customize and style your own version of geotiff.io.

## Create Config File
Your first step will be to create your own version of the [config.json](config.json).
You can name it whatever you want, such as `mysite-config.json`.

## Configure JSON file
You'll have to set your custom fields in your own config JSON file.  Here's a brief explanation of what the fields do.  See [the default JSON file](config.json) as an example.

| name   | required | description |
| ----   | -------------------- | ----------- |
| colors | yes | sets the colors that appear in the application |
| domain | no | set this if you want to create a CNAME file with this value |
| google_analytics_id | no | set this if you want to send events to your Google Analytics account |
| logo | no | set this if you want your logo to appear |
| resolution | no | Only for advanced users.  Hard-codes the resolution of how rasters appear |
| title | yes | application name that should be set in the head and displayed on your site |
| tools | yes | list of tools that should be available |

## Set Environmental Variable
In order to load your customizations, you must build and run the application with the `GEOTIFF_IO_CONFIG` environmental variable set to point to your config file.  For example, if you created a custom config file called `mysite-config.json`, you will run your application with `GEOTIFF_IO_CONFIG="./mysite-config.json" npm run start`.  You will build the application with `GEOTIFF_IO_CONFIG="./mysite-config.json" npm run build`.

### Contact
If you have any questions about configuration, please don't hesitate to contact Daniel J. Dufour, one of the maintainers, at daniel.j.dufour@gmail.com or post an issue in this Github repo.