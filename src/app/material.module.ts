import { NgModule } from "@angular/core";
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';

@NgModule({
	imports: [
		MatToolbarModule,
		MatFormFieldModule,
		MatInputModule,
		MatButtonModule,
		MatIconModule,
	],
	
	exports: [
		MatToolbarModule,
		MatFormFieldModule,
		MatInputModule,
		MatButtonModule,
		MatIconModule,
	]
})
export class MaterialModule { }