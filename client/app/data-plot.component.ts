import {Component, Input, OnChanges, SimpleChange} from 'angular2/core';
import * as d3 from 'd3';

@Component({
    selector: 'data-plot',
    template: `data plot component`
})
export class DataPlotComponent implements OnChanges {
    @Input() data: Array<Array<String>>;

    ngOnChanges(changes: { [propName: string]: SimpleChange }) {
        var data = changes['data'].currentValue;

        debugger;
    }
}