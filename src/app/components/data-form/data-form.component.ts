import {AfterViewInit, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {InputDynamicFiled} from "../../entities/input-dynamic-filed";

@Component({
  selector: 'data-form',
  templateUrl: './data-form.component.html',
  styleUrls: ['./data-form.component.css']
})
export class DataFormComponent implements OnInit , AfterViewInit {

  @Input()
  public declare titleForm : string
  @Input()
  public declare formGroup : FormGroup
  @Input()
  public declare inputDynamicFields : InputDynamicFiled[]
  @Input()
  public declare defaultRadioValue : string
  @Output()
  public getFormGroupMain = new EventEmitter<FormGroup>()

  constructor() {}


  /*private testDynamicForm() {
    this.inputDynamicFields = []
    const positions = [
      {name: '', value: 'Full-Stack Developer'},
      {name: '', value: 'Backend Developer'},
      {name: '', value: 'Frontend Developer'},
    ]
    const confirm = [
      {label: 'Confirm form', value: true}, // if true will add new form
    ]
    this.inputDynamicFields.push(new InputDynamicFiled('text', 'fullname', 'em-fullname-id', 'Put the fullname...', 'fullname', new FormControl('', Validators.required)))
    this.inputDynamicFields.push(new InputDynamicFiled('number', 'age', 'em-age-id', 'Put the age...', 'age', new FormControl('', Validators.required)))
    this.inputDynamicFields.push(new InputDynamicFiled('radio', 'position', 'em-position-id', '', 'position', new FormControl('', Validators.required)).setRadioButtonMode(true).setDataRadioButton(positions).setNameRadioButton('Position : '))
    this.inputDynamicFields.push(new InputDynamicFiled('checkbox', 'confirm', 'em-confirm-id', '', 'confirm', new FormControl('', Validators.required)).setCheckboxMode(true).setDataCheckbox(confirm))
    this.inputDynamicFields.push(new InputDynamicFiled('textarea', 'details', 'em-details-id', 'Put the details...', 'details', new FormControl('', Validators.required)))

    // order field follow the index of inputDynamicFieldsMain
    for (const inputDynamicField of this.inputDynamicFields) {
      this.formGroup.addControl(inputDynamicField.nameControl, inputDynamicField.dataControl)
    }
  }*/

  ngOnInit(): void {
    for (const inputDynamicField of this.inputDynamicFields) {
      this.formGroup.addControl(inputDynamicField.nameControl, inputDynamicField.dataControl)
    }
  }

  ngAfterViewInit(): void {
    if (this.defaultRadioValue!==undefined) {
      this.setDefaultRadioButton(this.defaultRadioValue)
    }
  }

  public setDefaultRadioButton(value : string): void {
    // way to set default radio
    this.formGroup.controls['position'].setValue(value)
  }

  protected onSubmitFormMainClick() {
    this.getFormGroupMain.emit(this.formGroup)
  }
}
