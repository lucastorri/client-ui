# Experimental Grunt Project for PCUR

## Dependencies

* nodejs
* npm



## Starting with the project

```
cd $project_dir
npm install grunt-cli bower -g --save-dev
npm install --save-dev                      # download dependencies
bower install                               # install app js requirements
```

## Running a server

```
grunt connect
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