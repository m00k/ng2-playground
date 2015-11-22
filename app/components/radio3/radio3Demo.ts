import {Radio3Cmp} from './radio3';
import {Radio3GroupCmp} from './radio3Group';
import {Component, CORE_DIRECTIVES, FORM_DIRECTIVES} from 'angular2/angular2';

@Component({
  template: `
    <div class="container">
      <h1>Radio Group 3</h1>
      <p class="note">
      TODO: "No value accessor for '' in [null]" when using ng-model
      </p>

      <div class="well">
        <radio-group [value]="rgVal" (change)="rgVal=$event.target.value" [name]="'group1'">
          <radio [value]="'1'"/>
            radio 1
          </radio>
          <radio [value]="'2'"/>
            radio 2
          </radio>
        </radio-group>
      </div>

      <p class="note">
      radio group value {{rgVal}}
      </p>
      <p class="note">
      <input type="text" [(ng-model)]="rgVal">
      </p>
    </div>
  `,
  directives: [FORM_DIRECTIVES, CORE_DIRECTIVES, Radio3GroupCmp, Radio3Cmp]
})
export class Radio3DemoCmp {
  rgVal: number=2;

  constructor() {
    console.log('[radio demo]');
  }
}
