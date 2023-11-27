import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { SearchComponent } from './search.component';
import { DebugElement } from '@angular/core';
import { FormsModule } from '@angular/forms'; // Import FormsModule
import { By } from '@angular/platform-browser';

describe('SearchComponent', () => {
  let component: SearchComponent;
  let fixture: ComponentFixture<SearchComponent>;
  let searchInput: DebugElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SearchComponent],
      imports: [FormsModule], // Add FormsModule to the imports array
    });
    fixture = TestBed.createComponent(SearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    // Find the search input in the template
    searchInput = fixture.debugElement.query(By.css('input'));
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit search text when input changes', fakeAsync(() => {
    const searchTextChangedSpy = spyOn(component.searchTextChanged, 'emit');
    const testSearchValue = 'test';

    // Change the input value
    searchInput.nativeElement.value = testSearchValue;
    searchInput.nativeElement.dispatchEvent(new Event('input'));

    // Wait for debounceTime
    tick(1000);

    // Verify that the searchTextChanged event was emitted with the correct value
    expect(searchTextChangedSpy).toHaveBeenCalledWith(testSearchValue);
  }));
});
