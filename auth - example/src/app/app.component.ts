import { StudentsService } from './students.service';
import { Component } from '@angular/core';
import { UserService } from './user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'lecture11-examples';

  userName: string = '';


  onRegister(){
    this.userService.register('test3@mail.com', 'test', 'password').subscribe(d => {
      console.log(d);
    });
  }

  onLogin(){
    this.userService.signIn('test@mail.com', 'password').subscribe(d => {
      console.log(d);
      this.userName = d.user.name;
    })
  }

  onLogout()
  {
    this.userService.signOut();
    this.userName = '';
  }

  getStudents(){
    this.studentService.getStudents().subscribe(d => {
      console.log(d);
    });
  }

  constructor(private userService: UserService, private studentService: StudentsService){

  }
}
