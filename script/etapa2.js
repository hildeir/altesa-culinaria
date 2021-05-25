window.onload = inicia;
function inicia(){
	sessionStorage.removeItem("dadosCliente");
	sessionStorage.removeItem("dadosEntrega");
	let pp = sessionStorage.getItem("pp");
	let pm = sessionStorage.getItem("pm");
	let pf = sessionStorage.getItem("pf");
	if(pm == null && pf == null && pp == null){
		location.href = "/sitetair";
	}else if(pm == "" && pf == "" && pp == ""){
		location.href = "/sitetair";
	}
	document.querySelector(".voltar").addEventListener("click",()=>{
		location.href = "etapa1.html";
	});
	document.querySelector(".avancar").addEventListener("click",()=>{
		avanca();
	});
}
function avanca(){
    let nome = document.querySelector("#nome").value;
	let email  = document.querySelector("#email").value;
	let phone = document.querySelector("#phone").value;
	let regiao = document.querySelector("#regioes").value;
	let ende = document.querySelector("#ende").value;
	let numero = document.querySelector("#numero").value;
	let complemento = document.querySelector("#complemento").value;

	if(nome == "" || email == "" || phone == "" || regiao == "" || ende == "" || numero == "" || complemento == ""){
		alert("preencha o ccampo");
		
	}else{
		let objPessoa = {
			nome:nome,
			email:email,
			phone:phone
			
		};
		let objEnd = {
			regiao:regiao,
			ende:ende,
			numero:numero,
			complemento:complemento
		};
		sessionStorage.setItem("dadosCliente",JSON.stringify(objPessoa));
		sessionStorage.setItem("dadosEntrega",JSON.stringify(objEnd));
		
		
		location.href = "confirmacao.html";
	
		
	}
}