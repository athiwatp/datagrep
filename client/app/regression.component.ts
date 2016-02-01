///<reference path='../../node_modules/immutable/dist/Immutable.d.ts'/>
import {Component} from 'angular2/core';
import {CSVImporterComponent} from './csv-importer.component';
import {DataGridComponent} from './data-grid.component';
import {DataPlotComponent} from './data-plot.component';
import * as Immutable from 'immutable';

@Component({
    selector: 'regression',
    template: `
        <csv-importer (data-imported)="onDataImported($event)"></csv-importer>
        <data-grid *ngIf="data" [data]="data" (output)="onDataSaved($event)"></data-grid>
        <data-plot *ngIf="data" [data]="data"></data-plot>
    `,
    directives: [CSVImporterComponent, DataGridComponent, DataPlotComponent]
})
export class RegressionComponent {
    private data: Immutable.List<Array<String>>;

    onDataImported(data: Array<Array<String>>) {
        var immutableData = Immutable.fromJS(data);
        this.data = immutableData.toJS();
    }
}