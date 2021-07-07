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
	document.querySelector(".bt-add-carrinho").addEventListener('click',function(){
		montaMarmita();
	});
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
	document.querySelector(".onde-entregamos").addEventListener("click",function(){
		document.querySelector(".cont-entrega").style.display = "flex";
	});
	document.querySelector(".bt-entrega-fechar").addEventListener("click",function(){
		document.querySelector(".cont-entrega").style.display = "none";
	});
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
function montaMarmita(){
	let x = sessionStorage.getItem("quantMarm");
	if(x == null){
		var quantMarm = 0;
	}else{
		quantMarm = parseInt(sessionStorage.getItem("quantMarm"),10);
	}
	const marm_1_item_1 = document.querySelector(".marm-1-item-1").value;
	const marm_1_item_2 = document.querySelector(".marm-1-item-2").value;
	const marm_1_item_3 = document.querySelector(".marm-1-item-3").value;

	if(marm_1_item_1 != "null" || marm_1_item_2 != "null" || marm_1_item_3 != "null"){
		if(quantMarm < 10){
			
			const marmitas_temp = [marm_1_item_1, marm_1_item_2, marm_1_item_3];
			const encontrar_0 = marmitas_temp.filter((item)=>{
				if(item == "0"){
					return true;
				}
			});
			const encontrar_1 = marmitas_temp.filter((item)=>{
				if(item == "1"){
					return true;
				}
			});
			const encontrar_2 = marmitas_temp.filter((item)=>{
				if(item == "2"){
					return true;
				}
			});
			const encontrar_3 = marmitas_temp.filter((item)=>{
				if(item == "3"){
					return true;
				}
			});
			const encontrar_4 = marmitas_temp.filter((item)=>{
				if(item == "4"){
					return true;
				}
			});
			const encontrar_5 = marmitas_temp.filter((item)=>{
				if(item == "5"){
					return true;
				}
			});
			/* conta ass quantidaadde dos pratos*/
			if(encontrar_0.length != "0"){
				var m_1_item_0 = JSON.stringify({id:0,quantidade:encontrar_0.length});
			}
			if(encontrar_1.length != "0"){
				var m_1_item_1 = JSON.stringify({id:1,quantidade:encontrar_1.length});
			}
			if(encontrar_2.length != "0"){
				var m_1_item_2 = JSON.stringify({id:2,quantidade:encontrar_2.length});
			}
			if(encontrar_3.length != "0"){
				var m_1_item_3 = JSON.stringify({id:3,quantidade:encontrar_3.length});
			}
			if(encontrar_4.length != "0"){
				var m_1_item_4 = JSON.stringify({id:4,quantidade:encontrar_4.length});
			}
			if(encontrar_5.length != "0"){
				var m_1_item_5 = JSON.stringify({id:5,quantidade:encontrar_5.length});
			}
			/* fimm */
			let marmita_1 = [m_1_item_0, m_1_item_1, m_1_item_2, m_1_item_3, m_1_item_4, m_1_item_5];
			/* remove os unndefined do array deixando no arraay apenas os prratos escolhidos*/
			let continua = true;
			while(continua == true){
				for (let i = 0; i <= marmita_1.length; i++) {
					if(marmita_1[i] == undefined){
						marmita_1.filter((item,index)=>{
							if(item === undefined){
								marmita_1.splice(index,1);
								continua = true;
							}
						});
					}else{
						continua = false;
					}
				}
			}
			/* fim */
			/* coloca os praatos em uma so string */
			let uni = "";
			if(marmita_1.length == 1){
				uni = marmita_1.join("");
			}else if(marmita_1.length > 1){
				uni = marmita_1.join("-");
			}
			/* fim */
			if(quantMarm == 0){
				sessionStorage.setItem("quantMarm",quantMarm += 1);
				sessionStorage.setItem("marmitas-"+quantMarm,uni);
				contaPratos(1);
				objAlerta.alerta("Marmita adicionado ao carrinho");
				
				setTimeout(function(){
					objAlerta.fecha();
				},1400);
			}else{
				let outro = false;
				let i = 1;
				while (i <= quantMarm) {
					let marmmAtual = sessionStorage.getItem("marmitas-"+i);
					if(marmmAtual == null){
						sessionStorage.setItem("quantMarm",quantMarm += 1);
						sessionStorage.setItem("marmitas-"+i,uni);
						contaPratos(1);
						outro = false;
						i = quantMarm + 1;
						objAlerta.alerta("Marmita adicionado ao carrinho");

						setTimeout(function(){
							objAlerta.fecha();
						},1400);
					}else{
						i++;
						outro = true;
					}
				}
				if(outro == true){

					sessionStorage.setItem("quantMarm",quantMarm += 1);
					sessionStorage.setItem("marmitas-"+quantMarm,uni);
					contaPratos(1);
					objAlerta.alerta("Marmita adicionado ao carrinho");

					setTimeout(function(){
						objAlerta.fecha();
					},1400);
				}
			}

		}else{
			
			objAlerta.alerta("apenas 10 marmita por pedido");
			
		}
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