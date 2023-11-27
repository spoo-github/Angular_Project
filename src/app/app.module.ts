import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import {MatBadgeModule} from '@angular/material/badge';
import {MatTableModule} from '@angular/material/table';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import {MatMenuModule} from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { SignUpComponent } from './sign-up/sign-up.component';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAuth,getAuth } from '@angular/fire/auth';
import { provideDatabase,getDatabase } from '@angular/fire/database';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';
import { HotToastModule } from '@ngneat/hot-toast';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
//import { MatGridListModule } from '@angular/material/grid-list';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { RatingComponent } from './utilities/rating/rating.component';
import { ProddetComponent } from './proddet/proddet.component';
import { AllprodsComponent } from './allprods/allprods.component';
import { AngularFireModule } from '@angular/fire/compat';
//import { CarouselComponent } from './carousel/carousel.component';
//import { ReviewsComponent } from './reviews/reviews.component';
//import { ReviewFormComponent } from './review-form/review-form.component';
import { AllprodsdetComponent } from './allprodsdet/allprodsdet.component';
import { SearchComponent } from './search/search.component';

import { CartComponent } from './cart/cart.component';
import { MatSelectModule } from '@angular/material/select';
import { ImageHoverDirective } from './image-hover.directive';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    SignUpComponent,
    HeaderComponent,
    FooterComponent,
    RatingComponent,
    ProddetComponent,
    AllprodsComponent,

   // ReviewFormComponent,
    AllprodsdetComponent,
    SearchComponent,

    CartComponent,
    ImageHoverDirective,
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,MatSelectModule,
    BrowserAnimationsModule,MatIconModule,MatBadgeModule,MatTableModule,MatMenuModule,
     MatInputModule,MatCardModule,MatButtonModule,MatFormFieldModule,HttpClientModule,
    MatToolbarModule,RouterModule,FormsModule,  ReactiveFormsModule, provideFirebaseApp(() => initializeApp(environment.firebase)), provideAuth(() => getAuth()), provideDatabase(() => getDatabase()), provideFirestore(() => getFirestore()), HotToastModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { 
   
}
