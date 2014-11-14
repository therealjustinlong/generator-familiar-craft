# generator-familiar-craft

Yeoman generator to download and setup [Craft CMS](http://buildwithcraft.com/) on a local machine.  Its optimized for a MAMP based workflow but could work with other systems.  The only thing you need to do before running it is setup a host via mamp that points to an empty 'project-name/public' directory

When run it will ask you for the project name, local host name, and local database name then it will run through the steps outlined below

## What the generator does

### Yeoman's Steps

* Copy over some default config and template files, and makes empty plugins and storage folders
* Copy over a starter Gruntfile.js with package.json (more on this later)
* Copy really basic bower.json (just includes bootstrap for now)
* Runs npm install
* Runs bower install
* Then it launches a Grunt Command called 'craft-install'

### Grunt's Steps
* Download craft via curl
* Unzips it
* copies over just the app folder into the /craft folder
* Delete the zip file and temporary unziped folder
* makes a database named whatever you called it during the initial setup (assumes username:root password:root)
* compiles the bootstrap less file
* opens the admin install screen

### Craft's Steps
* craft handles the rest via the normal install workflow

## Setup Instructions

1 - Install this generator via npm (only have to do this once and it assumes have yo installed)

```
npm install -g generator-familiar-craft
```

2 - Create a local host via MAMP that points to an empty 'project-name/public' folder

3 - Finally, initiate the generator:

```
yo familiar-craft
```

## Reusable Grunt Functions

```
grunt db_pull
```

will download and backup a copy of the database from the live or staging server and import it into your local

```
grunt db_push
```

pushes a local database up to live

```
grunt craft
```

downloads a copy of the latest craft from buildwithcraft.com and replaces just the /craft/app folder.  Great if your local files get behind the live.

```
grunt install
```

grabs craft app folder, creates the local database, and opens chrome to the craft install screem

```
grunt setup
```

similar to install but it assumes your working from an existing repo with a live server.  grabs craft app folder, creates the local database, and does a db_pull


*TADA!*
