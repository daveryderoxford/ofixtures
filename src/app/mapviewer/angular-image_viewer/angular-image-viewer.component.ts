import { Component, OnInit, HostListener, Input, OnChanges, SimpleChanges, output, inject } from '@angular/core';
import { ImageViewerConfig } from './models/image-viewer-config.model';
import { CustomImageEvent } from './models/custom-image-event-model';
import { DomSanitizer } from '@angular/platform-browser';
import { NgStyle } from '@angular/common';
import { FullScreenDirective } from './directives/full-screen.directive';


const DEFAULT_CONFIG: ImageViewerConfig = {
  btnContainerClass: 'btn-container',
  btnClass: 'default',
  btnSubClass: 'material-icons',
  zoomFactor: 0.1,
  containerBackgroundColor: '#ccc',
  wheelZoom: false,
  allowFullscreen: true,
  allowKeyboardNavigation: true,
  btnShow: {
    zoomIn: true,
    zoomOut: true,
    rotateClockwise: true,
    rotateCounterClockwise: true,
    next: true,
    prev: true,
    reset: true
  },
  btnIcons: {
    zoomIn: {
      classes: 'fa fa-plus',
      text: 'zoom_in'
    },
    zoomOut: {
      classes: 'fa fa-minus',
      text: 'zoom_out'
    },
    rotateClockwise:  {
      classes: 'fa fa-repeat',
      text: 'rotate_right'
    },
    rotateCounterClockwise:  {
      classes: 'fa fa-undo',
      text: 'rotate_left'
    },
    next:  {
      classes: 'fa fa-arrow-right',
      text: 'arrow_right'
    },
    prev:  {
      classes: 'fa fa-arrow-left',
      text: 'arrow_left'
    },
    fullscreen:  {
      classes: 'fa fa-arrows-alt',
      text: 'fullscreen'
    },
    reset:  {
      classes: 'fa fa-undo',
      text: 'restore'
    },
  }
};


@Component({
    selector: 'angular-image-viewer',
    templateUrl: './angular-image-viewer.component.html',
    styleUrls: ['./angular-image-viewer.component.scss'],
    imports: [FullScreenDirective, NgStyle]
})
export class AngularImageViewerComponent implements OnInit, OnChanges {
      public moduleConfig = inject<ImageViewerConfig>('config' as any /* TODO(inject-migration): Please check if the type is correct */, { optional: true });
      private sanitizer = inject(DomSanitizer);
  @Input()
  src: string[];

  @Input()
  screenHeightOccupied: number = 0;             // In Px

  @Input()
  index = 0;

  @Input()
  config: ImageViewerConfig;

  indexChange = output<number>();

  configChange = output<ImageViewerConfig>();

  customImageEvent = output<CustomImageEvent>();

  styleHeight = '100%';

  public style = { transform: '', msTransform: '', oTransform: '', webkitTransform: '' };
  public fullscreen = false;
  public loading = true;
  private scale = 1;
  private rotation = 0;
  private translateX = 0;
  private translateY = 0;
  private prevX: number;
  private prevY: number;
  private hovered = false;

  ngOnChanges(changes: SimpleChanges) {
    if (changes.screenHeightOccupied) {
      this.styleHeight = 'calc(100% - ' + this.screenHeightOccupied + 'px)';
      // console.log('Style Height:', this.styleHeight);
    }
  }

  ngOnInit() {
    const merged = this.mergeConfig(DEFAULT_CONFIG, this.moduleConfig);
    this.config = this.mergeConfig(merged, this.config);
    this.triggerConfigBinding();
  }

  @HostListener('window:keyup.ArrowRight', ['$event'])
  nextImage(event) {
    if (this.canNavigate(event) && this.index < this.src.length - 1) {
      this.loading = true;
      this.index++;
      this.triggerIndexBinding();
      this.reset();
    }
  }

  @HostListener('window:keyup.ArrowLeft', ['$event'])
  prevImage(event) {
    if (this.canNavigate(event) && this.index > 0) {
      this.loading = true;
      this.index--;
      this.triggerIndexBinding();
      this.reset();
    }
  }

  zoomIn() {
    this.scale *= (1 + this.config.zoomFactor);
    this.updateStyle();
  }

  zoomOut() {
    if (this.scale > this.config.zoomFactor) {
      this.scale /= (1 + this.config.zoomFactor);
    }
    this.updateStyle();
  }

  scrollZoom(evt) {
    if (this.config.wheelZoom) {
      evt.deltaY > 0 ? this.zoomOut() : this.zoomIn();
      return false;
    }
  }

  rotateClockwise() {
    this.rotation += 90;
    this.updateStyle();
  }

  rotateCounterClockwise() {
    this.rotation -= 90;
    this.updateStyle();
  }

  onLoad(url) {
    // console.log('Loading Image Done:', url);
    this.loading = false;
  }

  onLoadStart(url) {
    // console.log('Loading Image:', url);
    this.loading = true;
  }

  imageNotFound(url) {
    // console.log('Image not found Url:', url);
  }

  onDragOver(evt) {
    this.translateX += (evt.clientX - this.prevX);
    this.translateY += (evt.clientY - this.prevY);
    this.prevX = evt.clientX;
    this.prevY = evt.clientY;
    this.updateStyle();
  }

  onDragStart(evt) {
    if (evt.dataTransfer && evt.dataTransfer.setDragImage) {
      evt.dataTransfer.setDragImage(evt.target.nextElementSibling, 0, 0);
    }
    this.prevX = evt.clientX;
    this.prevY = evt.clientY;
  }

  toggleFullscreen() {
    this.fullscreen = !this.fullscreen;
    if (!this.fullscreen) {
      this.reset();
    }
  }

  triggerIndexBinding() {
    this.indexChange.emit(this.index);
  }

  triggerConfigBinding() {
    this.configChange.emit(this.config);
  }

  fireCustomEvent(name, imageIndex) {
    this.customImageEvent.emit(new CustomImageEvent(name, imageIndex));
  }

  reset() {
    // fiit the complate inage to the screen 
    
    this.scale = 1;
    this.rotation = 0;
    this.translateX = 0;
    this.translateY = 0;
    this.updateStyle();
  }

  @HostListener('mouseover')
  onMouseOver() {
    this.hovered = true;
  }

  @HostListener('mouseleave')
  onMouseLeave() {
    this.hovered = false;
  }

  private canNavigate(event: any) {
    return event == null || (this.config.allowKeyboardNavigation && this.hovered);
  }

  private updateStyle() {
    this.style.transform = `translate(${this.translateX}px, ${this.translateY}px) rotate(${this.rotation}deg) scale(${this.scale})`;
    this.style.msTransform = this.style.transform;
    this.style.webkitTransform = this.style.transform;
    this.style.oTransform = this.style.transform;
  }

  private mergeConfig(defaultValues: ImageViewerConfig, overrideValues: ImageViewerConfig): ImageViewerConfig {
    let result: ImageViewerConfig = { ...defaultValues };
    if (overrideValues) {
      result = { ...defaultValues, ...overrideValues };

      if (overrideValues.btnIcons) {
        result.btnIcons = { ...defaultValues.btnIcons, ...overrideValues.btnIcons };
      }
    }
    return result;
  }

;
;
;
}
