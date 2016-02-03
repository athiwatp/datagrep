import {Component, Input, OnChanges, SimpleChange} from 'angular2/core';
import {DataService} from './data.service';
import {Point} from './point';
import * as d3 from 'd3';

@Component({
    selector: 'data-plot',
    template: `
        <svg class="chart" [attr.width]="_width" [attr.height]="_height">
            <g *ngIf="_headers" transform='translate(80, 58)'>
                <circle *ngFor="#row of _rows" class="point" r="2" [attr.cx]="row.x" [attr.cy]="row.y"></circle>
            </g>
        </svg>
    `,
    styles: [`
        .chart {
            background-color: lightgray;
        }
    `]
})
export class DataPlotComponent implements OnChanges {
    @Input('data') _data: Array<Array<string>>;
    private _width: number = 800;
    private _height: number = 450;
    private _headers: Array<string>;
    private _rows: Array<Point>;

    constructor(private _dataService: DataService) {
    }

    ngOnChanges(changes: { [propName: string]: SimpleChange }) {
        var _data_currentValue = changes['_data'].currentValue,
            clonedData: Array<Array<string>>,
            params: Object;

        if (!_data_currentValue) return;

        clonedData = this._dataService.clone(_data_currentValue);

        this._headers = clonedData.shift();
        this._rows = this._process(clonedData);
    }

    _process(data: Array<Array<string>>) { // get first col as x and last col as y
        var step1: Array<Point> = data.map(function(row) {
            var x = Number.parseFloat(row[0]),
                y = Number.parseFloat(row[row.length - 1]);

            return new Point(x, y);
        }, this);

        var xScale = this.getXScale(step1),
            yScale = this.getYScale(step1);

        var step2 = step1.map(function(point) {
            return new Point(xScale(point.x), yScale(point.y));
        }, this);

        return step2;
    }

    getXScale(data: Array<Point>) {
        return d3.scale.linear()
            .domain([0, d3.max(data, function(d) {
                return d.x;
            })])
            .range([0, this._width]);
    }

    getYScale(data: Array<Point>) {
        return d3.scale.linear()
            .domain([0, d3.max(data, function(d) {
                return d.y;
            })])
            .range([this._height, 0]);
    }
}