window.onload = inicia;
function inicia(){
	let pf = sessionStorage.getItem("pf");
	let pp = sessionStorage.getItem("pp");

	if(pp == null){
		document.querySelector(".promocao-h3").style.display = "none";
	}

	let nulos = 0;
	let vazios = 0;
	for (let i = 1; i <= 100; i++) {
		if(sessionStorage.getItem("marmitas-"+[i]) == null){
			nulos += 1; //se todos forem nulos
		}
		if(sessionStorage.getItem("marmitas-"+[i]) == ""){
			vazios += 1; //se totos forem vazios
		}
	}
	if(nulos == 100 && pp == null && pf == null){
		//location.href = "/sitetair/versao2.0/";
		location.href = "/tair/";
	}else if(vazios == 100 && pp == "" && pf == ""){
		//location.href = "/sitetair/versao2.0/";
		location.href = "/tair/";
	}else{
		montar();
	}
	
	document.querySelector(".avancar").addEventListener("click",()=>{
		//location.href = "/sitetair/versao2.0/etapa2.html";
		location.href = "/tair/etapa2.html";
	});
	document.querySelector(".voltar").addEventListener("click",()=>{
		//location.href = "/sitetair/versao2.0/";
		location.href = "/tair/";
	});
	let remover = document.querySelectorAll(".remover");
	remover.forEach((ele)=>{
		ele.addEventListener('click',(event)=>{
			removerPrato(event);
		});
	})

}	
function montar(){
	let pf = sessionStorage.getItem("pf");
	let pp = sessionStorage.getItem("pp");
	let totalM1 = 0;
	let totalFeitos = 0;
	let totalPromocao = 0;
	let desconto = 10;
	/* marmmitas */
	for (let i = 1; i <= 100; i++) {
		let m = sessionStorage.getItem('marmitas-'+[i]);
		
		
		if(m != null){
			let pratosArray = m.split("-");
		
			if(pratosArray.length){
				let div = document.createElement("div");
				div.setAttribute("class","cont-marm-"+[i]);
				div.style.display = "flex";
				div.style.flexWrap = "wrap";

				let marmita_h4 = document.createElement("h4");
				marmita_h4.setAttribute("class","marmitas-"+[i]+"-h4");
				let conteudo = document.createTextNode("Marmita: "+[i]);
				marmita_h4.appendChild(conteudo);

				pratosArray.map((ele)=>{
					let pratosObj =	JSON.parse(ele);
					let prato = jsonMontarPratos[pratosObj.id];
					let modelo = document.querySelector(".model-pratos-montados");
					let clone = modelo.cloneNode(true);
					let caminhoImg = prato.img;
					let img = clone.querySelector(".img-prato-montados img");
					img.setAttribute("src",caminhoImg);
					clone.style.display = "flex";
					clone.setAttribute("id",pratosObj.id);
					clone.querySelector('.inf-pratos-montados .nome').innerHTML = prato.nome;
					clone.querySelector('.inf-pratos-montados .desc').innerHTML = prato.desc;
					clone.querySelector('.inf-pratos-montados .peso').innerHTML = prato.peso+"(uni)";
					clone.querySelector('.quantidade').innerHTML = `Quant: ${pratosObj.quantidade}`;
					clone.querySelector('.inf-pratos-montados .valor').innerHTML = `R$: ${prato.preco.toFixed(2)}(uni)`;

					document.querySelector(".cont-marmitas").appendChild(marmita_h4);
					div.appendChild(clone);
					document.querySelector(".cont-marmitas").appendChild(div);
					//document.querySelector(".cont-marm-"+[i]+"").appendChild(clone);
					totalM1 += (prato.preco*pratosObj.quantidade);
					
				});
			}
		}	
	}
	/*  ffim  maarmitaa **/
	if(pf != null){
		let pratosArrayFeitos = pf.split("-");
			/* pratos feitos */
		pratosArrayFeitos.map((ele)=>{
			let pratosObj =	JSON.parse(ele);
			let prato = jsonPratoFeito[pratosObj.id];
			let modelo = document.querySelector(".model-pratos-montados");
			let clone = modelo.cloneNode(true);
			let caminhoImg = prato.img;
			let img = clone.querySelector(".img-prato-montados img");
			img.setAttribute("src",caminhoImg);
			clone.style.display = "flex";
			clone.setAttribute("id",pratosObj.id);
			clone.querySelector('.inf-pratos-montados .nome').innerHTML = prato.nome;
			clone.querySelector('.inf-pratos-montados .desc').innerHTML = prato.desc;
			clone.querySelector('.inf-pratos-montados .peso').innerHTML = prato.peso+"(uni)";
			clone.querySelector('.quantidade').innerHTML = `Quant: ${pratosObj.quantidade}`;
			clone.querySelector('.inf-pratos-montados .valor').innerHTML = `R$: ${prato.preco.toFixed(2)}(uni)`;
			document.querySelector(".cont-pratos-feitos").appendChild(clone);
			totalFeitos += (prato.preco*pratosObj.quantidade);
		});
		/* FIM */
	}
	/* prato promocao */
	if(pp != null){
		let pratosArray = pp.split("-");
		pratosArray.map((ele)=>{
			let pratosObj =	JSON.parse(ele);
			let prato = jsonPratoPromocao[pratosObj.id];
			let modelo = document.querySelector(".model-pratos-montados");
			let clone = modelo.cloneNode(true);
			let caminhoImg = prato.img;
			let img = clone.querySelector(".img-prato-montados img");
			img.setAttribute("src",caminhoImg);
			clone.style.display = "flex";
			clone.setAttribute("id",pratosObj.id);
			clone.querySelector('.inf-pratos-montados .nome').innerHTML = prato.nome;
			clone.querySelector('.inf-pratos-montados .desc').innerHTML = prato.desc;
			clone.querySelector('.inf-pratos-montados .peso').innerHTML = prato.peso;
			clone.querySelector('.quantidade').innerHTML = `Quant: ${pratosObj.quantidade}`;
			clone.querySelector('.inf-pratos-montados .valor').innerHTML = `R$: ${prato.preco.toFixed(2)}(uni)`;
			document.querySelector(".cont-pratos-promocao").appendChild(clone);
			totalPromocao += (prato.preco*pratosObj.quantidade);
		});
	}
	
	if(pp != null){
		document.querySelector(".promocao-h3").style.display = "block";
	}
	if(pf != null){
		document.querySelector(".prt-feitos-h3").style.display = "block";
	}
	let contador = 0;
	for (let i = 1; i <= 100 ; i++) {
		let m = sessionStorage.getItem("marmitas-"+[i]);
		if(m != null){
			document.querySelector(".marmitas-"+[i]+"-h4").style.display = "block";
		}
		contador = i;
	}
	if(contador >= 1){
		document.querySelector(".prt-montados-h3").style.display = "block";
	}
	
	let subtotal = totalM1 + totalFeitos + totalPromocao;
	/* desconto */
	if(subtotal > 130){
		let valorDesconto = calculaDesconto(subtotal,desconto);
		let totalDesconto = subtotal - valorDesconto;
		document.querySelector(".total").innerHTML = `R$ ${totalDesconto.toFixed(2)} com (${desconto}% de desconto)`;
		sessionStorage.setItem("valorTotal",totalDesconto);
	}else{
		document.querySelector(".total").innerHTML = `R$ ${subtotal.toFixed(2)}`;
		sessionStorage.setItem("valorTotal",subtotal);
	}
	/* fim */

	/* calcula frete e coloca o novo valor no localstorage e na tela */
	calculaFrete();
	
	/* fim */
}

