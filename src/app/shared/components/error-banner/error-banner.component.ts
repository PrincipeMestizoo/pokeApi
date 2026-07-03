import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-error-banner',
  templateUrl: './error-banner.component.html',
  styleUrls: ['./error-banner.component.scss'],
})
export class ErrorBannerComponent {
  @Input() message = 'Ocurrió un error inesperado.';
  @Output() retry = new EventEmitter<void>();
}
