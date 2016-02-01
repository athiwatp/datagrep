System.register(['angular2/core'], function(exports_1) {
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
    var core_1;
    var CSVImporterComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            }],
        execute: function() {
            CSVImporterComponent = (function () {
                function CSVImporterComponent() {
                    this.dataEmitter = new core_1.EventEmitter();
                }
                CSVImporterComponent.prototype.readFileToString = function (event) {
                    var _this = this;
                    var input = event.target, files = input.files, file = files[0], reader;
                    if (file) {
                        reader = new FileReader();
                        reader.onload = function () { return _this.parseCsvFromString(reader.result); };
                        reader.readAsText(file);
                    }
                };
                CSVImporterComponent.prototype.parseCsvFromString = function (csvText) {
                    var rows = csvText.split(/\r\n|\r|\n/), data = rows.map(function (row) { return row.split(/,(?![^"][^,]+"[^$])/g); }), len = data.length;
                    if (data[len - 1].length < data[0].length) {
                        data.pop();
                    }
                    this.dataEmitter.emit(data);
                };
                __decorate([
                    core_1.Output('data-imported'), 
                    __metadata('design:type', core_1.EventEmitter)
                ], CSVImporterComponent.prototype, "dataEmitter", void 0);
                CSVImporterComponent = __decorate([
                    core_1.Component({
                        selector: 'csv-importer',
                        template: "\n        <input type=\"file\" accept=\"text/csv\" (change)=\"readFileToString($event)\">\n    "
                    }), 
                    __metadata('design:paramtypes', [])
                ], CSVImporterComponent);
                return CSVImporterComponent;
            }());
            exports_1("CSVImporterComponent", CSVImporterComponent);
        }
    }
});
//# sourceMappingURL=csv-importer.component.js.map