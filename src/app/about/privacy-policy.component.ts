import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ToolbarComponent } from '../shared/components/toolbar.component';

@Component({
    selector: 'app-privacy-policy',
    templateUrl: "./privacy-policy.component.html",
    styles: [],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [ToolbarComponent]
})
export class PrivacyPolicyComponent implements OnInit {
  ngOnInit() {
  }

}
