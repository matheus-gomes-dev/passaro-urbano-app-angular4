import { Pipe, PipeTransform } from '@angular/core'

//@Pipe para informar o angular que a classe é um Pipe
@Pipe({ 
	name: 'descricaoReduzida'
})
export class DescricaoReduzida implements PipeTransform{
	transform(texto: string){ //transform é um método de pipe
		if(texto.length > 15){
			return texto.substr(0, 15) + '...'
		}
		return texto
	}
}