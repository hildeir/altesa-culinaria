window.onload = inicia;
/* box dde aalerta */
var objAlerta = {
	alerta: function(texto){
		document.querySelector(".cont-box-model").style.display = "flex";
		document.querySelector(".texto-boxmodel").innerHTML = texto;
		document.querySelector(".bt-ok-boxmodel").addEventListener("click",function(){
			document.querySelector(".cont-box-model").style.display = "none";
		});
	},
	fecha: function(){
		document.querySelector(".cont-box-model").style.display = "none";
		
	}
};
/* fimm */
function inicia(){
	let pratos2 = document.querySelectorAll(".bt-prato-feito");
	pratos2.forEach((elem)=>{
		elem.addEventListener('click',pratosFeitos);
	});
	let pratosPr = document.querySelectorAll(".bt-prato-promocao");
	pratosPr.forEach((elem)=>{
		elem.addEventListener('click',pratosPromocao);
	});

	if(sessionStorage.getItem("quantidade") != null){
		document.querySelector(".quant-carr").innerHTML = sessionStorage.getItem("quantidade");
	}
	
	/* bbotao ddee aumenttar e diminuirr a quantidadae  ddee itteenss */
	let aumentar = document.querySelectorAll(".aumentar");
	aumentar.forEach((elem)=>{
		elem.addEventListener("click",aumenta);
	});
	let diminuir = document.querySelectorAll(".diminuir");
	diminuir.forEach((elem)=>{
		elem.addEventListener("click",diminui);
	});
	/** ffiim */
	/* abre e fecha o box dde ondde entregamos*/
	let entrega = document.querySelectorAll(".onde-entregamos");
	entrega.forEach((elem)=>{
		elem.addEventListener("click",function(){
			document.querySelector(".cont-entrega").style.display = "flex"});
	});
	document.querySelector(".bt-entrega-fechar").addEventListener("click",function(){
		document.querySelector(".cont-entrega").style.display = "none";
	});
	/* fim */
	//* aabre e fecha o naav mobile */
	document.querySelector('.bt-mobile').addEventListener("click",()=>{
		document.querySelector(".nav-mobile").style.right = "0px";
	});
	document.querySelector(".bt-fechar-mobile-nav").addEventListener("click",()=>{
		document.querySelector(".nav-mobile").style.right = "-275px";
	});
	/* fim */
}
function aumenta(e){
	let cont = e.target.closest(".cont-bts");
	let quant = cont.querySelector(".quant");
	let valor =  parseInt(quant.innerText);
	let aumenta = valor + 1;
	quant.innerHTML = aumenta;
	
}
function diminui(e){
	let cont = e.target.closest(".cont-bts");
	let quant = cont.querySelector(".quant");
	let valor =  parseInt(quant.innerText);
	if(valor > 1){
		var diminuir = valor - 1;
		quant.innerHTML = diminuir;
	}
	
	
}

