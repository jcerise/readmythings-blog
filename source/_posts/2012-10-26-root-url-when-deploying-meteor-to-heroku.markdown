---
layout: post
title: "ROOT_URL when deploying Meteor to Heroku"
date: 2012-10-26 16:23
comments: true
categories: [meteor, js, heroku, meteorjs] 
---
I guess you could call this a followup to my last post about deploying
Meteor applications to Heroku (found
[here](http://readmythings.com/blog/2012/10/18/deploying-meteor-to-heroku/)).
I ran into this little error today while trying to get a new Meteor
application up and running via Heroku. Basically, my app was crashing,
and running:
```
heroku logs
```
yielded the following:
```
app/packages/meteor/url_common.js:14
2012-10-26T22:08:39+00:00 app[web.1]:       throw new Error("Must pass options.rootUrl or set ROOT_URL in the server
2012-10-26T22:08:39+00:00 app[web.1]:             ^
2012-10-26T22:08:39+00:00 app[web.1]: Error: Must pass options.rootUrl or set ROOT_URL in the server environment
2012-10-26T22:08:39+00:00 app[web.1]:     at Object.Meteor.absoluteUrl (app/packages/meteor/url_common.js:14:13)
2012-10-26T22:08:39+00:00 app[web.1]:     at app/packages/accounts-password/email_templates.js:3:20
2012-10-26T22:08:39+00:00 app[web.1]:     at /app/.meteor/local/build/server/server.js:107:21
2012-10-26T22:08:39+00:00 app[web.1]:     at Array.forEach (native)
2012-10-26T22:08:39+00:00 app[web.1]:     at run (/app/.meteor/local/build/server/server.js:93:7)
2012-10-26T22:08:39+00:00 app[web.1]:     at Function._.each._.forEach (/app/.meteor/local/build/server/underscore.js:76:11)
2012-10-26T22:08:40+00:00 heroku[web.1]: Process exited with status 1
2012-10-26T22:08:40+00:00 heroku[web.1]: State changed from starting to crashed
```
Not overly helpful, as it didn't seem to be a Meteor specific error. And
it turns out it wasn't, at least not wholly. I found that Heroku has a
config command where you can set things like the ROOT_URL, and for some
reason, in this case it needed it set manually (I've never had to use
this before, so maybe I'm just doing something wrong). Anyways, I ran:
```
heroku config:add ROOT_URL=[Heroku instance URL]
```
And, lo and behold, my app stopped crashing and started working.

I would like to know why I had to manually set this in this case, so if
anyone knows, give a shout in the comments. I'll try and figure it out
on my own in the meantime.
