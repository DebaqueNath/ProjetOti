
	/*
         * -------------------- Première version avec une fonction --------------------------
         *
         * document.getElementById ("convertir").addEventListener(
		"click",
		function () {

                //On récupère les données ICS
                var icsData = document.getElementById('icsData').value;
                document.getElementById('jsonData').value ="";

                var tab = icsData.split("BEGIN:VEVENT");
                var tab2,tab3;

                for(var i = 1; i < tab.length ; i++){
                    document.getElementById('jsonData').value += "{\n";
                    tab2 = tab[i].split("\n");
                    for(var j = 1; j < tab2.length ; j++){
                     if(tab2[j].indexOf(":")!=-1){
                        tab3 = tab2[j].split(":");
                        document.getElementById('jsonData').value += tab3[0]+" : '"+tab3[1]+"',\n";
                     }
                    }
                    document.getElementById('jsonData').value += "}\n";
                }

                }
	);*/



        /* ---------------------------- Deuxième version avec un objet et découpage en fonctions ------------------------- */
        /*Conversion = {

            resultat : "",

            ihmConversion : function () {
                var icsData = document.getElementById('icsData').value;
                this.conversion(icsData);
                document.getElementById('jsonData').value = this.resultat;
            },

            handleEvent : function (event) {
                this.ihmConversion();
            },

            conversion : function (icsData) {
                var tab = icsData.split("BEGIN:VEVENT");

                for(var i = 1; i < tab.length ; i++){
                    this.resultat += "{\n";
                    var tab2 = tab[i].split("\n");
                    for(var j = 1; j < tab2.length ; j++){
                        this.conversionChamp(tab2[j]);
                    }
                    this.resultat += "}\n";
                }
            },

            conversionChamp : function (champActuel){
                if(champActuel.indexOf(":")!=-1){
                    var tab3 = champActuel.split(":");
                    this.resultat += tab3[0]+" : '"+tab3[1]+"',\n";
                }
                return "";
            }

        }*/

 	/* ---------------------------- Troisième version avec prototype ------------------------- */
        function verifSourceCible(source,cible){
          if(source == null) {
            throw new SourceNotExistExc();
          }
          if(cible == null) {
            throw new CibleNotExistExc();
          }
        }

        function Conversion(source, cible) {
         	this.source = source;
		      this.cible = cible;
          this.resultat = new String;
          this.message = "";
	      }


      	Conversion.prototype.handleEvent = function(event) {
      		this.ihmConversion();
      	}

      	Conversion.prototype.ihmConversion = function() {

          try{
              verifSourceCible(this.source,this.cible);
          }catch (e) {
              this.message=e.toString();
          }

          if(this.source != null){
              this.conversion(this.source.value);
          }
      		if(this.cible != null) {
            this.cible.value = this.resultat;
          }

          alert(this.resultat);

      	}

      	Conversion.prototype.conversion = function(icsData) {
      		var tab = icsData.split("BEGIN:VEVENT");
      		var creneau = new Creneau();

            for(var i = 1; i < tab.length ; i++){
              this.resultat += "{";
              var tab2 = tab[i].split("\n");
              for(var j = 1; j < tab2.length ; j++){
                  this.conversionChamp(creneau,tab2[j]);
              }

      		    //Affichage du creneau
      		    this.resultat += "\"debut\": '"+creneau.debut+"',\"fin\": '"+creneau.fin+"',\"resume\": '"+creneau.resume+"',\"lieu\": '"+creneau.lieu+"'";
              this.resultat += "}\n";
            }
      	}


        Conversion.prototype.conversionChamp = function (creneau,champActuel) {
        		if(champActuel.indexOf(":")!==-1){
              console.log(champActuel);
        			var tab3 = champActuel.split(":");
        			if(tab3[0].startsWith("DTSTART")){
        				creneau.debut = tab3[1];
        			} else if(tab3[0].startsWith("DTEND")){
        				creneau.fin = tab3[1];
        			} else if(tab3[0].startsWith("SUMMARY")){
        				creneau.resume = tab3[1];
        			} else if(tab3[0].startsWith("LOCATION")){
        				creneau.lieu = tab3[1];
        			}
        		}
	      }

	//Classe créneau
	function Creneau(){
	   this.debut;
	   this.fin;
	   this.resume;
	   this.lieu;
	}

  /* ---------------------------- Quatrième version avec class -------------------------
      class Conversion {

          constructor(source,cible){
             	this.source = document.getElementById('icsData');
    		      this.cible = document.getElementById('jsonData');
              this.resultat = new Array();
          }


        	function handleEvent(event) {
        		this.ihmConversion();
        	}


        	function ihmConversion() {
        		this.conversion(this.source.value);
        		this.cible.value = JSON.stringify(this.resultat);
        	}

        	function conversion(icsData) {
        		var tab = icsData.split("BEGIN:VEVENT");
            tab.shift();
            for(var i = 0; i < tab.length ; i++){
                  var creneau = new Creneau();
                  var tab2 = tab[i].split("\n");
                  tab2.shift();
                  for(var j = 0; j < tab2.length ; j++){
                      this.conversionChamp(creneau,tab2[j]);
                  }
                  this.resultat.push(creneau);
            }
        	}


          function conversionChamp(creneau,champActuel) {
        		if(champActuel.indexOf(":")!=-1){
        			var tab3 = champActuel.split(":");
        			if(tab3[0].startsWith("DTSTART")){
        				creneau.debut = tab3[1];
        			} else if(tab3[0].startsWith("DTEND")){
        				creneau.fin = tab3[1];
        			} else if(tab3[0].startsWith("SUMMARY")){
        				creneau.resume = tab3[1];
        			} else if(tab3[0].startsWith("LOCATION")){
        				creneau.lieu = tab3[1];
        			}
        		}
        	}
      }

      //Classe créneau
      class Creneau {
        constructor(source,cible){
          this.debut;
          this.fin;
          this.resume;
          this.lieu;
        }

      }
*/
      //On ajoute l'event listener
      document.getElementById ("convertir").addEventListener("click",new Conversion(document.getElementById('icsData'),document.getElementById('jsonData')));
