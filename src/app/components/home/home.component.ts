import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatTooltipModule } from '@angular/material/tooltip';
import { INames } from '../../interfaces/names.interface';
import { InputNameComponent } from '../input-name/input-name.component';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  imports: [
    ReactiveFormsModule,
    InputNameComponent,
    CommonModule,
    MatTooltipModule,
  ],
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  private readonly fb = inject(FormBuilder);

  groupForm!: FormGroup;

  ngOnInit(): void {
    this.initForm();
  }

  /**
   * Methode initalisiert die form gruppe
   */
  private initForm(): void {
    this.groupForm = this.fb.group({
      arrayForms: this.fb.array([]),
    });

    // push initial values
    this.arrayForms.push(
      this.getInputFormGroup({ firstName: 'Clark', lastName: 'Kent' }),
    );
    this.arrayForms.push(this.getInputFormGroup());
  }

  /**
   * Methode gibt die FormGroup zurück
   * @param value
   * @private
   */
  private getInputFormGroup(value?: INames): FormGroup {
    return this.fb.group({
      inputName: [{ value: value, disabled: false }, Validators.required],
    });
  }

  /**
   * Getter für Form Array
   */
  get arrayForms() {
    return this.groupForm.get('arrayForms') as FormArray;
  }

  /**
   * Event fügt name item zum Form Array hinzu.
   */
  onAddItemClick(): void {
    this.arrayForms.push(this.getInputFormGroup());
  }

  /**
   * Event entfernt name item aus Form Array.
   * @param index
   */
  onRemoveItemClick(index: number): void {
    this.arrayForms.removeAt(index);
  }
}
