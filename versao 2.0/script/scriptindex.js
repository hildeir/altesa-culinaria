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
	if(sessionStorage.getItem("pf") != null){
		montarQuant(sessionStorage.getItem("pf"),"pf");
	}
	if(sessionStorage.getItem("pp") != null){
		montarQuant(sessionStorage.getItem("pp"),"pp");
	}
	if(sessionStorage.getItem("pm") != null){
		montarQuant(sessionStorage.getItem("pm"),"pm");
	}
	/*
	let marm  = document.querySelectorAll(".marm");
	marm.forEach((elem)=>{
		elem.style.display = "none";
	})
	*/
	/* ocultaa o connteiner da monte sua  marmita */
	document.querySelector(".cont-marm").style.display = "none";
	/* fim */
}
/* essa parte ee o sisttema de escolhaa dad quantidaadee de marmita*/
function quantPrato(elem){
	let quant  =  elem.value;
	switch (quant){
		case 'null':
			document.querySelector(".cont-marm").style.display = "none";
			break;
		case "1":
			document.querySelector(".cont-marm").style.display = "block";
			document.querySelector(".marm-1").style.display = "block";
			document.querySelector(".marm-2").style.display = "none";
			break;
		case "2":
			document.querySelector(".cont-marm").style.display = "block";
			document.querySelector(".marm-1").style.display = "block";
			document.querySelector(".marm-2").style.display = "block";
			break;
	}
}
/* fim*/
function montaMarmita(){
	const marm_1_item_1 = document.querySelector(".marm-1-item-1").value;
	const marm_1_item_2 = document.querySelector(".marm-1-item-2").value;
	const marm_1_item_3 = document.querySelector(".marm-1-item-3").value;
	if(marm_1_item_1 != "null" || marm_1_item_2 != "null" || marm_1_item_3 != "null"){

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
		let marmita_1 = [m_1_item_0, m_1_item_1, m_1_item_2, m_1_item_3];
	
		/* remove os unndefined do array deixando no arraay apenas os prratos escolhidos*/
		marmita_1.filter((item,index)=>{
			if(item == undefined){
				marmita_1.splice(index,1);
			}
		});
		marmita_1.filter((item,index)=>{
			if(item == undefined){
				marmita_1.splice(index,1);
			}
		});
		/* fim */
		let uni = "";
		if(marmita_1.length == 1){
			uni = marmita_1.join("");
		}else if(marmita_1.length > 1){
			uni = marmita_1.join("-");
		}
		console.log(marmita_1);
		console.log(uni);
	
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
	/* aparecer a quaantidade no proprio item quando o usuarioo clica no itemm */
	montarQuant(sessionStorage.getItem("pm"),"pm");
	/* fim */
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
	/* aparecer a quaantidade no proprio item quando o usuarioo clica no itemm */
	montarQuant(sessionStorage.getItem("pf"),"pf");
	/* fim */
	
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
	/* aparecer a quaantidade no proprio item quando o usuarioo clica no itemm */
	montarQuant(sessionStorage.getItem("pp"),"pp");
	/* fim */
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
function montarQuant(pratos,categoria){
	if(categoria == "pf"){
		let pratoFeito = document.querySelectorAll(".cont-pratos-feitos .quant-item");
		let identificaQuantPratos = pratos.indexOf("-");
		
		if(identificaQuantPratos == -1){
			let obj = JSON.parse(pratos);
			pratoFeito[obj.id].innerHTML = `Quant: ${obj.quantidade}`;
		}else{
			let array = pratos.split("-");
			array.forEach((elem)=>{
				let obj = JSON.parse(elem);
				pratoFeito[obj.id].innerHTML = `Quant: ${obj.quantidade}`;
			});
		}
	}
	if(categoria == "pp"){
		let pratoFeito = document.querySelectorAll(".cont-pratos-promocao .quant-item");
		let identificaQuantPratos = pratos.indexOf("-");
		
		if(identificaQuantPratos == -1){
			let obj = JSON.parse(pratos);
			pratoFeito[obj.id].innerHTML = `Quant: ${obj.quantidade}`;
		}else{
			let array = pratos.split("-");
			array.forEach((elem)=>{
				let obj = JSON.parse(elem);
				pratoFeito[obj.id].innerHTML = `Quant: ${obj.quantidade}`;
			});
		}
	}
	if(categoria == "pm"){
		let pratoFeito = document.querySelectorAll(".cont-pratos .quant-item");
		let identificaQuantPratos = pratos.indexOf("-");
		
		if(identificaQuantPratos == -1){
			let obj = JSON.parse(pratos);
			pratoFeito[obj.id].innerHTML = `Quant: ${obj.quantidade}`;
		}else{
			let array = pratos.split("-");
			array.forEach((elem)=>{
				let obj = JSON.parse(elem);
				pratoFeito[obj.id].innerHTML = `Quant: ${obj.quantidade}`;
			});
		}
	}
}