import {Component} from 'angular2/core';
import {CSVImporterComponent} from './csv-importer.component';
import {DataGridComponent} from './data-grid.component';

@Component({
    selector: 'regression',
    template: `
        <csv-importer (data-imported)="onDataImported($event)"></csv-importer>
        <data-grid *ngIf="data" [data]="data" (output)="readDataGridOutput()"></data-grid>
    `,
    directives: [CSVImporterComponent, DataGridComponent]
})
export class RegressionComponent {
    private data: Array<Array<String>>;

    onDataImported(data: Array<Array<String>>) {
        this.data = data;
        debugger;
    }
}