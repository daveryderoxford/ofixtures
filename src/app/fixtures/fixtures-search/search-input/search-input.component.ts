import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, ElementRef, forwardRef, input, OnInit, output, signal, ViewChild } from '@angular/core';
import { FormsModule, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { AbstractControlValueAccessor } from './abstract-value-accessor';

@Component({
    selector: 'app-search-input',
    templateUrl: './search-input.component.html',
    styleUrls: ['./search-input.component.scss'],
    imports: [ReactiveFormsModule, FormsModule, MatFormFieldModule, MatInputModule, MatIconModule],
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

  placeholder = input('');
  alwaysOpen = input<boolean>(false);
  onBlur = output<string>();
  onClose = output<void>();
  onStringChange = output<string>();
  onFocus = output<string>();
  onOpen = output<void>();

  searchVisible = signal(false);
  value = '';

  ngOnInit() {

    if (this.alwaysOpen()) {
      this.searchVisible.set(true);
    }
  }

  public close(): void {
    if (!this.alwaysOpen()!) {
      this.searchVisible.set(false);
    }
    this.value = '';
    this.updateChanges();
    this.onStringChange.emit('');
    this.onClose.emit();
  }

  public open(): void {
    this.searchVisible.set(true);
    this.inputElement.nativeElement.focus();
    this.onOpen.emit();
  }

  onBlurring(searchValue: string) {
    if (!searchValue && !this.alwaysOpen()!) {
      this.searchVisible.set(false);
    }
    this.onBlur.emit(searchValue);
  }

  onKeyup(searchValue: string) {
    this.onStringChange.emit(searchValue);
  }

  onFocussing(searchValue: string) {
    this.onFocus.emit(searchValue);
  }
}
