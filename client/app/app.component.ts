import {Component} from 'angular2/core';
import {RegressionComponent} from './regression.component';

@Component({
    selector: 'app',
    template: `
        <select>
            <option>Regression</option>
        </select>
        <section>
            <regression>Loading...</regression>
        </section>
    `,
    directives: [RegressionComponent]
})
export class AppComponent {}