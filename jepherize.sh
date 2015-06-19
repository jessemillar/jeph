#!/bin/sh

printf "Starting Jepherization\n"

FILE="database.js"

if [ -f database.js ] # Kill the old database.js file if it exists
then
	rm database.js
fi

if [ ! -d previews ] # Make the previews directory if it doesn't exist
then
	mkdir previews
fi

echo "var categories = [" >> $FILE # List the gif categories

for i in "gifs"/*; do
	echo "    \"$(basename "$i")\"," >> $FILE # List the directories as objects in an array

	if [ ! -d "previews/$(basename "$i")" ]
	then
		mkdir "previews/$(basename "$i")" # Make the directories for static previews
	fi
done

echo "]" >> $FILE

echo "var gifs = [" >> $FILE # List the gifs

for i in "gifs"/*; do
	printf "0" # Show progress for directories

	echo "    [" >> $FILE

	for j in "$i"/*; do
		echo "        \"$(basename "$j")\"," >> $FILE # Make each gif a child of the category object

		if [ ! -f "previews/$(basename "$i")/$(basename "$j")" ]
		then
			printf "o" # Show a lowercase "o" if we need to generate a preview for the current GIF
			convert "gifs/$(basename "$i")/$(basename "$j")[0]" "previews/$(basename "$i")/$(basename "$j")" # Make a static preview for each GIF from the first frame
		else
			printf "." # Show a period if we already have a preview for the current GIF
		fi
	done

	echo "    ]," >> $FILE
done

echo "]" >> $FILE

printf "\nFinished Jepherization"
