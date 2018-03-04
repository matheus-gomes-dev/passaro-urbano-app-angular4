import { ItemCarrinho } from './shared/item-carrinho.model'
import { Oferta } from './shared/oferta.model'

class CarrinhoService{
	public itens: ItemCarrinho[] = []

	public exibirItens(): ItemCarrinho[]{
		return this.itens
	}

	public incluirItem(oferta: Oferta): void {
		console.log('Oferta recebida no serviço: ', oferta)
		let itemCarrinho: ItemCarrinho = new ItemCarrinho(
			oferta.id,
			oferta.imagens[0],
			oferta.titulo,
			oferta.descricao_oferta,
			oferta.valor,
			1
		)

		//verificar se o item não consta no carrinho
		let itemCarrinhoEncontrado = this.itens.find((item: ItemCarrinho) => item.id === itemCarrinho.id)
		if(itemCarrinhoEncontrado)
			itemCarrinhoEncontrado.quantidade += 1
		else
			this.itens.push(itemCarrinho)
	}
}

export { CarrinhoService }