window.onload = inicia;
function inicia(){
	sessionStorage.removeItem("dadosCliente");
	sessionStorage.removeItem("dadosEntrega");
	let pp = sessionStorage.getItem("pp");
	let pf = sessionStorage.getItem("pf");
	
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

	if(pf == null && pp == null && nulos == 100){
		location.href = "altesaculinaria.com.br";
	}else if(pf == "" && pp == "" && vazios == 100){
		location.href = "altesaculinaria.com.br";
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
	let ende = document.querySelector("#ende").value;
	let numero = document.querySelector("#numero").value;
	let complemento = document.querySelector("#complemento").value;

	if(nome == "" || email == "" || phone == "" || ende == "" || numero == "" || complemento == ""){
		alert("preencha o ccampo");
		
	}else{
		let objPessoa = {
			nome:nome,
			email:email,
			phone:phone
			
		};
		let objEnd = {
			ende:ende,
			numero:numero,
			complemento:complemento
		};
		sessionStorage.setItem("dadosCliente",JSON.stringify(objPessoa));
		sessionStorage.setItem("dadosEntrega",JSON.stringify(objEnd));
		
		
		location.href = "confirmacao.html";
	
		
	}
}