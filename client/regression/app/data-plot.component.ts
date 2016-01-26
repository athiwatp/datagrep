import {Component, Input, OnChanges, SimpleChange} from 'angular2/core';
import d3 from 'd3';

@Component({
    selector: 'data-plot',
    template: `blah`
})

export class DataPlotComponent implements OnChanges {
    @Input() data: Array<Array<String>>;

    ngOnChanges(changes: { [propName: string]: SimpleChange }) {
        var data = changes['data'].currentValue;

        this.headers = data.shift();
        this.rows = data;
        d3.select("body").style("background-color", "green");
    }
}