json-tree
=========

Needed this for my own project and couldn't find anything simple that worked, so I built it and decided to share it on GitHub.

It's pretty small and simple. Just supply a JSON object and an optional container to render it in and **json-tree** will build and append a DOM hierarchy representing the JSON object there. It will also return an HTML string representing the structure in case you need to render it elsewhere.

Doesn't do anything too fancy. No animations or expand/contract functionality. Might add that in later.


Requirements
-------------
You'll need [jQuery](http://jquery.com/) for this to work.


Usage
-----
1. Add the stylesheet to your HTML head tag:	`<link rel="stylesheet" href="json-tree.css">`	
2. Add the script tag at the end of your HTML body tag:	`<script src="js/json-tree.js"></script>`	
3. Call json-tree in one of the following ways:
	* `$('#container').jsonTree(json);`
	* `document.write(window.jsonTree(json));`
	* `window.jsonTree(json, $('#container'));`

Demo
----
Don't have anywhere to host it at the moment. Just clone the repo and check the demo path.



Hopefully you'll find it useful :)


Enjoy!



