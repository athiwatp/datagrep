import {Component, OnChanges, Input, SimpleChange} from 'angular2/core';

@Component({
    selector: 'data-grid',
    template: `
        <section *ngIf="headers">
            <select #selectedHeader>
                <option *ngFor="#header of headers">{{header}}</option>
            </select>
            <button type="button" (click)="removeColumn(selectedHeader.value)">Remove Column</button>
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
        <section>
            <button type="button" (click)="page(-10)">Previous 10</button>
            <button type="button" (click)="page(10)">Next 10</button>
        </section>
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
        this.updateDisplayRows();
    }

    page(increment) {
        if (this.startRow + increment > this.rows.length) return;
        if (this.endRow + increment < 10) return;
        this.startRow += increment;
        this.endRow += increment;
        this.updateDisplayRows();
    }

    updateDisplayRows() {
        this.displayRows = this.rows.slice(this.startRow, this.endRow + 1);
    }

    removeColumn(header) {
        debugger;
    }
}