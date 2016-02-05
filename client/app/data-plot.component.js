System.register(['angular2/core', './data.service', './point', 'd3'], function(exports_1) {
    "use strict";
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, data_service_1, point_1, d3;
    var DataPlotComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (data_service_1_1) {
                data_service_1 = data_service_1_1;
            },
            function (point_1_1) {
                point_1 = point_1_1;
            },
            function (d3_1) {
                d3 = d3_1;
            }],
        execute: function() {
            DataPlotComponent = (function () {
                function DataPlotComponent(_dataService, el) {
                    this._dataService = _dataService;
                    this.el = el;
                    this.w = 800;
                    this.h = 450;
                    this.margin = {
                        top: 58,
                        bottom: 100,
                        left: 80,
                        right: 40
                    };
                    this.width = this.w - this.margin.left - this.margin.right;
                    this.height = this.h - this.margin.top - this.margin.bottom;
                    this._el = el;
                }
                DataPlotComponent.prototype._process = function (data) {
                    return data.map(function (row) {
                        var x = Number.parseFloat(row[0]), y = Number.parseFloat(row[row.length - 1]);
                        return new point_1.Point(x, y);
                    }, this);
                };
                DataPlotComponent.prototype.ngOnChanges = function (changes) {
                    var _data_currentValue = changes['_data'].currentValue, clonedData, params;
                    if (!_data_currentValue)
                        return;
                    clonedData = this._dataService.clone(_data_currentValue);
                    this._headers = clonedData.shift();
                    this._rows = this._process(clonedData);
                    this.setup();
                };
                DataPlotComponent.prototype.setup = function () {
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
                };
                DataPlotComponent.prototype.plot = function (chart, params) {
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
                        .attr('cx', function (d) {
                        return params.scale.x(d.x);
                    })
                        .attr('cy', function (d) {
                        return params.scale.y(d.y);
                    });
                    chart.selectAll('.point').data(params.data).exit()
                        .remove();
                };
                DataPlotComponent.prototype.getXScale = function (data) {
                    return d3.scale.linear()
                        .domain([0, d3.max(data, function (d) {
                            return d.x;
                        })])
                        .range([0, this.width]);
                };
                DataPlotComponent.prototype.getYScale = function (data) {
                    return d3.scale.linear()
                        .domain([0, d3.max(data, function (d) {
                            return d.y;
                        })])
                        .range([this.height, 0]);
                };
                DataPlotComponent.prototype.getXAxis = function (data, xScale) {
                    return d3.svg.axis()
                        .scale(xScale)
                        .orient('bottom');
                };
                DataPlotComponent.prototype.getYAxis = function (data, xScale) {
                    return d3.svg.axis()
                        .scale(xScale)
                        .orient('left')
                        .ticks(5);
                };
                DataPlotComponent.prototype.getLinearRegressionCoeffients = function () {
                    var that = this, socket = io(), train_data = this._data;
                    socket.emit('linear regression', train_data);
                    socket.on('linear regression progress', function (coefficients) {
                        console.log('coefficients: ', coefficients);
                        var intercept = coefficients[0][0], slope = coefficients[1][0], fn = function (x) {
                            return intercept + slope * x;
                        };
                        that.clearFit();
                        that.showFit(fn);
                    });
                    socket.on('linear regression done', function (coefficients) {
                        alert('gradient descent complete');
                    });
                };
                DataPlotComponent.prototype.clearFit = function () {
                    d3.select(this._el.nativeElement).select('.fit').remove();
                };
                DataPlotComponent.prototype.showFit = function (fn) {
                    var svg = d3.select(this._el.nativeElement).select('.chart');
                    var chart = svg.append('g')
                        .classed('display fit', true)
                        .attr('transform', 'translate(' + this.margin.left + ', ' + this.margin.top + ')');
                    var xScale = this.getXScale(this._rows), yScale = this.getYScale(this._rows);
                    var line = d3.svg.line()
                        .x(function (d) {
                        return xScale(d.x);
                    })
                        .y(function (d) {
                        return yScale(fn(d.x));
                    })
                        .interpolate('monotone');
                    chart.selectAll('.trendline').data([this._rows]).enter()
                        .append('path')
                        .classed('trendline', true);
                    chart.selectAll('.trendline')
                        .attr('d', function (d) {
                        return line(d);
                    });
                    chart.selectAll('.trendline').data([this._rows]).exit()
                        .remove();
                };
                __decorate([
                    core_1.Input('data'), 
                    __metadata('design:type', Array)
                ], DataPlotComponent.prototype, "_data", void 0);
                DataPlotComponent = __decorate([
                    core_1.Component({
                        selector: 'data-plot',
                        template: '<button type="button" (click)="getLinearRegressionCoeffients()">Run Gradient Descent</button>',
                        styles: ["\n        .chart {\n            background-color: #F5F2EB;\n            border: 1px solid #CCC;\n        }\n        .axis path,\n        .axis line {\n            fill: none;\n            stroke: #000;\n            shape-rendering: crispEdges;\n        }\n        .trendline {\n            fill: none;\n            stroke: red;\n            shape-rendering: crispEdges;\n        }\n    "],
                        encapsulation: core_1.ViewEncapsulation.None
                    }), 
                    __metadata('design:paramtypes', [data_service_1.DataService, core_1.ElementRef])
                ], DataPlotComponent);
                return DataPlotComponent;
            }());
            exports_1("DataPlotComponent", DataPlotComponent);
        }
    }
});
//# sourceMappingURL=data-plot.component.js.map