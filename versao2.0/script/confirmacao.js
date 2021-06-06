window.onload = inicia;
function inicia(){
	sessionStorage.removeItem("dados");
	let pm = sessionStorage.getItem("pm");
	let pf = sessionStorage.getItem("pf");
    let pp = sessionStorage.getItem("pp");
    let cliente = sessionStorage.getItem("dadosCliente");
    let entrega = sessionStorage.getItem("dadosEntrega");
	if(pm == null && pf == null && pp == null){
		location.href = "/sitetair";
	}else if(pm == "" && pf == "" && pp == ""){
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
    let pm  = sessionStorage.getItem("pm");
    let pf = sessionStorage.getItem("pf");
    let pp = sessionStorage.getItem("pp");

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
    
    document.querySelector(".total").innerHTML = `R$ ${total.toFixed(2)}`;

    if(pm != null){
        let array = pm.split("-");
        array.map((ele)=>{
            let pmjson = JSON.parse(ele);
            const pedido = document.querySelector(".dados-pedido-pm");
            pedido.innerHTML += "<b>prato</b><br>"+
                            jsonMontarPratos[pmjson.id].nome+"<br>"+
                            "<b>Quantidade:</b>"+pmjson.quantidade+"<br><br>";
        });
        
    }
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
    if(pp != null){
        let array = pp.split("-");
        array.map((ele)=>{
            let ppjson = JSON.parse(ele);
            const  pedido = document.querySelector(".dados-pedido-pp");
            pedido.innerHTML += "<b>prato</b><br>"+
                            jsonPratoPromocao[ppjson.id].nome+"<br>"+
                            "<b>Quantidade:</b>"+ppjson.quantidade+"<br><br>";
        });
    }
    /* quando nao haver pratos oculta a div aonde mostra os pratos */ 
    if(pp == null){
        document.querySelector(".dados-pedido-pp").style.display = "none";
    }
    if(pf == null){
        document.querySelector(".dados-pedido-pf").style.display = "none";
    }
    if(pm == null){
        document.querySelector(".dados-pedido-pm").style.display = "none";
    }
}
function enviar(){
    const dadosCliente = JSON.parse(sessionStorage.getItem("dadosCliente"));
    const dadosEntrega = JSON.parse(sessionStorage.getItem("dadosEntrega"));
    let total = parseInt(sessionStorage.getItem("valorTotal"),10).toFixed(2);
    let pedidoMontado = "";
    let pedidoPratoFeito = '';
    let pedidoPratoPromocao = ""
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
                pedidoPratoFeito += jsonPratoFeito[idInt].nome+" quant:"+obj.quantidade+"; ";
            }
           
        });
    
    }
    
    /* praato de promocao */
    if(sessionStorage.getItem('pp') != null){
        let pratos = sessionStorage.getItem("pp");
        let pratosArray = pratos.split("-");
        pratosArray.map((ele)=>{
            let obj = JSON.parse(ele);
            let idInt = parseInt(obj.id,10);
            if(idInt == jsonPratoPromocao[idInt].id){
                pedidoPratoPromocao += jsonPratoPromocao[idInt].nome+" quant:"+obj.quantidade+"; ";
            }
           
        });
    
    }
    /* fim */
    
    let cliente = `Nome:${dadosCliente.nome}; email:${dadosCliente.email}; telefone:${dadosCliente.phone}`;
    let entrega = `Região:${dadosEntrega.regiao}; endereço:${dadosEntrega.ende}; Numero:${dadosEntrega.numero}; complemento:${dadosEntrega.complemento}`;
    
    let texto = "DADOS DO PEDIDO: PRATO MONTADO:"+pedidoMontado+"PEDIDO PRATO FEITOS:"+pedidoPratoFeito+"PEDIDO PRATO DE PROMOCAO:"+pedidoPratoPromocao+"DADOS DO CLIENTE:"+cliente+"DADOS DE ENTREGA:"+entrega+" TOTAL:"+total;
    let url = "https://api.whatsapp.com/send?phone=5521968180811&text="+texto;
    sessionStorage.clear();
    location.href = url;
}
