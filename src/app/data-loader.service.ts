import { Injectable } from '@angular/core';


export class UN_number {
  constructor(public id: number, public name: string) {}
}

export class PackageType {
  constructor(public id: string, public name: string) {}
}

@Injectable({
  providedIn: 'root'
})
export class DataLoaderService {

  constructor() {

  }

  load_UN_numbers(): UN_number[]  {
    return [{ id: 1845, name: 'Carbon dioxide, solid' },
            { id: 1993, name: 'Flammable liquid, n.o.s. *'},
            { id: 3066, name: 'Paint'},
            { id: 3481, name: 'Lithium ion batteries packed with equipment'}
            ]
  }


  load_package_types(): PackageType[]  {
    return [{ id: 'a', name: 'Barrel - steel'},
      { id: 'b', name: 'Barrel - aluminium'},
      { id: 'c', name: 'Barrel - plastic'},
      { id: 'd', name: 'Jerrican - steel'},
      { id: 'e', name: 'Jerrican - aluminium'},
      { id: 'f', name: 'Jerrican - plastic'}]
  }

  load_packaging_groups(): PackageType[]  {
    return [{ id: 'I', name: '...'},
      { id: 'II', name: '...'},
      { id: 'III', name: '...'}]
  }


}
