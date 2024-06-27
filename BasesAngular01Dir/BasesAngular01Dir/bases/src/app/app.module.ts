import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';

import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';

import { CounterModule } from './counter/counter.module';
import { HeroesModule } from './heroes/heroes.module';
import { DbzModule } from './dbz/dbz.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    CounterModule,
    HeroesModule,
    DbzModule,
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
