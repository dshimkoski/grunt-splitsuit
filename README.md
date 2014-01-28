# grunt-splitsuit

> Split SUIT stylesheets into responsive/IE versions

## Getting Started
This plugin requires Grunt `~0.4.2`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-splitsuit --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-splitsuit');
```

## The "splitsuit" task

### Overview
In your project's Gruntfile, add a section named `splitsuit` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  splitsuit: {
    options: {
      // Task-specific options go here.
    },
    your_target: {
      // Target-specific file lists and/or options go here.
    },
  },
});
```

### Options

#### options.bp
Type: `Array`
Default value: `[,'(max-width: 25em)', '(min-width: 25em) and (max-width: 50em)', '(min-width: 50em)']`

An array of breakpoints associated with `v[123]-*` classes. The 0th entry will usually be null.

#### options.iebp
Type: `Number`
Default value: `2`

The max SUIT breakpoint to include in the IE only stylesheet.


### Usage Examples

#### Custom Options
In this example, the `iebp` option is used to reduce the number of breakpoints included in the IE stylesheet.

```js
grunt.initConfig({
  splitsuit: {
    options: {iebp: 1},
    files: {
      'dest/parsed.css': ['src/suit.css']
    }
  }
});
```

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History

 * 2014-01-28   v0.1.0   Initial release