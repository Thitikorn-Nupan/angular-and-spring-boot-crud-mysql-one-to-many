import {FormControl} from "@angular/forms";

export class InputDynamicFiled {
  public typeInput : string
  public skipMode : boolean
  public nameInput : string
  public idInput : string
  public placeholderInput : string
  public nameControl : string
  public dataControl : FormControl
  public radioButtonMode : boolean
  public nameRadiobutton : string
  public dataRadioButton : {name : string , value : string} []
  public checkboxMode : boolean
  public dataCheckbox : {label : string , value : boolean}[]


  constructor(typeInput: string, nameInput: string, idInput: string, placeholderInput: string, nameControl: string, dataControl: FormControl) {
    this.typeInput = typeInput;
    this.nameInput = nameInput;
    this.idInput = idInput;
    this.placeholderInput = placeholderInput;
    this.nameControl = nameControl;
    this.dataControl = dataControl;
    this.radioButtonMode = false;
    this.dataRadioButton = []
    this.dataCheckbox = []
    this.checkboxMode = false;
    this.nameRadiobutton = '';
    this.skipMode = false
  }

  public setRadioButtonMode(value: boolean) {
    this.radioButtonMode = value;
    return this
  }

  public setNameRadioButton(value:string) {
    this.nameRadiobutton = value
    return this
  }

  public setDataRadioButton(value : {name : string , value : string} []){
    this.dataRadioButton = value
    return this
  }

  public setCheckboxMode(value: boolean) {
    this.checkboxMode = value;
    return this
  }

  public setDataCheckbox(value : {label : string , value : boolean} []){
    this.dataCheckbox = value
    return this
  }


  public setSkipMode(value : boolean) {
    this.skipMode = value;
    return this
  }

}
