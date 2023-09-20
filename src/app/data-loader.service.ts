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
            ]
  }


  load_package_types(): PackageType[]  {
    return [{ id: 'a', name: 'Barrel - steel'},
      { id: 'b', name: 'Barrel - aluminium'},
      { id: 'c', name: 'Barrel - plastic'},
      { id: 'd', name: 'Canister - steel'},
      { id: 'e', name: 'Canister - aluminium'},
      { id: 'f', name: 'Canister - plastic'}]
  }

  load_packaging_groups(): PackageType[]  {
    return [{ id: 'I', name: '...'},
      { id: 'II', name: '...'},
      { id: 'III', name: '...'}]
  }


}
