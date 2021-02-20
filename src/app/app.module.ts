import { RequestInterceptor, DEFAULT_TIMEOUT } from './services/request.interceptor';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { reducer } from './store-setup/card.reducer';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
@NgModule({
	declarations: [
		AppComponent
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		HttpClientModule,
		StoreModule.forRoot({ cardata: reducer }, {}),
		BrowserAnimationsModule
	],
	providers: [
		{ provide: DEFAULT_TIMEOUT, useValue: 30000 },
		{ provide: HTTP_INTERCEPTORS, useClass: RequestInterceptor, multi: true },
	],
	bootstrap: [AppComponent],
})
export class AppModule { }
