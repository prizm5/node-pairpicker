import {bootstrap}        from 'angular2/platform/browser';
import {HTTP_PROVIDERS}   from 'angular2/http';
import {AppComponent}     from './app.component';
import {NameService}      from './services/names.service';

bootstrap(AppComponent, [HTTP_PROVIDERS, NameService])
  .catch(err => console.error(err));
