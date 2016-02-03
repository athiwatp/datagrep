import {Component, Input, OnChanges, SimpleChange, ElementRef, ViewEncapsulation} from 'angular2/core';
import {DataService} from './data.service';
import {Point} from './point';
import * as d3 from 'd3';

@Component({
    selector: 'data-plot',
    template: '',
    styles: [`
        .chart {
            background-color: #F5F2EB;
            border: 1px solid #CCC;
        }
        .axis path,
        .axis line {
            fill: none;
            stroke: #000;
            shape-rendering: crispEdges;
        }
    `],
    encapsulation: ViewEncapsulation.None
})
export class DataPlotComponent implements OnChanges {
    @Input('data') _data: Array<Array<string>>;
    private w: number = 800;
    private h: number = 450;
    private margin: any = {
        top: 58,
        bottom: 100,
        left: 80,
        right: 40
    };
    private width: number = this.w - this.margin.left - this.margin.right;
    private height: number = this.h - this.margin.top - this.margin.bottom;
    private _headers: Array<string>;
    private _rows: Array<Point>;
    private _el: ElementRef;

    constructor(private _dataService: DataService, private el: ElementRef) {
        this._el = el;
    }

    _process(data: Array<Array<string>>): Array<Point> { // get first col as x and last col as y
        return data.map(function(row) {
            var x = Number.parseFloat(row[0]),
                y = Number.parseFloat(row[row.length - 1]);

            return new Point(x, y);
        }, this);
    }

    ngOnChanges(changes: { [propName: string]: SimpleChange }) {
        var _data_currentValue = changes['_data'].currentValue,
            clonedData: Array<Array<string>>,
            params: Object;

        if (!_data_currentValue) return;

        clonedData = this._dataService.clone(_data_currentValue);

        this._headers = clonedData.shift();
        this._rows = this._process(clonedData);

        this.setup();
    }

    setup() {
        var data = this._rows;

        var svg = d3.select(this._el.nativeElement).append('svg')
            .classed('chart', true)
            .attr('width', this.w)
            .attr('height', this.h);

        var chart = svg.append('g')
            .classed('display', true)
            .attr('transform', 'translate(' + this.margin.left + ', ' + this.margin.top + ')');

        var xScale = this.getXScale(data);

        var yScale = this.getYScale(data);

        var xAxis = this.getXAxis(data, xScale);

        var yAxis = this.getYAxis(data, yScale);

        this.plot(chart, {
            data: data,
            scale: {
                x: xScale,
                y: yScale
            },
            axis: {
                x: xAxis,
                y: yAxis
            }
        });
    }

    plot(chart: d3.Selection<any>, params: any) {
        chart.append('g')
            .classed('x axis', true)
            .attr('transform', 'translate(0, ' + this.height + ')')
            .call(params.axis.x);

        chart.append('g')
            .classed('y axis', true)
            .attr('transform', 'translate(0, 0)')
            .call(params.axis.y);

        chart.selectAll('.point').data(params.data).enter()
            .append('circle')
            .classed('point', true)
            .attr('r', 2);

        chart.selectAll('.point')
            .attr('cx', function(d) {
                return params.scale.x(d.x);
            })
            .attr('cy', function(d) {
                return params.scale.y(d.y);
            });

        chart.selectAll('.point').data(params.data).exit()
            .remove();
    }

    getXScale(data: Array<Point>): d3.scale.Linear<number, number> {
        return d3.scale.linear()
            .domain([0, d3.max(data, function(d) {
                return d.x;
            })])
            .range([0, this.width]);
    }

    getYScale(data: Array<Point>): d3.scale.Linear<number, number> {
        return d3.scale.linear()
            .domain([0, d3.max(data, function(d) {
                return d.y;
            })])
            .range([this.height, 0]);
    }

    getXAxis(data: Array<Point>, xScale: d3.scale.Linear<number, number>): d3.svg.Axis {
        return d3.svg.axis()
            .scale(xScale)
            .orient('bottom');
    }

    getYAxis(data: Array<Point>, xScale: d3.scale.Linear<number, number>): d3.svg.Axis {
        return d3.svg.axis()
            .scale(xScale)
            .orient('left')
            .ticks(5);
    }
}