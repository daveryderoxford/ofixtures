import { Directive, Input, ElementRef, OnChanges, OnInit, SimpleChanges, inject } from '@angular/core';
import { input } from "@angular/core";

// import * as screenfull from 'screenfull';

@Directive({
    selector: '[appScreenfull]',
    standalone: true
})
export class FullScreenDirective implements OnChanges, OnInit {
      private el = inject(ElementRef);
  fullscreenState = input<boolean>(undefined, { alias: 'appScreenfull' });

  ngOnChanges(changes: SimpleChanges) {
    // console.log('fullscreenState isFirstChange:', changes["fullscreenState"].isFirstChange());
    // console.log('fullscreenState', this.fullscreenState);
    // if (screenfull.isEnabled) {
    //   screenfull.toggle(this.el.nativeElement);
    // }
    // if (this.fullscreenState && screenfull.isEnabled) {
    //   screenfull.request(this.el.nativeElement);
    // } else if (screenfull.isEnabled) {
    //   screenfull.exit();
    // }

    // tslint:disable-next-line: no-string-literal
    if (!changes['fullscreenState'].isFirstChange()) {

      if (this.fullscreenState()) {
        const element: any = this.el.nativeElement;

        // tslint:disable-next-line: max-line-length
        const requestMethod = element.requestFullscreen || element.webkitRequestFullScreen || element.mozRequestFullScreen || element.msRequestFullScreen;

        if (requestMethod) { // Native full screen.
          requestMethod.call(element);
        } else {
          console.log('FullScreen Request Method Not Supported on this browser.');
        }
      } else {
        const element: any = document;

        // tslint:disable-next-line: max-line-length
        const requestMethod = element.cancelFullscreen || element.webkitExitFullscreen || element.webkitCancelFullScreen || element.mozCancelFullScreen || element.msExitFullScreen;

        if (requestMethod) { // Native Cancel full screen.
          requestMethod.call(element);
        } else {
          console.log('FullScreen Cancel Request Method Not Supported on this browser.');
        }
      }
    }

  }

  ngOnInit() {

  }

;
}
