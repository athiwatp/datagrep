System.register(['angular2/core'], function(exports_1) {
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
    var DataGridComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            }],
        execute: function() {
            DataGridComponent = (function () {
                function DataGridComponent() {
                    this.startRow = 1;
                    this.endRow = 10;
                }
                DataGridComponent.prototype.ngOnChanges = function (changes) {
                    var data = changes['data'].currentValue;
                    this.headers = data.shift();
                    this.rows = data;
                    this.updateDisplayRows();
                };
                DataGridComponent.prototype.page = function (increment) {
                    if (this.startRow + increment > this.rows.length)
                        return;
                    if (this.endRow + increment < 10)
                        return;
                    this.startRow += increment;
                    this.endRow += increment;
                    this.updateDisplayRows();
                };
                DataGridComponent.prototype.updateDisplayRows = function () {
                    this.displayRows = this.rows.slice(this.startRow, this.endRow + 1);
                };
                DataGridComponent.prototype.removeColumn = function () {
                    debugger;
                };
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Array)
                ], DataGridComponent.prototype, "data", void 0);
                DataGridComponent = __decorate([
                    core_1.Component({
                        selector: 'data-grid',
                        template: "\n        <section *ngIf=\"headers\">\n            <select>\n                <option *ngFor=\"#header of headers\" value={{header}}>{{header}}</option>\n            </select>\n            <button type=\"button\" (click)=\"removeColumn($event)\">Remove Column</button>\n        </section>\n        <table>\n            <thead>\n                <tr>\n                    <th *ngFor=\"#header of headers\">{{header}}</th>\n                </tr>\n            </thead>\n            <tbody>\n                <tr *ngFor=\"#row of displayRows\">\n                    <td *ngFor=\"#col of row\">{{col}}</td>\n                </tr>\n            </tbody>\n        </table>\n        <section>\n            <button type=\"button\" (click)=\"page(-10)\">Previous 10</button>\n            <button type=\"button\" (click)=\"page(10)\">Next 10</button>\n        </section>\n    "
                    }), 
                    __metadata('design:paramtypes', [])
                ], DataGridComponent);
                return DataGridComponent;
            })();
            exports_1("DataGridComponent", DataGridComponent);
        }
    }
});
//# sourceMappingURL=data-grid.component.js.map