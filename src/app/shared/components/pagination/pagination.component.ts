import { Component, EventEmitter, Input, Output } from '@angular/core';
import { paginationRangeLabel } from '../../../utils/pokemon-format.utils';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss'],
})
export class PaginationComponent {
  @Input() offset = 0;
  @Input() pageSize = 12;
  @Input() itemsShown = 0;
  @Input() totalCount = 0;

  @Output() next = new EventEmitter<void>();
  @Output() previous = new EventEmitter<void>();

  get rangeLabel(): string {
    return paginationRangeLabel(this.offset, this.itemsShown, this.totalCount);
  }

  get canGoBack(): boolean {
    return this.offset > 0;
  }

  get canGoForward(): boolean {
    return this.offset + this.pageSize < this.totalCount;
  }
}
