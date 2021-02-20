import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
	{
		path: 'make-payment',
		loadChildren: () => import('./pages/make-payment/make-payment.module').then( m => m.MakePaymentModule)
	  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
