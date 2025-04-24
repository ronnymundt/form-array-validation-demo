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
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
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
    MatButtonModule,
    MatIconModule,
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

  ngOnInit() {
    this.initFormGroup();
    this.initSubs();
  }

  /**
   * methode initalisiert die form gruppe
   */
  private initFormGroup() {
    this.inputNameForm = this.fb.group({
      firstName: [],
      lastName: [],
    });
  }

  /**
   * Methode initialisiert die Subscriber.
   */
  private initSubs() {
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
  onRemoveClick() {
    this.onRemoveItemClick.emit();
  }

  // VALUE ACCESSOR

  writeValue(value: INames) {
    this.inputNameForm.patchValue(value);
  }

  // methode zum senden der änderung an den parent (valid, dirty)
  propagateChange = (_: any) => {};
  registerOnChange(fn: any) {
    this.propagateChange = fn;
  }

  // methode zum senden des touch status an den parent
  propagateTouch = (_: any) => {};
  registerOnTouched(fn: any) {
    this.propagateTouch = fn;
  }

  // wird ausgeführt wenn {disable = true} vom parent übergeben wird
  setDisabledState(isDisabled: boolean) {}
}
