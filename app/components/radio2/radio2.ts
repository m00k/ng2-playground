import {Component, Input} from 'angular2/angular2';
import {Host} from 'angular2/angular2';
import {Radio2GroupCmp} from './radio2Group';
//import {DomRenderer} from 'angular2/src/core/render/dom/dom_renderer';

var log = function(msg, ...msgs) {
  msgs.unshift(msg);
  console.log.apply(console, msgs);
};

@Component({
  selector: 'radio',
  template: `
    <label>
      <input type="radio" [value]="value" [name]="host.name" [checked]="checked"/>
      <span>
        <ng-content></ng-content>
      </span>
    </label>
  `
})
export class Radio2Cmp {
  @Input() value: string;
  checked: boolean;
  host: Radio2GroupCmp;
  log;

  private updateSubscription = {
    next: event => {
      this.update();
    }
  };

  update() {
    /* tslint:disable */
    this.checked = (this.host.value == this.value);
    /* tslint:enable */
    this.log('update', this.value, this.host.value, this.checked);
  }

  // TODO: if you make Radio2GroupCmp a Component instead of a directive
  // @Host() statement will blow up with 'unexpected directive value of undefined in view'?
  // NOTE: also works instead of @Host()
  // constructor(host: Radio2GroupCmp) {
  constructor(@Host() host: Radio2GroupCmp) {
    this.log = log.bind(log, '[radio]');
    this.log('ctor');
    this.log('host', host);
    this.host = host;
    this.host.valueChanged.subscribe(this.updateSubscription);
  }
}
