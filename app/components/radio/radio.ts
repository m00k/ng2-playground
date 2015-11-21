import {ElementRef, ContentChild, Input} from 'angular2/angular2';
import {ContentChildren, QueryList, Component, Directive} from 'angular2/angular2';
import {DomRenderer} from 'angular2/src/core/render/dom/dom_renderer';
//import {EventEmitter} from 'angular2/src/facade/async';

var log = function(msg, ...msgs) {
  msgs.unshift(msg);
  console.log.apply(console, msgs);
};

@Directive({
  selector: 'input[type=radio]',
  host: {
    '[checked]': 'checked', // TODO: how does this exactly work - vs @Input()?
    '(change)': 'log("changed event", $event)'
  }
})
export class RadioInputCmp {
  @Input() checked: boolean=false;
  @Input() value: string;
  log;

  private elRef: ElementRef;
  private domRenderer: DomRenderer;

  setName(name) {
    this.log('set name');
    this.domRenderer.setElementAttribute(this.elRef, 'name', name);
    this.log(this.elRef.nativeElement);
  }

  update(groupValue: string) {
    /* tslint:disable */
    this.checked = (this.value == groupValue);
    /* tslint:enable */
  }

  constructor(elRef: ElementRef, domRenderer: DomRenderer) {
    this.log = log.bind(log, '[radio input]');
    this.log('ctor', elRef.nativeElement);
    this.elRef = elRef;
    this.domRenderer = domRenderer;
  }
}

@Component({
  selector: 'radio',
  template: `
    <label>
      <ng-content select="input[type=radio]"></ng-content>
      <span><ng-content select="span"></ng-content></span>
    </label>
  `
})
export class RadioCmp {
  @ContentChild(RadioInputCmp) radioInput: RadioInputCmp;

  log;

  setName(name) {
    this.radioInput.setName(name);
  }

  update(groupValue: string) {
    this.radioInput.update(groupValue);
  }

  constructor() {
    this.log = log.bind(log, '[radio]');
    this.log('ctor');
  }
}

@Directive({
  selector: 'radio-group',
  inputs: ['value'],
  host: {
    '(change)': 'log($event)'
  }
})
export class RadioGroupCmp {
  @Input() name: string;
  @ContentChildren(RadioCmp) radioQuery: QueryList<RadioCmp>;
  log;

  private value_: string;

  get value() {
    return this.value_;
  }

  set value(value: string) {
    this.log('trying to set value', value);
    this.value_ = value;
    if (this.radioQuery) {
      this.log('set value', value, this.radioQuery.toArray());
      this.radioQuery.toArray().forEach(
        rq => rq.update(this.value)
      );
    }
  }

  afterContentInit() {
    this.log('after content init');
    this.radioQuery.toArray().forEach(
      rq => {
        rq.setName(this.name);
        rq.update(this.value);
      }
    );
  }

  constructor() {
    this.log = log.bind(log, '[radio group]');
    this.log('ctor');
  }
}
