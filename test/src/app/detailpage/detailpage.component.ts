import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';

@Component({
  selector: 'app-detailpage',
  templateUrl: './detailpage.component.html',
  styleUrls: ['./detailpage.component.css']
})

export class DetailpageComponent implements OnInit {
  private apiUrlCML = 'http://localhost:3000/CMLs';
  idR: string | null = null; // Ensure idR is a string
  selectedData: any;
  cmlData: any[] = []; // Initialize as an array for multiple CMLs

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    // Retrieve the 'id' from the route
    this.idR = this.route.snapshot.params['id'];

    // Check if the ID exists before making the API call
    if (this.idR) {
      this.getCmlDataById(this.idR); // Fetch data by ID
      console.log('ID from route:', this.idR);
    } else {
      console.error('Error: ID not found in route parameters.');
    }
  }

  getCmlById(id: string): Observable<any[]> {
    // Make the request to the backend and return the array of CMLs
    return this.http.get<any[]>(`${this.apiUrlCML}/get/${id}`).pipe(
      map((responseArray) => {
        if (!responseArray || responseArray.length === 0) {
          throw new Error('No CML data found for the given ID.');
        }
        // Process the array and transform the data as needed
        return responseArray.map(response => ({
          cml_id: response._id,
          cml_number: response.cml_number,
          description: response.cml_description,
          actual_diameter: response.actual_outside_diameter,
          design_thickness: response.design_thickness,
          structural_thickness: response.structural_thickness,
          required_thickness: response.required_thickness,
          line_number: response.info_id?.line_number || 'N/A',
          location: response.info_id?.location || 'N/A',
          material: response.info_id?.material || 'N/A',
          pipe_size: response.info_id?.pipe_size || 'N/A',
          design_pressure: response.info_id?.design_pressure || 'N/A',
          operating_pressure: response.info_id?.operating_pressure || 'N/A',
          design_temperature: response.info_id?.design_temperature || 'N/A',
          operating_temperature: response.info_id?.operating_temperature || 'N/A',
        }));
      })
    );
  }

  getCmlDataById(id: string): void {
    this.getCmlById(id).subscribe(
      (response) => {
        this.cmlData = response; // Store the fetched CML data as an array
        console.log('CML Data:', this.cmlData); // Log the CML data for debugging
      },
      (error) => {
        console.error('Error fetching CML data:', error); // Handle errors
      }
    );
  }
}
