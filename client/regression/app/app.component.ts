import {Component, OnInit} from 'angular2/core';
import {DataService} from './data.service';
import {DataGridComponent} from './data-grid.component';

@Component({
    selector: 'linear-regression',
    template: `
        <input type="file" accept="text/csv" (change)="readFileAsText($event)">
        <data-plot></data-plot>
        <data-grid [data]="data"></data-grid>
    `,
    providers: [DataService],
    directives: [DataGridComponent]
})

export class AppComponent implements OnInit {
    public data: Array;

    constructor(private _dataService: DataService) {

    }

    ngOnInit() {
        // this.getData();
    }

    getData() {
        this._dataService.getData().then(data => {
            // this.data = data;
            // console.log('data: ', data);
        });
    }

    readFileAsText(event: Event) {
        var input = <HTMLInputElement>event.target,
            files = <FileList>input.files,
            file = <File>files[0],
            reader = new FileReader(file);

        reader.onload = () => this.parseCsv(reader.result);
        reader.readAsText(file);
    }

    parseCsv(csvText) {
        var rows = csvText.split('\n'),
            data = rows.map(row => return row.split(',')),
            len = data.length;

        if (data[len - 1].length < data[0].length) {
            data.pop();
        }

        console.log('data: ', data);
        this.data = data;
    }
}