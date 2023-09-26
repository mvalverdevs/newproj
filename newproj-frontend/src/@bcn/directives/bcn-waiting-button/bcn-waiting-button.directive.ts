import {
  Directive,
  ElementRef,
  OnInit,
  Renderer2,
  ComponentFactoryResolver,
  ViewContainerRef,
  Input,
  OnChanges,
  HostBinding
} from '@angular/core';
import {MatProgressSpinner} from '@angular/material/progress-spinner';

@Directive({
  selector: '[bcnWaitingButton]'
})
export class BCNWaitingButtonDirective implements OnInit, OnChanges {
  private spinner: MatProgressSpinner;
  @Input()
  @HostBinding('disabled')
  bcnWaitingButton: boolean;

  constructor(
    private el: ElementRef,
    private renderer: Renderer2,
    private componentFactoryResolver: ComponentFactoryResolver,
    public vcRef: ViewContainerRef
  ) {}

  ngOnInit(): void {
    // Create the spinner
    const factory = this.componentFactoryResolver.resolveComponentFactory(
        MatProgressSpinner
    );
    const componentRef = this.vcRef.createComponent(factory);
    this.spinner = componentRef.instance;

    // Configure the spinner
    this.spinner.strokeWidth = 3;
    this.spinner.diameter = 24;

    // Apply new styles
    const span: ElementRef = this.el.nativeElement.querySelector(
      '.mat-button-wrapper'
    );
    this.renderer.setStyle(span, 'display', 'flex');
    this.renderer.setStyle(span, 'align-items', 'center');
    this.renderer.setStyle(span, 'justify-content', 'center');
    this.renderer.setStyle(
      this.spinner._elementRef.nativeElement,
      'margin-top',
      '0px'
    );
    this.renderer.setStyle(
      this.spinner._elementRef.nativeElement,
      'margin-left',
      '5px'
    );

    this.renderer.setStyle(
      this.spinner._elementRef.nativeElement, 'display', 'none'
    );

    // Append the spinner
    this.renderer.appendChild(
      this.el.nativeElement.firstChild,
      this.spinner._elementRef.nativeElement
    );
  }

  ngOnChanges(): void {
    if (this.spinner) {
      this.renderer.setStyle(
        this.spinner._elementRef.nativeElement,
        'display',
        this.bcnWaitingButton ? 'block' : 'none'
      );
    }
  }
}
