
const { sh } = require('./utils')
const bestzip = require('bestzip')

const BUILD_FOLDER = './build'
const ZIP_INCLUDES = [
  'build',
  'tasks',
  'example.env',
  'package.json',
  'package-lock.json',
]

function clean() {

  // remove build folder
  sh(`rm -rf ${BUILD_FOLDER} || true`)

  // remove build.zip
  sh(`rm -f build.zip || true`)

}

function build() {
  
  // compile typescript code
  sh(`babel ./src -d ./build`)

}

function zip() {

  // remove previous created zip 
  sh(`rm -f build.zip || true`)

  // create new zip
  bestzip({
    source: ZIP_INCLUDES,
    destination: './build.zip',
  })

}

module.exports = {
  clean,
  build,
  zip,
}
