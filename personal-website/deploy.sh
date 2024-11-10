npm run build
cp ./dist/* ../ # copies over the favicons and index
cp ./dist/assets/*.js ../static/js
cp ./dist/assets/*.css ../static/css
cp ./dist/assets/*.{png,jpg} ../static/media
cp ./dist/.vite/* ../ # this will copy over the manifest
