Sometimes GIFs are better than words
-

I love [Giphy](http://www.giphy.com/), but it's pretty slow sometimes and there're some GIFs on there I don't like so much. This is a little project I put together to effectively run my own version of Giphy on GitHub Pages.

Instructions
-

Chuck whatever GIFs you want in your collection in the /gifs folder inside folders named whatever you want your homepage categories to be called. When you're done, run the "jepherize.sh" script.

    $ ./jepherize.sh

This will create static preview images of each GIF (because bandwidth is an endangered animal) and create a JSON "database" of the filenames. The .sh script is necessary since GitHub Pages doesn't give us any sort of dynamic database.

Enjoy!

Notes
-

[ImageMagick](http://www.imagemagick.org/) is a required dependancy. When you run the "jepherize.sh" script, ImageMagick goes through and creates new preview images from the first frame of each GIF and shoves them in the /previews folder.

GIFs are housed in the /gifs folder. The heirarchy is /gifs/category/file.gif. Nested category folders are not supported.
