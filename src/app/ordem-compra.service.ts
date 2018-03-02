import { Injectable } from '@angular/core' //necessario para injetar um serviço dentro de outro serviço
import { Pedido } from './shared/pedido.model'
import { Http } from '@angular/http'

@Injectable()
export class OrdemCompraService {

	constructor (private http: Http) {}

    public efetivarCompra(pedido: Pedido): void {
        console.log(pedido)
    }
}