window.onload = inicia;
function inicia(){
	let pf = sessionStorage.getItem("pf");
	let pp = sessionStorage.getItem("pp");
	
	/* unica fforma de cconcerta o bug do h3 que encontrei foi essa*/
	if(pp == null){
		document.querySelector(".promocao-h3").style.display = "none";
	}
	/* fim */
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
	if(cont_a == 10 && pp == null && pf == null){
		location.href = "/sitetair/versao2.0/";
	}else if(cont_b == 10 && pp == "" && pf == null){
		location.href = "/sitetair/versao2.0/";
	}else{
		montar();
	}
	/*
	if(pf == null && pp == null && m1 == null && m2 == null && m3 == null && m4 == null){
		location.href = "/sitetair/versao2.0/";
	}else if(pf == "" && pp == "" && m1 == "" && m2 == "" && m3 == "" && m4 == ""){
		location.href = "/sitetair/versao2.0/";
	}else{
		montar();
	}
	*/
	document.querySelector(".avancar").addEventListener("click",()=>{
		location.href = "/sitetair/versao2.0/etapa2.html";
	});
	document.querySelector(".voltar").addEventListener("click",()=>{
		location.href = "/sitetair/versao2.0/";
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
	/*
	let m1 = sessionStorage.getItem("marmitas-1");
	let m2 = sessionStorage.getItem("marmitas-2");
	let m3 = sessionStorage.getItem("marmitas-3");
	let m4 = sessionStorage.getItem("marmitas-4");
	*/
	let totalM1 = 0;
	let totalM2 = 0;
	let totalM3 = 0;
	let totalM4 = 0;
	let totalFeitos = 0;
	let totalPromocao = 0;

	for (let i = 1; i <= 10; i++) {
		let m = sessionStorage.getItem('marmitas-'+[i]);
		if(m != null){
			let pratosArray = m.split("-");
			pratosArray.map((ele,index)=>{
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
				document.querySelector(".cont-marm-"+[i]+"").appendChild(clone);
				totalM1 += (prato.preco*pratosObj.quantidade);
				
			});
		}
		
	}

	/* maarmitas */
	/*
	if(m1 != null){
		let pratosArray = m1.split("-");
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
			document.querySelector(".cont-marm-1").appendChild(clone);
			totalM1 += (prato.preco*pratosObj.quantidade);
		});
	}
	if(m2 != null){
		let pratosArray = m2.split("-");
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
			document.querySelector(".cont-marm-2").appendChild(clone);
			totalM2 += (prato.preco*pratosObj.quantidade);
		});
	}
	if(m3 != null){
		let pratosArray = m3.split("-");
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
			document.querySelector(".cont-marm-3").appendChild(clone);
			totalM3 += (prato.preco*pratosObj.quantidade);
		});
	}
	if(m4 != null){
		let pratosArray = m4.split("-");
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
			document.querySelector(".cont-marm-4").appendChild(clone);
			totalM4 += (prato.preco*pratosObj.quantidade);
		});
	}
	/* fim marmitaas */
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
	for (let i = 1; i <= 10 ; i++) {
		let m = sessionStorage.getItem("marmitas-"+[i]);
		if(m != null){
			document.querySelector(".marmitas-"+[i]+"-h4").style.display = "block";
		}
		contador = i;
	}
	if(contador >= 1){
		document.querySelector(".prt-montados-h3").style.display = "block";
	}
	/*
	if(m1 != null || m2 != null || m3 != null || m4 != null){
		document.querySelector(".prt-montados-h3").style.display = "block";
	}
	if(m1 != null){
		document.querySelector(".marmitas-1-h4").style.display = "block";
	}
	if(m2 != null){
		document.querySelector(".marmitas-2-h4").style.display = "block";
	}
	if(m3 != null){
		document.querySelector(".marmitas-3-h4").style.display = "block";
	}
	if(m4 != null){
		document.querySelector(".marmitas-4-h4").style.display = "block";
	}*/
	let total = totalM1 + totalFeitos + totalPromocao;
	document.querySelector(".total").innerHTML = `R$ ${total.toFixed(2)}`;
	sessionStorage.setItem("valorTotal",total);

}
function removerPrato(e){
	let pratoFeito = e.target.closest(".cont-pratos-feitos");
	let pratoPromocao = e.target.closest(".cont-pratos-promocao");
	
	/*
	let m1 = e.target.closest(".cont-marm-1");
	let m2 = e.target.closest(".cont-marm-2");
	let m3 = e.target.closest(".cont-marm-3");
	let m4 = e.target.closest(".cont-marm-4");
	let m5 = e.target.closest(".cont-marm-5");
	let m6 = e.target.closest(".cont-marm-6");
	let m7 = e.target.closest(".cont-marm-7");
	let m8 = e.target.closest(".cont-marm-8");
	let m9 = e.target.closest(".cont-marm-9");
	let m10 = e.target.closest(".cont-marm-10");
	*/
	for (let i = 1; i <= 10; i++) {
		let elem = e.target.closest(".cont-marm-"+[i]);
		if(elem != null){
			var atual = i;
		}
	}
	let p = e.target.closest(".model-pratos-montados");
	let idPrato = p.id;
	p.remove();
	/* marmitas */
	/*
	if(m1 != null){
		var atual = 1;
	}
	if(m2 != null){
		var atual = 2;
	}
	if(m3 != null){
		var atual = 3;
	}
	if(m4 != null){
		var atual = 4;
	}
	if(m5 != null){
		var atual = 5;
	}
	if(m6 != null){
		var atual = 6;
	}
	if(m7 != null){
		var atual = 7;
	}
	if(m8 != null){
		var atual = 8;
	}
	if(m9 != null){
		var atual = 9;
	}
	if(m10 != null){
		var atual = 10;
	}
	*/
	
		
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
	if(sessionStorage.getItem('valorTotal') == "0"){
		location.href = "/sitetair/versao2.0/";
	}
}
function calculaTotalQuandoRemove(json,idPrato,objQuantPratoFeitos){
	//subtrai o valor do prato excluido no total 
	let valorTotal = parseInt(sessionStorage.getItem("valorTotal"));
	let preco = json[parseInt(idPrato)].preco;
	
	let quant = objQuantPratoFeitos;
	let subtrair = preco * quant;
	let totalPratoFeito = valorTotal - subtrair;
	
	/* fim */
	document.querySelector(".total").innerHTML = `R$ ${totalPratoFeito.toFixed(2)}`;
	sessionStorage.setItem("valorTotal",totalPratoFeito);
}