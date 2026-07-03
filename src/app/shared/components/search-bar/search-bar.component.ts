import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss'],
})
export class SearchBarComponent {
  @Input() value = '';
  @Input() placeholder = 'Buscar…';
  @Output() valueChange = new EventEmitter<string>();

  onInput(rawValue: string): void {
    this.valueChange.emit(rawValue);
  }
}
