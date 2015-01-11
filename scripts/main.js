var random = function(cap)
{
	return Math.floor(Math.random() * cap)
}

function getParameter()
{
	if (location.href.indexOf("#") > -1) // If there is a parameter
	{
		var parameter = location.href.substring(location.href.indexOf("#") + 1, location.href.length)

		if (categories.indexOf(parameter) > -1)
		{
			return categories.indexOf(parameter)
		}
		else
		{
			console.log('Error') // This is lazy and I'll make it do something better later
		}
	}
	else
	{
		return false
	}
}

var init = function() // Runs on page load
{
	if (getParameter())
	{
		load_gif_category(getParameter())
	}
	else
	{
		load_gif_previews()
	}
}

var load_gif_previews = function()
{
	for (var i = 0; i < categories.length; i++)
	{
		make_preview(i, categories[i], gifs[i][random(gifs[i].length)])
	}
}

var make_preview = function(index, category, gif)
{
	var ul = document.getElementById('gifs')
	var li = document.createElement('li')

	li.onclick = function() { clear_ul(); location.href += '#' + category; load_gif_category(index);  }
	li.innerHTML = "<div class = 'title'>" + category + "</div>"
	li.style.backgroundImage = "url('gifs/" + category + "/" + gif + "')"
	ul.appendChild(li)
}

var load_gif_category = function(index)
{
	for (var i = 0; i < gifs[index].length; i++)
	{
		show_gif(categories[index], gifs[index][i])
	}
}

var clear_ul = function()
{
	document.getElementById('gifs').innerHTML = ''
}

var show_gif = function(category, gif)
{
	var ul = document.getElementById('gifs')
	var li = document.createElement('li')

	li.style.backgroundImage = "url('gifs/" + category + "/" + gif + "')"
	ul.appendChild(li)
}