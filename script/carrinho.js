window.onload = inicia;
function inicia(){
	if(sessionStorage.getItem("pm") == null || sessionStorage.getItem("pf") == null){
		location.href = "/sitetair";
	}
	
}	

