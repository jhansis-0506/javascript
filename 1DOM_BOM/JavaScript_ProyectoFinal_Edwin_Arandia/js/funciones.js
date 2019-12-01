function registrar(){
			codigoText = document.getElementById("codigo").value; 
			nombreText = document.getElementById("nombre").value;
			notaText = document.getElementById("nota").value;
			if (codigoText != '' && nombreText != '' && notaText != ''){
				if (!isNaN(notaText)){
					if (jsonText.lastIndexOf()==-1){
						jsonText += '{"codigo":"'+codigoText+'","nombre":"'+nombreText+'","nota":'+notaText+'},';
					}					
					alert("Estudiante registrado");
				}else{
					alert('La nota debe ser un número');
				}
				
			}else{
				alert('verifique los campos e intente nuevamente');
			}
		}
		//verificar json
		function verificarJSON(){
			//alert(jsonText.lastIndexOf(",")+'='+jsonText.lastIndexOf("]}"));
			if (jsonText.lastIndexOf(",")!=-1){
				jsonText = jsonText.substr(0,jsonText.length-1)+"]}";
			}else{
				alert(jsonText.lastIndexOf("]}")+'plop');
				if(jsonText.lastIndexOf("]}")==-1){
					jsonText += ']}';
				}
			}
			if(jsonText.indexOf("}]}")==-1){				
				jsonText = jsonText.replace("}]]}","}]}");
			}
			json = JSON.parse(jsonText);
			nro_total = json.estudiante.length;
				if (nro_total){
					return nro_total;
				}else{
					return 0;
				}	
		}
		function promedio(){
			
			nro_total = verificarJSON();
			total = 0;
			texto = "";
			if (nro_total){

				for (var i=0;i<nro_total;i++){
					total += parseFloat(json.estudiante[i].nota);
					texto += "<tr id='color'><td>"+json.estudiante[i].codigo+"</td><td>"+json.estudiante[i].nombre+"</td><td>"+json.estudiante[i].nota+"</td></tr>";
				
				}
				promedio =  total / nro_total;
				alert("El promedio es "+promedio);
				document.getElementById("resultado").innerHTML = texto;
			}else{
				mensaje();
			}

		}
		function mayor(){
			nro_total = verificarJSON();
			total = 0;
			
			if (nro_total){
				mayor = json.estudiante[0].nota;
				codigoMax = json.estudiante[0].codigo;
				nombreMax = json.estudiante[0].nombre;
				for (var i=0;i<json.estudiante.length;i++){
					if (json.estudiante[i].nota>mayor){
						mayor = json.estudiante[i].nota;
						codigoMax = json.estudiante[i].codigo;
						nombreMax = json.estudiante[i].nombre;
					}
				}
				alert("La nota mayor es "+mayor);
				texto = "<tr><td>"+codigoMax+"</td><td>"+nombreMax+"</td><td>"+mayor+"</td></tr>";
				document.getElementById("resultado").innerHTML = texto;
			}else{
				mensaje();
			}
		}
		function menor(){
			nro_total = verificarJSON();
			total = 0;
			
			if (nro_total){
				menor = json.estudiante[0].nota;
				codigoMen = json.estudiante[0].codigo;
				nombreMen = json.estudiante[0].nombre;
				for (var i=0;i<json.estudiante.length;i++){
					if (json.estudiante[i].nota<menor){
						menor = json.estudiante[i].nota;
						codigoMen = json.estudiante[i].codigo;
						nombreMen = json.estudiante[i].nombre;
					}
				}
				alert("La nota menor es "+menor);
				texto = "<tr><td>"+codigoMen+"</td><td>"+nombreMen+"</td><td>"+menor+"</td></tr>";
				document.getElementById("resultado").innerHTML = texto;
			}else{
				mensaje();
			}
		}
		function mensaje(){
			alert('No existe ningun estudiante registrado');
		}