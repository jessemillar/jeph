#!/bin/sh

FILE="../database.js"

if [ -f ../database.js ] # Kill the old database.js file if it exists
then
	rm ../database.js
fi

echo "var categories = [" >> $FILE # List the image categories

for i in "../images"/*; do
	echo "    \"$(basename "$i")\"," >> $FILE # Make the directories objects in an array
done

echo "]" >> $FILE

echo "var images = [" >> $FILE # List the images

for i in "../images"/*; do
	echo "    [" >> $FILE

	for j in "$i"/*; do
		echo "        \"$(basename "$j")\"," >> $FILE # Make each image a child of the category object
	done

	echo "    ]," >> $FILE
done

echo "]" >> $FILE