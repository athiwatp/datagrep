System.register(['angular2/core', './data.service'], function(exports_1) {
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
    var core_1, data_service_1;
    var DataGridComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (data_service_1_1) {
                data_service_1 = data_service_1_1;
            }],
        execute: function() {
            DataGridComponent = (function () {
                function DataGridComponent(_dataService) {
                    this._dataService = _dataService;
                    this._startRow = 1;
                    this._endRow = 10;
                }
                DataGridComponent.prototype.ngOnChanges = function (changes) {
                    var _data_currentValue = changes['_data'].currentValue, clonedData;
                    if (!_data_currentValue)
                        return;
                    clonedData = this._dataService.clone(_data_currentValue);
                    this._headers = clonedData.shift();
                    this._rows = clonedData;
                    this._updateDisplayRows();
                };
                DataGridComponent.prototype._updateDisplayRows = function () {
                    this._displayRows = this._rows.slice(this._startRow, this._endRow + 1);
                };
                DataGridComponent.prototype._paginate = function (increment) {
                    if (this._startRow + increment > this._rows.length)
                        return;
                    if (this._endRow + increment < 10)
                        return;
                    this._startRow += increment;
                    this._endRow += increment;
                    this._updateDisplayRows();
                };
                DataGridComponent.prototype._gotoFirstPage = function () {
                    this._startRow = 1;
                    this._endRow = 10;
                    this._updateDisplayRows();
                };
                DataGridComponent.prototype._gotoLastPage = function () {
                    var rowCount = this._rows.length, lastFew = rowCount % 10;
                    this._startRow = this._rows.length - (lastFew - 1);
                    this._endRow = this._startRow + (10 - 1);
                    this._updateDisplayRows();
                };
                __decorate([
                    core_1.Input('data'), 
                    __metadata('design:type', Array)
                ], DataGridComponent.prototype, "_data", void 0);
                DataGridComponent = __decorate([
                    core_1.Component({
                        selector: 'data-grid',
                        template: "\n        <table *ngIf=\"_headers\">\n            <colgroup>\n                <col span=\"{{_headers.length - 1}}\">\n                <col style=\"background-color: lightgray\">\n            </colgroup>\n            <thead>\n                <tr>\n                    <th *ngFor=\"#header of _headers\">{{header}}</th>\n                </tr>\n            </thead>\n            <tbody>\n                <tr *ngFor=\"#row of _displayRows\">\n                    <td *ngFor=\"#col of row\">{{col}}</td>\n                </tr>\n            </tbody>\n        </table>\n        <section>\n            <button type=\"button\" (click)=\"_gotoFirstPage()\">First</button>\n            <button type=\"button\" (click)=\"_paginate(-10)\">Previous 10</button>\n            <button type=\"button\" (click)=\"_paginate(10)\">Next 10</button>\n            <button type=\"button\" (click)=\"_gotoLastPage()\">Last</button>\n        </section>\n    "
                    }), 
                    __metadata('design:paramtypes', [data_service_1.DataService])
                ], DataGridComponent);
                return DataGridComponent;
            }());
            exports_1("DataGridComponent", DataGridComponent);
        }
    }
});
//# sourceMappingURL=data-grid.component.js.map