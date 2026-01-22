import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { BreakpointService } from 'app/shared/services/breakpoint.service';
import { LoadingCentered } from '../../shared/components/loading-centered';
import { FixturesDesktop } from './fixtures-desktop';
import { FixturesMobile } from './fixtures-mobile';

@Component({
   selector: 'app-fixtures-page',
   template: `
      @if (handset()) {
         @defer (on immediate) {
            <app-fixtures-mobile [league]="leagueId()" [club]="clubName()" />
         } @placeholder {
            <app-loading-centered message="Loading..." />
         }
         } @else {
         @defer (on immediate) {
            <app-fixtures-desktop [league]="leagueId()" [club]="clubName()" />
         } @placeholder {
            <app-loading-centered message="Loading..." />
         }
      }
   `,
   styleUrls: ['./fixtures-page.scss'],
   changeDetection: ChangeDetectionStrategy.OnPush,
   imports: [FixturesDesktop, FixturesMobile, LoadingCentered]
})
export class FixturesPage {
   private breakpointObserver = inject(BreakpointService);
   handset = this.breakpointObserver.handset;

   leagueId = input<string | undefined>(undefined, {alias: 'league'}); // Route parameter
   clubName = input<string | undefined>(undefined, {alias: 'club'});   // Route parameter
}
