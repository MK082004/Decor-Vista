import { Component, OnInit } from '@angular/core';

interface User {
  clientName: string;
  projectName: string;
  clientEmail: string;
}

@Component({
  selector: 'app-designer-dashboard',
  templateUrl: './designer-dashbaord.component.html',
  styleUrls: ['./designer-dashbaord.component.css']
})
export class DesignerDashbaordComponent implements OnInit {

  // Dummy data for portfolio
  portfolioCount: number = 12;
  appointmentsCount: number = 5;
  reviewsCount: number = 23;

  // Define columns to display in the table
  displayedColumns: string[] = ['serialNo', 'clientName', 'projectName', 'email'];

  // Data source for the users table
  userDataSource: User[] = [
    { clientName: 'John Doe', projectName: 'Home Decor', clientEmail: 'john@example.com' },
    { clientName: 'Jane Smith', projectName: 'Decor Interior', clientEmail: 'jane@example.com' },
    { clientName: 'Mike Johnson', projectName: '3d Home Decor', clientEmail: 'mike@example.com' },
  ];

  constructor() { }

  ngOnInit(): void { }

}
