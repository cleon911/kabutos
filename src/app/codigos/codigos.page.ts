import { Component, OnInit } from '@angular/core';
import { PerfilService } from '../servicios/perfil.service';
import { CodigosService } from '../servicios/codigos.service';
import { LoadingController } from '@ionic/angular';
import { IncorrectoPage } from '../aviso/incorrecto/incorrecto.page';
import { CorrectoPage } from '../aviso/correcto/correcto.page';
import { NavController,ModalController } from '@ionic/angular';
import { FileUploader } from 'ng2-file-upload';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { finalize } from 'rxjs/operators';
import { AnimationOptions } from '@ionic/angular/providers/nav-controller';
import { database } from 'firebase';



@Component({
  selector: 'app-codigos',
  templateUrl: './codigos.page.html',
  styleUrls: ['./codigos.page.scss'],
  
})
export class CodigosPage implements OnInit {

  public fileUploader: FileUploader = new FileUploader({});
  formData = new FormData();
  perfil:any;
  codigo: any;
  loading: any;


  constructor(
    private storage: Storage,
    public perfilService: PerfilService,
    public codigosService: CodigosService,
    public loadingCtrl: LoadingController,
    public modalController: ModalController,
    
    private navCtrlr: NavController, private router: Router
  ) {

    this.storage.get('perfil').then((val)=>{
      if(val!=null){
        this.perfil=val;
      }
    });

  }
  ngOnInit() {
    
  }

  atras(){
    let animations:AnimationOptions={
      animated: true,
      animationDirection: "back"
    }
    this.navCtrlr.back(animations)
  }

  

  async showLoading2() {
    this.loading = await this.loadingCtrl.create({
      message: 'Loading.....'
    });
    await this.loading.present();
  }

  async mensajeIncorrecto(titulo:string,mensaje:string){
    const modal = await this.modalController.create({
      component: IncorrectoPage,
      cssClass: 'IncorrectoProducto',
      componentProps: {
        'titulo': titulo,
        'mensaje': mensaje
        }
      });
      return await modal.present();
  }

  async mensajeCorrecto(titulo:string,mensaje:string){
    const modal = await this.modalController.create({
      component: CorrectoPage,
      cssClass: 'CorrectoProducto',
      componentProps: {
        'titulo': titulo,
        'mensaje': mensaje
        }
      });
      return await modal.present();
  }

  canjear(form){
    let Data = {"codigo": form.value.codigo, "id_cliente":this.perfil.id}
    this.codigosService.getCodigos(Data).subscribe(
      data => {
        console.log(Data)
        if(data.valid == "NO"){
          this.mensajeIncorrecto('Código incorrecto','El código ingresado no es válido, ingrese otro código')
        }
        else if (data.valid == "OK"){
          this.mensajeCorrecto('Código canjeado', 'Encontrará el premio en la sección de cupones')
        }
        else if (data.valid == "talvez"){
          this.mensajeIncorrecto('Código ya canjeado','Ya has canjeado este código anteriormente')
        }
      })
    //this.enviarForm(formData)
  }
}