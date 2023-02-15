import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  user: any

  accountnumber:any

  datedetails:any

  

  constructor(private ds: DataService,private fb:FormBuilder, private router:Router) {
    
    this.user = this.ds.currentName
    this.datedetails=new Date()

  }

  depositForm=this.fb.group({
    acno:['',[Validators.required,Validators.pattern('[0-9]+')]],
    pass:['',[Validators.required,Validators.pattern('[0-9A_Za-z]+')]],
    amnt:['',[Validators.required,Validators.pattern('[0-9]+')]]
  })

  withdrawForm=this.fb.group({
    acno1:['',[Validators.required,Validators.pattern('[0-9]+')]],
    pass1:['',[Validators.required,Validators.pattern('[0-9A_Za-z]+')]],
    amnt1:['',[Validators.required,Validators.pattern('[0-9]+')]]
  })

  ngOnInit(): void {
    if(!localStorage.getItem('currentAcno')){
      alert("Please Log In")
      this.router.navigateByUrl("")
    }
  }

  deposit() {
    var acno = this.depositForm.value.acno
    var pass = this.depositForm.value.pass
    var amnt = this.depositForm.value.amnt

    if(this.depositForm.valid){
    const result = this.ds.deposit(acno, pass, amnt)

    if (result) {
      alert(`Your account has been credited with amount ${amnt}. Your current balance is ${result}`)
    } else {
      alert("Incorrect Account Number or Password")
    }

  }else{
    alert("Invalid Form")
  }
 }

  withdraw() {
    var acno = this.withdrawForm.value.acno1
    var pass = this.withdrawForm.value.pass1
    var amnt = this.withdrawForm.value.amnt1

    if(this.withdrawForm.valid){

    const result = this.ds.withdraw(acno, pass, amnt)

    if (result) {
      alert(`An amount of ${amnt} has been debited from your account. Your current balance is ${result}`)
    }

  }else{
    alert("Invalid Form")
  }
}
logOut(){
  localStorage.removeItem('currentName')
  localStorage.removeItem('currentAcno')
  this.router.navigateByUrl('')

}
deleteParent(){
  this.accountnumber=JSON.parse(localStorage.getItem('currentAcno') || '')
}

cancel(){
  this.accountnumber=''
}
}


