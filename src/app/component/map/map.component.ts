import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  constructor(private http: HttpClient) { }

  ngOnInit() {

  }

  title = 'My first AGM project';
  lat = 51.678418;
  lng = 7.809007;



}
