import fs from 'fs'

const encoding = 'utf8'

export { readFile, readFileSync }

function readFile (file) {
  return new Promise((resolve, reject) => {
    fs.readFile(file, encoding, (err, data) => {
      if (err) reject(err)
      resolve(data)
    })
  })
}

function readFileSync (file) {
  return fs.readFileSync(file, encoding)
}
