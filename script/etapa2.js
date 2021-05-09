window.onload = inicia;
function inicia(){
	sessionStorage.removeItem("dados");
	let pm = sessionStorage.getItem("pm");
	let pf = sessionStorage.getItem("pf");
	if(pm == null && pf == null){
		location.href = "/sitetair";
	}else if(pm == "" && pf == ""){
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
			phone:phone,
			regiao:regiao,
			ende:ende,
			numero:numero,
			complemento:complemento
		};
		sessionStorage.setItem("dados",JSON.stringify(objPessoa));
		location.href = "confirmacao.html";
	}
}