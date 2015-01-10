#!/bin/sh

OUTPUT="../database.json"

if [ -f ../database.json ]
then
	rm ../database.json
fi

echo "{" >> $OUTPUT

for i in "../images"/*; do
	echo "    \"$(basename "$i")\": {" >> $OUTPUT # Make the directories JSON objects

	for j in "$i"/*; do
		echo "        \"$(basename "$j")\"," >> $OUTPUT # Make each image a child of the object
	done

	echo "    }," >> $OUTPUT
done

echo "}" >> $OUTPUT