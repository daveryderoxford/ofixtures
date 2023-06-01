import { Component } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { AdditionalFixture } from 'app/model/fixture';
import { DialogsService } from 'app/shared';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { AdditionalFixtureService } from '../additional-fixture.service';

@Component({
  selector: 'app-fixture-admin-card',
  templateUrl: './fixture-admin-card.component.html',
  styleUrls: ['./fixture-admin-card.component.scss']
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
