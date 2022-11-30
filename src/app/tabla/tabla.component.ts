import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { faTrash, faPenToSquare,faEye } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-tabla',
  templateUrl: './tabla.component.html',
  styleUrls: ['./tabla.component.css']
})
export class TablaComponent implements OnInit {
  @Input() public headers: string[];
  @Input() public body: any[];
  names:any[];
  faTrash = faTrash
  faPenToSquare = faPenToSquare
  faEye=faEye

  @Output() public OnDelete = new EventEmitter();
  @Output() public OnView = new EventEmitter();
  @Output() public OnEdit = new EventEmitter();

  constructor() { }
  ngOnChanges(changes: SimpleChanges): void {
    if(this.body){
      this.get();
    }
  }

  ngOnInit(): void {
   /*  this.body.forEach(e =>{
      e.names = Object.getOwnPropertyNames(e);
    }) */

  }

  get(){
    this.names = Object.getOwnPropertyNames(this.body[0]);
  }

  borrar(id:number){
    this.OnDelete.emit(id);
  }

  Editar(id:number){
    this.OnEdit.emit(id);
  }

}
