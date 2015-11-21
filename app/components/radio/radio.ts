import {ElementRef, ContentChild, Input} from 'angular2/angular2';
import {ContentChildren, QueryList, Component, Directive} from 'angular2/angular2';
//import {EventEmitter} from 'angular2/src/facade/async';
import {DomRenderer} from 'angular2/src/core/render/dom/dom_renderer';

@Directive({
  selector: 'input[type=radio]',
  host: {
    '[checked]': 'checked', // TODO: how does this exactly work - vs @Input()?
    '(change)': 'log("changed", $event)'
  }
})
export class RadioInputCmp {
  @Input() checked: boolean=false;
  @Input() value: string;
  private elRef: ElementRef;
  private domRenderer: DomRenderer;

  setName(name) {
    console.log('[radio input] set name');
    this.domRenderer.setElementAttribute(this.elRef, 'name', name);
    console.log(this.elRef.nativeElement);
  }

  update(groupValue: string) {
    /* tslint:disable */
    this.checked = (this.value == groupValue);
    /* tslint:enable */
  }

  log(event) {
    console.log('[radio input] changed event', event);
  }

  constructor(elRef: ElementRef, domRenderer: DomRenderer) {
    console.log('[radio input] ctor');
    this.elRef = elRef;
    this.domRenderer = domRenderer;
    console.log(this.elRef.nativeElement);
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

  setName(name) {
    this.radioInput.setName(name);
  }

  update(groupValue: string) {
    this.radioInput.update(groupValue);
  }

  constructor() {
    console.log('[radio] ctor');
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
  private value_: string;

  get value() {
    return this.value_;
  }

  set value(value: string) {
    console.log('[radio group] trying to set value', value);
    this.value_ = value;
    if (this.radioQuery) {
      console.log('[radio group] set value', value, this.radioQuery.toArray());
      this.radioQuery.toArray().forEach(
        rq => rq.update(this.value)
      );
    }
  }

  afterContentInit() {
    console.log('[radio group] after content init');
    this.radioQuery.toArray().forEach(
      rq => {
        rq.setName(this.name);
        rq.update(this.value);
      }
    );
  }

  log(event) {
    console.log('[radio-group] changed event', event);
  }

  constructor() {
    console.log('[radio group] ctor');
  }
}
