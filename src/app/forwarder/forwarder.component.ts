import { Component, Output, EventEmitter } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {formatDate} from "@angular/common";
import {DomSanitizer} from "@angular/platform-browser";

@Component({
  selector: 'app-forwarder',
  templateUrl: './forwarder.component.html',
  styleUrls: ['./forwarder.component.css']
})
export class ForwarderComponent {
  @Output() finished = new EventEmitter<string>();
  awb_active = false;
  dgd_active = false;
  awb_clicked = false;
  dgd_clicked = false;

  dgd_selected = false;

  awbForm: FormGroup;
  dgdForm: FormGroup;

  dgdName = '';
  awbName = '';
  dgd_error = '';
  awb_error = '';

  dgd_list = [{'key': '32423'}];

  storage_key = Math.floor(Math.random() * 10000).toString()
  timestamp = formatDate(new Date(), 'dd-MM-yyyy hh:mm', 'en-UK');

  fileUrl : any;

  constructor() {
    localStorage.setItem('dtm' + this.storage_key, this.timestamp)

    this.awbForm = new FormGroup({
      handling: new FormControl(false, Validators.requiredTrue),
      natureAndQuantity: new FormControl(false, Validators.requiredTrue),
      signature: new FormControl(false, Validators.requiredTrue),
      file: new FormControl('', Validators.required)
    });

    this.dgdForm = new FormGroup({
      awb: new FormControl(false, Validators.requiredTrue),
      departure: new FormControl(false, Validators.requiredTrue),
      destination: new FormControl(false, Validators.requiredTrue),
      file: new FormControl('', Validators.required)
    });

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
        this.dgdForm.controls['file'].setValue('')
        localStorage.setItem('dgd' + this.storage_key, '')
        this.dgd_error = 'Invalid file type.'
      }
    }
  }

  onAWBSelected(event: any) {
    const file:File = event.target.files[0];
    this.awb_error = ''

    if (file) {
      let file_type = file.name.split('.').pop();
      if (file_type == 'pdf') {
        this.awbName = file.name;

        let blob = new Blob([file], {
          type: 'application/pdf'
        });

        const reader = new FileReader();
        reader.onload = () => {
          if (typeof reader.result === "string") {
            localStorage.setItem('awb' + this.storage_key, reader.result);
          }
        }
        reader.readAsDataURL(blob);

      }
      else {
        this.awbName = file.name;
        this.awbForm.controls['file'].setValue('')
        localStorage.setItem('awb' + this.storage_key, '')
        this.awb_error = 'Invalid file type.'
      }
    }
  }

  select_dgd(key: string) {
    let dgdKey = 'dgd' + key;
    let raw_string = localStorage.getItem(dgdKey)

    if(raw_string != null) {
      this.dgd_selected = true;
      console.log(raw_string)
      const blob = this.dataURItoBlob(localStorage.getItem(dgdKey))
      //const blob = new Blob([raw_string], {
      //  type: 'application/pdf'
      //});
      let a = document.createElement('a');
      a.href = URL.createObjectURL(blob);
      a.download = dgdKey+'.pdf';
      a.click();
    }
  }


  dataURItoBlob(dataURI: any) {
    // convert base64 to raw binary data held in a string
    let byteString = atob(dataURI.split(',')[1]);

    // separate out the mime component
    let mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

    // write the bytes of the string to an ArrayBuffer
    let arrayBuffer = new ArrayBuffer(byteString.length);
    let _ia = new Uint8Array(arrayBuffer);
    for (let i = 0; i < byteString.length; i++) {
      _ia[i] = byteString.charCodeAt(i);
    }

    let dataView = new DataView(arrayBuffer);
    let blob = new Blob([dataView], { type: mimeString });
    return blob;
  }


  confirmAWB() {
    if (this.awbForm.valid) {
      this.dgd_active = false;
      this.awb_active = false;
    }
    else {
      this.awb_clicked;
    }

  }
  confirmDGD() {
    if (this.dgdForm.valid) {
      this.dgd_active = false;
      this.awb_active = false;
    }
    else {
      this.dgd_clicked;
    }

  }

  activate_awb() {
    this.dgd_active = false;
    this.awb_active = true;
    this.awb_clicked = false;
  }

  activate_dgd() {
    this.dgd_selected = false;
    this.dgd_active = true;
    this.awb_active = false;
    this.dgd_clicked = false;

    this.dgd_list = [];

    for(let item in localStorage) {
      if(item.substring(0,3) == 'dgd') {
        this.dgd_list.push({'key': item})
      }
    }
  }

  finishForm() {
    this.finished.emit('done');
  }

  protected readonly localStorage = localStorage;
}
