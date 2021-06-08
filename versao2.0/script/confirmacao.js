window.onload = inicia;
function inicia(){
	sessionStorage.removeItem("dados");
	let pf = sessionStorage.getItem("pf");
    let pp = sessionStorage.getItem("pp");
    let m1 = sessionStorage.getItem("marmitas-1");
	let m2 = sessionStorage.getItem("marmitas-2");
	let m3 = sessionStorage.getItem("marmitas-3");
	let m4 = sessionStorage.getItem("marmitas-4");
    let cliente = sessionStorage.getItem("dadosCliente");
    let entrega = sessionStorage.getItem("dadosEntrega");
	if(pf == null && pp == null && cliente == null && entrega == null && m1 == null && m2 == null && m3 == null && m4 == null){
		location.href = "/sitetair/versao2.0";
	}else if(pf == "" && pp == "" && cliente == "" && entrega == "" && m1 == "" && m2 == "" && m3 == "" && m4 == ""){
		location.href = "/sitetair/versao2.0";
	}else{
        exibir();
    }
	document.querySelector(".voltar").addEventListener("click",()=>{
		location.href = "/sitetair/versao2.0/etapa2.html";
	});
	document.querySelector(".enviar").addEventListener("click",()=>{
		enviar();
	});
}
function exibir(){
    const dadosCliente = JSON.parse(sessionStorage.getItem("dadosCliente"));
    const dadosEntrega = JSON.parse(sessionStorage.getItem("dadosEntrega"));
    let m1 = sessionStorage.getItem("marmitas-1");
    let m2 = sessionStorage.getItem("marmitas-2");
    let m3 = sessionStorage.getItem("marmitas-3");
    let m4 = sessionStorage.getItem("marmitas-4");
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

   /* marmitaas */
   if(m1 != null){
    let array = m1.split("-");
        array.map((ele)=>{
            let pfjson = JSON.parse(ele);
            const  pedido = document.querySelector(".dados-pedido-marmitas-1");
            pedido.innerHTML += "<b>prato</b><br>"+
                            jsonMontarPratos[pfjson.id].nome+"<br>"+
                            "<b>Quantidade:</b>"+pfjson.quantidade+"<br><br>";
                           
        });
  
    }
    if(m2 != null){
    let array = m2.split("-");
        array.map((ele)=>{
            let pfjson = JSON.parse(ele);
            const  pedido = document.querySelector(".dados-pedido-marmitas-2");
            pedido.innerHTML += "<b>prato</b><br>"+
                            jsonMontarPratos[pfjson.id].nome+"<br>"+
                            "<b>Quantidade:</b>"+pfjson.quantidade+"<br><br>";
                            
        });
      
    }
    if(m3 != null){
    let array = m3.split("-");
        array.map((ele)=>{
            let pfjson = JSON.parse(ele);
            const  pedido = document.querySelector(".dados-pedido-marmitas-3");
            pedido.innerHTML += "<b>prato</b><br>"+
                            jsonMontarPratos[pfjson.id].nome+"<br>"+
                            "<b>Quantidade:</b>"+pfjson.quantidade+"<br><br>";
                            
        });
        
    }
    if(m4 != null){
    let array = m4.split("-");
        array.map((ele)=>{
            let pfjson = JSON.parse(ele);
            const  pedido = document.querySelector(".dados-pedido-marmitas-4");
            pedido.innerHTML += "<b>prato</b><br>"+
                            jsonMontarPratos[pfjson.id].nome+"<br>"+
                            "<b>Quantidade:</b>"+pfjson.quantidade+"<br><br>";
                            
        });
        
    }
   /* fim mmarmitas */
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
    if(m1 == null){
        document.querySelector(".dados-pedido-marmitas-1").style.display = "none";
    }
    if(m2 == null){
        document.querySelector(".dados-pedido-marmitas-2").style.display = "none";
    }
    if(m3 == null){
        document.querySelector(".dados-pedido-marmitas-3").style.display = "none";
    }
    if(m4 == null){
        document.querySelector(".dados-pedido-marmitas-4").style.display = "none";
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
