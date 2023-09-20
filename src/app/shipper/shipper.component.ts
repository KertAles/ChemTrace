import { Component, Output, EventEmitter } from '@angular/core';
import {DataLoaderService, PackageType, UN_number} from "../data-loader.service";
import {map, Observable, startWith} from "rxjs";
import {FormGroup, FormControl, Validators} from '@angular/forms';
import {formatDate} from "@angular/common";

@Component({
  selector: 'app-shipper',
  templateUrl: './shipper.component.html',
  styleUrls: ['./shipper.component.css']
})
export class ShipperComponent {
  @Output() finished = new EventEmitter<string>();

  storage_key = Math.floor(Math.random() * 10000).toString()
  timestamp = formatDate(new Date(), 'dd-MM-yyyy hh:mm', 'en-UK');

  first_valid: boolean = false;
  second_valid: boolean = false;
  third_valid: boolean = false;

  first_clicked: boolean = false;
  second_clicked: boolean = false;
  third_clicked: boolean = false;

  is_cao = true;
  is_pca = false;
  is_safe = false;
  is_dryice = false;
  is_refrigerant = false;

  hazard_class = 3;
  packaging_instr = 364;
  telephone_num = '031 443 589'

  un_nums: UN_number[] = [];
  package_types: PackageType[] = [];
  packaging_groups: PackageType[] = [];


  filteredUN: Observable<any[]>;
  firstForm: FormGroup;
  filteredPackages: Observable<PackageType[]>;
  secondForm: FormGroup;
  thirdForm: FormGroup;

  fileName = '';
  file_error: string = '';
  dgd_error: string = '';
  dgdName: string = '';


  constructor() {
    localStorage.setItem('dtm' + this.storage_key, this.timestamp)

    this.firstForm = new FormGroup({
      unCtrl: new FormControl('', Validators.required),
      isRefrigerant : new FormControl(false),
      properName: new FormControl('', Validators.required),
      amount: new FormControl('', Validators.required),
      volume: new FormControl('', Validators.required),
      material: new FormControl('', Validators.required),
      packagingGroup: new FormControl('', Validators.required)
    });

    this.secondForm = new FormGroup({
      undamaged: new FormControl(false, Validators.requiredTrue),
      unPackage: new FormControl('', Validators.required),
      stickerInfo: new FormControl(false, Validators.requiredTrue),
      stickerCAO: new FormControl(false, Validators.requiredTrue),
      stickerFlam: new FormControl(false, Validators.requiredTrue),
      stickerShipper: new FormControl(false, Validators.requiredTrue),
      stickerConsignee: new FormControl(false, Validators.requiredTrue),
      stickerTel: new FormControl(false, Validators.requiredTrue),
      stickerSideUp: new FormControl(false, Validators.requiredTrue),
      stickerCover: new FormControl(false, Validators.requiredTrue),
      podtlak: new FormControl(false, Validators.requiredTrue),
      file: new FormControl('', Validators.required)
    });

    this.thirdForm = new FormGroup({
      shipperInfo: new FormControl(false, Validators.requiredTrue),
      consigneeInfo: new FormControl(false, Validators.requiredTrue),
      dgdNumbering: new FormControl(false, Validators.requiredTrue),
      planeType: new FormControl(false, Validators.requiredTrue),
      packageProperty: new FormControl(false, Validators.requiredTrue),
      unNumber: new FormControl(false, Validators.requiredTrue),
      properName: new FormControl(false, Validators.requiredTrue),
      hazard: new FormControl(false, Validators.requiredTrue),
      packagingGroup: new FormControl(false, Validators.requiredTrue),
      amount: new FormControl(false, Validators.requiredTrue),
      packagingInstruction: new FormControl(false, Validators.requiredTrue),
      telephone: new FormControl(false, Validators.requiredTrue),
      signature: new FormControl(false, Validators.requiredTrue),
      file: new FormControl('', Validators.required)
    });

    this.filteredUN = this.firstForm.controls['unCtrl'].valueChanges.pipe(
      startWith(''),
      map((un_num) =>
        un_num ? this.filterNumber(un_num) : this.un_nums.slice()
      )
    );

    this.filteredPackages = this.firstForm.controls['material'].valueChanges.pipe(
      startWith(''),
      map((pack_id) =>
        pack_id ? this.filterPackageTypes(pack_id) : this.package_types.slice()
      )
    );
  }

  filterNumber(name: number) {
    let arr = this.un_nums.filter(
      (un_num) => un_num.id.toString().indexOf(name.toString()) === 0
    );
    return arr.length ? arr : [{ id: '', name: 'No Item found' }];
  }

  filterPackageTypes(name: string) {
    let arr = this.package_types.filter(
      (pack_id) => pack_id.id.toLowerCase().indexOf(name.toLowerCase()) === 0
    );
    return arr.length ? arr : [{ id: '', name: 'No Item found' }];
  }

