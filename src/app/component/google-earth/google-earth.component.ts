import { Component, OnInit, ViewChild } from '@angular/core';
import { AcEntity, AcLayerComponent, MapsManagerService } from 'angular-cesium';
import { CesiumService } from 'angular-cesium';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { MockDataProviderService } from './plane.service';
import { of } from 'rxjs';

export enum ActionType {
  ADD_UPDATE,
  DELETE
}

export class AcNotification {
	id?: number;
	entity?: AcEntity;
	actionType: ActionType;
}

@Component({
  selector: 'app-google-earth',
  templateUrl: './google-earth.component.html',
  styleUrls: ['./google-earth.component.css'],
  providers: [
    CesiumService,MapsManagerService
  ],
})

export class GoogleEarthComponent implements OnInit {
  @ViewChild(AcLayerComponent, { static: false }) layer: AcLayerComponent;
  file: any
  /***** */
  Cesium = Cesium;
  entities$:Observable<AcNotification[]>;
  show = true;
   acEntity$ : any

  constructor(private dataProvider: MockDataProviderService) {
  }
  fileChanged($event) {
    this.file = $event.target.files[0];
    this.dataProvider.parseDocument(this.file);

  }


  ngOnInit() {

    this.entities$ = of(this.dataProvider.getDataSteam$());


        // this.entities$ =  this.entities$.pipe(map(entity => (

        //   {
        //   id: id,
        //   actionType: ActionType.ADD_UPDATE,
        //   entity: entity,
        // })));
        console.log(this.entities$);
  }
  setShow($event: boolean) {
    this.show = $event;
  }
  getColor(plane) {
    return Cesium.Color.Green;
    }

}
