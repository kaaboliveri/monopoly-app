# Instructions pour copier les assets

Copiez manuellement les dossiers suivants depuis le répertoire parent vers `public/assets/` :

```
stitch_menu_principal/
├── plateau_de_jeu/ → public/assets/plateau_de_jeu/
├── menu_principal/ → public/assets/menu_principal/
├── fin_de_partie_/ → public/assets/fin_de_partie/
├── gestion_des_propriétés/ → public/assets/gestion_proprietes/
├── achats_et_enchères_(modale)_/ → public/assets/modal_achats/
├── modale_prison/ → public/assets/modal_prison/
├── modale_carte_chance/ → public/assets/modal_chance/
├── modale_caisse_de_communauté/ → public/assets/modal_communaute/
├── modale_case_départ/ → public/assets/modal_depart/
├── modale_impôt_sur_le_revenu/ → public/assets/modal_impot/
└── ... (tous les autres dossiers)
```

OU utiliser la commande PowerShell :
```powershell
Copy-Item -Path "..\plateau_de_jeu" -Destination "public\assets\" -Recurse
Copy-Item -Path "..\menu_principal" -Destination "public\assets\" -Recurse
# etc...
```
