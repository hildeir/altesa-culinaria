window.onload = inicia;
function inicia(){
	sessionStorage.removeItem("dados");
	let pm = sessionStorage.getItem("pm");
	let pf = sessionStorage.getItem("pf");
    let cliente = sessionStorage.getItem("dadosCliente");
    let entrega = sessionStorage.getItem("dadosEntrega");
	if(pm == null && pf == null){
		location.href = "/sitetair";
	}else if(pm == "" && pf == ""){
		location.href = "/sitetair";
	}else if(cliente == null && entrega == null){
        location.href = "/sitetair";
    }else if(cliente == "" && entrega == ""){
        location.href = "/sitetair";
    }else{
        exibir();
    }
	document.querySelector(".voltar").addEventListener("click",()=>{
		location.href = "etapa2.html";
	});
	document.querySelector(".enviar").addEventListener("click",()=>{
		enviar();
	});
}
function exibir(){
    const dadosCliente = JSON.parse(sessionStorage.getItem("dadosCliente"));
    const dadosEntrega = JSON.parse(sessionStorage.getItem("dadosEntrega"));
    const total = parseInt(sessionStorage.getItem("valorTotal"));

    const cliente = document.querySelector(".dados-cliente");
    cliente.innerHTML = "<b>nome:</b> <br/>"+
                        dadosCliente.nome +"<br/>"+
                       "<b>email:</b> <br/>"+
                       dadosCliente.email +"<br/>"+
                       "<b>telefone:</b> <br/>"+
                       dadosCliente.phone +"<br/>";

    const entrega = document.querySelector(".dados-entrega");
    entrega.innerHTML = "<b>regiao:</b> <br/>"+
                        dadosEntrega.regiao +"<br/>"+
                        "<b>Endereço:</b> <br/>"+
                        dadosEntrega.ende +"<br/>"+
                        "<b>numero:</b> <br/>"+
                        dadosEntrega.numero +"<br/>"+
                        "<b>Complemento:</b> <br/>"+
                        dadosEntrega.complemento +"<br/>";
    document.querySelector(".total").innerHTML = `Valor total R$:${total.toFixed(2)}`;

}
function enviar(){
    const dadosCliente = JSON.parse(sessionStorage.getItem("dadosCliente"));
    const dadosEntrega = JSON.parse(sessionStorage.getItem("dadosEntrega"));
    let total = parseInt(sessionStorage.getItem("valorTotal"),10).toFixed(2);
    let pedidoMontado = "";
    let pedidoPratoFeito = '';
    if(sessionStorage.getItem('pm') != null){
        let pratos = sessionStorage.getItem("pm");
        let pratosArray = pratos.split("-");
        pratosArray.map((ele)=>{
            let obj = JSON.parse(ele);
            let idInt = parseInt(obj.id,10);
            if(idInt == jsonMontarPratos[idInt].id){
                pedidoMontado += jsonMontarPratos[idInt].nome+" quant:"+obj.quantidade+"; ";
            }
           
        });
    
    }
   
    if(sessionStorage.getItem('pf') != null){
        let pratos = sessionStorage.getItem("pf");
        let pratosArray = pratos.split("-");
        pratosArray.map((ele)=>{
            let obj = JSON.parse(ele);
            let idInt = parseInt(obj.id,10);
            if(idInt == jsonMontarPratos[idInt].id){
                pedidoPratoFeito += jsonMontarPratos[idInt].nome+" quant:"+obj.quantidade+"; ";
            }
           
        });
    
    }
    let cliente = `Nome:${dadosCliente.nome}; email:${dadosCliente.email}; telefone:${dadosCliente.phone}`;
    let entrega = `Região:${dadosEntrega.regiao}; endereço:${dadosEntrega.ende}; Numero:${dadosEntrega.numero}; complemento:${dadosEntrega.complemento}`;
    
    let texto = "DADOS DO PEDIDO PRATO MONTADO:"+pedidoMontado+"PEDIDO PRATO FEITOS:"+pedidoPratoFeito+"DADOS DO CLIENTE:"+cliente+"DADOS DE ENTREGA:"+entrega+"total:"+total;
    let url = "https://api.whatsapp.com/send?phone=5521968180811&text="+texto;
    sessionStorage.clear();
    location.href = url;
}
