import {ContentChildren, QueryList, Component, Input, Output} from 'angular2/angular2';
import {FORM_DIRECTIVES, CORE_DIRECTIVES} from 'angular2/angular2';
import {EventEmitter} from 'angular2/src/facade/async';
import {Radio3Cmp} from './radio3';

var log = function(msg, ...msgs) {
  msgs.unshift(msg);
  console.log.apply(console, msgs);
};

@Component({
  selector: 'radio-group',
  inputs: ['value'],
  template: `
    <ng-content></ng-content>
  `,
  directives: [FORM_DIRECTIVES, CORE_DIRECTIVES] // NOTE: do not add Radio3Cmp to list of directives
})
export class Radio3GroupCmp {
  @Input() name: string;
  @Output() valueChanged: EventEmitter<any> = new EventEmitter();
  @ContentChildren(Radio3Cmp) radioQuery: QueryList<Radio3Cmp>;
  log;

  private value_: string;

  get value() {
    return this.value_;
  }

  // NOTE: using the setter to trigger the event
  // that eventually passes the value change on to the children
  set value(value: string) {
    this.log('set value', value);
    this.value_ = value;
    //noinspection TypeScriptUnresolvedFunction
    this.valueChanged.next(this.value);
  }

  afterContentInit() {
    this.log('after content init', this.radioQuery);
  }

  constructor() {
    this.log = log.bind(log, '[radio group]');
    this.log('ctor');
  }
}
