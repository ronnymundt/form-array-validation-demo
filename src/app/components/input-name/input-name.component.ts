import {
  Component,
  DestroyRef,
  EventEmitter,
  forwardRef,
  inject,
  OnInit,
  Output,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  ControlValueAccessor,
  FormBuilder,
  FormGroup,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTooltipModule } from '@angular/material/tooltip';
import { INames } from '../../interfaces/names.interface';

@Component({
  selector: 'input-name',
  templateUrl: './input-name.component.html',
  styleUrls: ['./input-name.component.scss'],
  imports: [
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatTooltipModule,
  ],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputNameComponent),
      multi: true,
    },
  ],
})
export class InputNameComponent implements OnInit, ControlValueAccessor {
  @Output() onRemoveItemClick = new EventEmitter<number>();

  private readonly fb = inject(FormBuilder);
  private readonly destroyRef = inject(DestroyRef);

  inputNameForm!: FormGroup;

  ngOnInit(): void {
    this._initFormGroup();
    this.initSubs();
  }

  /**
   * methode initalisiert die form gruppe
   */
  private _initFormGroup(): void {
    this.inputNameForm = this.fb.group({
      firstName: [],
      lastName: [],
    });
  }

  /**
   * Methode initialisiert die Subscriber.
   */
  private initSubs(): void {
    this.inputNameForm.valueChanges
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((x: INames) => {
        // propagiere die änderung an den parent
        this.propagateChange(x.firstName && x.lastName ? x : null);
        this.propagateTouch(x);
      });
  }

  /**
   * Eventhandler für den remove button
   */
  onClickRemove(): void {
    this.onRemoveItemClick.emit();
  }

  // VALUE ACCESSOR

  writeValue(value: INames): void {
    this.inputNameForm.patchValue(value);
  }

  // methode zum senden der änderung an den parent (valid, dirty)
  propagateChange = (_: any) => {};
  registerOnChange(fn: any): void {
    this.propagateChange = fn;
  }

  // methode zum senden des touch status an den parent
  propagateTouch = (_: any) => {};
  registerOnTouched(fn: any): void {
    this.propagateTouch = fn;
  }

  // wird ausgeführt wenn {disable = true} vom parent übergeben wird
  setDisabledState(isDisabled: boolean): void {}
}
