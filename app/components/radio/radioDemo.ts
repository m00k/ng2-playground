import {RadioCmp, RadioInputCmp, RadioGroupCmp} from './radio';
import {Component, CORE_DIRECTIVES, FORM_DIRECTIVES} from 'angular2/angular2';

@Component({
  template: `
    <h1>Radio Group</h1>
    <p class="note">
    TODO: two way data binding (No value accessor for '' in [null] when using ng-model)
    </p>

    <radio-group [value]="rgVal" (change)="rgVal=$event.target.value" [name]="'group1'">
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
