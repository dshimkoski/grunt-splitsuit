/*
 * grunt-splitsuit
 * https://github.com/dshimkoski/grunt-splitsuit
 *
 * Copyright (c) 2014 dshimkoski
 * Licensed under the MIT license.
 */

'use strict';

var cssp = require('css-parse');

module.exports = function(grunt) {

  var lf = grunt.util.linefeed;

  grunt.registerMultiTask('splitsuit', 'Split SUIT stylesheets into responsive/IE versions', function() {

    var o = this.options({
        iebp: 2,
        bp: [,'(max-width: 25em)', '(min-width: 25em) and (max-width: 50em)', '(min-width: 50em)']
    });

    this.files.forEach(function(f) {
      var src = f.src.map(function(filepath) {
        return grunt.util.normalizelf(grunt.file.read(filepath));
      });

      var v = [{}, {}, {}, {}];

      src.forEach(function(css) {
        var rules = cssp(css).stylesheet.rules;
        for (var i = 0, len = rules.length; i < len; i++) {
            var sel = rules[i].selectors,
                decl = rules[i].declarations;
            if (sel) {
                for (var j = 0, jlen = sel.length; j < jlen; j++) {
                    var s = sel[j],
                        n = (s.match(/\.v([123])-/) || [,0])[1];
                    if (!v[n][s]) {
                      v[n][s] = [];
                    }
                    v[n][s].push(s + ' {' +joinDecl(decl) + '}');
                }
            }
        }
      });

      function joinDecl(decl) {
        var all = [];
        decl.forEach(function(d) {
            all.push(d.property+':'+d.value);
        });
        return all.join(';');
      }

      var ie = '', css = ['','','',''];

      for (var n = 0; n < 4; n++) {
        var sel = Object.keys(v[n]);
        for (var i = 0, len = sel.length; i < len; i++) {
            var s = sel[i];
            css[n] += v[n][s].join(lf)+lf;
            if (!o.bp[n] || o.iebp === n) {
              ie += v[n][s]+lf;
            }
        }
      }

      var content = true;
      css = css.map(function(rules, n) {
        if (!rules.length) {
            content = false;
            return '';
        }
        return o.bp[n] ? '@media '+o.bp[n]+' {'+lf+rules+'}' : rules;
      }).join(lf);

      if (!content) {
        grunt.log.warn('Responsive stylesheet not written because CSS was empty.');
      } else {
        grunt.file.write(f.dest, css);
        grunt.log.ok('Created responsive stylesheet ' + f.dest);
      }

      if (!ie.length) {
        grunt.log.warn('IE stylesheet not written because CSS was empty.');
      } else {
        var dest = f.dest.replace(/\.css$/, '-ie.css');
        grunt.file.write(dest, ie);
        grunt.log.ok('Created IE stylesheet ' + dest);
      }

    });
  });

};