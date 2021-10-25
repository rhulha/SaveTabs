document.getElementById('SaveTabs').addEventListener('click', function() {
	chrome.tabs.query({currentWindow: true}, function(tabs) {

		var list = [];
		for(var i=0;i<tabs.length;i++) {
			var o = { 
				url : tabs[i].url,
				index : tabs[i].index,
				title : tabs[i].title
			};
			list.push(o);
		}
		var j = JSON.stringify(list);

		/*
		var b = btoa(j); // btoa(unescape(encodeURIComponent(str))))
		var url = "data:application/json;base64," + b;
		*/

		/*
		var b = encodeURIComponent(j)
		var url = "data:application/json," + b;
		*/

		// TODO: title is missing spaces
		// TODO: save as HTML with easy to read text and hidden but working links
		// JSON sucks after testing it

		/*
		var b = j.replaceAll("?", "-").replaceAll("#", "-"); // otherwise the export breaks off on these letters.
		var url = "data:application/json," + b;
		*/

		var blob = new Blob([j], {type: "application/json"});
		var url = URL.createObjectURL(blob);

		chrome.downloads.download({url:url, filename: "current_links.json"}, function(downloadId) {
			console.log("The Id is:" + downloadId);
			document.getElementById('status').innerHTML = 'download started.';
		});

	});
		
});
	


