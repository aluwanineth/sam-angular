import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginFormComponent } from './shared/components';
import { AuthGuardService } from './shared/services';
import { HomeComponent } from './pages/home/home.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { DisplayDataComponent } from './pages/display-data/display-data.component';
import { DxDataGridModule, DxFormModule } from 'devextreme-angular';
import { RainFallStationComponent } from './pages/rain-fall-station/rain-fall-station.component';
import { DxTreeViewModule, DxListModule, DxTemplateModule, DxCheckBoxModule, DxSelectBoxModule, DxTreeViewComponent } from 'devextreme-angular';
import { BrowserModule } from '@angular/platform-browser';

const routes: Routes = [
  {
    path: 'display-data',
    component: DisplayDataComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: 'rainfall-station',
    component: RainFallStationComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: 'login-form',
    component: LoginFormComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: '**',
    redirectTo: 'home',
    canActivate: [ AuthGuardService ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes),
    BrowserModule,
    DxDataGridModule, DxFormModule,
    DxTreeViewModule,
    DxListModule,
    DxTemplateModule,
    DxCheckBoxModule,
    DxSelectBoxModule],
  providers: [AuthGuardService],
  exports: [RouterModule],
  declarations: [HomeComponent, ProfileComponent, DisplayDataComponent, RainFallStationComponent]
})
export class AppRoutingModule { }
