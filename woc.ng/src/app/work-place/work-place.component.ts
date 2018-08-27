import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { WorkPlaceService } from './work-place.service';
import { WorkPlace } from './work-place.model';

@Component({
  selector: 'app-work-place',
  templateUrl: './work-place.component.html'
})
export class WorkPlaceComponent implements OnInit {

  @Input() workPlace: WorkPlace;
  // @Output() workPlaceChanged = new EventEmitter<WorkPlace>();

  countryLookup: string[];
  cityLookup: string[];
  locationLookup: string[];


  constructor(private workplaceService: WorkPlaceService) {
  }

  async ngOnInit() {
    // this.workplaceService.GetCountries().toPromise().then(r => {
    //   this.countryLookup = r;
    // });

    this.countryLookup = await this.workplaceService.GetCountries().toPromise();

    if ( this.workPlace.name ) {
      this.cityLookup = await this.workplaceService.GetCitiesByCountry(this.workPlace.country).toPromise();
      this.locationLookup = await this.workplaceService.GetWorkplacesByCountryCity(this.workPlace).toPromise();
    } else {
      this.workPlace.country = this.countryLookup[0];

      this.cityLookup = await this.workplaceService.GetCitiesByCountry(this.workPlace.country).toPromise();
      this.workPlace.city = this.cityLookup[0];
      this.locationLookup = await this.workplaceService.GetWorkplacesByCountryCity(this.workPlace).toPromise();

      this.workPlace.name = this.locationLookup[0];
      const n  = await this.workplaceService.GetWorkplaceByCountryCityWorkPlace(this.workPlace).toPromise();
      // this.workPlace = await this.workplaceService.GetWorkplaceByCountryCityWorkPlace(this.workPlace).toPromise();
      this.emitWorkPlace(n);
    }
  }

  onCountryChanged(country: string) {
    this.workplaceService.GetCitiesByCountry(country).subscribe(cc => {
      this.cityLookup = cc;
      this.workPlace.city = this.cityLookup ? this.cityLookup[0] : '';
      this.onCityChanged(this.workPlace.city);
    });
  }

  onCityChanged(city: string) {
    this.workplaceService.GetWorkplacesByCountryCity(this.workPlace).subscribe(cc => {
      this.locationLookup = cc;
      this.workPlace.name = cc[0];
      this.onWorkPlaceChanged(this.workPlace.name);
    });
  }
  onWorkPlaceChanged(workplacename: string) {
    this.workplaceService.GetWorkplaceByCountryCityWorkPlace(this.workPlace).subscribe(wp => {
      this.emitWorkPlace(wp);
      console.log('WorkPlace: ' + JSON.stringify(this.workPlace));
    });
  }

  convertToOptions(stringArray: string[]) {
    if (!stringArray) {
      return [];
    }
    return stringArray.map(s => <object>{label : s, value : s} );
  }

  private emitWorkPlace(wp: WorkPlace) {
    this.workPlace.id = wp.id;
    this.workPlace.country = wp.country;
    this.workPlace.city = wp.city;
    this.workPlace.name = wp.name;
  }
}

