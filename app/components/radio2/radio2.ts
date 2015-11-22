import {ElementRef, Input} from 'angular2/angular2';
import {Component, Directive} from 'angular2/angular2';
import {DomRenderer} from 'angular2/src/core/render/dom/dom_renderer';
//import {EventEmitter} from 'angular2/src/facade/async';
import {Host} from 'angular2/angular2';
import {Radio2GroupCmp} from './radio2Group';

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
export class Radio2InputCmp {
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
  host: {
    '(change)': 'log("changed event", $event)',
    '(load)': 'log("-------------------- load event -----------------------")'
  },
  template: `
    <label>
      <radio>
        <input type="radio" [value]="value" [name]="host.name" [checked]="checked"/>
        <span>
          <ng-content></ng-content>
        </span>
      </radio>
    </label>
  `
})
export class Radio2Cmp {
  @Input() value: string;
  checked: boolean;
  host: Radio2GroupCmp;
  log;

  updateChecked() {
    this.checked = (this.host.value == this.value);
    this.log('checked', this.checked);
  }

  isChecked() {
    return this.host.value == this.value;
  }

  constructor(@Host() host: Radio2GroupCmp) {
    this.log = log.bind(log, '[radio]');
    this.log('ctor');
    this.log('host', host);
    this.host = host;
    this.updateChecked();
  }
}
