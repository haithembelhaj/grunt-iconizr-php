/*
 * grunt-iconizr
 * https://github.com/haithembelhaj/grunt-iconizr
 *
 * Copyright (c) 2014 haithem bel haj
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  var cp = require('child_process'),
      log = grunt.log,
      f = require('util').format,
      verbose = grunt.verbose,
      command = __dirname+'/iconizr/iconizr.phps';

  // Please see the Grunt documentation for more information regarding task
  // creation: http://gruntjs.com/creating-tasks

  grunt.registerMultiTask('iconizr', 'grunt plugin for  iconizr', function() {
    var done = this.async(),
        options = this.data,
        exitCodes = [0],
        childProcess,
        execOptions = {};

    command += ' -dv'

    command += ' -o '+ options.dest;
    command += ' '+ options.src;

    if(options.sass){
      command += ' -s';
    }else{
      command += ' -c';
    }

    if(options.prefix !== undefined)
      command += ' -p '+options.prefix

    options.cwd && (execOptions.cwd = options.cwd);

    console.log(command);
    childProcess = cp.exec(command, execOptions, function(err, data){ log.write(err);});

    childProcess.stdout.on('data', function (d) { log.write(d); });
    childProcess.stderr.on('data', function (d) { log.error(d); });

    childProcess.on('exit', function(code) {
      if (exitCodes.indexOf(code) < 0) {
        log.error(f('Exited with code: %d.', code));
        return done(false);
      }

      verbose.ok(f('Exited with code: %d.', code));
      done();
    });

  });

};
