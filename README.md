# generator-familiar-craft

Yeoman generator to download and setup [Craft CMS](http://buildwithcraft.com/) on a local machine.  Its optimized for a MAMP based workflow but could work with other systems.  The only thing you need to do before running it is setup a host via mamp that points to an empty 'project-name/public' directory

When run it will ask you for the project name, local host name, and local database name then it will run through the steps outlined below 

### Yeoman's Steps

# Copy over some default config and template files, and makes empty plugins and storage folders
# Copy over a starter Gruntfile.js with package.json (more on this later)
# Copy really basic bower.json (just includes bootstrap for now)
# Runs npm install
# Runs bower install
# Then it launches a Grunt Command called 'craft-install'

### Grunt's Steps
# Download craft via curl
# Unzips it
# copies over just the app folder into the /craft folder
# Delete the zip file and temporary unziped folder
# makes a database named whatever you called it during the initial setup (assumes username:root password:root)
# compiles the bootstrap less file
# opens the admin install screen

### Craft's Steps
# craft handles the rest via the normal install workflow

## Setup Instructions

Install yo

```bash
npm install -g yo
```

To install this generator via  npm:

```bash
npm install -g generator-familiar-craft
```

Create a local host via MAMP that points to an empty 'project-name/public' folder

Finally, initiate the generator:

```bash
yo familiar-craft
```

*TADA!*
