var random = function(cap)
{
	return Math.floor(Math.random() * cap)
}

var init = function() // Runs on page load
{
	if (location.href.indexOf("#") > -1) // If there is a URL parameter
	{
		var parameter = location.href.substring(location.href.indexOf("#") + 1, location.href.length)

		if (categories.indexOf(parameter) > -1)
		{
			load_category(categories.indexOf(parameter))
		}
		else
		{
			console.log('Error') // This is lazy and I'll make it do something better later
		}
	}
	else
	{
		load_index()
	}
}

var load_index = function()
{
	for (var i = 0; i < categories.length; i++)
	{
		make_preview(categories[i], gifs[i][random(gifs[i].length)], true)
	}
}

var load_category = function(index)
{
	for (var i = 0; i < gifs[index].length; i++)
	{
		make_preview(categories[index], gifs[index][i], false)
	}
}

	var make_preview = function(category, filename, making_index)
	{
		var ul = document.getElementById('gifs')
		var li = document.createElement('li')

		var gif = document.createElement('div')
			gif.className = "gif"
			gif.style.backgroundImage = "url('gifs/" + category + "/" + filename + "')"
		li.appendChild(gif)

		if (making_index)
		{
			var title = document.createElement('div')
				title.className = "title"
				title.innerHTML = category
			li.appendChild(title)

			li.onclick = function() { window.open(location.href + '#' + category) }
		}
		else
		{
			li.onclick = function() { window.open('gifs/' + category + '/' + filename) }
		}

		ul.appendChild(li)
	}