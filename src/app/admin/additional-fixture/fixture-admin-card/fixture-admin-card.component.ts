import { Component } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { Router, RouterLink } from '@angular/router';
import { AdditionalFixture } from 'app/model/fixture';
import { DialogsService } from 'app/shared';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { AdditionalFixtureService } from '../additional-fixture.service';
import { MatLineModule } from '@angular/material/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatLegacyListModule } from '@angular/material/legacy-list';
import { NgIf, NgFor, AsyncPipe, DatePipe } from '@angular/common';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatLegacyButtonModule } from '@angular/material/legacy-button';
import { FlexModule } from '@ngbracket/ngx-layout/flex';
import { MatLegacyCardModule } from '@angular/material/legacy-card';

@Component({
    selector: 'app-fixture-admin-card',
    templateUrl: './fixture-admin-card.component.html',
    styleUrls: ['./fixture-admin-card.component.scss'],
    standalone: true,
    imports: [MatLegacyCardModule, FlexModule, MatLegacyButtonModule, RouterLink, MatIconModule, MatExpansionModule, NgIf, MatLegacyListModule, MatDividerModule, NgFor, MatLineModule, AsyncPipe, DatePipe]
})
export class FixtureAdminCardComponent  {

  fixtures$: Observable<AdditionalFixture[]>;

  constructor ( private fs: AdditionalFixtureService,
    private auth: Auth,
    private router: Router,
    private ds: DialogsService ) {
        this.fixtures$ = fs.fixtures$; 
    }

  async delete ( fixture: AdditionalFixture ) {

    if ( await this.ds.confirm( 'Delete fixture', 'Delete fixture?.' ) ) {
      await this.fs.delete( fixture.id );
    }
  }

  async edit( fixture: AdditionalFixture ) {
    this.router.navigate( ['/admin/fixture/edit', fixture.id] )
  }

}
