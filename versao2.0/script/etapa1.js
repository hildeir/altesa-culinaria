//window.onload = inicia;
//function inicia(){
	var subtotal = "";
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

//}	
function montar(){
	let pf = sessionStorage.getItem("pf");
	let pp = sessionStorage.getItem("pp");
	let totalM1 = 0;
	let totalFeitos = 0;
	let totalPromocao = 0;
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
	
	subtotal = totalM1 + totalFeitos + totalPromocao;
	
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
			subtotal = calculaTotalQuandoRemove(jsonMontarPratos,idPrato,objQuantPrato);
			document.querySelector(".marmitas-"+atual+"-h4").style.display = "none";
			sessionStorage.setItem("quantMarm",quantMarm -= 1);
			sessionStorage.setItem("quantidade",quant -= 1);
			document.location.reload(true);//recarrega a pagina
			
		}else{
			subtotal = calculaTotalQuandoRemove(jsonMontarPratos,idPrato,objQuantPrato);
			document.location.reload(true);//recarrega a pagina
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
			subtotal = calculaTotalQuandoRemove(jsonPratoFeito,idPrato,objQuantPratoFeitos);
			document.querySelector(".prt-feitos-h3").style.display = "none";
			sessionStorage.setItem("quantidade",quant -= objQuantPratoFeitos);
			document.location.reload(true);//recarrega a pagina

		}else{
			sessionStorage.setItem("totalPratosFeitos",totalPratosFeitos -= objQuantPratoFeitos);
			subtotal = calculaTotalQuandoRemove(jsonPratoFeito,idPrato,objQuantPratoFeitos);
			sessionStorage.setItem("quantidade",quant -= objQuantPratoFeitos);
			document.location.reload(true); // recarrega a pagina
		}
		
	}
	/* fim */
}
function calculaTotalQuandoRemove(json,idPrato,objQuantPratoFeitos){
	let valorTotal = subtotal;
	let preco = json[parseInt(idPrato)].preco;
	
	let quant = objQuantPratoFeitos;
	let subtrair = preco * quant;
	let total = valorTotal - subtrair;
	return total;
	/* fim */
	
}
function calculaDesconto(subtotal){
	let valorDesconto = 10 //10 porcento
	
	if(subtotal > 130){
		let desconto = (subtotal / 100) * valorDesconto;
		return desconto;
	}else{
		return 0;
	}
}

function calculaFrete(){
	let quant = parseInt(sessionStorage.getItem("quantidade"));
	if(quant < 10){
		return 10.00 //frete 10,00 reais
	}else{
		return 0;
	}
}

let valordesconto = calculaDesconto(subtotal);
let valorfrete = calculaFrete();

function exibeTotalTela(subtotal,desconto,frete){
	let total = (subtotal - desconto) + frete;
	document.querySelector(".desconto").innerHTML = `Ganhou desconto de 10%: R$ ${desconto.toFixed(2)}`;
	document.querySelector(".total").innerHTML = `R$ ${total.toFixed(2)}`;
	document.querySelector(".frete").innerHTML = `frete: R$ ${frete.toFixed(2)}`;
	sessionStorage.setItem("valorTotal",total);	
}
exibeTotalTela(subtotal,valordesconto,valorfrete);