function pratosFeitos(e){
	let id = parseInt(e.target.getAttribute("data-id"));
	let cont = e.target.closest(".cont-bts");
	let quant_item = parseInt(cont.querySelector(".quant").innerText);
	
	let pratos = sessionStorage.getItem("pf");
	let totalPratosFeitos = sessionStorage.getItem("totalPratosFeitos");
	let total_pratos = parseInt(totalPratosFeitos) + quant_item;
	if(totalPratosFeitos == null){
		if(quant_item <= 100){

			sessionStorage.setItem("pf",JSON.stringify({id:id,quantidade:quant_item}));
			sessionStorage.setItem("totalPratosFeitos",quant_item);
			contaPratos(quant_item);
			objAlerta.alerta("Prato adicionado ao carrinho");

			setTimeout(function(){
				objAlerta.fecha();
			},1400);
		}else{
			objAlerta.alerta("excedeu a quantidade");
		}

	}else if(total_pratos <= 100){
		
		let result = pratos.indexOf("-");
		if(result == -1){
			let x = JSON.parse(sessionStorage.getItem("pf"));
			if(x.id == id){
				//se enconttra oo mesmo prato, acrescenta a quantidadde
				let updatePrato = JSON.stringify({id:id,quantidade:x.quantidade+=quant_item});
				sessionStorage.setItem("pf",updatePrato);
				
				let totalPFint = parseInt(totalPratosFeitos,10);
				sessionStorage.setItem("totalPratosFeitos",totalPFint+=quant_item);
				objAlerta.alerta("Prato adicionado ao carrinho");

				setTimeout(function(){
					objAlerta.fecha();
				},1400);

			}else{
				let pratoAnterior = sessionStorage.getItem('pf');
				let novoPrato = JSON.stringify({id:id,quantidade:quant_item});
				sessionStorage.setItem('pf',pratoAnterior+"-"+novoPrato);

				let totalPFint = parseInt(totalPratosFeitos,10);
				sessionStorage.setItem("totalPratosFeitos",totalPFint+=quant_item);
				objAlerta.alerta("Prato adicionado ao carrinho");

				setTimeout(function(){
					objAlerta.fecha();
				},1400);
			}
		
		}else{
			//se existe ssessao ocom mais de 1 json desmembra e seta a session com vallor aatualizado
			
			let outroPrato = [];
			let pratos2 = pratos.split("-");
			let idExistente;
			pratos2.map((ele)=>{
				let obj = JSON.parse(ele);
				if(obj.id == id){
					let updateQuant = obj.quantidade += quant_item;
					outroPrato.push(JSON.stringify({id:obj.id,quantidade:updateQuant}));
					idExistente = obj.id;

				}else{
					outroPrato.push(JSON.stringify(obj));
					
				}

			});
			if(id != idExistente){
				outroPrato.push(JSON.stringify({id:id,quantidade:quant_item}));
			}
			
			let x = outroPrato.join("-");
			sessionStorage.setItem("pf",x);
			let totalPFint = parseInt(totalPratosFeitos,10);
			sessionStorage.setItem("totalPratosFeitos",totalPFint+=quant_item);
			objAlerta.alerta("Prato adicionado ao carrinho");
			setTimeout(function(){
				objAlerta.fecha();
			},1400);
			
		}	
		contaPratos(quant_item);
	}else{
		objAlerta.alerta("você excedeu a quantidade de pedido");
	}
	
	
}
function pratosPromocao(e){
	let id = parseInt(e.target.getAttribute("data-id"));
	let cont = e.target.closest(".cont-bts");
	let quant_item = parseInt(cont.querySelector(".quant").innerText);

	let pratos = sessionStorage.getItem("pp");
	let totalPratosFeitos = sessionStorage.getItem("totalPratosPromocao");
	let total_pratos = parseInt(totalPratosFeitos) + quant_item;
	if(totalPratosFeitos == null){
		if(quant_item <= 100){
			sessionStorage.setItem("pp",JSON.stringify({id:id,quantidade:quant_item}));
			sessionStorage.setItem("totalPratosPromocao",1);
			contaPratos(quant_item);
		}else{
			objAlerta.alerta("excedeu a quantidade");
		}

	}else if(total_pratos <= 100){
		
		let result = pratos.indexOf("-");
		if(result == -1){
			let x = JSON.parse(sessionStorage.getItem("pp"));
			if(x.id == id){
				//se enconttra oo mesmo prato, acrescenta a quantidadde
				let updatePrato = JSON.stringify({id:id,quantidade:x.quantidade+=quant_item});
				sessionStorage.setItem("pp",updatePrato);
				
				let totalPFint = parseInt(totalPratosFeitos,10);
				sessionStorage.setItem("totalPratosPromocao",totalPFint+=quant_item);
				
			}else{
				let pratoAnterior = sessionStorage.getItem('pp');
				let novoPrato = JSON.stringify({id:id,quantidade:quant_item});
				sessionStorage.setItem('pp',pratoAnterior+"-"+novoPrato);

				let totalPFint = parseInt(totalPratosFeitos,10);
				sessionStorage.setItem("totalPratosPromocao",totalPFint+=quant_item);
				
			}
		
		}else{
			//se existe ssessao ocom mais de 1 json desmembra e seta a session com vallor aatualizado
			let outroPrato = [];
			let pratos2 = pratos.split("-");
			let idExistente;
			pratos2.map((ele)=>{
				let obj = JSON.parse(ele);
				if(obj.id == id){
					let updateQuant = obj.quantidade += quant_item;
					outroPrato.push(JSON.stringify({id:obj.id,quantidade:updateQuant}));
					idExistente = obj.id;
					

				}else{
					outroPrato.push(JSON.stringify(obj));
					
				}

			});
			if(id != idExistente){
				outroPrato.push(JSON.stringify({id:id,quantidade:quant_item}));
				
			}
			
			let x = outroPrato.join("-");
			sessionStorage.setItem("pp",x);
			let totalPFint = parseInt(totalPratosFeitos,10);
			sessionStorage.setItem("totalPratosPromocao",totalPFint+=quant_item);
		}	
		contaPratos(quant_item);
	}else{
		objAlerta.alerta("você excedeu a quantidade de pedido");
	}
}
function contaPratos(quant_item){	
	let quant = sessionStorage.getItem("quantidade");
	if(quant == null){
		sessionStorage.setItem("quantidade",quant_item);
		document.querySelector(".quant-carr").innerHTML = quant_item;
	}else{
		let x = parseInt(quant);
		let y = x+=quant_item;
		sessionStorage.setItem("quantidade",y);
		document.querySelector(".quant-carr").innerHTML = y;
	}
}
