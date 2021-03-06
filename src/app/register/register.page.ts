import { Component, OnInit } from '@angular/core';
import { NavController, AlertController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  public firstname: string;
  public lastname: string;
  public email: string;
  public password: string;
  
  constructor(
    private navCtrl: NavController,
    private httpClient: HttpClient,
    private alertCtrl: AlertController
  ) { }

  ngOnInit() {
  }

  goToHome() {
    var user = {
      firstname: this.firstname,
      lastname: this.lastname,
      email: this.email,
      password: this.password,
      role: "user"
    };
    
    this.httpClient
      .post("http://localhost:3000/users", user)
      .subscribe(
        (response: any) => {
          console.log(response);
          const userId = response.id;
          localStorage.setItem("user_id", userId);
          this.navCtrl.navigateForward('tabs/tab1');
        },
        async (err) => {
          console.log(err);
          const alert = await this.alertCtrl.create({
            header: 'Alert',
            subHeader: 'This email has already been used',
            message: err.message,
            buttons: ['OK']
          });
          
          await alert.present();
        }
      );
  }

  goToLogin() {
    this.navCtrl.navigateForward('');
  }

}
