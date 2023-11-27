import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { ImageHoverDirective } from './image-hover.directive';

// Define a test host component
@Component({
  template: `<div appImageHover [hoverImageSrc]="'hover-image-source'"></div>`
})
class TestHostComponent {}

describe('ImageHoverDirective', () => {
  let fixture: ComponentFixture<TestHostComponent>;
  let hostComponent: TestHostComponent;
  let directiveElement: DebugElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ImageHoverDirective, TestHostComponent],
    });

    fixture = TestBed.createComponent(TestHostComponent);
    hostComponent = fixture.componentInstance;
    directiveElement = fixture.debugElement.query(By.directive(ImageHoverDirective));

    fixture.detectChanges(); // Trigger initial data binding
  });

  it('should create an instance of the directive', () => {
    expect(hostComponent).toBeTruthy();
    expect(directiveElement).toBeTruthy();
  });

  it('should scale the element on mouse enter', () => {
    const hostElement = directiveElement.nativeElement as HTMLElement;
    const initialTransform = hostElement.style.transform;
    
    directiveElement.triggerEventHandler('mouseenter', {});
    const transformedElement = directiveElement.nativeElement as HTMLElement;
    
    expect(transformedElement.style.transform).toBe('scale(1.1)');
    expect(transformedElement.style.transform).not.toBe(initialTransform);
  });

  it('should remove the scale on mouse leave', () => {
    const hostElement = directiveElement.nativeElement as HTMLElement;

    directiveElement.triggerEventHandler('mouseenter', {});
    const transformedElement = directiveElement.nativeElement as HTMLElement;
    
    expect(transformedElement.style.transform).toBe('scale(1.1)');
    
    directiveElement.triggerEventHandler('mouseleave', {});
    
    const untransformedElement = directiveElement.nativeElement as HTMLElement;
    expect(untransformedElement.style.transform).toBeFalsy();
  });
});
