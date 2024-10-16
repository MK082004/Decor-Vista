import { Component, OnInit } from '@angular/core';

// Define an interface for log entries
interface UserLog {
  date: string;
  action: string;
}

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css']
})
export class UserDashboardComponent implements OnInit {

  // Dummy data for favorites and log count
  favoritesCount: number = 8;
  logCount: number = 15;

  // Define columns to display in the user log table
  displayedColumns: string[] = ['date', 'action'];

  // Data source for the user log table
  userLogDataSource: UserLog[] = [
    { date: '2024-09-22', action: 'Added item to favorites' },
    { date: '2024-09-21', action: 'Logged in' },
  ];

  constructor() { }

  ngOnInit(): void {
    // Initialization logic can go here
  }

}
