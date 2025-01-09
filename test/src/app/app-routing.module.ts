import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetailpageComponent } from './detailpage/detailpage.component';
import { ContentComponent } from './components/content/content.component';


const routes: Routes = [
  { path: 'detail/:id', component: DetailpageComponent},
  { path: '', component: ContentComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