function removerPrato(e){
	let pratoFeito = e.target.closest(".cont-pratos-feitos");
	let pratoPromocao = e.target.closest(".cont-pratos-promocao");
	/* pegaa o prato daa maarmitaa  quee foii cliccadoo */ 
	for (let i = 1; i <= 100; i++) {
		let elem = e.target.closest(".cont-marm-"+[i]);
		if(elem != null){
			var atual = i;
		}
	}
	/* fim */
	let p = e.target.closest(".model-pratos-montados");
	let idPrato = p.id;
	p.remove();//rremovve prrato
	
	/*marmitaas */
	let marmita = sessionStorage.getItem('marmitas-'+atual);
	if(marmita != undefined){
		let pratosArray = marmita.split("-");
		let objPexcluir;
		let objQuantPrato;
		pratosArray.forEach((ele)=>{
			let obj = JSON.parse(ele);
			if(obj.id == idPrato){
				objPexcluir = JSON.stringify(obj);
				objQuantPrato = obj.quantidade;
			}
		});
	
		let posPrato = pratosArray.indexOf(objPexcluir);
		pratosArray.splice(posPrato,1);
		let update = pratosArray.join("-");
		sessionStorage.setItem("marmitas-"+atual,update);
	
		let quantMarm = parseInt(sessionStorage.getItem("quantMarm"));//quantidade das marmitas
		let quant = parseInt(sessionStorage.getItem("quantidade"));//quantidade dos prratos
		if(sessionStorage.getItem("marmitas-"+atual) == ""){
			sessionStorage.removeItem("marmitas-"+atual);
			calculaTotalQuandoRemove(jsonMontarPratos,idPrato,objQuantPrato);
			document.querySelector(".marmitas-"+atual+"-h4").style.display = "none";
			sessionStorage.setItem("quantMarm",quantMarm -= 1);
			sessionStorage.setItem("quantidade",quant -= 1);
	
		}else{
			calculaTotalQuandoRemove(jsonMontarPratos,idPrato,objQuantPrato);
		}
	}
	
	/* fim marmitas */
	/* pratos feitos */
	if(pratoFeito != null){
		let pf = sessionStorage.getItem('pf');
		let pratosArrayFeitos = pf.split("-");
		let objPexcluirFeitos;
		let objQuantPratoFeitos;
		pratosArrayFeitos.forEach((ele)=>{
			let obj = JSON.parse(ele);
			if(obj.id == idPrato){
				objPexcluirFeitos = JSON.stringify(obj);
				objQuantPratoFeitos = obj.quantidade;
			}
		});
	
		let posPratoFeitos = pratosArrayFeitos.indexOf(objPexcluirFeitos);
		pratosArrayFeitos.splice(posPratoFeitos,1);
		let updateFeitos = pratosArrayFeitos.join("-");
		sessionStorage.setItem("pf",updateFeitos);
		let totalPratosFeitos = parseInt(sessionStorage.getItem("totalPratosFeitos"));
		
		let quant = parseInt(sessionStorage.getItem("quantidade"));//quantidade dos prratos
		if(sessionStorage.getItem("pf") == ""){
			sessionStorage.removeItem("pf");
			sessionStorage.removeItem("totalPratosFeitos");
			calculaTotalQuandoRemove(jsonPratoFeito,idPrato,objQuantPratoFeitos);
			document.querySelector(".prt-feitos-h3").style.display = "none";
			sessionStorage.setItem("quantidade",quant -= objQuantPratoFeitos);

		}else{
			sessionStorage.setItem("totalPratosFeitos",totalPratosFeitos -= objQuantPratoFeitos);
			calculaTotalQuandoRemove(jsonPratoFeito,idPrato,objQuantPratoFeitos);
			sessionStorage.setItem("quantidade",quant -= objQuantPratoFeitos);
		}
		
	}
	/* fim */
	/* pratos de promocao */
	if(pratoPromocao != null){
		let pp = sessionStorage.getItem('pp');
		let pratosArrayFeitos = pp.split("-");
		let objPexcluirFeitos;
		let objQuantPratoFeitos;
		pratosArrayFeitos.forEach((ele)=>{
			let obj = JSON.parse(ele);
			if(obj.id == idPrato){
				objPexcluirFeitos = JSON.stringify(obj);
				objQuantPratoFeitos = obj.quantidade;
			}
		});
	
		let posPratoFeitos = pratosArrayFeitos.indexOf(objPexcluirFeitos);
		pratosArrayFeitos.splice(posPratoFeitos,1);
		let updateFeitos = pratosArrayFeitos.join("-");
		sessionStorage.setItem("pp",updateFeitos);
		let totalPratosPromocao = parseInt(sessionStorage.getItem("totalPratosPromocao"));
		
		let quant = parseInt(sessionStorage.getItem("quantidade"));//quantidade dos prratos
		if(sessionStorage.getItem("pp") == ""){
			sessionStorage.removeItem("pp");
			sessionStorage.removeItem("totalPratosPromocao");
			calculaTotalQuandoRemove(jsonPratoPromocao,idPrato,objQuantPratoFeitos);
			document.querySelector(".promocao-h3").style.display = "none";
			sessionStorage.setItem("quantidade",quant -= objQuantPratoFeitos);
		}else{
			sessionStorage.setItem("totalPratosPromocao",totalPratosPromocao -= objQuantPratoFeitos);
			calculaTotalQuandoRemove(jsonPratoPromocao,idPrato,objQuantPratoFeitos);
			sessionStorage.setItem("quantidade",quant -= objQuantPratoFeitos);
		}
		
	}
	/* fim */
	calculaFrete();
	if(sessionStorage.getItem('valorTotal') <= "0" && sessionStorage.getItem('valorTotal') >= "-0" ){
		//location.href = "/sitetair/versao2.0/";
		location.href = "/tair/";
	}
	
}
function calculaTotalQuandoRemove(json,idPrato,objQuantPratoFeitos){
	//subtrai o valor do prato excluido no total 
	let valorTotal = parseFloat(sessionStorage.getItem("valorTotal"));
	let preco = json[parseInt(idPrato)].preco;
	
	let quant = objQuantPratoFeitos;
	let subtrair = preco * quant;
	let totalPratoFeito = valorTotal - subtrair;
	
	/* fim */
	document.querySelector(".total").innerHTML = `R$ ${totalPratoFeito.toFixed(2)}`;
	sessionStorage.setItem("valorTotal",totalPratoFeito);
}
function calculaDesconto(total,desconto){
	return (total / 100) * desconto;
}
function calculaFrete(){
	let frete = 0;
	let quant = parseInt(sessionStorage.getItem("quantidade"));
	if(quant < 10){
		frete = 10.00;
	}else{
		frete = 0;
	}
	subtotal = parseFloat(sessionStorage.getItem("valorTotal"));
	let total = subtotal + frete;
	sessionStorage.setItem("valorTotal",total);
	document.querySelector(".total").innerHTML = `R$ ${total.toFixed(2)}`;
	document.querySelector(".frete").innerHTML = `frete: R$ ${frete.toFixed(2)}`;
}