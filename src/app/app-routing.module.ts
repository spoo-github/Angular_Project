import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { ProddetComponent } from './proddet/proddet.component';
import { AllprodsComponent} from './allprods/allprods.component';
import { AllprodsdetComponent } from './allprodsdet/allprodsdet.component';
import { CartComponent } from './cart/cart.component';
import { authGuard } from './shared/auth.guard';
//import { canActivate,redirectUnauthorizedTo,redirectLoggedInTo} from '@angular/fire/auth-guard';

//const redirectToLogin = () => redirectUnauthorizedTo(['login']);


const routes: Routes = [
  {path:'',redirectTo:'login',pathMatch:'full'},
  
  {path:'login',
  component:LoginComponent,
  },
  
  {path:'sign-up',
  component:SignUpComponent,
  },

  {path:'proddet/:type/:id',
  component:ProddetComponent,
  canActivate:[authGuard]
},
  {
    path:'home',
    component:HomeComponent,
    canActivate:[authGuard]
  },
  {path:'allprods',
  component:AllprodsComponent,
  canActivate:[authGuard]
  },
  {path:'allprodsdet/:type/:id',
  component:AllprodsdetComponent,
  canActivate:[authGuard]},
  {path:'cart',
  component:CartComponent,
  canActivate:[authGuard]}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
