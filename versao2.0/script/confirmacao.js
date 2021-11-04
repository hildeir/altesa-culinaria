window.onload = inicia;
function inicia(){
	sessionStorage.removeItem("dados");
	let pf = sessionStorage.getItem("pf");
    let cliente = sessionStorage.getItem("dadosCliente");
    let entrega = sessionStorage.getItem("dadosEntrega");
	
	if(pf == null && cliente == null && entrega == null){
        location.href = "index.html";
	}else if(pf == null && cliente == "" && entrega == ""){
        location.href = "index.html";
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
    const total = parseFloat(sessionStorage.getItem("valorTotal"));
    let pf = sessionStorage.getItem("pf");

    const cliente = document.querySelector(".dados-cliente");
    cliente.innerHTML = "<b>nome:</b> <br/>"+
                        dadosCliente.nome +"<br/>"+
                       "<b>email:</b> <br/>"+
                       dadosCliente.email +"<br/>"+
                       "<b>telefone:</b> <br/>"+
                       dadosCliente.phone +"<br/>";

    const entrega = document.querySelector(".dados-entrega");
    entrega.innerHTML = "<b>Endereço:</b> <br/>"+
                        dadosEntrega.ende +"<br/>"+
                        "<b>numero:</b> <br/>"+
                        dadosEntrega.numero +"<br/>"+
                        "<b>Complemento:</b> <br/>"+
                        dadosEntrega.complemento +"<br/>";
    
    document.querySelector(".total").innerHTML = `R$ ${total.toFixed(2)}`;

    if(pf != null){
        let array = pf.split("-");
        array.map((ele)=>{
            let pfjson = JSON.parse(ele);
            const  pedido = document.querySelector(".dados-pedido-pf");
            pedido.innerHTML += "<b>prato</b><br>"+
                            jsonPratoFeito[pfjson.id].nome+"<br>"+
                            "<b>Quantidade:</b>"+pfjson.quantidade+"<br><br>";
        });
        
    }
    /* quando nao haver pratos oculta a div aonde mostra os pratos */ 
    if(pf == null){
        document.querySelector(".dados-pedido-pf").style.display = "none";
    }
}
function enviar(){
    const dadosCliente = JSON.parse(sessionStorage.getItem("dadosCliente"));
    const dadosEntrega = JSON.parse(sessionStorage.getItem("dadosEntrega"));
    let total = parseFloat(sessionStorage.getItem("valorTotal"));
    let pedidoPratoFeito = '';

    let textoPf = "";
    if(sessionStorage.getItem('pf') != null){
        let pratos = sessionStorage.getItem("pf");
        let pratosArray = pratos.split("-");
        pratosArray.map((ele)=>{
            let obj = JSON.parse(ele);
            let idInt = parseInt(obj.id,10);
            if(idInt == jsonPratoFeito[idInt].id){
                textoPf = "PRATO FEITO: "
                pedidoPratoFeito += jsonPratoFeito[idInt].nome+" quant:"+obj.quantidade+"; ";
            }
           
        });
    
    }
   
    let cliente = `Nome:${dadosCliente.nome}; email:${dadosCliente.email}; telefone:${dadosCliente.phone}`;
    let entrega = `Região:${dadosEntrega.regiao}; endereço:${dadosEntrega.ende}; Numero:${dadosEntrega.numero}; complemento:${dadosEntrega.complemento}`;
    let texto = "DADOS DO PEDIDO:"+textoPf+pedidoPratoFeito+"DADOS DO CLIENTE:"+cliente+" DADOS DE ENTREGA:"+entrega+" TOTAL: "+total.toFixed(2);
    let url = "https://api.whatsapp.com/send?phone=5511990117453&text="+texto;
    
    sessionStorage.clear();//remove todas sessoes
    location.href = url;
}
