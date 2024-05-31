# stars of entropy

browser game where you control a ship and shoot at stuff

no frameworks used, i like small filesizes (but im not opposed to human readable html/css/js)

## running

locally:
- local host the repo
	* with `python`: `python -m http.server 8000`
	* with `php`: `php -S 0.0.0.0:8000`
- connect with a web browser (eg. firefox)
	* http://localhost:8000/ (same device as host)
	* http://192.168.your.ip:8000/ (different device than host, both devices connected to the same wifi station)

embedding into a page:
```html
<iframe src="http[s]://link/to/index.html"
title="javascript game">
	your browser does not support &lt;iframe&gt;
</iframe>
```

## dependencies

building:
- \-

running:
- sufficiently-up-to-date html5-capable web browser

(sorry but i actually tested the game in chromium based browsers which are off by .5 pixels, which means firefox based browsers will appear off by .5 pixels)

## legal

you are free to do as you wish with these documents, under the condition that you do not try to claim you made them

there is no warranty.
