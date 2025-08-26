import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StatisticsComponent } from './statistics.component';
import { NgChartsModule } from 'ng2-charts';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [StatisticsComponent],
  imports: [CommonModule, FormsModule, NgChartsModule],
  exports: [StatisticsComponent]
})
export class StatisticsModule {}
