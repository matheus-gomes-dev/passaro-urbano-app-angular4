import { Oferta } from './shared/oferta.model'
import { Http } from '@angular/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs/Observable'
import { URL_API } from './app.api'
import 'rxjs/add/operator/toPromise' //para converter observable para promise
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/retry'


//preciso utilizar @Injectable para injetar um serviço do angular em um serviço
@Injectable() export class OfertasService{

	constructor(private http: Http){} //serviço utilizado precisa constar no construtor

	public getOfertas(): Promise<Oferta[]> {
		return this.http.get(`${URL_API}/ofertas?destaque=true`)
			.toPromise() //método http retorna um observable. Por hora passaremos para promise
			.then((resposta: any) => resposta.json())
	}

	public getOfertasPorCategoria(categoria: string) : Promise<Oferta[]> {
		return this.http.get(`${URL_API}/ofertas?categoria=${categoria}`)
			.toPromise()
			.then((resposta: any) => resposta.json())
	}

	public getOfertaPorId(id: number): Promise<Oferta> {
		return this.http.get(`${URL_API}/ofertas?id=${id}`)
			.toPromise()
			.then((resposta: any) => resposta.json()[0])
	}

	public getComoUsarOfertaPorId(id: number): Promise<string>{
		return this.http.get(`${URL_API}/como-usar?id=${id}`)
			.toPromise()
			.then((resposta: any) => resposta.json()[0].descricao)
	}

	public getOndeFicaOfertaPorId(id: number): Promise<string>{
		return this.http.get(`${URL_API}/onde-fica?id=${id}`)
			.toPromise()
			.then((resposta: any) => resposta.json()[0].descricao)
	}

	public pesquisaOfertas(termo: string): Observable<Oferta[]> {
		return this.http.get(`${URL_API}/ofertas?descricao_oferta_like=${termo}`)
			.retry(10) //tentará fazer consulta 10 vezes caso haja falha
			.map((resposta: any) => resposta.json())

	}
}