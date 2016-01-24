import {Component, OnChanges, Input, SimpleChange} from 'angular2/core';

@Component({
    selector: 'data-grid',
    template: `
        <section *ngIf="headers">
            <select>
                <option *ngFor="#header of headers" value={{header}}>{{header}}</option>
            </select>
            <button type="button" (click)="removeColumn($event)">Remove Column</button>
        </section>
        <table>
            <thead>
                <tr>
                    <th *ngFor="#header of headers">{{header}}</th>
                </tr>
            </thead>
            <tbody>
                <tr *ngFor="#row of displayRows">
                    <td *ngFor="#col of row">{{col}}</td>
                </tr>
            </tbody>
        </table>
    `
})

export class DataGridComponent implements OnChanges {
    @Input() data: Array<Array<String>>;
    private headers: Array<String>;
    private rows: Array<Array<String>>;
    private displayRows: Array<Array<String>>;
    public startRow: number;
    public endRow: number;

    constructor() {
        this.startRow = 1;
        this.endRow = 10;
    }

    ngOnChanges(changes: { [propName: string]: SimpleChange }) {
        var data = changes['data'].currentValue;
        this.headers = data.shift();
        this.rows = data;
        this.displayRows = this.rows.slice(this.startRow, this.endRow + 1);
    }

    removeColumn() {
        debugger;
    }
}