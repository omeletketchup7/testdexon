import { Component,OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-detailpage',
  templateUrl: './detailpage.component.html',
  styleUrl: './detailpage.component.css'
})
export class DetailpageComponent implements OnInit{
  idR:any;
  selectedData: any;
  constructor(
    private route:ActivatedRoute
  ) {}


  mockData: any = [
    {
      id:1,
      line_number: "6-PL-J4N-01007",
      location: "Dacon A",
      from: "BLACK STARTCOOLED WELL FLUID FROM MDPP",
      to: "TEST SEPARATOR,V-0111",
      drawing_number: "MDA-D-B-26001-1-0-Rev00-2011",
      service: "PL",
      material: "Duplex Stainless Steel",
      inservice_date: new Date("2020-01-01"),
      pipe_size: 6,
      original_thickness: 7.1,
      stress: 20000,
      joint_efficiency: 1,
      ca: 3,
      design_life: 25,
      design_pressure: 1015,
      operating_pressure: 327,
      design_temperature: 140,
      operating_temperature: 45
    },
    {
      id:2,
      line_number: "6-PL-J4N-01110",
      location: "Dacon A",
      from: "BLACK STARTCOOLED WELL FLUID FROM MDPP ",
      to: "TEST SEPARATOR,V-0111",
      drawing_number: "MDA-D-B-26001-1-0-Rev00-2011",
      service: "PL",
      material: "Duplex Stainless Steel",
      inservice_date: new Date("2020-01-01"),
      pipe_size: 6,
      original_thickness: 7.1,
      stress: 20000,
      joint_efficiency: 1,
      ca: 3,
      design_life: 25,
      design_pressure: 1015,
      operating_pressure: 327,
      design_temperature: 140,
      operating_temperature: 35
    }
  ]



  ngOnInit(): void {
    this.idR = +this.route.snapshot.params['id'];
    this.selectedData = this.mockData.find((item: { id: any; }) => item.id === this.idR);
  }

}
