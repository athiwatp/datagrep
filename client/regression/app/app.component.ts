import {Component} from 'angular2/core';
import {DataGrid} from './datagrid/datagrid';

@Component({
    selector: 'linear-regression',
    template: '<datagrid></datagrid><dataplot></dataplot>',
    directives: [DataGrid]
})

export class AppComponent {}