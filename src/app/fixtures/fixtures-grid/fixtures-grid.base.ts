import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { Directive, computed, inject, input, output, viewChild } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Entry, FixtureEntryDetails } from 'app/entry/@store/entry';
import { Fixture, LatLong, RGData } from 'app/fixtures/@store/fixture';
import { LoginSnackbarService } from 'app/shared/services/login-snackbar.service';
import { isSameDay } from "date-fns";

export interface StyledFixture extends Fixture {
  shaded?: boolean;
}

@Directive()
export abstract class FixturesGridBaseComponent {
  protected router = inject(Router);
  protected loginSnackBar = inject(LoginSnackbarService);

  fixtures = input.required<Fixture[]>();
  entries = input<FixtureEntryDetails[]>([]);
  userEntries = input<Entry[]>([]);
  selectedFixture = input.required<Fixture | undefined>();
  highlightSelected = input(true);
  homeLocation = input.required<LatLong>();
  loggedIn = input<boolean>(false);
  fixtureSelected = output<Fixture>();

  styledFixtures = computed(() => {
    const styled: StyledFixture[] = [...this.fixtures()];
    // Set Shaded property for date row styling
    let shaded = false;
    let previousFix = null;
    for (const fix of styled) {
      if (previousFix && !isSameDay(new Date(fix.date), new Date(previousFix.date))) {
        shaded = !shaded;
      }
      fix.shaded = shaded;
      previousFix = fix;
    }
    return styled;
  });

  readonly viewPort = viewChild.required(CdkVirtualScrollViewport);

  constructor() {
    const iconRegistry = inject(MatIconRegistry);
    const sanitizer = inject(DomSanitizer);
    this._registerGradeIcons(iconRegistry, sanitizer);
  }

  public scrollToFixture(fixture: Fixture) {
    const index = this.fixtures().findIndex(f => f.id === fixture.id);

    if (index !== -1) {
      setTimeout(() => this.viewPort().scrollToIndex(index));
    }
  }

  protected eventClicked(row: Fixture) {
    this.fixtureSelected.emit(row);
  }

  protected isSelected(fixture: Fixture): boolean {
    if (this.selectedFixture() && fixture) {
      return this.selectedFixture()!.id === fixture.id;
    } else {
      return false;
    }
  }

  protected rowClass(fixture: StyledFixture): string {
    if (this.highlightSelected() && this.isSelected(fixture)) {
      return 'selected';
    } else {
      return fixture.shaded ? 'shaded' : 'white';
    }
  }

  protected trackBy(index: number, fix: Fixture) {
    return fix.id;
  }

  /** Load icons svg for event grades */
  private _registerGradeIcons(iconRegistry: MatIconRegistry, sanitizer: DomSanitizer) {
    iconRegistry.addSvgIcon('grade-local',
      sanitizer.bypassSecurityTrustResourceUrl('assets/img/event_grade/grade_local.svg')
    );
    iconRegistry.addSvgIcon('grade-club',
      sanitizer.bypassSecurityTrustResourceUrl('assets/img/event_grade/grade_club.svg')
    );
    iconRegistry.addSvgIcon('grade-regional',
      sanitizer.bypassSecurityTrustResourceUrl('assets/img/event_grade/grade_regional.svg')
    );
    iconRegistry.addSvgIcon('grade-national',
      sanitizer.bypassSecurityTrustResourceUrl('assets/img/event_grade/grade_national.svg')
    );
    iconRegistry.addSvgIcon('grade-international',
      sanitizer.bypassSecurityTrustResourceUrl('assets/img/event_grade/grade_international.svg')
    );
    iconRegistry.addSvgIcon('grade-iof',
      sanitizer.bypassSecurityTrustResourceUrl('assets/img/event_grade/grade_iof.svg')
    );
  }

  protected mapView(rg: RGData) {
    this.router.navigate(["/mapviewer"], { queryParams: { rgdata: JSON.stringify(rg) } });
  }

  protected isEntryAvalaible(fixture: Fixture): boolean {
    if (!this.entries()) {
      return false;
    }
    const index = this.entries().findIndex(entry => fixture.id === entry.fixtureId);
    return index !== -1;
  }

  protected async enter(fixture: Fixture) {
    if (!this.loggedIn()) {
      this.loginSnackBar.open("Must be logged in to add map reservation");
    } else {
      this.router.navigate(["/entry/enter", fixture.id]);
    }
  }

  protected isEntered(fixture: Fixture): boolean {
    if (!this.userEntries()) { return false; }
    const index = this.userEntries().findIndex(entry => entry.fixtureId === fixture.id);
    return index !== -1;
  }

  protected async editEntry(fixture: Fixture) {
    this.router.navigate(["/entry/enter", fixture.id]);
  }

  protected async viewEntries(fixture: Fixture) {
    this.router.navigate(["/entry/entrylist", fixture.id]);
  }
}
