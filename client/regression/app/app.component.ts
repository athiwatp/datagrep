import {Component} from 'angular2/core';
import {DataGridComponent} from './data-grid.component';

@Component({
    selector: 'linear-regression',
    template: `
        <input type="file" accept="text/csv" (change)="readFileAsText($event)">
        <data-grid *ngIf="data" [data]="data"></data-grid>
        <data-plot></data-plot>
    `,
    directives: [DataGridComponent]
})

export class AppComponent {
    public data: Array<Array<String>>;

    readFileAsText(event: Event) {
        var input = <HTMLInputElement>event.target,
            files = <FileList>input.files,
            file = <File>files[0],
            reader: FileReader;

        if (file) {
            reader = new FileReader();
            reader.onload = () => this.parseCsv(reader.result);
            reader.readAsText(file);
        }
    }

    parseCsv(csvText: String) {
        var rows = csvText.split(/\r\n|\r|\n/),
            data = rows.map(row => row.split(/,(?![^"][^,]+"[^$])/g)),
            len = data.length;

        if (data[len - 1].length < data[0].length) {
            data.pop();
        }

        this.data = data;
    }
}