import { ChangeDetectorRef, Component, Injector, Type, inject } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';

@Component({ template: '' })
export abstract class AbstractControlValueAccessor<T>
   implements ControlValueAccessor {
      public injector = inject(Injector);
   value: string;

   protected cdRef: ChangeDetectorRef;

   constructor() {
      this.cdRef = this.injector.get<ChangeDetectorRef>(ChangeDetectorRef as Type<ChangeDetectorRef>);
   }

   /**
    * Invoked when the model has been changed
    */
   onChange: (_: any) => void = (_: any) => { };

   /**
    * Invoked when the model has been touched
    */
   onTouched: () => void = () => { };
   /**
    * Method that is invoked on an update of a model.
    */
   updateChanges() {
      this.onChange(this.value);
   }

   /**
    * Writes a new item to the element.
    * @param value the value
    */
   writeValue(value: string): void {
      this.value = value;
      setTimeout(() => this.cdRef.detectChanges(), 0);

      this.updateChanges();
   }

   /**
    * Registers a callback function that should be called when the control's value changes in the UI.
    * @param fn
    */
   registerOnChange(fn: any): void {
      this.onChange = fn;
   }

   /**
    * Registers a callback function that should be called when the control receives a blur event.
    * @param fn
    */
   registerOnTouched(fn: any): void {
      this.onTouched = fn;
   }
}