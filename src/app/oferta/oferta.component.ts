import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params} from '@angular/router'
import { Oferta } from '../shared/oferta.model'
import { OfertasService } from '../ofertas.service'
import { CarrinhoService } from '../carrinho.service' //ja está definido no nivel do módulo, mas ainda precisamos injetar no construtor
// import { Observable } from 'rxjs/Observable'
// import { Observer } from 'rxjs/Observer'
// import { Subscription } from 'rxjs/Subscription'
// import 'rxjs/Rx'

@Component({
  selector: 'app-oferta',
  templateUrl: './oferta.component.html',
  styleUrls: ['./oferta.component.css'],
  providers: [ OfertasService ]
})
export class OfertaComponent implements OnInit, OnDestroy {

  // private tempoObservableSubscription: Subscription
  // private meuObservableTesteSubscription: Subscription

  public oferta: Oferta

  constructor(
    private route: ActivatedRoute, 
    private ofertasService: OfertasService,
    private carrinhoService: CarrinhoService
  ) { }

  ngOnInit() {

    this.route.params.subscribe((parametros: Params) => { //
      this.ofertasService.getOfertaPorId(parametros.id)
      .then(( oferta: Oferta ) => {
        this.oferta = oferta
        //console.log(this.oferta)
      })
    })

    /* --- usar o snapshot como foi feito abaixo, faz com que apenas 
    a primeira mudança dos parametros da url seja capturada --- */
    // this.ofertasService.getOfertaPorId(this.route.snapshot.params['id'])
    //   .then(( oferta: Oferta ) => {
    //     this.oferta = oferta
    //     //console.log(this.oferta)
    //   })

    //definindo intervalo para o observable
    // let tempo = Observable.interval(2000)

    // this.tempoObservableSubscription = tempo.subscribe((intervalo: number) => {
    //   console.log(intervalo)
    // })

    //observable (observável) -- analogia como event emitter
    // let meuObservableTeste = Observable.create((observer: Observer<number>) => {
    //   observer.next(1) //executado como primeiro parametro do subscribe
    //   observer.next(3) //executado como primeiro parametro do subscribe
    //   observer.complete() //executado como terceiro parametro do subscribe
    //   observer.error('Erro durante o processo!') //executado como segundo parametro do subscribe
    //   observer.next(3) //executado como primeiro parametro do subscribe
    // })

    //observable (observador) -- analogia com event listener
    // this.meuObservableTesteSubscription = meuObservableTeste.subscribe(
    //   (resultado: number) => console.log(resultado + 10), //primeiro parametro do subscribe
    //   (erro: string) => console.log(erro), //segundo parametro do subscribe
    //   () => console.log('Stream de eventos foi finalizada') //terceiro parametro do subscribe
    // )
  }

  ngOnDestroy() {
    //encerra observables quando sai do escopo da página
    // this.meuObservableTesteSubscription.unsubscribe()
    // this.tempoObservableSubscription.unsubscribe()
  }

  public adicionarItemCarrinho(): void{
    this.carrinhoService.incluirItem(this.oferta)
    console.log(this.carrinhoService.exibirItens())
  }

}
