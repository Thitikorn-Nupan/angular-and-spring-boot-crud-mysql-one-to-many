import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.css']
})
export class DataTableComponent implements OnInit{

  @Input()
  public declare titleTable : string
  @Input()
  public declare dataHeaders : string[]
  @Input()
  public declare dataBody : Array<any>
  @Input()
  public declare dataBodyKeys :  Array<string>

  @Output()
  public dataEdit = new EventEmitter<any>()
  @Output()
  public dataRemove = new EventEmitter<any>()

  ngOnInit(): void {

  }

  protected onEditClick(data : any): void {
    this.dataEdit.emit(data)
    // console.log('edit : ',data)
  }

  protected onRemoveClick(data : any): void {
    this.dataRemove.emit(data)
    // console.log('remove : ',data)
  }

}
