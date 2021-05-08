window.onload = inicia;
function inicia(){
	let pm = sessionStorage.getItem("pm");
	let pf = sessionStorage.getItem("pf");
	if(pm == null && pf == null && pm == "" && pf == ""){
		location.href = "/sitetair";
	}else{
		montar();
	}
	document.querySelector(".avancar").addEventListener("click",()=>{
		location.href = "etapa2.html";
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
		document.querySelector(".cont-pratos-montados").appendChild(clone);
	});
}