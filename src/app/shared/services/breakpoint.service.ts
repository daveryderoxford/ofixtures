
import { inject, Injectable } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { BreakpointObserver } from '@angular/cdk/layout';
import { map } from 'rxjs';

@Injectable({
   providedIn: 'root'
})
export class BreakpointService {
   breakpointObserver = inject(BreakpointObserver);

   handset = toSignal(this.breakpointObserver.observe(['(min-width: 500px) and (min-height: 400px)']).pipe(
      map(state => !state.matches)
   ), { initialValue: false });
}