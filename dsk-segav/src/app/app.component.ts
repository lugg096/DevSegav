import { Component } from '@angular/core';

import { SettingsService } from './services/service.index';
import { setTheme } from 'ngx-bootstrap/utils';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(public _ajustes: SettingsService) {
    setTheme('bs4');
  }

}
