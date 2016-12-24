import parse from 'csv-parse'
import { readFile } from './file'

export { parseCsv }

function parseCsv (file, options = { auto_parse: true, skip_empty_lines: true }) {
  return new Promise(async (resolve, reject) => {
    const csvString = await readFile(file)
    parse(csvString, options, (err, output) => {
      if (err) reject(err)
      resolve(output)
    })
  })
}
