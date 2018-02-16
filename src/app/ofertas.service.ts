import { Oferta } from './shared/oferta.model'
import { Http } from '@angular/http'
import { Injectable } from '@angular/core'

import  'rxjs/add/operator/toPromise' //para converter observable para promise


//preciso utilizar @Injectable para injetar um serviço do angular em um serviço
@Injectable() export class OfertasService{

	constructor(private http: Http){} //serviço utilizado precisa constar no construtor

	public getOfertas(): Promise<Oferta[]> {
		return this.http.get('http://localhost:3000/ofertas?destaque=true')
			.toPromise() //método http retorna um observable. Por hora passaremos para promise
			.then((resposta: any) => resposta.json())
	}

	public getOfertasPorCategoria(categoria: string) : Promise<Oferta[]> {
		return this.http.get(`http://localhost:3000/ofertas?categoria=${categoria}`)
			.toPromise()
			.then((resposta: any) => resposta.json())
	}
}