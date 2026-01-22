import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { FlexModule, FlexLayoutModule } from '@ngbracket/ngx-layout';

/** Container for 'full screen' forms */
@Component({
    selector: 'app-form-container',
    imports: [FlexModule, FlexLayoutModule, MatCardModule],
    templateUrl: './form-container.html',
    styleUrl: './form-container.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormContainer {
  error = input('');
}
