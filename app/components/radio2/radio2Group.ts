import {Component, Input, Output} from 'angular2/angular2';
import {ContentChildren, QueryList, Directive} from 'angular2/angular2';
//import {DomRenderer} from 'angular2/src/core/render/dom/dom_renderer';
import {EventEmitter} from 'angular2/src/facade/async';
import {Radio2Cmp} from './radio2';

var log = function(msg, ...msgs) {
  msgs.unshift(msg);
  console.log.apply(console, msgs);
};

@Directive({
  selector: 'radio-group',
  inputs: ['value'],
  host: {
    '(change)': 'log($event)'
  }
})
export class Radio2GroupCmp {
  @Input() name: string;
  @ContentChildren(Radio2Cmp) radioQuery: QueryList<Radio2Cmp>;
  log;

  private value_: string;

  get value() {
    return this.value_;
  }

  set value(value: string) {
    this.log('set value', value, this.radioQuery);
    this.value_ = value;
    if (this.radioQuery) {
      this.log('set value', value);
      this.radioQuery.toArray().forEach(
        rq => rq.updateChecked()
      );
    }
  }

  afterContentInit() {
    this.log('after view init', this.radioQuery);
    //noinspection TypeScriptUnresolvedFunction
  }

  constructor() {
    this.log = log.bind(log, '[radio group]');
    this.log('ctor');
  }
}
