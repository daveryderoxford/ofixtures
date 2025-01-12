import { Component } from "@angular/core";
import { versions } from 'environments/versions';
import { AboutItemComponent } from "./about-item.component";
import { MatExpansionModule } from "@angular/material/expansion";
import { FlexModule } from "@ngbracket/ngx-layout/flex";
import { ToolbarComponent } from "../shared/components/toolbar.component";

@Component({
    selector: "app-about",
    templateUrl: "./about.component.html",
    styleUrls: ["./about.component.scss"],
    imports: [ToolbarComponent, FlexModule, MatExpansionModule, AboutItemComponent]
})
export class AboutComponent {
  ver = versions;

}
