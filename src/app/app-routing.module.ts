import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home.component';
import { StudentsComponent } from './students.component';
import { StudentDetailComponent } from './student-detail.component';
import { CoursesComponent } from './courses.component';
import { CartSelectComponent } from './cart.component';
import { AboutComponent } from './about.component';
import { NotFoundComponent } from './not-found.component';
import { HelpComponent } from './help.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'students', component: StudentsComponent },
  { path: 'courses', component: CoursesComponent },
  { path: 'cart/select', component: CartSelectComponent },
  { path: 'help', component: HelpComponent },
  { path: 'students/:id', component: StudentDetailComponent },
  
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
