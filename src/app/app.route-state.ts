import { inject, Injectable } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router } from '@angular/router';
import { distinctUntilChanged, filter, map, tap } from 'rxjs/operators';

@Injectable({
   providedIn: 'root'
})
export class RouteState {
   router = inject(Router);

   private params$ = this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      map(evt => {
         const e = evt as NavigationEnd;
         return this.router.parseUrl(e.url).queryParams;
      }),
   );

   club = toSignal(this.params$.pipe(
      map(params => params['club'] as string),
      distinctUntilChanged(),
      tap(c => console.log('RouteState club: ', c))
   ), { initialValue: undefined });

   league = toSignal(this.params$.pipe(
      map(params => params['leagueId']),
      distinctUntilChanged(),
      tap(l => console.log('RouteState league: ', l))
   ), { initialValue: undefined });
   
}