  ngOnInit() {
    let data_loader = new DataLoaderService();

    this.un_nums = data_loader.load_UN_numbers()
    this.package_types = data_loader.load_package_types()
    this.packaging_groups = data_loader.load_packaging_groups()

  }

  onFileSelected(event: any) {
    const file:File = event.target.files[0];
    this.file_error = ''

    if (file) {
      let file_type = file.name.split('.').pop();
      if (file_type == 'jpg' || file_type == 'jpeg' || file_type == 'png') {
        this.fileName = file.name;

        let blob = new Blob([file], {
          type: file.type
        });

        const reader = new FileReader();
        reader.onload = () => {
          if (typeof reader.result === "string") {
            this.secondForm.controls['file'].setValue(this.fileName)
            localStorage.setItem('img' + this.storage_key, reader.result);
          }
        }
        reader.readAsDataURL(blob);

      }
      else {
        this.fileName = file.name;
        this.secondForm.controls['file'].setValue('')
        localStorage.setItem('img' + this.storage_key, '')
        this.file_error = 'Invalid file type.'
      }
    }
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
            this.thirdForm.controls['file'].setValue(this.dgdName)
            localStorage.setItem('dgd' + this.storage_key, reader.result);
          }
        }
        reader.readAsDataURL(blob);

      }
      else {
        this.dgdName = file.name;
        this.thirdForm.controls['file'].setValue('')
        localStorage.setItem('dgd' + this.storage_key, '')
        this.dgd_error = 'Invalid file type.'
      }
    }
  }


  get_first_data_block() {
    this.is_dryice = this.firstForm.controls['unCtrl'].value == 1845 ? true : false
    this.is_refrigerant = this.firstForm.controls["isRefrigerant"].value

    this.is_cao = this.firstForm.controls['unCtrl'].value == 1845 ? false : true
    this.is_safe = this.firstForm.controls['unCtrl'].value == 1845 ? true : false
    this.packaging_instr = this.firstForm.controls['unCtrl'].value == 1845 ? 954 : 364

    let plane_type = this.is_cao ? "Cargo aircraft only " : "Passenger and cargo aircraft"
    let refrigerant = ''

    let volume_label = this.firstForm.controls['unCtrl'].value == 1845 ? ' kg, ' : ' L, '

    if(this.firstForm.controls["unCtrl"].value == 1845) {
      refrigerant = this.firstForm.controls["isRefrigerant"].value ? ', as a refrigerant' : ', as NOT a refrigerant'
    }

    localStorage.setItem('packInfo', this.get_package_info())
    localStorage.setItem('dryice', this.is_dryice ? 'ice' : 'noice')

    return 'UN ' + this.firstForm.controls["unCtrl"].value + ' ' + this.filterNumber(this.firstForm.controls["unCtrl"].value)[0].name +
      ', ' + this.firstForm.controls["properName"].value + refrigerant + '\n' +
      this.firstForm.controls["amount"].value + ' cll' + ', ' + this.firstForm.controls["volume"].value + volume_label +
      this.filterPackageTypes(this.firstForm.controls["material"].value)[0].name + '\n' +
      "PG " + this.firstForm.controls["packagingGroup"].value + '\n' +
      "Packaging instruction " + this.packaging_instr + '\n' +
      plane_type
  }

  get_package_info() {
    let volume_label = this.firstForm.controls['unCtrl'].value == 1845 ? ' kg, ' : ' L, '
    return 'UN ' + this.firstForm.controls["unCtrl"].value + '\n'
      + this.filterNumber(this.firstForm.controls["unCtrl"].value)[0].name + ', '
      + this.firstForm.controls["properName"].value.toUpperCase() + '\n' +
      'Net Qty: ' + this.firstForm.controls["volume"].value + volume_label
  }

  downloadDGD() {
      const link = document.createElement('a');
      link.setAttribute('target', '_blank');
      link.setAttribute('href', '../../assets/dgd.pdf');
      link.setAttribute('download', 'dgd.pdf');
      document.body.appendChild(link);
      link.click();
      link.remove();
  }
  confirmFirst() {
    if (this.firstForm.valid) {
      this.first_valid = true
      this.secondForm.controls['stickerCAO'].setValue(!this.is_cao)
      this.secondForm.controls['stickerFlam'].setValue(this.is_dryice)
      this.secondForm.controls['podtlak'].setValue(!this.is_dryice)
    }
    this.first_clicked = true
  }

  confirmSecond() {
    if (this.secondForm.valid) {
      this.second_valid = true
    }
    this.second_clicked = true
  }

  confirmThird() {
    if (this.thirdForm.valid) {
      this.third_valid = true;
      this.finished.emit('done');
    }
    this.third_clicked = true
  }

}
