	var subtotal = "";
	let pf = sessionStorage.getItem("pf");

	if(pf == null){
		location.href = "index.html";
	}else if(pf == ""){
		location.href = "index.html";
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
	let totalFeitos = 0;
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

	
	if(pf != null){
		document.querySelector(".prt-feitos-h3").style.display = "block";
	}
	subtotal = totalFeitos;
	
}
let valordesconto = calculaDesconto(subtotal);
let valorfrete = calculaFrete();

function removerPrato(e){
	let pratoFeito = e.target.closest(".cont-pratos-feitos");
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
			valorfrete = 0;
			exibeTotalTela(subtotal,valordesconto,valorfrete);

		}else{
			sessionStorage.setItem("totalPratosFeitos",totalPratosFeitos -= objQuantPratoFeitos);
			subtotal = calculaTotalQuandoRemove(jsonPratoFeito,idPrato,objQuantPratoFeitos);
			sessionStorage.setItem("quantidade",quant -= objQuantPratoFeitos);
			exibeTotalTela(subtotal,valordesconto,valorfrete);
		}
		
	}
	/* fim */
	if(sessionStorage.getItem('valorTotal') == 0){
		location.href = "index.html";
	}
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
		return 8.00 //frete 10,00 reais
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