export class GraficaData{
    private meses: string[] = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio'];
    private valores: number[] = [1,2,3,4,5,6,7];
    constructor() {

    }
    getDataGrafica(){
        return [
            { data: this.valores, label: 'Ventas' },
        ]
    }
    incrementarValor(mes:string, valor:number) {
        mes = mes.toLocaleLowerCase().trim();
        // en la i se pasa el indice
        for(let i in this.meses){
            if (this.meses[i] === mes ) {
                this.valores[i] += valor;
            }
        }
        return this.getDataGrafica();
    }
}