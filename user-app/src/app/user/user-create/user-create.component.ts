import { Component, OnInit } from '@angular/core';
import { User } from '../user';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.css'],
  providers: [UserService]
})
export class UserCreateComponent implements OnInit {

  id: number;
  user: User;

  userForm: FormGroup;
  private sub: any;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private userService: UserService) { }

  ngOnInit() {

    this.sub = this.route.params.subscribe(params => {
      console.log("Subscriptin to the route!")
      this.id = params['id'];
    });

    this.userForm = new FormGroup({
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required,
        Validators.pattern("[^ @]*@[^ @]*")
      ])
    });

    //If editing the form (id is present in params)
    if (this.id) {
      this.userService.findById(this.id).subscribe(
        user => { // return user from server
          this.id = user.id;
          this.userForm.patchValue({
            firstName: user.firstname,
            lastName: user.lastname,
            email: user.email,
          })
        }, error => {
          console.log(error);
        }
      );
    }

  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  onSubmit(): void {
    if (this.userForm.valid) {
      if (this.id) {
        let user: User = new User(
          this.id,
          this.userForm.controls['firstName'].value,
          this.userForm.controls['lastName'].value,
          this.userForm.controls['email'].value);
        this.userService.saveUser(user).subscribe();
      } else {
        let user: User = new User(null,
          this.userForm.controls['firstName'].value,
          this.userForm.controls['lastName'].value,
          this.userForm.controls['email'].value);
        this.userService.saveUser(user).subscribe();
      }

      this.userForm.reset();
      this.router.navigate(['/user']);
    }
  }

  redirectUserPage() {
    this.router.navigate(['/user']);
  }

}
