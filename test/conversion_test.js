//Test entier d'une conversion
QUnit.test("test_conversion_valide", function(assert)
{
           var fixture="";
           fixture+=("<div class='col-lg-12'>");
           fixture+=("<textarea class='form­control' id='icsData' rows='15' cols='100'>BEGIN:VEVENT\nDTSTART:20160907T153000Z\nDTEND:20160907T161500Z\nSUMMARY:Évolutions pour le logiciel Smiles2Monomers\nLOCATION:M5 - A1\nDESCRIPTION:L'objectif principal était d'améliorer et recréer des méthodes pour obtenir des meilleurs résultats.\nStage effectué par Congcong Xu à Inria.\nRéférent entreprise : Maude Pupin\nTuteur universitaire : Marius Bilasco\nEND:VEVENT</textarea>");
           fixture+=("</div>");
           fixture+=("<div class='col-lg-12'><label for='jsonData' class='control­label'>Données JSON</label></div></div>");
           fixture+=("<div class='row'><div class='col-lg-12'><textarea class='form­control' id='jsonData' rows='15' cols='100'></textarea></div></div>");


           var fixtureNode=document.getElementById("qunit-fixture");
           fixtureNode.innerHTML=fixture;

           var c = new Conversion(document.getElementById('icsData'),document.getElementById('jsonData'));
           c.ihmConversion();

           assert.equal(document.getElementById("jsonData").value,"{\"debut\": '20160907T153000Z',\"fin\": '20160907T161500Z',\"resume\": 'Évolutions pour le logiciel Smiles2Monomers',\"lieu\": 'M5 - A1'}\n");
}
);

//Test la levée d'exception si la div source n'existe pas
QUnit.test("test_source_NotExist", function(assert)
{
           var fixture="";
           fixture+=("<div class='col-lg-12'><label for='jsonData' class='control­label'>Données JSON</label></div></div>");
           fixture+=("<div class='row'><div class='col-lg-12'><textarea class='form­control' id='jsonData' rows='15' cols='100'></textarea></div></div>");

           var fixtureNode=document.getElementById("qunit-fixture");
           fixtureNode.innerHTML=fixture;

           var c = new Conversion(null,document.getElementById('jsonData'));
           c.ihmConversion();

           assert.equal("La balise source n'existe pas",c.message);
}
);


//Test la levée d'exception si la div cible n'existe pas
QUnit.test("test_cible_NotExist", function(assert)
{
           var fixture="";
           fixture+=("<div class='col-lg-12'>");
           fixture+=("<textarea class='form­control' id='icsData' rows='15' cols='100'>BEGIN:VEVENT\nDTSTART:20160907T153000Z\nDTEND:20160907T161500Z\nSUMMARY:Évolutions pour le logiciel Smiles2Monomers\nLOCATION:M5 - A1\nDESCRIPTION:L'objectif principal était d'améliorer et recréer des méthodes pour obtenir des meilleurs résultats.\nStage effectué par Congcong Xu à Inria.\nRéférent entreprise : Maude Pupin\nTuteur universitaire : Marius Bilasco\nEND:VEVENT</textarea>");
           fixture+=("</div>");

           var fixtureNode=document.getElementById("qunit-fixture");
           fixtureNode.innerHTML=fixture;

           var c = new Conversion(document.getElementById('icsData'),null);
           c.ihmConversion();

           assert.equal("La balise cible n'existe pas",c.message);
}
);

//Test de la méthode qui remplit un créneau
QUnit.test("test_creneau", function(assert)
{

  var fixture="";
  fixture+=("<div class='col-lg-12'>");
  fixture+=("<textarea class='form­control' id='icsData' rows='15' cols='100'>BEGIN:VEVENT\nDTSTART:20160907T153000Z\nDTEND:20160907T161500Z\nSUMMARY:Évolutions pour le logiciel Smiles2Monomers\nLOCATION:M5 - A1\nDESCRIPTION:L'objectif principal était d'améliorer et recréer des méthodes pour obtenir des meilleurs résultats.\nStage effectué par Congcong Xu à Inria.\nRéférent entreprise : Maude Pupin\nTuteur universitaire : Marius Bilasco\nEND:VEVENT</textarea>");
  fixture+=("</div>");
  fixture+=("<div class='col-lg-12'><label for='jsonData' class='control­label'>Données JSON</label></div></div>");
  fixture+=("<div class='row'><div class='col-lg-12'><textarea class='form­control' id='jsonData' rows='15' cols='100'></textarea></div></div>");

  var fixtureNode=document.getElementById("qunit-fixture");
  fixtureNode.innerHTML=fixture;

  var c = new Conversion(document.getElementById('icsData'),document.getElementById('jsonData'));
  var creneau = new Creneau();

  c.conversionChamp(creneau,"DTSTART:20160907T153000Z");
  c.conversionChamp(creneau,"DTEND:20160907T161500Z");
  c.conversionChamp(creneau,"SUMMARY:Évolutions pour le logiciel Smiles2Monomers");
  c.conversionChamp(creneau,"LOCATION:M5 - A1");


  assert.equal(creneau.debut,"20160907T153000Z");
  assert.equal(creneau.fin,"20160907T161500Z");
  assert.equal(creneau.resume,"Évolutions pour le logiciel Smiles2Monomers");
  assert.equal(creneau.lieu,"M5 - A1");

}
);


//Test que le résultat est bien affiché dans l'alert
QUnit.test("test_affichage_alert", function(assert)
{
           var fixture="";
           fixture+=("<div class='col-lg-12'>");
           fixture+=("<textarea class='form­control' id='icsData' rows='15' cols='100'>BEGIN:VEVENT\nDTSTART:20160907T153000Z\nDTEND:20160907T161500Z\nSUMMARY:Évolutions pour le logiciel Smiles2Monomers\nLOCATION:M5 - A1\nDESCRIPTION:L'objectif principal était d'améliorer et recréer des méthodes pour obtenir des meilleurs résultats.\nStage effectué par Congcong Xu à Inria.\nRéférent entreprise : Maude Pupin\nTuteur universitaire : Marius Bilasco\nEND:VEVENT</textarea>");
           fixture+=("</div>");
           fixture+=("<div class='col-lg-12'><label for='jsonData' class='control­label'>Données JSON</label></div></div>");
           fixture+=("<div class='row'><div class='col-lg-12'><textarea class='form­control' id='jsonData' rows='15' cols='100'></textarea></div></div>");
           fixture+=("<div id='res'></div>");

          var old_alert=window.alert;
           //On redéfinit la méthode alert
           window.alert=function(s){
             document.getElementById("res").innerHTML=s;
           }

           window.alert=old_alert;

           var fixtureNode=document.getElementById("qunit-fixture");
           fixtureNode.innerHTML=fixture;

           var c = new Conversion(document.getElementById('icsData'),document.getElementById('jsonData'));
           c.ihmConversion();
           assert.equal(document.getElementById("res").innerHTML,"{\"debut\": '20160907T153000Z',\"fin\": '20160907T161500Z',\"resume\": 'Évolutions pour le logiciel Smiles2Monomers',\"lieu\": 'M5 - A1'}\n");
}
);
