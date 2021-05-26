window.onload = inicia;
function inicia(){
	let pratos1 = document.querySelectorAll(".bt-monte-prato");
	pratos1.forEach((ele)=>{
		let id = ele.getAttribute("data-id");
		ele.addEventListener("click",()=>{
			montaprato(id);
		});
	});

	let pratos2 = document.querySelectorAll(".bt-prato-feito");
	pratos2.forEach((ele2)=>{
		let id2 = ele2.getAttribute("data-id");
		ele2.addEventListener('click',()=>{
			pratosFeitos(id2);
		});
	});

	let pratos3 = document.querySelectorAll(".bt-prato-promocao");
	pratos3.forEach((ele3)=>{
		let id3 = ele3.getAttribute("data-id");
		ele3.addEventListener('click',()=>{
			pratosPromocao(id3);
			
		});
	});
	if(sessionStorage.getItem("quantidade") != null){
		document.querySelector(".quant-carr").innerHTML = sessionStorage.getItem("quantidade");
	}
}

function montaprato(id){
	let total = sessionStorage.getItem("totalmontar");
	if(total == null){
		let prato = JSON.stringify({id:id,quantidade:1});
		sessionStorage.setItem("pm",prato);
		sessionStorage.setItem("totalmontar",1);
		contaPratos();
	
	}else if(total < '3'){
		contaPratos();
		let prato = sessionStorage.getItem("pm");
		let r = prato.indexOf("-");

		if(r == -1){
			let prato = JSON.parse(sessionStorage.getItem("pm"));
			if(prato.id == id){
				let updateQuant = prato.quantidade += 1;
				let x = JSON.stringify({id:prato.id,quantidade:updateQuant});
				sessionStorage.setItem("pm",x);

				let totalInt = parseInt(total,10);
				sessionStorage.setItem('totalmontar',totalInt += 1);
			}else{
				let outroPrato = JSON.stringify({id:id,quantidade:1});
				let pratoAnterior = sessionStorage.getItem("pm");
				sessionStorage.setItem("pm",pratoAnterior+"-"+outroPrato);

				let totalInt = parseInt(total,10);
				sessionStorage.setItem('totalmontar',totalInt += 1);
			}
		}else{
			//let pratoUpdate = [];
			let outroPrato = [];
			let idExistente;
			let pratosArray = prato.split("-");
			pratosArray.map((ele)=>{
				let obj = JSON.parse(ele);
				if(obj.id == id){
					let updateQuant = obj.quantidade += 1;
					outroPrato.push(JSON.stringify({id:obj.id,quantidade:updateQuant}));

					let totalInt = parseInt(total,10);
					sessionStorage.setItem('totalmontar',totalInt += 1);
					idExistente = obj.id;
				}else{
					outroPrato.push(JSON.stringify(obj));
				}

			});
			if(id != idExistente){
				outroPrato.push(JSON.stringify({id:id,quantidade:1}));
				let totalInt = parseInt(total,10);
				sessionStorage.setItem('totalmontar',totalInt += 1);
			}
			let unir = outroPrato.join("-");
			sessionStorage.setItem("pm",unir);
			
		}

	}else{
		alert("so pode montar a marmita com 3 itens");
	}
}
function pratosFeitos(id){
	let pratos = sessionStorage.getItem("pf");
	let totalPratosFeitos = sessionStorage.getItem("totalPratosFeitos");
	if(totalPratosFeitos == null){
		sessionStorage.setItem("pf",JSON.stringify({id:id,quantidade:1}));
		sessionStorage.setItem("totalPratosFeitos",1);
		contaPratos();

	}else if(totalPratosFeitos < '4'){
		contaPratos();
		let result = pratos.indexOf("-");
		if(result == -1){
			let x = JSON.parse(sessionStorage.getItem("pf"));
			if(x.id == id){
				//se enconttra oo mesmo prato, acrescenta a quantidadde
				let updatePrato = JSON.stringify({id:id,quantidade:x.quantidade+=1});
				sessionStorage.setItem("pf",updatePrato);
				
				let totalPFint = parseInt(totalPratosFeitos,10);
				sessionStorage.setItem("totalPratosFeitos",totalPFint+=1);
			}else{
				let pratoAnterior = sessionStorage.getItem('pf');
				let novoPrato = JSON.stringify({id:id,quantidade:1});
				sessionStorage.setItem('pf',pratoAnterior+"-"+novoPrato);

				let totalPFint = parseInt(totalPratosFeitos,10);
				sessionStorage.setItem("totalPratosFeitos",totalPFint+=1);
			}
		
		}else{
			//se existe ssessao ocom mais de 1 json desmembra e seta a session com vallor aatualizado
			//let pratoUpdate = [];
			let outroPrato = [];
			let pratos2 = pratos.split("-");
			let idExistente;
			pratos2.map((ele)=>{
				let obj = JSON.parse(ele);
				if(obj.id == id){
					let updateQuant = obj.quantidade += 1;
					outroPrato.push(JSON.stringify({id:obj.id,quantidade:updateQuant}));
					idExistente = obj.id;

				}else{
					outroPrato.push(JSON.stringify(obj));
					
				}

			});
			if(id != idExistente){
				outroPrato.push(JSON.stringify({id:id,quantidade:1}));
			}
			
			let x = outroPrato.join("-");
			sessionStorage.setItem("pf",x);
			let totalPFint = parseInt(totalPratosFeitos,10);
			sessionStorage.setItem("totalPratosFeitos",totalPFint+=1);
			
		}	
	}else{
		alert("voce excedeu a quantidade de pedidos");
	}

}
function pratosPromocao(id){
	let pratos = sessionStorage.getItem("pp");
	let totalPratosFeitos = sessionStorage.getItem("totalPratosPromocao");
	if(totalPratosFeitos == null){
		sessionStorage.setItem("pp",JSON.stringify({id:id,quantidade:1}));
		sessionStorage.setItem("totalPratosPromocao",1);
		contaPratos();

	}else if(totalPratosFeitos < '4'){
		contaPratos();
		let result = pratos.indexOf("-");
		if(result == -1){
			let x = JSON.parse(sessionStorage.getItem("pp"));
			if(x.id == id){
				//se enconttra oo mesmo prato, acrescenta a quantidadde
				let updatePrato = JSON.stringify({id:id,quantidade:x.quantidade+=1});
				sessionStorage.setItem("pp",updatePrato);
				
				let totalPFint = parseInt(totalPratosFeitos,10);
				sessionStorage.setItem("totalPratosPromocao",totalPFint+=1);
				
			}else{
				let pratoAnterior = sessionStorage.getItem('pp');
				let novoPrato = JSON.stringify({id:id,quantidade:1});
				sessionStorage.setItem('pp',pratoAnterior+"-"+novoPrato);

				let totalPFint = parseInt(totalPratosFeitos,10);
				sessionStorage.setItem("totalPratosPromocao",totalPFint+=1);
				
			}
		
		}else{
			//se existe ssessao ocom mais de 1 json desmembra e seta a session com vallor aatualizado
			//let pratoUpdate = [];
			let outroPrato = [];
			let pratos2 = pratos.split("-");
			let idExistente;
			pratos2.map((ele)=>{
				let obj = JSON.parse(ele);
				if(obj.id == id){
					let updateQuant = obj.quantidade += 1;
					outroPrato.push(JSON.stringify({id:obj.id,quantidade:updateQuant}));
					idExistente = obj.id;
					

				}else{
					outroPrato.push(JSON.stringify(obj));
					
				}

			});
			if(id != idExistente){
				outroPrato.push(JSON.stringify({id:id,quantidade:1}));
				
			}
			
			let x = outroPrato.join("-");
			sessionStorage.setItem("pp",x);
			let totalPFint = parseInt(totalPratosFeitos,10);
			sessionStorage.setItem("totalPratosPromocao",totalPFint+=1);
		}	
	}else{
		alert("voce excedeu a quantidade de pedidos");
	}
}
function contaPratos(){	
	let quant = sessionStorage.getItem("quantidade");
	if(quant == null){
		sessionStorage.setItem("quantidade",1);
		document.querySelector(".quant-carr").innerHTML = 1;
	}else{
		let x = parseInt(quant);
		let y = x+=1;
		sessionStorage.setItem("quantidade",y);
		document.querySelector(".quant-carr").innerHTML = y;
	}
	
}