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
		location.href = "altesaculinaria.com.br";
	}else if(vazios == 100 && pp == "" && pf == ""){
		location.href = "altesaculinaria.com.br";
	}else{
		montar();
	}
	
	document.querySelector(".avancar").addEventListener("click",()=>{
		
		location.href = "etapa2.html";
	});
	document.querySelector(".voltar").addEventListener("click",()=>{
		
		location.href = "index.html";
	});
	let remover = document.querySelectorAll(".remover");
	remover.forEach((ele)=>{
		ele.addEventListener('click',(event)=>{
			removerPrato(event);
		});
	})
function montar(){
	let pf = sessionStorage.getItem("pf");
	let pp = sessionStorage.getItem("pp");
	let totalM1 = 0;
	let totalFeitos = 0;
	let totalPromocao = 0;
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
	
	subtotal = totalM1 + totalFeitos + totalPromocao;
	
}
let valordesconto = calculaDesconto(subtotal);
let valorfrete = calculaFrete();

function removerPrato(e){
	let pratoFeito = e.target.closest(".cont-pratos-feitos");
	let pratoPromocao = e.target.closest(".cont-pratos-promocao");
	let p = e.target.closest(".model-pratos-montados");
	let idPrato = p.id;
	p.remove();//rremovve prrato
	
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
			exibeTotalTela(subtotal,valordesconto,valorfrete);

		}else{
			sessionStorage.setItem("totalPratosFeitos",totalPratosFeitos -= objQuantPratoFeitos);
			subtotal = calculaTotalQuandoRemove(jsonPratoFeito,idPrato,objQuantPratoFeitos);
			sessionStorage.setItem("quantidade",quant -= objQuantPratoFeitos);
			exibeTotalTela(subtotal,valordesconto,valorfrete);
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



function exibeTotalTela(subtotal,desconto,frete){
	let total = (subtotal - desconto) + frete;
	if(desconto != 0){
		document.querySelector(".desconto").innerHTML = `Ganhou desconto de 10%: R$ ${desconto.toFixed(2)}`;
	}
	
	document.querySelector(".total").innerHTML = `R$ ${total.toFixed(2)}`;
	document.querySelector(".frete").innerHTML = `frete: R$ ${frete.toFixed(2)}`;
	sessionStorage.setItem("valorTotal",total);	
}
exibeTotalTela(subtotal,valordesconto,valorfrete);