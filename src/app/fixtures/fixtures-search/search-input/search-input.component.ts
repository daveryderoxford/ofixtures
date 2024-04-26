import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, ElementRef, forwardRef, Input, OnInit, ViewChild, output } from '@angular/core';
import { FormControl, FormsModule, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { AbstractControlValueAccessor } from './abstract-value-accessor';
import { MatLegacyFormFieldModule } from '@angular/material/legacy-form-field';
import { MatLegacyInputModule } from '@angular/material/legacy-input';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-search-input',
  templateUrl: './search-input.component.html',
  styleUrls: ['./search-input.component.scss'],
  standalone: true,
  imports: [ ReactiveFormsModule, FormsModule, MatLegacyFormFieldModule, MatLegacyInputModule, MatIconModule],
  animations: [
    trigger('slideInOut', [
      state('true', style({ width: '*' })),
      state('false', style({ width: '0' })),
      transition('true => false', animate('300ms ease-in')),
      transition('false => true', animate('300ms ease-out'))
    ])
  ],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SearchInputComponent),
      multi: true
    }
  ]
})
export class SearchInputComponent extends AbstractControlValueAccessor<string> implements OnInit {

  @ViewChild('input') inputElement: ElementRef;

  @Input() placeholder = '';
  @Input() alwaysOpen: boolean = false;
  onBlur = output<string>();
  onClose = output<void>();
  onStringChange = output<string>();
  onFocus = output<string>();
  onOpen = output<void>();

  searchVisible = false;
  value = '';

  ngOnInit() {

    if (this.alwaysOpen) {
      this.searchVisible = true;
    }
  }

  public close(): void {
    if (!this.alwaysOpen) {
      this.searchVisible = false;
    }
    this.value = '';
    this.updateChanges();
    this.onStringChange.emit('');
    this.onClose.emit();
  }

  public open(): void {
    this.searchVisible = true;
    this.inputElement.nativeElement.focus();
    this.onOpen.emit();
  }

  onBlurring(searchValue: string) {
    if (!searchValue && !this.alwaysOpen) {
      this.searchVisible = false;
    }
    this.onBlur.emit(searchValue);
  }

  onKeyup(searchValue: string) {
    this.onStringChange.emit(searchValue);
  }

  onFocussing(searchValue: string) {
    this.onFocus.emit(searchValue);
  }

;
;
;
;
;
}
