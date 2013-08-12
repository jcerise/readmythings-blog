---
layout: post
title: "Node.js project setup gotcha (for a beginner)"
date: 2012-09-26 22:27
comments: true
categories: [gotchas, node, node.js, npm] 
---
I've been exploring Node.js recently, mainly because I've been hearing
so much about it from all corners of the web development world. I plan
to write a more in depth series of posts about my experiences with it at
some point in the future, but for now, I'd like to point out a quick
little gotcha (and its solution) that I ran across.
<!-- more -->
When setting up a new Node project, particularly one that uses Express
(installed via NPM), I was getting weird errors. Namely, when running 
```
node app.js
```

I was getting the following error:

```
module.js:340
    throw err;
Error: Cannot find module 'express'
    at Function.Module._resolveFilename (module.js:338:15)
    at Function.Module._load (module.js:280:25)
    at Module.require (module.js:362:17)
    at require (module.js:378:17)
    at Object.<anonymous> (/home/jeremy/Documents/node_projects/nodepad/app.js:6:15)
    at Module._compile (module.js:449:26)
    at Object.Module._extensions..js (module.js:467:10)
    at Module.load (module.js:356:32)
    at Function.Module._load (module.js:312:12)
    at Module.runMain (module.js:492:10)
```

Strange, especially when NPM is supposed to handle setting up all the
paths for everything correctly. I googled around a little, and some
things I found said that newer versions of NPM install modules into
/usr/local/lib/node_modules, whereas Node is actually looking for them
in /usr/local/lib/node. No big deal, I can just copy or symlink the
contents of /usr/local/lib/node_modules into /usr/local/lib/node. But
then I would have to do that every time I install a module. Messy, and
inconvinient. Turns out there is a better way.

First up, make sure express (or whatever module is causing the problem)
is installed globally by including the '-g- flag:
```
npm install express -g
```
Then create your new project as normal:
```
express app_name
```
cd into your new app directory, and then run:
```
npm link express
```
Which should make sure you app can access all the modules in the new
location. Running node app.js will now start up Node like you would
normally expect. Hope this helps save some one a few minutes of
frustration.
