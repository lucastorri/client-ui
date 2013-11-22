# Experimental Grunt Project for PCUR

## Dependencies

* nodejs
* npm



## Starting with the project

```
cd $project_dir
npm install grunt-cli bower -g
npm install                                 # download dependencies
bower install                               # install app js requirements
```

## Running

* Build:

```
grunt build
```


* With server:

```
grunt
```

## Installing a bower package

```
bower install $package[#$version] --save
```


### Others

* creating a grunt project

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