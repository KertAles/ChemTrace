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

  constructor() { }


  load_UN_numbers(): UN_number[]  {
    return [{ id: 1768, name: 'Acidic liquid' },
            { id: 1864, name: 'Basic liquid' },
            { id: 1993, name: 'Flammable liquid, n.o.s. *'},
            { id: 2048, name: 'Conductive metal'}]
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
