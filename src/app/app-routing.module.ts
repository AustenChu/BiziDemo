import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [    

  {
  path: 'login',
  loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)   
},   

{
  path: 'tabs',
  loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)   
},      

{
  path : '',
  redirectTo : 'welcome',
  pathMatch : 'full'   
},  
{
  path: 'welcome',
  loadChildren: () => import('./welcome/welcome.module').then( m => m.WelcomePageModule)
},
{
    path: 'register',
    loadChildren: () => import('./register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'create-payment',
    loadChildren: () => import('./create-payment/create-payment.module').then( m => m.CreatePaymentPageModule)
  },
  {
    path: 'createsuccess',
    loadChildren: () => import('./createsuccess/createsuccess.module').then( m => m.CreatesuccessPageModule)
  }

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
