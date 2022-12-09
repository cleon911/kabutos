import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, LoadingController, ModalController, NavController, NavParams } from '@ionic/angular';
@Component({
  selector: 'app-codigounico',
  templateUrl: './codigounico.page.html',
  styleUrls: ['./codigounico.page.scss'],
})
export class CodigounicoPage implements OnInit {

  titulo = ""
  mensaje = ""
  constructor(public navCtrol: NavController, public navParams: NavParams,private  router:  Router,
    public modalCtrl: ModalController,
    private alert: AlertController,
    private loading: LoadingController) { }

  ngOnInit() {
    this.titulo = this.navParams.get('titulo')
    this.mensaje = this.navParams.get('mensaje')
  }
  salir(){
    this.modalCtrl.dismiss();
  }
  copiar(codigo){
    //console.log("funciona el click",codigo);
    navigator.clipboard.writeText(codigo);
    alert("Copiado al Portapapeles!")
  }

  compartir(){
    console.log("Compartir")
    if (navigator.share){
      navigator.share({
        title: "Te comparto mi codigo de la App de Cabuto's!",
        url:"https://www.instagram.com/cabutos/?hl=es"
      }).then(()=>{
        console.log("Gracias por Compartir")
      }).catch(console.error);
    }
  }

}
