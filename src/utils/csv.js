import parse from 'csv-parse';

export { parseCsv };

function parseCsv(csvString, options = { auto_parse: true, skip_empty_lines: true }) {
    return new Promise((resolve, reject) => {
        parse(csvString, options, (err, output) => {
            if (err) reject(err);
            resolve(output);
        });
    });
}