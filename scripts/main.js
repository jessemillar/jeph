var random = function(cap)
{
	return Math.floor(Math.random() * cap)
}

var init = function() // Runs on page load
{
	if (window.location.hash == '#_=_') { // Kill URL artifacts from Tumblr URL forwarding
	    window.location.hash = ''; // For older browsers, leaves a # behind
	    history.pushState('', document.title, window.location.pathname); // Nice and clean
	    event.preventDefault(); // No page reload
	}

	if (location.href.indexOf("?") > -1) // If there is a URL parameter
	{
		var parameter = location.href.substring(location.href.indexOf("?") + 1, location.href.length)

		for (var i = 0; i < 5; i++) // Ghetto...
		{
			parameter = parameter.replace('%20', ' ') // Get rid of spaces in URL parameters on the backend
		}

		if (categories.indexOf(parameter) > -1)
		{
			loadCategory(categories.indexOf(parameter))
		}
		else
		{
			console.log('Error') // This is lazy and I'll make it do something better later
		}
	}
	else
	{
		loadIndex()
	}

	loadMobileGifs()
}

var loadMobileGifs = function() // Automatically load GIF previews if in the frame
{
	if (typeof window.orientation !== 'undefined') // Ghetto check for mobile browsers
	{
		var gifs = document.getElementById('gifs').getElementsByTagName('li')

		for (var i = 0; i < gifs.length; i++)
		{
			if (isVisible(gifs[i]))
			{
				gifs[i].onmouseover()
			}
			else
			{
				gifs[i].onmouseout()
			}
		}
	}
}

	var isVisible = function(li)
	{
		var rect = li.getBoundingClientRect()

		return (
			rect.bottom >= 0 &&
			rect.top <= (window.innerHeight || document.documentElement.clientHeight)
		)
	}

var loadIndex = function()
{
	for (var i = 0; i < categories.length; i++)
	{
		makePreview(categories[i], gifs[i][random(gifs[i].length)], true)
	}
}

var loadCategory = function(index)
{
	for (var i = 0; i < gifs[index].length; i++)
	{
		makePreview(categories[index], gifs[index][i], false)
	}
}

	var makePreview = function(category, filename, making_index)
	{
		var ul = document.getElementById('gifs')
		var li = document.createElement('li')

		var preview = document.createElement('div')
			preview.className = "preview"
			preview.style.backgroundImage = "url('previews/" + category + "/" + filename + "')"
		li.appendChild(preview)

		var loading = document.createElement('div')
			loading.className = "loading"
			loading.style.backgroundImage = "url('images/loading.png')"
			loading.style.display = "none"
		li.appendChild(loading)

		var gif = document.createElement('div')
			gif.className = "gif"
			gif.style.display = "none"
		li.appendChild(gif)

		setMouseover(li, preview, loading, gif, category, filename)

		if (making_index)
		{
			var title = document.createElement('div')
				title.className = "title"
				title.innerHTML = category
			li.appendChild(title)

			li.onclick = function() { location.assign(location.href + '?' + category); history.pushState() }
		}
		else
		{
			li.onclick = function() { window.open('gifs/' + category + '/' + filename) }
		}

		ul.appendChild(li)
	}

		var setMouseover = function(li, preview, loading, gif, category, filename) // For proper closure
		{
			li.onmouseover = function()
			{
				loading.style.display = 'block'
				gif.style.display = 'block'
				gif.style.backgroundImage = "url('gifs/" + category + "/" + filename + "')"
			}
			
			li.onmouseout = function()
			{
				loading.style.display = 'none'
				gif.style.display = 'none'
				gif.style.backgroundImage = 'none' // Don't load every image we accidentally mouseover
			}
		}
