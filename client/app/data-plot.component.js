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
                function DataPlotComponent(_dataService) {
                    this._dataService = _dataService;
                    this._width = 800;
                    this._height = 450;
                }
                DataPlotComponent.prototype.ngOnChanges = function (changes) {
                    var _data_currentValue = changes['_data'].currentValue, clonedData, params;
                    if (!_data_currentValue)
                        return;
                    clonedData = this._dataService.clone(_data_currentValue);
                    this._headers = clonedData.shift();
                    this._rows = this._process(clonedData);
                };
                DataPlotComponent.prototype._process = function (data) {
                    var step1 = data.map(function (row) {
                        var x = Number.parseFloat(row[0]), y = Number.parseFloat(row[row.length - 1]);
                        return new point_1.Point(x, y);
                    }, this);
                    var xScale = this.getXScale(step1), yScale = this.getYScale(step1);
                    var step2 = step1.map(function (point) {
                        return new point_1.Point(xScale(point.x), yScale(point.y));
                    }, this);
                    return step2;
                };
                DataPlotComponent.prototype.getXScale = function (data) {
                    return d3.scale.linear()
                        .domain([0, d3.max(data, function (d) {
                            return d.x;
                        })])
                        .range([0, this._width]);
                };
                DataPlotComponent.prototype.getYScale = function (data) {
                    return d3.scale.linear()
                        .domain([0, d3.max(data, function (d) {
                            return d.y;
                        })])
                        .range([this._height, 0]);
                };
                __decorate([
                    core_1.Input('data'), 
                    __metadata('design:type', Array)
                ], DataPlotComponent.prototype, "_data", void 0);
                DataPlotComponent = __decorate([
                    core_1.Component({
                        selector: 'data-plot',
                        template: "\n        <svg class=\"chart\" [attr.width]=\"_width\" [attr.height]=\"_height\">\n            <g *ngIf=\"_headers\" transform='translate(80, 58)'>\n                <circle *ngFor=\"#row of _rows\" class=\"point\" r=\"2\" [attr.cx]=\"row.x\" [attr.cy]=\"row.y\"></circle>\n            </g>\n        </svg>\n    ",
                        styles: ["\n        .chart {\n            background-color: lightgray;\n        }\n    "]
                    }), 
                    __metadata('design:paramtypes', [data_service_1.DataService])
                ], DataPlotComponent);
                return DataPlotComponent;
            }());
            exports_1("DataPlotComponent", DataPlotComponent);
        }
    }
});
//# sourceMappingURL=data-plot.component.js.map