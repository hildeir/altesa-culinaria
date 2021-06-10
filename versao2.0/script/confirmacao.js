window.onload = inicia;
function inicia(){
	sessionStorage.removeItem("dados");
	let pf = sessionStorage.getItem("pf");
    let pp = sessionStorage.getItem("pp");
    let cliente = sessionStorage.getItem("dadosCliente");
    let entrega = sessionStorage.getItem("dadosEntrega");
	
    let cont_a = 0;
	let cont_b = 0;
	for (let i = 1; i <= 10; i++) {
		if(sessionStorage.getItem("marmitas-"+[i]) == null){
			cont_a += 1;
		}
		if(sessionStorage.getItem("marmitas-"+[i]) == ""){
			cont_b += 1;
		}
	}
	if(cont_a == 10 && pp == null && pf == null && cliente == null && entrega == null){
		location.href = "/sitetair/versao2.0/";
	}else if(cont_b == 10 && pp == "" && pf == null && cliente == "" && entrega == ""){
		location.href = "/sitetair/versao2.0/";
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
    const total = parseInt(sessionStorage.getItem("valorTotal"));
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
   for (let i = 1; i <= 10; i++) {
       let m = sessionStorage.getItem("marmitas-"+i);
       if(m != null){
        let array = m.split("-");
            array.map((ele)=>{
                let pfjson = JSON.parse(ele);
                const  pedido = document.querySelector(".dados-pedido-marmitas-"+i);
                pedido.innerHTML += "<b>prato</b><br>"+
                                jsonMontarPratos[pfjson.id].nome+"<br>"+
                                "<b>Quantidade:</b>"+pfjson.quantidade+"<br><br>";
                               
            });
      
        }
       
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
    /* se a marmita nao existe oculta a div */
    for (let i = 1; i <= 10; i++) {
        let m = sessionStorage.getItem("marmitas-"+i);
        if(m == null){
            document.querySelector(".dados-pedido-marmitas-"+i).style.display = "none";
           
        }
    }
    /* fim */
}
function enviar(){
    const dadosCliente = JSON.parse(sessionStorage.getItem("dadosCliente"));
    const dadosEntrega = JSON.parse(sessionStorage.getItem("dadosEntrega"));
    let total = parseInt(sessionStorage.getItem("valorTotal"),10).toFixed(2);
    let pedidoPratoFeito = '';
    let pedidoPratoPromocao = ""

    let textoPf = "";
    if(sessionStorage.getItem('pf') != null){
        let pratos = sessionStorage.getItem("pf");
        let pratosArray = pratos.split("-");
        pratosArray.map((ele)=>{
            let obj = JSON.parse(ele);
            let idInt = parseInt(obj.id,10);
            if(idInt == jsonMontarPratos[idInt].id){
                textoPf = "PRATO FEITO: "
                pedidoPratoFeito += jsonPratoFeito[idInt].nome+" quant:"+obj.quantidade+"; ";
            }
           
        });
    
    }
    
    /* praato de promocao */
    let textoPp = "";
    if(sessionStorage.getItem('pp') != null){
        let pratos = sessionStorage.getItem("pp");
        let pratosArray = pratos.split("-");
        pratosArray.map((ele)=>{
            let obj = JSON.parse(ele);
            let idInt = parseInt(obj.id,10);
            if(idInt == jsonPratoPromocao[idInt].id){
                textoPp = "PEDIDO PRATO PROMOÇÃO: "
                pedidoPratoPromocao += jsonPratoPromocao[idInt].nome+" quant:"+obj.quantidade+"; ";
            }
           
        });
    
    }
    /* fim */
    let tituloMarmita = "";
    if(sessionStorage.getItem('marmitas-1') ==  null && 
    sessionStorage.getItem('marmitas-2') == null && sessionStorage.getItem('marmitas-3') == null && sessionStorage.getItem('marmitas-4') == null){
        tituloMarmita = "";
    }else{
        tituloMarmita = "MARMITAS:";
    }
    /* maarmitaas */
    let marmita = [];
    for (let i = 1; i <= 10; i++) {
        let m = sessionStorage.getItem('marmitas-'+i);
        if(m != null){
            let pratos = sessionStorage.getItem("marmitas-"+i);
            let pratosArray = pratos.split("-");
            /*criar objeto ppaara cada maarmmita*/
            let obj_marm = {
                marmita: i,
                pratos_array : []
            }
            /* fim **/
            pratosArray.map((ele)=>{
                let obj = JSON.parse(ele);
                let idInt = parseInt(obj.id,10);
                if(idInt == jsonMontarPratos[idInt].id){//se o id for igual o do json
                    let pratos_nomes = "";
                    pratos_nomes += jsonMontarPratos[idInt].nome+" quant:"+obj.quantidade+"; ";

                    if(obj_marm.marmita == i){//se foor aa mesma marmiita acreescenntaa os prratos
                        obj_marm.pratos_array.push(pratos_nomes);
                    }
             
                }
               
            });
            marmita.push(obj_marm);//aadiciona a marmita no array
        }
    }
    /* fim marmitas */
   /* guarda na variavel todas as marmitas prraa ser exebiidas no whatsapp */
    let resultados_todas_marmitas = "";
    for (let i = 0; i < marmita.length; i++) {
        resultados_todas_marmitas += "MARMITA "+marmita[i].marmita+": "+marmita[i].pratos_array;
        
    }
    /* fimm */
    let cliente = `Nome:${dadosCliente.nome}; email:${dadosCliente.email}; telefone:${dadosCliente.phone}`;
    let entrega = `Região:${dadosEntrega.regiao}; endereço:${dadosEntrega.ende}; Numero:${dadosEntrega.numero}; complemento:${dadosEntrega.complemento}`;
    let texto = "DADOS DO PEDIDO:"+tituloMarmita+""+resultados_todas_marmitas+textoPf+pedidoPratoFeito+textoPp+pedidoPratoPromocao+"DADOS DO CLIENTE:"+cliente+" DADOS DE ENTREGA:"+entrega+" TOTAL: "+total;
    let url = "https://api.whatsapp.com/send?phone=5521968180811&text="+texto;
    
    sessionStorage.clear();//remove todas sessoes
    location.href = url;
}
