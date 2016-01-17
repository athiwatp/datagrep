import {Component} from 'angular2/core';
import {AfterViewInit} from 'angular2/core';

@Component({
    selector: 'datagrid',
    template: `<table id="table_id" class="display">
        <thead>
            <tr>
                 <th *ngFor="#header of headers">{{header}}</th>
            </tr>
        </thead>
        <tbody>
        </tbody>
    </table>`
})

export class DataGrid implements AfterViewInit {
    public headers: Array;
    public data: Array;

    constructor() {
        this.headers = ['col1', 'col2'];
        this.data = [
            ['test', 'lsdkfj'],
            ['blah', 'asdlkf']
        ];
    }

    ngAfterViewInit() {
        var that = this;
        $(document).ready(function() {
            $('#table_id').DataTable({
                data: that.data;
            });
        });
    }
}