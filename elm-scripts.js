const writeFile = require('fs').writeFile
var path = require('path')
var exec = require('child_process').exec

const rootDir = process.cwd()
const rimRafExecutable = path.join(rootDir, 'node_modules/.bin/rimraf')
process.chdir('lib/compilers/elm-compiler/temp')
var elmPackageJson = require(path.join(process.cwd(), 'elm-package-template.js'))

exec(rimRafExecutable + ' elm-stuff elm-package.json', function(err, stdout) {
  if(err) {
    console.log('error trying to delete elm-stuff', err.toString())
  } else {
    writeFile('elm-package.json', JSON.stringify(elmPackageJson), function(err, stdout) {
      if(err) {
        console.log('Error copy elm package json file from template', err.toString())
      } else {
        exec('elm-package install -y', function(err) {
          if(err) {
            console.log('Error installing elm packages')
            console.error(err)
          }
        })
      }
    })
  }
})
