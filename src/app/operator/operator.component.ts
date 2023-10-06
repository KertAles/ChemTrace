import { Component, Output, EventEmitter  } from '@angular/core';
import {formatDate} from "@angular/common";
@Component({
  selector: 'app-operator',
  templateUrl: './operator.component.html',
  styleUrls: ['./operator.component.css']
})
export class OperatorComponent {
  @Output() finished = new EventEmitter<string>();

  storage_key = Math.floor(Math.random() * 10000).toString()
  dgd_error: string = '';
  dgdName: string = '';
  timestamp = formatDate(new Date(), 'dd-MM-yyyy hh:mm', 'en-UK');


  constructor() {
    localStorage.setItem('dtm' + this.storage_key, this.timestamp)
  }

  finishForm(check: any) {
    if(check) {
      if(this.dgdName == '') {
        this.dgd_error = 'File required.'
      }
      if(this.dgd_error == ''){
        this.finished.emit('done');
      }
    }
    else {
      this.finished.emit('done');
    }

  }


  onDGCSelected(event: any) {
    const file:File = event.target.files[0];
    this.dgd_error = ''

    if (file) {
      let file_type = file.name.split('.').pop();
      if (file_type == 'pdf') {
        this.dgdName = file.name;

        let blob = new Blob([file], {
          type: 'application/pdf'
        });

        const reader = new FileReader();
        reader.onload = () => {
          if (typeof reader.result === "string") {
            localStorage.setItem('dgc' + this.storage_key, reader.result);
          }
        }
        reader.readAsDataURL(blob);

      }
      else {
        this.dgdName = file.name;
        localStorage.setItem('dgc' + this.storage_key, '')
        this.dgd_error = 'Invalid file type.'
      }
    }
  }

  downloadDGDIce() {
    const link = document.createElement('a');
    link.setAttribute('target', '_blank');
    link.setAttribute('href', '../../assets/dgd-dryIce.pdf');
    link.setAttribute('download', 'dgc.pdf');
    document.body.appendChild(link);
    link.click();
    link.remove();
  }

  downloadDGDGen() {
    const link = document.createElement('a');
    link.setAttribute('target', '_blank');
    link.setAttribute('href', '../../assets/dgd-generic.pdf');
    link.setAttribute('download', 'dgc.pdf');
    document.body.appendChild(link);
    link.click();
    link.remove();
  }
  protected readonly localStorage = localStorage;
}
