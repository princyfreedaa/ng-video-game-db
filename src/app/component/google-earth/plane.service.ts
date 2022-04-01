import { Injectable } from '@angular/core';
import { from, interval, Observable } from 'rxjs';
import { flatMap, map } from 'rxjs/operators';
import { AcEntity, MapsManagerService } from 'angular-cesium';
@Injectable({
  providedIn: 'root'
})
export class AcNotification {
	id: string;
	entity?: AcEntity;
	actionType: ActionType.ADD_UPDATE;
}
export enum ActionType {
  ADD_UPDATE,
  DELETE
}
export class MockDataProviderService {

   staticEntities = [];

  constructor() {}
  parseDocument(file) {
    let fileReader = new FileReader()
    fileReader.onload = async (e: any) => {
      let result = await this.extractGoogleCoords(e.target.result)
      this. staticEntities = this.initRandom(result);
    }
    fileReader.readAsText(file)
  }

  async extractGoogleCoords(plainText) {
    let parser = new DOMParser()
    let xmlDoc = parser.parseFromString(plainText, "text/xml")
    let googlePolygons = []
    let googleMarkers = [];
    let googleco = [];
    let placeMarkName;
    let globArr = [];

    if (xmlDoc.documentElement.nodeName == "kml") {

      for (const item of xmlDoc.getElementsByTagName('Placemark') as any) {
         placeMarkName = item.getElementsByTagName('coordinates')[0].childNodes[0].nodeValue.trim();
      }
      let ans = placeMarkName.split('\n');
      ans.forEach(function(obj){
        globArr.push(obj);
      });

    } else {
      throw "error while parsing"
    }

    return globArr;

  }

  getDataSteam$() {
    return this.staticEntities
  }

  private initRandom(amount) {
    //console.log(amount);
   var lat,long,altitude;
   var globArrVal = [];

  //  "0.96148,43.80815,39.8"
    for (let i = 0; i < amount.length; i++) {

      let ansVal = amount[i].split(',');

       lat = ansVal[0];
       long = ansVal[1];
       altitude = ansVal[2];

      this.staticEntities.push({
        id: i.toString(),
        actionType:ActionType.ADD_UPDATE,
        entity: Cesium.Cartesian3.fromDegrees(lat,long,altitude),
      });
    }
    return this.staticEntities.map(entity => {
      console.log(entity);
      const cartographic = Cesium.Cartographic.fromCartesian(entity.position);
      entity.position = Cesium.Cartographic.toCartesian(cartographic);

      return entity;
    });

  }
}




