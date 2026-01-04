import { BreakpointObserver } from '@angular/cdk/layout';
import { Location } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { RGData } from 'app/fixtures/@store/fixture';
import { AngularImageViewerComponent } from './angular-image_viewer/angular-image-viewer.component';
import { FlexModule } from '@ngbracket/ngx-layout/flex';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
    selector: 'app-mapviewer',
    templateUrl: './mapviewer.component.html',
    styleUrls: ['./mapviewer.component.scss'],
    imports: [MatToolbarModule, MatButtonModule, MatIconModule, FlexModule, AngularImageViewerComponent],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MapviewerComponent implements OnInit {
    location = inject(Location);
    private route = inject(ActivatedRoute);
    private breakpointObserver = inject(BreakpointObserver);


    config = {
        btnClass: "hide",
        containerBackgroundColor: '#fff',
        allowKeyboardNavigation: true,
        allowFullscreen: false,
        wheelZoom: true,
        btnShow: {
            next: false,
            prev: false,
            zoomIn: false,
            zoomOut: false,
            rotateClockwise: false,
            rotateCounterClockwise: false,
            reset: false
        }
    };

    rgData!: RGData;
    images: string[] = [];
    handset!: boolean;

    ngOnInit() {

        this.breakpointObserver.observe( ['(min-width: 500px) and (min-height: 400px)'] ).subscribe( state => this.handset = !state.matches );

        this.route.queryParamMap.subscribe( ( params: ParamMap ) => {
            this.rgData = JSON.parse( params.get( 'rgdata' )! );
            this.images = this.rgData.maps.map( m => this.rgData.baseURL + "kartat/" + m.mapfile );
        } );
    }

    routegadgetURL(index: number) {
        return this.rgData.baseURL + "rg2/#" + this.rgData.maps[index].id;
    }
}
