---
layout: post
title: "Deploying Meteor to Heroku"
date: 2012-10-18 16:19
comments: true
categories: [meteor, js, javascript, meteorjs, heroku, git] 
---
Recently, while looking into and learning about Node.js, I ran across a
new framework utilizing Node called [Meteor](http://www.meteor.com "MeteorJS"). Since I just started playing
with it yesterday, I'll not go too deeply into the specifics of it,
because I have yet to figure them out. One thing I did figure out
though, and which I feel is not immediately obvious (thus why I'm
writing about it), is how to deploy a Meteor app to
[Heroku](http://www.heroku.com "Heroku").
<!-- more -->
I don't have a development server set up at the moment, so I wanted
somewhere I could run my test Meteor apps from, and preferably use
[Cloud9](http://c9.io "Cloud9 IDE") to develop from any of my machines.
Heroku fits the bill for this perfectly. Heres how to get a Meteor
environment setup in Heroku so you can deploy you apps to the cloud.

First off, install Meteor:
```
curl https://install.meteor.com | /bin/sh
```
Then, create a new app:
```
meteor create newapp
```
From here, you can run 
```
meteor
```
from the newly created newapp project directory to see your app running
locally (on localhost:3000).
The next step is to intialize a new git repo in your app directory:
```
git init
git add .
git commit -m 'Initial commit of Meteor app'
```
At this point, we are finally ready to set up our Heroku environment.
I'm using the Heroku command line client (part of the [Heroku
Toolbelt](http://toolbelt.herokuapp.com "Heroku Toolbelt")) to run the
following commands:
```
heroku create --stack cedar --buildpack https://github.com/jordansissel/heroku-buildpack-meteor.git
```
What this does is create a new Heroku instance with a buildpack that
downloads the latest version of Meteor, and installs it on the Heroku
instance. The buildpack repo can be found [here](https://github.com/jordansissel/heroku-buildpack-meteor)(many thanks to jordansissel for creating this buildpack).
A quick note at this point that's important to note: Your Heroku account
must be verified before this will work. If your account is not verified,
you will get weird errors when running the next step.
Finally, now that we've created our new Heroku instance with a Meteor
buildpack, we can push our app up to Heroku and run it:
```
git push heroku master
```
If you don't receive any errors, you should now be able to visit your
instance URL and see your shiny new Meteor app up and running!
