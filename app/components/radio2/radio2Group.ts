import {Directive, Input, Output} from 'angular2/angular2';
import {EventEmitter} from 'angular2/src/facade/async';

var log = function(msg, ...msgs) {
  msgs.unshift(msg);
  console.log.apply(console, msgs);
};

@Directive({
  selector: 'radio-group',
  inputs: ['value']
})
export class Radio2GroupCmp {
  @Input() name: string;
  @Output() valueChanged: EventEmitter<any> = new EventEmitter();
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

  constructor() {
    this.log = log.bind(log, '[radio group]');
    this.log('ctor');
  }
}
