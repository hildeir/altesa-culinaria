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
	let pratosArray;
	if(pm != null){
		pratosArray = pm.split("-");
	}
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
		clone.querySelector('.inf-pratos-montados .valor').innerHTML = `R$: ${prato.preco.toFixed(2)}`;
		document.querySelector(".cont-pratos-montados").appendChild(clone);
	});
}
function removerPrato(e){
	let p = e.target.closest(".model-pratos-montados");
	let idPrato = p.id;
	p.remove();
	let pm = sessionStorage.getItem('pm');
	let pratosArray = pm.split("-");
	let objPexcluir;
	pratosArray.forEach((ele)=>{
		let obj = JSON.parse(ele);
		if(obj.id == idPrato){
			objPexcluir = JSON.stringify(obj);
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
	}else{
		sessionStorage.setItem("totalmontar",totalmontar -= 1);
	}
	
}