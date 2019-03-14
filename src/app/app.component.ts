import {Component, OnInit} from '@angular/core';
import {UserService} from './user-service/user.service';
import {throwError} from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  /**
   * An object representing the user for the login form
   */
  public user: any;
  public itineraries: any;

  constructor(private _itineraryService: ItineraryService, private _userService: UserService) { }

  ngOnInit() {
    this.getItineraries();
    this.new_itinerary = {};
    this.user = {
        username: '',
        password: ''
    };
  }

  login() {
    this._userService.login({'username': this.user.username, 'password': this.user.password});
  }

  refreshToken() {
    this._userService.refreshToken();
  }

  logout() {
    this._userService.logout();
  }

  getItineraries() {
    this._itineraryService.list().subscribe(
        // the first argument is a function which runs on success
        data => {
          this.itineraries = data;
        },
        // the second argument is a function which runs on error
        err => console.error(err),
        // the third argument is a function which runs on completion
        () => console.log('done loading posts')
    );
  }

  createItinerary() {
      this._itineraryService.create(this.new_itinerary, this.user.token).subscribe(
         data => {
           // refresh the list
           this.getItineraries();
           return true;
         },
         error => {
           console.error('Error saving!');
           return throwError(error);
         }
      );
  }

}
