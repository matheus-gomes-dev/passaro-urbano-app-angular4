import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms'
import { OrdemCompraService } from '../ordem-compra.service'
import { Pedido } from '../shared/pedido.model'
import { CarrinhoService } from '../carrinho.service' //ja está definido no nivel do app, mas ainda precisamos injetar no construtor
import { ItemCarrinho } from '../shared/item-carrinho.model'
@Component({
  selector: 'app-ordem-compra',
  templateUrl: './ordem-compra.component.html',
  styleUrls: ['./ordem-compra.component.css'],
  providers: [ OrdemCompraService ]
})
export class OrdemCompraComponent implements OnInit {


  @ViewChild('formulario') public form: NgForm //recuperando variavel do html

  public idPedidoCompra: number
  public itensCarrinho: ItemCarrinho[] = []

  constructor(
  	private ordemCompraService: OrdemCompraService,
  	private carrinhoService: CarrinhoService
  ) { }

  ngOnInit() {
    this.itensCarrinho = this.carrinhoService.exibirItens();
    console.log(this.itensCarrinho);
  }

  public confirmarCompra(formulario: NgForm): void {
  	
    if(!this.carrinhoService.exibirItens().length)
      alert("Você não selecionou nenhum item!")
    else{
    	let pedido: Pedido = new Pedido(
    		this.form.value.endereco,
    		this.form.value.numero,
    		this.form.value.complemento,
    		this.form.value.formaPagamento,
        this.carrinhoService.exibirItens()
    	)
    	this.ordemCompraService.efetivarCompra(pedido)
    		.subscribe((idPedido: number) => {
    			console.log("Pedido cadastrado com sucesso! ID do pedido: " + idPedido)
    			this.idPedidoCompra = idPedido
    		})
     }
  }

  public adicionar(item: ItemCarrinho): void{
    this.carrinhoService.adicionarQuantidade(item) //poderia incluir diratamente o método do serviço no template html também
  }

  public diminuir(item: ItemCarrinho): void{
    this.carrinhoService.diminuirQuantidade(item) //poderia incluir diratamente o método do serviço no template html também
  }
}
