import { NgModule } from '@angular/core';
import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//import comopnent
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { TablecaseComponent } from './tablecase/tablecase.component';
import { HomeComponent } from './home/home.component';
import { SuitcaseComponent } from './suitcase/suitcase.component';


export const routes: Routes = [

	{
		path: '',
		redirectTo: 'login',
		pathMatch: 'full'
	},
	{
		path:'register',
		component:RegisterComponent,
	},
	{
		path:'login',
		component:LoginComponent
	},
	{
		path: 'table',
		component:TablecaseComponent
	},
	{
		path:'home',
		component:HomeComponent
	},
	{
		path:'suitcase',
		component:SuitcaseComponent
	}  

];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
