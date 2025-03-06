import { Component, Input, OnChanges } from '@angular/core';
import { SubmissionService } from '../submission.service';
import { StatusSubmission, Submission } from '../submission.model';
import * as moment from 'moment';

declare const L: any;

@Component({
  selector: 'app-submission-map',
  templateUrl: './submission-map.component.html',
  styleUrls: ['./submission-map.component.css']
})
export class SubmissionMapComponent implements OnChanges {
  @Input() filter: string = '';
  @Input() filterFormBy: string = '';
  @Input() filterStatusBy: string = '';
  @Input() filterDate: string = '';
  submissions!: Submission[];

  constructor(
    private submissionService: SubmissionService,
  ) {
  }

  ngOnChanges(): void {
    if (!navigator.geolocation) {
      console.log("Location not supported")
    }
    navigator.geolocation.getCurrentPosition(position => {
      const coords = position.coords;
      const latLong = [coords.latitude, coords.longitude];
      let map = L.map('map').setView([51.505, -0.09], 13);
      L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        id: 'mapbox/streets-v11',
        tileSize: 512,
        zoomOffset: -1,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
      }).addTo(map);

      let marker = L.marker(latLong).addTo(map);

      marker.bindPopup('<b>Hi</b>').openPopup();

      let popup = L.popup()
        .setLatLng(latLong)
        .setContent('<img src="assets/icons/markMap.svg">')
        .openOn(map);
    })

    this.submissionService.read().subscribe((customArray: Submission[]) => {
      let elements = customArray;
      elements.map(e => {
        if (e.dueDate) {
          const dateCreated = moment(e.dueDate)
          e.dueDateFormated = dateCreated.format("MMM DD, H:m A");
        }
        const status = StatusSubmission.find(s => s.status === e.status);
        e.statusName = status ? status.description : '';
      })
      if (this.filter !== '') {
        elements = customArray.filter((d: any) => {
          return d.task.concat(
            d.from,
            d.to,
            d.customerAddress,
            d.dueDate,
            d.status.toString()
          ).toLowerCase()
            .includes(this.filter.toString().toLowerCase())
        });
      }
      if (this.filterStatusBy !== '') {
        elements = customArray.filter((d: Submission) => {
          return d.status === parseInt(this.filterStatusBy)
        });
      }
      if (this.filterDate !== '' && this.filterDate !== "Invalid date") {
        elements = customArray.filter(d => {
          const data = moment(d.dueDate).format("MMM DD, YYYY");
          const dateFormated = moment(this.filterDate).format("MMM DD, YYYY")
          if (data === dateFormated) {
            return d;
          }
          return false
        });
      }
      this.submissions = elements;
    })
  }

  watchPosition() {
    let desLat = 0;
    let desLon = 0;
    let id = navigator.geolocation.watchPosition(
      (position) => {
        console.log(
          `lat: ${position.coords.latitude}, lon: ${position.coords.longitude}`
        );
        if (position.coords.latitude === desLat) {
          navigator.geolocation.clearWatch(id);
        }
      },
      (err) => {
        console.log(err);
      },
      {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0,
      }
    );
  }
}
