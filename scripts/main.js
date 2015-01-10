var random = function(cap)
{
	return Math.floor(Math.random() * cap)
}

var make_preview = function(category, image)
{
	var ul = document.getElementById('categories')
	var li = document.createElement('li')

	li.innerHTML = "<div class = 'title'>" + category + "</div>"
	li.style.backgroundImage = "url('images/" + category + "/" + image + "')"
	ul.appendChild(li)
}

var load_gifs = function()
{
	for (var i = 0; i < categories.length; i++)
	{
		make_preview(categories[i], images[i][random(images[i].length)])
	}
}