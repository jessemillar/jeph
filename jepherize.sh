#!/bin/sh

printf "! Starting Jepherization (some conversions may take a while)"

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

for i in "gifs"/* # Look through folders in /gifs
do
	echo "    \"$(basename "$i")\"," >> $FILE # List the directories as objects in an array

	if [ ! -d "previews/$(basename "$i")" ]
	then
		mkdir "previews/$(basename "$i")" # Make the directories for static previews
	fi
done

echo "]" >> $FILE

echo "var gifs = [" >> $FILE # List the gifs

for i in "gifs"/*
do
	printf "\n[ $i ] " # Show progress for directories

	echo "    [" >> $FILE

	for j in "$i"/*
	do
		SIZELIMIT=24500000 # 24.5 MB to conform to Gmail's attachment limit
		if [ $(stat -f%z "$j") -ge $SIZELIMIT ] # Compress if the GIF is larger than the size limit
		then
			printf "0" # Show the start of a conversion

			while [ $(stat -f%z "$j") -ge $SIZELIMIT ]
			do
				printf ":" # Visualize another compression attempt
				gifsicle --no-warnings --batch "$j" --scale 0.75 || break # Compress the GIF incrementally until it's small enough and allow killing the script via Ctrl + C
			done
		fi

		echo "        \"$(basename "$j")\"," >> $FILE # Make each gif a child of the category object

		if [ ! -f "previews/$(basename "$i")/$(basename "$j")" ] # Check if we already have a preview of the current GIF
		then
			printf "o" # Show a lowercase "o" if we need to generate a preview for the current 
			gifsicle "gifs/$(basename "$i")/$(basename "$j")" '#0' > "previews/$(basename "$i")/$(basename "$j")" # Make a static preview for each GIF from the first frame
		else
			printf "." # Show a period if we already have a preview for the current GIF
		fi
	done

	echo "    ]," >> $FILE
done

echo "]" >> $FILE

printf "\n! Finished Jepherization\n"
