window.onload = inicia;
function inicia(){
	sessionStorage.removeItem("dadosCliente");
	sessionStorage.removeItem("dadosEntrega");
	let pp = sessionStorage.getItem("pp");
	let pf = sessionStorage.getItem("pf");
	let m1 = sessionStorage.getItem("marmitas-1");
	let m2 = sessionStorage.getItem("marmitas-2");
	let m3 = sessionStorage.getItem("marmitas-3");
	let m4 = sessionStorage.getItem("marmitas-4");
	
	if(pf == null && pp == null && m1 == null && m2 == null && m3 == null && m4 == null){
		location.href = "/sitetair/versao2.0/";
	}else if(pf == "" && pp == "" && m1 == "" && m2 == "" && m3 == "" && m4 == ""){
		location.href = "/sitetair/versao2.0/";
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