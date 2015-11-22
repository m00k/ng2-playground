import {Component, ViewEncapsulation} from 'angular2/angular2';
import {
  RouteConfig,
  ROUTER_DIRECTIVES
} from 'angular2/router';
// import {HTTP_PROVIDERS} from 'http/http';

import {HomeCmp} from '../home/home';
import {AboutCmp} from '../about/about';
import {RadioDemoCmp} from '../radio/radioDemo';
import {Radio2DemoCmp} from '../radio2/radio2Demo';
import {Radio3DemoCmp} from '../radio3/radio3Demo';
import {NameList} from '../../services/name_list';

@Component({
  selector: 'app',
  viewProviders: [NameList],
  templateUrl: './components/app/app.html',
  styleUrls: ['./components/app/app.css'],
  encapsulation: ViewEncapsulation.None,
  directives: [ROUTER_DIRECTIVES]
})
@RouteConfig([
  { path: '/', component: HomeCmp, as: 'Home' },
  { path: '/about', component: AboutCmp, as: 'About' },
  { path: '/radio', component: RadioDemoCmp, as: 'RadioDemo' },
  { path: '/radio2', component: Radio2DemoCmp, as: 'Radio2Demo' },
  { path: '/radio3', component: Radio3DemoCmp, as: 'Radio3Demo' }
])
export class AppCmp {}
