export function convertDescricao(descricao_pedido: String) {

    //ARRUMAR ESSA PORCARIA PQP
    if (descricao_pedido == "B-C") {
        const Desc_Convert = "Barba e cabelo";
        return Desc_Convert;
    }
    else if (descricao_pedido == "S-B") {
        const Desc_Convert = "Fazer Barba";
        return Desc_Convert;
    }
    else if (descricao_pedido == "S-C") {
        const Desc_Convert = "Cortar Cabelo";
        return Desc_Convert;
    }

    //esse n existe apagar
    else if (descricao_pedido == "cb") {
        const Desc_Convert = "Cortar Cabelo";
        return Desc_Convert;
    }
}