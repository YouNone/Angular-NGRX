import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { PaginatorComponent } from './components/paginator/paginator.component';
import { UtilsService } from '../../services/utils.service';

@NgModule({
  declarations: [PaginatorComponent],
  imports: [CommonModule, RouterModule],
  exports: [PaginatorComponent],
  providers: [UtilsService],
})
export class PaginationModule {}
