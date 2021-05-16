window.onload = inicia;
function inicia(){
	let pm = sessionStorage.getItem("pm");
	let pf = sessionStorage.getItem("pf");
	if(pm == null && pf == null){
		location.href = "/sitetair";
	}else if(pm == "" && pf == ""){
		location.href = "/sitetair";
	}else{
		montar();
	}
	document.querySelector(".avancar").addEventListener("click",()=>{
		location.href = "etapa2.html";
	});
	document.querySelector(".voltar").addEventListener("click",()=>{
		location.href = "/sitetair/";
	});
	let remover = document.querySelectorAll(".remover");
	remover.forEach((ele)=>{
		ele.addEventListener('click',(event)=>{
			removerPrato(event);
		});
	})

}	
function montar(){
	let pm = sessionStorage.getItem('pm');
	let pf = sessionStorage.getItem("pf");
	let totalMontados = 0;
	let totalFeitos = 0;
	
	if(pm != null){
		let pratosArray = pm.split("-");
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
			clone.querySelector('.inf-pratos-montados .peso').innerHTML = prato.peso;
			clone.querySelector('.quantidade').innerHTML = `Quant: ${pratosObj.quantidade}`;
			clone.querySelector('.inf-pratos-montados .valor').innerHTML = `R$: ${prato.preco.toFixed(2)}(uni)`;
			document.querySelector(".cont-pratos-montados").appendChild(clone);
			totalMontados += (prato.preco*pratosObj.quantidade);
		});
	}
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
			clone.querySelector('.inf-pratos-montados .peso').innerHTML = prato.peso;
			clone.querySelector('.quantidade').innerHTML = `Quant: ${pratosObj.quantidade}`;
			clone.querySelector('.inf-pratos-montados .valor').innerHTML = `R$: ${prato.preco.toFixed(2)}(uni)`;
			document.querySelector(".cont-pratos-feitos").appendChild(clone);
			totalFeitos += (prato.preco*pratosObj.quantidade);
		});
		/* FIM */
	}
	if(pm != null){
		document.querySelector(".prt-montados-h3").style.display = "block";
	}
	if(pf != null){
		document.querySelector(".prt-feitos-h3").style.display = "block";
	}
	
	let total = totalMontados + totalFeitos;
	document.querySelector(".total").innerHTML = `Valor total R$:${total.toFixed(2)}`;
	sessionStorage.setItem("valorTotal",total);

}
function removerPrato(e){
	let pratoFeito = e.target.closest(".cont-pratos-feitos");
	let pratoMontado = e.target.closest(".cont-pratos-montados");
	let p = e.target.closest(".model-pratos-montados");
	let idPrato = p.id;
	p.remove();


	if(pratoMontado != null){
		let pm = sessionStorage.getItem('pm');
		let pratosArray = pm.split("-");
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
		sessionStorage.setItem("pm",update);
		let totalmontar = parseInt(sessionStorage.getItem("totalmontar"));


		if(sessionStorage.getItem("pm") == ""){
			sessionStorage.removeItem("pm");
			sessionStorage.removeItem("totalmontar");
			calculaTotalQuandoRemove(jsonMontarPratos,idPrato,objQuantPrato);

		}else{
			sessionStorage.setItem("totalmontar",totalmontar -= 1);
			calculaTotalQuandoRemove(jsonMontarPratos,idPrato,objQuantPrato);
		}

	}
	/* pratos feitos */
	if(pratoFeito != null){
		console.log(idPrato);
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
			
		if(sessionStorage.getItem("pf") == ""){
			sessionStorage.removeItem("pf");
			sessionStorage.removeItem("totalPratosFeitos");
			calculaTotalQuandoRemove(jsonPratoFeito,idPrato,objQuantPratoFeitos);

		}else{
			sessionStorage.setItem("totalPratosFeitos",totalPratosFeitos -= 1);
			calculaTotalQuandoRemove(jsonPratoFeito,idPrato,objQuantPratoFeitos);
		}
		
	}
	/* fim */
}
function calculaTotalQuandoRemove(json,idPrato,objQuantPratoFeitos){
	//subtrai o valor do prato excluido no total 
	let valorTotal = parseInt(sessionStorage.getItem("valorTotal"));
	let preco = json[parseInt(idPrato)].preco;
	
	let quant = objQuantPratoFeitos;
	let subtrair = preco * quant;
	let totalPratoFeito = valorTotal - subtrair;
	
	/* fim */
	document.querySelector(".total").innerHTML = `Valor total R$:${totalPratoFeito.toFixed(2)}`;
	sessionStorage.setItem("valorTotal",totalPratoFeito);
}