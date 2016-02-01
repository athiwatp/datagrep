import {Component, Output, EventEmitter} from 'angular2/core';

@Component({
    selector: 'csv-importer',
    template: `
        <input type="file" accept="text/csv" (change)="readFileToString($event)">
    `
})
export class CSVImporterComponent {
    @Output('data-imported') dataEmitter: EventEmitter<any> = new EventEmitter();

    readFileToString(event: Event) {
        var input = <HTMLInputElement>event.target,
            files = <FileList>input.files,
            file = <File>files[0],
            reader: FileReader;

        if (file) {
            reader = new FileReader();
            reader.onload = () => this.parseCsvFromString(reader.result);
            reader.readAsText(file);
        }
    }

    parseCsvFromString(csvText: String) {
        var rows = csvText.split(/\r\n|\r|\n/),
            data = rows.map(row => row.split(/,(?![^"][^,]+"[^$])/g)),
            len = data.length;

        if (data[len - 1].length < data[0].length) {
            data.pop();
        }

        this.dataEmitter.emit(data);
    }
}