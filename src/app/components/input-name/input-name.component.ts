import { Component, EventEmitter, forwardRef, OnDestroy, OnInit, Output } from '@angular/core';
import { ControlValueAccessor, FormBuilder, FormControl, FormGroup, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Subscription } from 'rxjs';
import { INames } from '../../interfaces/names.interface';

@Component({
  selector: 'input-name',
  templateUrl: './input-name.component.html',
  styleUrls: ['./input-name.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputNameComponent),
      multi: true
    }
  ]
})
export class InputNameComponent implements OnInit, OnDestroy, ControlValueAccessor {
  // OUTPUTS
  @Output() onRemoveItemClick = new EventEmitter<number>();

  // PUBLICS
  public inputNameForm: FormGroup = new FormGroup('');

  // PRIVATES
  private _sub: Subscription = Subscription.EMPTY;

  constructor(
    private _fb: FormBuilder
  ) { } 

  ngOnInit(): void {
    this._initFormGroup(); 
    this._initSubscriber();
  }

  ngOnDestroy(): void {
    this._sub.unsubscribe();
  }

  /**
  * methode initalisiert die form gruppe
  */
  private _initFormGroup(): void {
    this.inputNameForm = this._fb.group({
      firstName: new FormControl(),
      lastName: new FormControl()
    });
  }

  /**
  * Methode initialisiert die Subscriber.
  */
  private _initSubscriber(): void {
    this._sub = this.inputNameForm.valueChanges.subscribe((x:INames) => {
      if(x.firstName && x.lastName) {      
        this.propagateChange(x);
      } else {
        this.propagateChange('');
      }
    })
  }

  // EVENTS

  /**
   * 
   */
  public onClickRemove(): void {
    this.onRemoveItemClick.emit()
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
  setDisabledState(isDisabled: boolean): void {
  }

}
