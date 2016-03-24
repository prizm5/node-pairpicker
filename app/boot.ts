import {bootstrap}        from 'angular2/platform/browser';
import {HTTP_PROVIDERS}   from 'angular2/http';
import {AppComponent}     from './app.component';
import {NameService}      from './services/names.service';
import {ROUTER_PROVIDERS} from 'angular2/router';
import {provide}          from 'angular2/core';
import {APP_BASE_HREF}    from 'angular2/router';

bootstrap(AppComponent, [HTTP_PROVIDERS, NameService, ROUTER_PROVIDERS, provide(APP_BASE_HREF, {useValue : '/#/' })])
  .catch(err => console.error(err));
