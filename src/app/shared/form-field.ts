import { Component, Input, Output, EventEmitter, forwardRef, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

export type FormFieldState = 'default' | 'error' | 'success';

@Component({
  selector: 'app-form-field',
  standalone: true,
  imports: [CommonModule, FormsModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FormFieldComponent),
      multi: true,
    },
  ],
  template: `
    <div class="w-full">
      <label
        *ngIf="label"
        [for]="fieldId"
        class="block text-[11px] font-mulish font-bold uppercase tracking-wider mb-1"
        [class.text-petroleo]="state !== 'error'"
        [class.text-red]="state === 'error'"
      >
        {{ label }}
      </label>

      <div class="relative">
        <span
          *ngIf="leadingIcon"
          class="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[20px] pointer-events-none transition-colors"
          [class.text-gris-medio]="state === 'default'"
          [class.text-red]="state === 'error'"
          [class.text-baltico]="state === 'success'"
          aria-hidden="true"
        >{{ leadingIcon }}</span>

        <input
          #input
          [id]="fieldId"
          [name]="name || fieldId"
          [type]="type"
          [(ngModel)]="value"
          (ngModelChange)="onChange($event)"
          (blur)="onBlur()"
          [placeholder]="placeholder"
          [autocomplete]="autocomplete"
          [attr.aria-invalid]="state === 'error'"
          [attr.aria-describedby]="describedById"
          [required]="required"
          class="cc-input w-full"
          [class.pl-11]="leadingIcon"
          [class.pr-11]="leadingIcon || hasTrailing || state === 'success' || state === 'error'"
          [class.cc-input--error]="state === 'error'"
          [class.cc-input--success]="state === 'success'"
        >

        <ng-content select="[trailing]"></ng-content>

        <span
          *ngIf="state === 'success' && !hasTrailing"
          class="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-baltico text-[20px] pointer-events-none"
          aria-hidden="true"
        >check_circle</span>

        <span
          *ngIf="state === 'error' && !hasTrailing"
          class="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-red text-[20px] pointer-events-none"
          aria-hidden="true"
        >error</span>
      </div>

      <p
        *ngIf="state === 'error' && errorMessage"
        [id]="describedById"
        class="cc-input-hint cc-input-hint--error"
        role="alert"
      >
        <span class="material-symbols-outlined text-[14px]" aria-hidden="true">warning</span>
        <span>{{ errorMessage }}</span>
      </p>

      <p
        *ngIf="state === 'success' && successMessage"
        [id]="describedById"
        class="cc-input-hint cc-input-hint--success"
      >
        <span class="material-symbols-outlined text-[14px]" aria-hidden="true">check_circle</span>
        <span>{{ successMessage }}</span>
      </p>
    </div>
  `,
  styles: [`
    :host {
      display: block;
      width: 100%;
    }
  `]
})
export class FormFieldComponent implements ControlValueAccessor {
  @Input() label = '';
  @Input() type: 'text' | 'password' | 'email' = 'text';
  @Input() placeholder = '';
  @Input() name = '';
  @Input() leadingIcon = '';
  @Input() autocomplete = '';
  @Input() required = false;
  @Input() fieldId = `cc-field-${Math.random().toString(36).slice(2, 9)}`;
  @Input() state: FormFieldState = 'default';
  @Input() errorMessage = '';
  @Input() successMessage = '';
  @Input() hasTrailing = false;
  @Output() blurred = new EventEmitter<void>();

  @ViewChild('input', { static: false }) inputRef?: ElementRef<HTMLInputElement>;

  value: string | null = '';

  get describedById(): string {
    return `${this.fieldId}-hint`;
  }

  private onChangeFn: (val: string) => void = () => {};
  private onTouchedFn: () => void = () => {};

  onChange(val: string) {
    this.value = val;
    this.onChangeFn(val);
  }

  onBlur() {
    this.onTouchedFn();
    this.blurred.emit();
  }

  writeValue(val: any): void {
    this.value = val ?? '';
  }
  registerOnChange(fn: any): void {
    this.onChangeFn = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouchedFn = fn;
  }
  setDisabledState(isDisabled: boolean): void {
    if (this.inputRef?.nativeElement) {
      this.inputRef.nativeElement.disabled = isDisabled;
    }
  }
}
