import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StudentsComponent } from './students.component';
import { HeaderComponent } from './header.component';
import { NavbarComponent } from './navbar.component';
import { HomeComponent } from './home.component';
import { FooterComponent } from './footer.component';
import { StudentDetailComponent } from './student-detail.component';
import { CoursesComponent } from './courses.component';
import { AboutComponent } from './about.component';
import { NotFoundComponent } from './not-found.component';
import { HelpComponent } from './help.component';
import { CartSelectComponent } from './cart.component';
import { CartSelectedGridComponent } from './cart-selected-grid.component';
import { CartSelectedListComponent } from './cart-selected-list.component';
import { CartSelectedCellComponent } from './cart-selected-cell.component';

@NgModule({
  declarations: [
    AppComponent,
    StudentsComponent,
    HeaderComponent,
    NavbarComponent,
    HomeComponent,
    FooterComponent,
    StudentDetailComponent,
    CoursesComponent,
    AboutComponent,
    NotFoundComponent,
    HelpComponent,
    CartSelectComponent,
    CartSelectedGridComponent,
    CartSelectedListComponent,
    CartSelectedCellComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule

  ],
  providers: [StudentsComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
