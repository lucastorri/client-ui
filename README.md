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
* **server**: builds the webserver and open a webserver in port 9001
* **connect**: bring the webserver up without building the app
* **clean**: cleans the build






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

* https://npmjs.org/package/grunt-preprocess
* https://npmjs.org/package/grunt-usemin
* https://npmjs.org/package/grunt-open
* https://npmjs.org/package/grunt-contrib-compress
* https://npmjs.org/package/grunt-modernizr
* https://npmjs.org/package/grunt-html2js
* https://npmjs.org/package/grunt-jsonlint
* https://npmjs.org/package/grunt-manifest