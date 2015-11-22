import {Component, Input} from 'angular2/angular2';
import {FORM_DIRECTIVES, CORE_DIRECTIVES} from 'angular2/angular2';
//import {Radio3GroupCmp} from './radio3Group';
//import {DomRenderer} from 'angular2/src/core/render/dom/dom_renderer';

var log = function(msg, ...msgs) {
  msgs.unshift(msg);
  console.log.apply(console, msgs);
};

@Component({
  selector: 'radio',
  template: `
    <label>
      <input type="radio" [value]="value" [name]="name" [checked]="checked"/>
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
  name: string;
  log;

  setName(name) {
    this.name = name;
  }

  update(groupValue: string) {
    /* tslint:disable */
    this.checked = (groupValue == this.value);
    /* tslint:enable */
    this.log('update', this.value, groupValue, this.checked);
  }

  constructor() {
    this.log = log.bind(log, '[radio]');
    this.log('ctor');
  }

  // TODO: so as soon as i reference the radio group in the ctor
  // radio3Group's contentChildren will stay empty???
  //constructor(radioGroup: Radio3GroupCmp) {
}
