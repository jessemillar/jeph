#!/bin/sh

FILE="../database.js"

if [ -f ../database.js ] # Kill the old database.js file if it exists
then
	rm ../database.js
fi

echo "var categories = [" >> $FILE # List the gif categories

for i in "../gifs"/*; do
	echo "    \"$(basename "$i")\"," >> $FILE # Make the directories objects in an array
done

echo "]" >> $FILE

echo "var gifs = [" >> $FILE # List the gifs

for i in "../gifs"/*; do
	echo "    [" >> $FILE

	for j in "$i"/*; do
		echo "        \"$(basename "$j")\"," >> $FILE # Make each gif a child of the category object
	done

	echo "    ]," >> $FILE
done

echo "]" >> $FILE