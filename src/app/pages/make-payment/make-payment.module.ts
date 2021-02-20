import { MaterialModule } from './../../material.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { MakePaymentComponent } from './make-payment.component';


const routes: Routes = [
	{
		path: '',
		component: MakePaymentComponent
	}
];

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		ReactiveFormsModule,
		MaterialModule,
		[RouterModule.forChild(routes)],
	],
	declarations: [MakePaymentComponent],
	exports: [MakePaymentComponent]
})
export class MakePaymentModule { }
