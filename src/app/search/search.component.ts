import { Component, EventEmitter, Output } from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})

export class SearchComponent {
  enteredSearchValue: string = '';

  @Output() searchTextChanged: EventEmitter<string> = new EventEmitter<string>();

  private searchSubject: Subject<string> = new Subject<string>();

  constructor() {
    this.searchSubject.pipe(debounceTime(1000), distinctUntilChanged()).subscribe(() => {
      this.onSearchTextChanged();
    });
  }

  onSearchInputChanged() {
    this.searchSubject.next(this.enteredSearchValue);
  }

  onSearchTextChanged() {
    this.searchTextChanged.emit(this.enteredSearchValue);
  }
}
