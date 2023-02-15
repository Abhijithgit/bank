import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  currentName: any
  currentAcno: any
  userDetails:any

  constructor() {
    this.getData()
  }

  // userDetails: any = {
  //   1000: { acno: 1000, username: "Anu", password: "abc123", balance: 0, transaction: [] },
  //   1001: { acno: 1000, username: "Amal", password: "abc123", balance: 0, transaction: [] },
  //   1002: { acno: 1000, username: "Arun", password: "abc123", balance: 0, transaction: [] },
  //   1003: { acno: 1000, username: "Akhil", password: "abc123", balance: 0, transaction: [] }
  // }

  saveData(){
    if(this.userDetails){
      localStorage.setItem("database",JSON.stringify(this.userDetails))
    }
    if(this.currentAcno){
      localStorage.setItem("currentAcno",JSON.stringify(this.currentAcno))
    }
    if(this.currentName){
      localStorage.setItem("currentName",this.currentName)
    }
  }

  getData(){
    if(localStorage.getItem('database')){
      this.userDetails=JSON.parse(localStorage.getItem('database') || "")
    }
    if(localStorage.getItem('currentAcno')){
      this.currentAcno=JSON.parse(localStorage.getItem('currentAcno') || "")
    }
    if(localStorage.getItem('currentName')){
      this.currentName=localStorage.getItem('currentName')
    }
  }

 


  register(user: any, pass: any, acno: any) {

    var userDetails=this.userDetails

    if (acno in userDetails) {

      return false
    }
    else {

      this.userDetails[acno] = { acno: acno, username: user, password: pass, balance: 0, transactions:[]}
      console.log(this.userDetails);
      
      this.saveData() //save user data in local storage

      return true

    }

  }

  login(acno: any, pass: any) {

    var userDetails = this.userDetails

    if (acno in userDetails) {

      if (pass == userDetails[acno]["password"]) {
        this.currentName = userDetails[acno]["username"]
        this.currentAcno = acno

        this.saveData()

        return true


      } else {
        return false
      }

    } else {
      return false
    }

  }

  deposit(acnum: any, password: any, amount: any) {

    let userDetails = this.userDetails
    var amnt = parseInt(amount) //to convert string value into integer value

    if (acnum in userDetails) {
      if (password == userDetails[acnum]["password"]) {

        userDetails[acnum]["balance"] += amnt // update balance

        //store transaction data
        userDetails[acnum]["transaction"].push({ Type: "CREDIT", amount: amnt })

        this.saveData()

        return userDetails[acnum]["balance"] //return current balance

      }
      else {
        return false
      }
    }
    else {
      return false
    }

  }

  withdraw(acnum: any, password: any, amount: any) {

    let userDetails = this.userDetails
    var amnt = parseInt(amount) //to convert string value into integer value

    if (acnum in userDetails) {
      if (password == userDetails[acnum]["password"]) {

        if (amnt <= userDetails[acnum]["balance"]) {
          userDetails[acnum]["balance"] -= amnt // update balance

          //store transaction data
          userDetails[acnum]["transaction"].push({ Type: "DEBIT", amount: amnt })

          this.saveData()


          return userDetails[acnum]["balance"] //return current balance


        } else {
          alert("insufficient Balance")
          return false
        }

      }
      else {
        alert("incorrect Password")
        return false
      }
    }
    else {
      alert("incorrect Account Number")
      return false
    }

  }
  getTransaction(acno: any) {

    var userDetails=this.userDetails
    this.saveData()

    return userDetails[acno]["transaction"]
  }
  

}


