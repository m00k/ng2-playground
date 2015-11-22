import {Component, Input} from 'angular2/angular2';
import {FORM_DIRECTIVES, CORE_DIRECTIVES} from 'angular2/angular2';
import {Radio3GroupCmp} from './radio3Group';
//import {DomRenderer} from 'angular2/src/core/render/dom/dom_renderer';

var log = function(msg, ...msgs) {
  msgs.unshift(msg);
  console.log.apply(console, msgs);
};

@Component({
  selector: 'radio',
  template: `
    <label>
      <input type="radio" [value]="value" [name]="radioGroup.name" [checked]="checked"/>
      <span>
        <ng-content></ng-content>
      </span>
    </label>
  `,
  directives: [FORM_DIRECTIVES, CORE_DIRECTIVES] // NOTE: do not add Radio3GroupCmp to list of directives
})
export class Radio3Cmp {
  @Input() value: string;
  checked: boolean;
  radioGroup: Radio3GroupCmp;
  log;

  private updateSubscription = {
    next: event => {
      this.update();
    }
  };

  update() {
    /* tslint:disable */
    this.checked = (this.radioGroup.value == this.value);
    /* tslint:enable */
    this.log('update', this.value, this.radioGroup.value, this.checked);
  }

  constructor(radioGroup: Radio3GroupCmp) {
    this.log = log.bind(log, '[radio]');
    this.log('ctor');
    this.log('radioGroup', radioGroup);
    this.radioGroup = radioGroup;
    this.radioGroup.valueChanged.subscribe(this.updateSubscription);
  }
}
