import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from "@angular/fire/compat/firestore";

export const firebaseConfig = {
  apiKey: "AIzaSyBSWY0IMsX3N0Q-n22pkZG0AwePCDLj9rM",
  authDomain: "myliba-register.firebaseapp.com",
  projectId: "myliba-register",
  storageBucket: "myliba-register.appspot.com",
  messagingSenderId: "1079857849506",
  appId: "1:1079857849506:web:e09ebf4418aa0291ede3fb"
};

@NgModule({
  declarations: [
    AppComponent
  ], 
  imports: [ 
    BrowserModule, 
    AppRoutingModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFirestoreModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
 