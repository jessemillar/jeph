var load_gifs = function()
{
	for (var i = 0; i < categories.length; i++)
	{
		make_preview(categories[i], images[i][0])
	}
}

var make_preview = function(category, image)
{
	var ul = document.getElementById('categories')
	var li = document.createElement('li')

	li.innerHTML = "<a href = '#'><img src = 'images/" + category + '/' + image + "'></a>"
	ul.appendChild(li)
}