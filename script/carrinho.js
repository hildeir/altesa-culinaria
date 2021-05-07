window.onload = inicia;
function inicia(){
	let pm = sessionStorage.getItem("pm");
	let pf = sessionStorage.getItem("pf");
	if(pm == null || pf  == null || pm == "" || pf == ""){
		location.href = "/sitetair";
	}else{
		monta();
	}
	
}	
function monta(){

}