import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { TreeChecklistExample } from './TreeChecklistExample.component';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTreeModule } from '@angular/material/tree';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSidenavModule } from '@angular/material/sidenav';

@NgModule({
  declarations: [TreeChecklistExample],
  imports: [
    CommonModule,
    SharedModule,
    MatIconModule,
    MatCheckboxModule,
    MatTreeModule,
    MatFormFieldModule,
    MatSidenavModule,
    MatInputModule
  ],
  exports:[TreeChecklistExample]
})
export class TreeChecklistExampleModule { }