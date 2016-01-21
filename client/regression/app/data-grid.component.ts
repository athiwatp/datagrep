import {Component, AfterViewInit, OnChanges} from 'angular2/core';
import {DataService} from './data.service';

@Component({
    selector: 'data-grid',
    inputs: ['data'],
    template: `
        <table id="table_id" class="display">
            <thead>
                <tr>
                    <th *ngFor="#header of headers">{{header}}</th>
                </tr>
            </thead>
        </table>
    `
})

export class DataGridComponent implements AfterViewInit, OnChanges {
    public headers: Array;
    public data: Array<Array>;

    constructor(private _dataService: DataService) {
        // this.headers = ['col1', 'col2'];
    }

    ngAfterViewInit() {
        // var that = this;
        // $(document).ready(function() {
        //     $('#table_id').DataTable({
        //         data: that.data
        //     });
        // });

        // $(document).ready(() => {
        //     $('#table_id').DataTable({
        //         // "data": this.data,
        //         // "columns": this.headers.map(header => return { title: header }),
        //         "processing": true,
        //         "deferRender": true
        //     });
        // });
    }

    ngOnChanges() {
        if (arguments[0] && arguments[0].data && arguments[0].data.currentValue instanceof Array) {
            this.headers = this.data.splice(0, 1)[0];

            setTimeout(() => {
                $(document).ready(() => {
                    var table = $('#table_id').DataTable({
                        // "data": this.data,
                        // "columns": this.headers.map(header => return { title: header }),
                        "retrieve": true,
                        "processing": true,
                        "deferRender": true
                    });

                    table.clear().draw();
                    table.rows.add(this.data).draw();
                    debugger;
                }); 
            }, 0);
        }
    }
}