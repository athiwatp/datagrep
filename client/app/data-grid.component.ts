import {Component, Input, OnChanges, SimpleChange} from 'angular2/core';
import {DataService} from './data.service';

@Component({
    selector: 'data-grid',
    template: `
        <table *ngIf="_headers">
            <colgroup>
                <col span="{{_headers.length - 1}}">
                <col style="background-color: lightgray">
            </colgroup>
            <thead>
                <tr>
                    <th *ngFor="#header of _headers">{{header}}</th>
                </tr>
            </thead>
            <tbody>
                <tr *ngFor="#row of _displayRows">
                    <td *ngFor="#col of row">{{col}}</td>
                </tr>
            </tbody>
        </table>
        <section>
            <button type="button" (click)="_gotoFirstPage()">First</button>
            <button type="button" (click)="_paginate(-10)">Previous 10</button>
            <button type="button" (click)="_paginate(10)">Next 10</button>
            <button type="button" (click)="_gotoLastPage()">Last</button>
        </section>
    `
})
export class DataGridComponent implements OnChanges {
    @Input('data') _data: Array<Array<String>>;
    private _headers: Array<String>;
    private _rows: Array<Array<String>>;
    private _displayRows: Array<Array<String>>;
    private _startRow: number;
    private _endRow: number;

    constructor(private _dataService: DataService) {
        this._startRow = 1;
        this._endRow = 10;
    }

    ngOnChanges(changes: { [propName: string]: SimpleChange }) {
        var _data_currentValue = changes['_data'].currentValue,
            clonedData: Array<Array<String>>;
        
        if (!_data_currentValue) return;

        clonedData = this._dataService.clone(_data_currentValue);

        this._headers = clonedData.shift();
        this._rows = clonedData;
        this._updateDisplayRows();
    }

    private _updateDisplayRows() {
        this._displayRows = this._rows.slice(this._startRow, this._endRow + 1);
    }

    private _paginate(increment: number) {
        if (this._startRow + increment > this._rows.length) return;
        if (this._endRow + increment < 10) return;
        this._startRow += increment;
        this._endRow += increment;
        this._updateDisplayRows();
    }

    private _gotoFirstPage() {
        this._startRow = 1;
        this._endRow = 10;
        this._updateDisplayRows();
    }

    private _gotoLastPage() {
        var rowCount = this._rows.length,
            lastFew = rowCount % 10;

        this._startRow = this._rows.length - (lastFew - 1);
        this._endRow = this._startRow + (10 - 1);
        this._updateDisplayRows();
    }
}