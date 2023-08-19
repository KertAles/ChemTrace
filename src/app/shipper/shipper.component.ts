import { Component } from '@angular/core';
import {DataLoaderService, PackageType, UN_number} from "../data-loader.service";
import {map, Observable, startWith} from "rxjs";
import {FormGroup, FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-shipper',
  templateUrl: './shipper.component.html',
  styleUrls: ['./shipper.component.css']
})
export class ShipperComponent {

  storage_key = Math.floor(Math.random() * 10000).toString()

  first_valid: boolean = false;
  second_valid: boolean = false;
  third_valid: boolean = false;

  first_clicked: boolean = false;
  second_clicked: boolean = false;
  third_clicked: boolean = false;

  is_cao = true;
  is_pca = false;
  is_safe = false;

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
    this.firstForm = new FormGroup({
      unCtrl: new FormControl('', Validators.required),
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
        const formData = new FormData();
        formData.append("thumbnail", file);
        this.secondForm.controls['file'].setValue(this.fileName)

        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
          if (typeof reader.result === "string") {
            localStorage.setItem('img' + this.storage_key, reader.result)
          }
          else {
            localStorage.setItem('img' + this.storage_key, '')
          }
        };

      }
      else {
        this.fileName = file.name;
        this.secondForm.controls['file'].setValue(this.fileName)
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
        const formData = new FormData();
        formData.append("thumbnail", file);
        this.thirdForm.controls['file'].setValue(this.dgdName)

        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
          if (typeof reader.result === "string") {
            localStorage.setItem('dgd' + this.storage_key, reader.result)
          }
          else {
            localStorage.setItem('dgd' + this.storage_key, '')
          }
        };

      }
      else {
        this.dgdName = file.name;
        this.thirdForm.controls['file'].setValue(this.dgdName)
        localStorage.setItem('dgd' + this.storage_key, '')
        this.dgd_error = 'Invalid file type.'
      }
    }
  }


  get_first_data_block() {
    let plane_type = this.is_cao ? "Cargo aircraft only " : "Passenger and cargo aircraft"

    return 'UN ' + this.firstForm.controls["unCtrl"].value + ' ' + this.filterNumber(this.firstForm.controls["unCtrl"].value)[0].name +
      ', ' + this.firstForm.controls["properName"].value + '\n' +
      this.firstForm.controls["amount"].value + ' cll' + ', ' + this.firstForm.controls["volume"].value + ' L, ' +
      this.filterPackageTypes(this.firstForm.controls["material"].value)[0].name + '\n' +
      "PG " + this.firstForm.controls["packagingGroup"].value + '\n' +
      "Packaging instruction " + this.packaging_instr + '\n' +
      plane_type
  }

  get_package_info() {
    return 'UN ' + this.firstForm.controls["unCtrl"].value + '\n'
      + this.filterNumber(this.firstForm.controls["unCtrl"].value)[0].name + ', '
      + this.firstForm.controls["properName"].value.toUpperCase() + '\n' +
      'Net Qty: ' + this.firstForm.controls["volume"].value + ' L'
  }


  confirmFirst() {
    if (this.firstForm.valid) {
      this.first_valid = true
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
      this.third_valid = true
    }
    this.third_clicked = true
  }

}
