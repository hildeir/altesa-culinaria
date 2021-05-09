window.onload = inicia;
function inicia(){
	let pm = sessionStorage.getItem("pm");
	let pf = sessionStorage.getItem("pf");
	if(pm == null && pf == null && pm == "" && pf == ""){
		location.href = "/sitetair";
	}else{
		montar();
	}
	document.querySelector(".voltar").addEventListener("click",()=>{
		location.href = "etapa1.html";
	});
}
function montar(){
    
}