import {CORE_DIRECTIVES, FORM_DIRECTIVES} from 'angular2/angular2';
import {ElementRef, ContentChild, Input, Output} from 'angular2/angular2';
import {ContentChildren, QueryList, Component, Directive} from 'angular2/angular2';
import {EventEmitter} from 'angular2/src/facade/async';
import {DomRenderer} from 'angular2/src/core/render/dom/dom_renderer';

@Directive({
  selector: 'input[type=radio]',
  host: {
    '(change)': 'onChange($event)',
    '[checked]': 'checked' // TODO: how does this exactly work - vs @Input()?
  }
})
export class RadioInputCmp {
  @Input() checked: boolean=false;
  //@Input() name: string;
  @Input() value: string;
  @Output() checkedChanged: EventEmitter<any> = new EventEmitter();
  elRef: ElementRef;
  domRenderer: DomRenderer;

  onChange(event) {
    console.log('[radio input] change event');
    //noinspection TypeScriptUnresolvedFunction
    this.checkedChanged.next(this);
  }

  setName(name) {
    this.domRenderer.setElementAttribute(this.elRef, 'name', name);
    console.log(this.elRef.nativeElement);
  }

  constructor(elRef: ElementRef, domRenderer: DomRenderer) {
    console.log('[radio input]');
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
  @Output() checkedChanged: EventEmitter<any> = new EventEmitter();

  setName(name) {
    this.radioInput.setName(name);
  }

  afterContentInit() {
    //noinspection TypeScriptUnresolvedFunction
    this.radioInput.checkedChanged.subscribe({
     next: event => this.checkedChanged.next(event)
    });
  }

  update(groupValue: string) {
    if (this.radioInput) {
      /* tslint:disable */
      if (this.radioInput.value == groupValue) {
        /* tslint:enable */
        this.radioInput.checked = true;
      }
    }
  }
}

@Directive({
  selector: 'radio-group'
})
export class RadioGroupCmp {
  @Input() value: string;
  @Input() name: string;
  @Output() valueChanged: EventEmitter<any>= new EventEmitter;
  @ContentChildren(RadioCmp) radioQuery: QueryList<RadioCmp>;

  afterContentInit() {
    this.radioQuery.toArray().forEach(
      rq => {
        rq.setName(this.name);
        rq.update(this.value);
        rq.checkedChanged.subscribe({
          next: event => {
            this.value = event.value;
            //noinspection TypeScriptUnresolvedFunction
            this.valueChanged.next(event.value);
            console.log('[radio group checked]', event);
          }
        });
      }
    );
  }
}

// TODO: set name on radio inputs from radio group
@Component({
  template: `
    <h1>Radio Group</h1>

    <radio-group [(value)]="rgVal" (value-changed)="rgVal=$event" [name]="'group1'">
      <radio>
        <input type="radio" value="1"/>
        <span>radio 1</span>
      </radio>
      <radio>
        <input type="radio" value="2"/>
        <span>radio 2</span>
      </radio>
    </radio-group>

    <p class="note">
    radio group value {{rgVal}}
    </p>
    <p class="note">
    TODO: two way data binding (No value accessor for '' in [null] when using ng-model)
    <input type="text" [(ng-model)]="rgVal">
    </p>
  `,
  directives: [FORM_DIRECTIVES, CORE_DIRECTIVES, RadioGroupCmp, RadioInputCmp, RadioCmp]
})
export class RadioDemoCmp {
  rgVal: number=2;

  constructor() {
    console.log('[radio demo]');
  }
}
