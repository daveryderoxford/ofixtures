import { DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatLineModule } from '@angular/material/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { Router, RouterLink } from '@angular/router';
import { FlexModule } from '@ngbracket/ngx-layout/flex';
import { AdditionalFixture } from 'app/fixtures/@store/fixture';
import { DialogsService } from 'app/shared';
import { AdditionalFixtureService } from '../@store/additional-fixture.service';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
    selector: 'app-fixture-admin-card',
    templateUrl: './fixture-admin-card.component.html',
    styleUrls: ['./fixture-admin-card.component.scss'],
    imports: [MatCardModule, FlexModule, MatButtonModule, RouterLink, MatIconModule, MatExpansionModule, MatListModule, MatDividerModule, MatLineModule, DatePipe],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class FixtureAdminCardComponent  {
  protected fs = inject(AdditionalFixtureService);
  private router = inject(Router);
  private ds = inject(DialogsService);

  fixtures = toSignal(this.fs.fixtures$, {initialValue: []});

  async delete ( fixture: AdditionalFixture ) {

    if ( await this.ds.confirm( 'Delete fixture', 'Delete fixture?.' ) ) {
      await this.fs.delete( fixture.id );
    }
  }

  async edit( fixture: AdditionalFixture ) {
    this.router.navigate( ['/admin/fixture/edit', fixture.id] )
  }

}
