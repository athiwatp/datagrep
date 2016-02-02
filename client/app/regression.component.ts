import {Component} from 'angular2/core';
import {CSVImporterComponent} from './csv-importer.component';
import {DataGridComponent} from './data-grid.component';
import {DataPlotComponent} from './data-plot.component';
import {DataService} from './data.service';

@Component({
    selector: 'regression',
    template: `
        <csv-importer (data-imported)="_onDataImported($event)"></csv-importer>
        <data-grid *ngIf="_data" [data]="_data"></data-grid>
        <data-plot *ngIf="_data" [data]="_data"></data-plot>
    `,
    directives: [CSVImporterComponent, DataGridComponent, DataPlotComponent],
    providers: [DataService]
})
export class RegressionComponent {
    public _data: Array<Array<String>>;

    constructor(private _dataService: DataService) {

    }

    private _onDataImported(data: Array<Array<String>>) {
        this._dataService.setData(data);
        this._data = this._dataService.getData();
    }
}