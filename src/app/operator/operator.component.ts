import { Component, Output, EventEmitter  } from '@angular/core';

@Component({
  selector: 'app-operator',
  templateUrl: './operator.component.html',
  styleUrls: ['./operator.component.css']
})
export class OperatorComponent {
  @Output() finished = new EventEmitter<string>();

  finishForm() {
    this.finished.emit('done');
  }

}
