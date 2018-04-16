const fs = require('fs')
const path = require('path')
const repositoryPath = path.join(__dirname, 'ExampleRepository')
const testsuitesPath = path.join(__dirname, '../JavaTestRunner/src/info/atowers/practicelit/java/testsuites')
const projectRootPath = path.join(__dirname, '../')
console.log(projectRootPath)

let repository = {}
let ids = [] // TODO either save this to file, or don't compute it

fs.readdir(repositoryPath, (err, files) => {
  if (err) {
    console.log(err)
  }

  files.forEach(f => {
    if (f !== 'repository.json') {
      const manifestPath = path.join(repositoryPath, f, 'manifest.json')
      let manifest = JSON.parse(fs.readFileSync(manifestPath))
      let location = manifest.location.split('/')
      if (ids.indexOf(manifest.id) !== -1) {
        console.log('[ERROR] ' + f + ' is using an already taken id')
        console.log('        fix the conflict then re-run the indexer')
        return;
      }
      ids.push(manifest.id)


      /* add the path to the repository map */
      if (location[0]) { // check to see if there is any location to apply
        if (!repository[location[0]]) {
          repository[location[0]] = {}
        }

        let l = repository
        while (location.length > 0) {
          let nextStep = location.shift()
          if (!l[nextStep]) {
            l[nextStep] = {}
          }
          l = l[nextStep]
        }

        l[manifest.id] = manifest.name
      } else {
        repository[manifest.id] = manifest.name
      }

      /* symlink the java code to JavaTestRunner/..../testsuites */
      /* using a symlink here because the gradle build tool will follow the symlink when compiling the jar */
      const javaFileName = f + '.java'
      const javaPath = path.join(repositoryPath, f, javaFileName)
      const relativeJavaPath = path.relative(testsuitesPath, javaPath)
      try {
        fs.symlinkSync(relativeJavaPath, path.join(testsuitesPath, javaFileName))
      } catch(err) {
        if (err.code !== 'EEXIST') { // if the error is not the symlink already existing, throw it and crash
          throw err
        }
      }

      /* copy the problem prompt html into the problemPrompts folder in Web/public/repository */
      /* this uses a copy because the files are directly brought into the docker container */
      const htmlFileName = f + '.html'
      const htmlPath = path.join(repositoryPath, f, htmlFileName)
      const problemPromptsPath = path.join(projectRootPath, 'Web', 'public', 'repository', 'problemPrompts')
      fs.copyFileSync(htmlPath, path.join(problemPromptsPath, htmlFileName))
    }
  })

  const outputPath = path.join(projectRootPath, 'Web', 'public', 'repository', 'repository.json')
  fs.writeFileSync(outputPath, JSON.stringify(repository), (err) => {
    console.log(err)
  })
})

