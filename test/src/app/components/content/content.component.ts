import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent implements OnInit {
  private apiUrl = 'http://localhost:3000/INFOs'; // API URL
  mockData: any[] = []; // Array to hold the mapped data
  mockData2: any[] = []; // Array to hold the mapped data
  idnew: any;
  

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadAllDataInfo(); // Fetch and map data on initialization
  }

  // Method to fetch all data from the API
  getAllInfo(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/all`);
  }

  // Load and map data into mockData
  loadAllDataInfo(): void {
    this.getAllInfo().subscribe(
      (response) => {
        // Map the data into the mockData array
        this.mockData = response.map((item) => ({
          id: item._id,
          line_number: item.line_number,
          location: item.location,
          from: item.from,
          to: item.to,
          drawing_number: item.drawing_number,
          service: item.service,
          material: item.material,
          inService_date: item.inservice_date,
          pipe_size: item.pipe_size,
          original_thickness: item.original_thickness,
          stress: item.stress,
          joint_efficiency: item.joint_efficiency,
          ca: item.ca,
          design_life: item.design_life,
          design_pressure: item.design_pressure,
          operating_pressure: item.operating_pressure,
          design_temperature: item.design_temperature,
          operating_temperature: item.operating_temperature
        }));
        this.mockData2=this.mockData;
        console.log(this.mockData); // Log the mapped data for debugging
      },
      (error) => {
        console.error('Error fetching data:', error); // Handle errors
      }
    );
  }

  clickinfo(id:any):void{
    this.idnew=id;
  }

}
