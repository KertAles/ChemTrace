import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-local-storage',
  templateUrl: './local-storage.component.html',
  styleUrls: ['./local-storage.component.css']
})
export class LocalStorageComponent {
  @Output() finished = new EventEmitter<string>();

  dgd_list = [{'key': '32423'}];
  img_list = [{'key': '32423'}];
  dgc_list = [{'key': '32423'}];
  awb_list = [{'key': '32423'}];

  constructor() {
    this.dgd_list = [];

    for(let item in localStorage) {
      if(item.substring(0,3) == 'dgd') {
        this.dgd_list.push({'key': item})
      }
    }

    this.img_list = [];

    for(let item in localStorage) {
      if (item.substring(0, 3) == 'img') {
        this.img_list.push({'key': item})
      }
    }


    this.dgc_list = [];

    for(let item in localStorage) {
        if(item.substring(0,3) == 'dgc') {
          this.dgc_list.push({'key': item})
        }
    }

    this.awb_list = [];

    for(let item in localStorage) {
      if(item.substring(0,3) == 'awb') {
        this.awb_list.push({'key': item})
      }
    }

  }

  finishForm() {
    this.finished.emit('done');
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

  select_dgd(key: string) {
    let dgdKey = 'dgd' + key;
    let raw_string = localStorage.getItem(dgdKey)

    if(raw_string != null) {
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

  select_dgc(key: string) {
    let dgcKey = 'dgc' + key;
    let raw_string = localStorage.getItem(dgcKey)

    if(raw_string != null) {
      const blob = this.dataURItoBlob(localStorage.getItem(dgcKey))
      //const blob = new Blob([raw_string], {
      //  type: 'application/pdf'
      //});
      let a = document.createElement('a');
      a.href = URL.createObjectURL(blob);
      a.download = dgcKey+'.pdf';
      a.click();
    }
  }

  select_awb(key: string) {
    let awbKey = 'awb' + key;
    let raw_string = localStorage.getItem(awbKey)

    if(raw_string != null) {
      const blob = this.dataURItoBlob(localStorage.getItem(awbKey))
      //const blob = new Blob([raw_string], {
      //  type: 'application/pdf'
      //});
      let a = document.createElement('a');
      a.href = URL.createObjectURL(blob);
      a.download = awbKey+'.pdf';
      a.click();
    }
  }


  select_img(key: string) {
      let imgKey = 'img' + key;
      let raw_string = localStorage.getItem(imgKey)

      if (raw_string != null) {
        const blob = this.dataURItoBlob(localStorage.getItem(imgKey))
        //const blob = new Blob([raw_string], {
        //  type: 'application/pdf'
        //});
        let a = document.createElement('a');
        a.href = URL.createObjectURL(blob);
        a.download = imgKey + '.png';
        a.click();
      }
  }


  protected readonly localStorage = localStorage;
}
