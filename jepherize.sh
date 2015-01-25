#!/bin/sh

FILE="database.js"

if [ -f database.js ] # Kill the old database.js file if it exists
then
	rm database.js
fi

if [ -d previews ] # Kill the old preview directory if it exists
then
	rm -R previews
fi

mkdir previews

echo "var categories = [" >> $FILE # List the gif categories

for i in "gifs"/*; do
	echo "    \"$(basename "$i")\"," >> $FILE # List the directories as objects in an array

	mkdir "previews/$(basename "$i")" # Make the directories for static previews
done

echo "]" >> $FILE

echo "var gifs = [" >> $FILE # List the gifs

for i in "gifs"/*; do
	echo "    [" >> $FILE

	for j in "$i"/*; do
		echo "        \"$(basename "$j")\"," >> $FILE # Make each gif a child of the category object

		convert "gifs/$(basename "$i")/$(basename "$j")[0]" "previews/$(basename "$i")/$(basename "$j")"
	done

	echo "    ]," >> $FILE
done

echo "]" >> $FILE