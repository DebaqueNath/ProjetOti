Projet OTI
Debaque Nathanaël

Le projet est basé sur l'application réalisé en JS qui permet de convertir des données ICS au format JSON.

Liste des tests réalisés avec QUNIT:
- Test général d'une conversion ICS en JSON
- Test que la div source existe (Levée d'une exception)
- Test que la div cible existe (Levée d'une exception)
- Test de la méthode qui remplit un créneau
- Test qu'une alert affiche bel et bien le résultat attendu


Liste des tests réalisés avec Selenium (voir fichier selenium.html) :

- Test d'une conversion ICS en JSON lors du clique sur le bouton


Les tests ayant été réalisés avec QUNIT ne nécessitent pas d'actions de l'utilisateur.
Alors que le test réalisé avec Selenium simule le clic de l'utilisateur sur le bouton "Convertir".

La grosse difficulté pour mettre en place les tests à été d'adapter le code existant du projet. J'ai ajouté un fichier conversion_exc pour pouvoir gérer les exceptions lorsque
la source ou la cible vallent null, ce qui permet de faire un test sur les exceptions.

A FINIR (test karma):
Que pensez vous des apports de tests et de leur mise en place.
