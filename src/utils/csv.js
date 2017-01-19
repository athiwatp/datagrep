import parse from 'csv-parse'
import parseSync from 'csv-parse/lib/sync'
import { readFile, readFileSync } from './file'

export { parseCsv, parseCsvSync }

function parseCsv (file, options = { auto_parse: true, skip_empty_lines: true }) {
  return new Promise(async (resolve, reject) => {
    const csvString = await readFile(file)
    parse(csvString, options, (err, output) => {
      if (err) reject(err)
      resolve(output)
    })
  })
}

function parseCsvSync (file, options = { auto_parse: true, skip_empty_lines: true }) {
  const csvString = readFileSync(file)
  return parseSync(csvString, options)
}
