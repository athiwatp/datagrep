import {Component, Input, OnChanges, SimpleChange} from 'angular2/core';
import {DataService} from './data.service';
import * as d3 from 'd3';

@Component({
    selector: 'data-plot',
    template: `data plot component`
})
export class DataPlotComponent implements OnChanges {
    @Input('data') _data: Array<Array<String>>;
    private _headers: Array<String>;
    private _rows: Array<Array<String>>;

    constructor(private _dataService: DataService) {

    }

    ngOnChanges(changes: { [propName: string]: SimpleChange }) {
        var _data_currentValue = changes['_data'].currentValue,
            clonedData: Array<Array<String>>;

        if (!_data_currentValue) return;

        clonedData = this._dataService.clone(_data_currentValue);

        this._headers = clonedData.shift();
        this._rows = clonedData;

        debugger;
    }
}