import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  acno=''

  pass=''

  user=''

  constructor(private ds:DataService, private router:Router,private fb:FormBuilder) { }

  registerForm=this.fb.group({
    acno:['',[Validators.required,Validators.pattern('[0-9]+')]],
    user:['',[Validators.required,Validators.pattern('[a-zA-Z]+')]],
    pass:['',[Validators.required,Validators.pattern('[0-9a-zA-Z]+')]]
  })

  ngOnInit(): void {
    
  }

  register(){
    
    
    var acno=this.registerForm.value.acno
    var user= this.registerForm.value.user
    var pass=this.registerForm.value.pass
  if(this.registerForm.valid){
    const result=this.ds.register(user,pass,acno)

    if(result){

      alert("Your Account has been Registered.")
      this.router.navigateByUrl("")

    }
    else
    {

      alert("Account Number already exists")
    
    }
    
    
  }else{
    alert("Invalid Form")
  }
}

}

