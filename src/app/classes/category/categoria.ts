export interface ResultadoCategorias{
    count:number,
    next:null,
    previous:null,
    results:Categoria[]
}

export interface Categoria{
    name:string,
    url:string
}