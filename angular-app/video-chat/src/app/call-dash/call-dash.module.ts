import { SharedServicesModule } from './../shared-services/shared-services.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CallDashComponent } from './call-dash.component';

@NgModule({
  declarations: [CallDashComponent],
  imports: [
    CommonModule,
    SharedServicesModule
  ]
})
export class CallDashModule { }
