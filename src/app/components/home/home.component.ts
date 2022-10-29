import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { INames } from '../../interfaces/names.interface';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  //PUBLICS
  public groupForm: FormGroup = new FormGroup('');
  get arrayForms() { return this.groupForm.get("arrayForms") as FormArray; };


  constructor(
    private _fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this._initFormGroup();
  }  
  
  /**
  * methode initalisiert die form gruppe
  */
  private _initFormGroup(): void {
    this.groupForm = this._fb.group({
      arrayForms: this._fb.array([])
    });  
    
    this.arrayForms.push(this._getInputFormGroup({ firstName: "Clark", lastName: "Kent" }));   
    this.arrayForms.push(this._getInputFormGroup());   
  } 

  /**
   * 
   * @returns 
   */
  private _getInputFormGroup(value?: INames): FormGroup { 
    return this._fb.group({
      inputName: new FormControl({ value: value, disabled: false }, Validators.required)
    });
  }  

  // EVENTS

  /**
   * Event fügt name item zum Form Array hinzu.
   */
  public onAddItemClick(): void {    
    this.arrayForms.push(this._getInputFormGroup());    
  }

  /**
   * Event entfernt name item aus Form Array.
   * @param index 
   */
  public onRemoveItemClick(index: number): void {
    this.arrayForms.removeAt(index);    
  }
}
