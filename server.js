var http = require("http");
var url = require("url");

function start(route, handle){
    function onRequest(request, response) {
	var postData = "";
	var pathname = url.parse(request.url).pathname;
	console.log("Request received.");

	request.setEncoding("utf8");

	request.addListener("data", function(postDataChunk){
	    postData += postDataChunk;
	    console.log("Received POST data chunck '" +
			postDataChunck + "'.");
	});

	request.addListener("end", function(){
	    rout(handle,pathname,response,postData);
	});

	route(handle, pathname, response);
    }
    
    http.createServer(onRequest).listen(8080);

    console.log("Server has started.");
}

exports.start = start;
