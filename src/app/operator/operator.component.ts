import { Component, Output, EventEmitter  } from '@angular/core';

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

  finishForm() {
    this.finished.emit('done');
  }


  onDGDSelected(event: any) {
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
            localStorage.setItem('dgd' + this.storage_key, reader.result);
          }
        }
        reader.readAsDataURL(blob);

      }
      else {
        this.dgdName = file.name;
        localStorage.setItem('dgd' + this.storage_key, '')
        this.dgd_error = 'Invalid file type.'
      }
    }
  }

  downloadDGDIce() {
    const link = document.createElement('a');
    link.setAttribute('target', '_blank');
    link.setAttribute('href', '../../assets/dgd-dryice.pdf');
    link.setAttribute('download', 'dgd.pdf');
    document.body.appendChild(link);
    link.click();
    link.remove();
  }

  downloadDGDGen() {
    const link = document.createElement('a');
    link.setAttribute('target', '_blank');
    link.setAttribute('href', '../../assets/dgd-generic.pdf');
    link.setAttribute('download', 'dgd.pdf');
    document.body.appendChild(link);
    link.click();
    link.remove();
  }
  protected readonly localStorage = localStorage;
}
