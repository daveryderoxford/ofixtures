import { ChangeDetectionStrategy, Component } from "@angular/core";
import { versions } from 'environments/versions';
import { AboutItem } from "./about-item";
import { MatExpansionModule } from "@angular/material/expansion";
import { FlexModule } from "@ngbracket/ngx-layout/flex";
import { AppToolbar } from "../shared/components/app-toolbar";

@Component({
    selector: 'app-about-page',
    templateUrl: './about-page.html',
    styleUrls: ['./about-page.scss'],
    imports: [AppToolbar, FlexModule, MatExpansionModule, AboutItem],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AboutPage {
  ver = versions;

}
