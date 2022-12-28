import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import {HttpClientModule} from '@angular/common/http';
import {DataService } from './data.service';

import {MatInputModule} from '@angular/material/input'
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {ReactiveFormsModule} from '@angular/forms'
import {MatDialogModule} from '@angular/material/dialog';
import {MatButtonModule}from '@angular/material/button'
import {MatToolbarModule}from '@angular/material/toolbar';
import {MatIconModule}from '@angular/material/icon';
import {MatSidenavModule}from '@angular/material/sidenav';
import {MatTableModule}from '@angular/material/table';
import {MatPaginatorModule}from '@angular/material/paginator';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    MatDialogModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatToolbarModule,
    MatIconModule,
    MatSidenavModule,
    MatTableModule,
    MatPaginatorModule
  ],
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
