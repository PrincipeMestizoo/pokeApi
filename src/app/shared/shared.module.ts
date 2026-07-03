import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { LoadingSpinnerComponent } from './components/loading-spinner/loading-spinner.component';
import { ErrorBannerComponent } from './components/error-banner/error-banner.component';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { PaginationComponent } from './components/pagination/pagination.component';
import { CapitalizePipe } from './pipes/capitalize.pipe';

@NgModule({
  declarations: [
    LoadingSpinnerComponent,
    ErrorBannerComponent,
    SearchBarComponent,
    PaginationComponent,
    CapitalizePipe,
  ],
  imports: [CommonModule, FormsModule],
  exports: [
    CommonModule,
    FormsModule,
    LoadingSpinnerComponent,
    ErrorBannerComponent,
    SearchBarComponent,
    PaginationComponent,
    CapitalizePipe,
  ],
})
export class SharedModule {}
