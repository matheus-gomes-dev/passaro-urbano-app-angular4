import { Component, OnInit } from '@angular/core';
import { OfertasService } from '../ofertas.service';
import { Oferta } from '../shared/oferta.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [OfertasService]
  //forma correta de trabalhar com services é fazendo a declaração no providers
  //dessa forma o serviço fica disponível para todos os componentes filhos de home
  //se tivesse declarado no app.module.ts, serviço estaria disponível globalmente, já
  //que todas as classes são filhas de app
})
export class HomeComponent implements OnInit {

  public ofertas: Array<Oferta>

  constructor(private ofertasService: OfertasService) {}

  ngOnInit() {
  	this.ofertas = this.ofertasService.getOfertas();
  	console.log(this.ofertas)
  }

}
