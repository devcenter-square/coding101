# coding101
Repo for the guide to coding project

## File Structure & Project Setup
This project utilizes Build Automation with Gulp and also Sass as a PreProcessor. So you'll need to have [Node.js](http://nodejs.org/download), [Git](http://git-scm.com) and [Sass](http://sass-lang.com/tutorial.html) installed.

Project setup is pretty easy:

1. Install [Node.js](http://nodejs.org/download), [Sass](http://sass-lang.com/tutorial.html) and [Git](http://git-scm.com).
2. [Install Gulp](http://Gulpjs.com/) using `npm install -g gulp`. You may/or not need to use `sudo` in front of the Gulp install command to give it permissions.
3. Run `npm install` to install project dependencies. That should install all dependencies in the `package.json` file.
4. Run `gulp` on your Terminal inside your project directory to serve/launch the project from the `app` folder.

File Structure is divided into two. The `app` folder and `src` folder.

1. The `src` folder contains the JS and Sass files we'll be editing.
2. The `app` folder contains the HTML files/pages and assets for the folder. It also contains the auto compiled CSS and JS files as well as external resources like images and plugins, if any.
