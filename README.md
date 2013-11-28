# Experimental Grunt Project for PCUR

## Dependencies

* node
* npm



## Starting with the project

```
cd $project_dir
npm install                # download dependencies
bower install              # install app js requirements
```


## Tasks

* **build [default]**: builds the webapp
* **server**: brings up a server on http://localhost:8080 with the built app
* **clean**: cleans the build
* **fakeapi**: a mock for the api server






## Others

### Installing a bower package

```
bower install $package[#$version] --save
```


### creating a grunt project

```
npm install -g grunt-init
git clone https://github.com/gruntjs/grunt-init-gruntfile.git ~/.grunt-init/gruntfile
grunt-init gruntfile
```

### Bower Plugins to look for

* Some templating plugin (like for default.ssp)
* https://npmjs.org/package/grunt-angular-templates
* https://github.com/gruntjs/grunt-contrib-watch
* https://npmjs.org/package/grunt-preprocess
* https://npmjs.org/package/grunt-usemin
* https://npmjs.org/package/grunt-open
* https://npmjs.org/package/grunt-contrib-compress
* https://npmjs.org/package/grunt-modernizr
* https://npmjs.org/package/grunt-html2js
* https://npmjs.org/package/grunt-jsonlint
* https://npmjs.org/package/grunt-manifest