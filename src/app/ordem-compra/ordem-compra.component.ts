import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms'
import { OrdemCompraService } from '../ordem-compra.service'
import { Pedido } from '../shared/pedido.model'
import { CarrinhoService } from '../carrinho.service' //ja está definido no nivel do app, mas ainda precisamos injetar no construtor

@Component({
  selector: 'app-ordem-compra',
  templateUrl: './ordem-compra.component.html',
  styleUrls: ['./ordem-compra.component.css'],
  providers: [ OrdemCompraService ]
})
export class OrdemCompraComponent implements OnInit {


  @ViewChild('formulario') public form: NgForm //recuperando variavel do html

  public idPedidoCompra: number

  constructor(
  	private ordemCompraService: OrdemCompraService,
  	private carrinhoService: CarrinhoService
  ) { }

  ngOnInit() {
    console.log('Array de itens do carrinho (ordem-compra): ', this.carrinhoService.exibirItens())
  }

  public confirmarCompra(formulario: NgForm): void {
  	console.log(this.form.value)
  	let pedido: Pedido = new Pedido(
  		this.form.value.endereco,
  		this.form.value.numero,
  		this.form.value.complemento,
  		this.form.value.formaPagamento
  	)
  	this.ordemCompraService.efetivarCompra(pedido)
  		.subscribe((idPedido: number) => {
  			console.log("Pedido cadastrado com sucesso! ID do pedido: " + idPedido)
  			this.idPedidoCompra = idPedido
  		})

  }
}
