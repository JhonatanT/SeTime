export function convertFormatPreco(preco: number) {
    const Precos_convert = 'R$ ' + preco + ",00" //Math.floor() arredonda o resultado de uma conta para baixo
    return Precos_convert;
}