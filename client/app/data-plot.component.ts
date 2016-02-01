import {Component, Input, OnChanges, SimpleChange} from 'angular2/core';
import * as d3 from 'd3';

@Component({
    selector: 'data-plot',
    template: `blah`
})

export class DataPlotComponent implements OnChanges {
    @Input() data: Array<Array<String>>;

    ngOnChanges(changes: { [propName: string]: SimpleChange }) {
        var data = changes['data'].currentValue;

        d3.select("body").style("background-color", "purple");
    }
}