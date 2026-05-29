# Lecteur de Planning

Application web (PWA) : vue **semaine (lun->ven)**, agenda, mois, **recherche globale**, ecran **"Qui voulez-vous voir ?"**, et detail des interventions avec **l'equipe terrain**. Optimisee mobile + installable.

---

## Mettre a jour le planning -- METHODE SIMPLE (recommandee, sans robot)

Toute la conversion se fait dans le navigateur, vous ne manipulez que le fichier `planning-data.json`.

1. Ouvrez l'application (votre lien GitHub Pages, ou en local).
2. Cliquez **Mettre a jour** et choisissez votre nouvel export **Excel**. Verifiez que le planning s'affiche.
3. Cliquez **Exporter pour le web** -> un fichier **`planning-data.json`** se telecharge.
4. Sur GitHub, dans le depot : ouvrez l'ancien `planning-data.json` -> icone crayon (Edit)... ou plus simple **Add file -> Upload files** et deposez le nouveau `planning-data.json` (il remplace l'ancien) -> **Commit changes**.
5. Au bout d'1 minute, le site et l'appli mobile affichent les nouvelles donnees. Sur le telephone, tirez la page vers le bas pour rafraichir.

> L'application accepte aussi l'import **direct d'un `.json`** (bouton **Mettre a jour**), pratique pour verifier un fichier avant de l'envoyer.

Cette methode ne depend d'aucun robot ni autorisation : c'est la plus fiable.

---

## Mise en ligne sur GitHub Pages (une seule fois)

1. **github.com -> New repository** (Public). **Create repository**.
2. **Add file -> Upload files** : deposez tout le contenu du dossier (`index.html`, `planning-data.json`, `manifest.webmanifest`, `service-worker.js`, dossier `icons`).
3. **Commit changes**.
4. **Settings -> Pages -> Source** : *Deploy from a branch* -> **main** / **/ (root)** -> **Save**.
5. Le lien apparait : `https://VOTRE-PSEUDO.github.io/NOM-DU-DEPOT/`

---

## Installer comme une application sur le telephone

Ouvrez le lien dans le navigateur du telephone :
- **iPhone (Safari)** : *Partager* -> **Sur l'ecran d'accueil**.
- **Android (Chrome)** : menu -> **Installer l'application**.

Plein ecran + fonctionne hors-ligne.

---

## (Optionnel) Mise a jour automatique par robot

Le dossier contient aussi un robot GitHub Actions (`.github/workflows/build-data.yml` + `scripts/convert.py`) qui convertit un Excel en JSON automatiquement. Pour l'utiliser, il faut activer **Settings -> Actions -> General -> Workflow permissions -> Read and write permissions**. Si vous preferez la methode simple ci-dessus, vous pouvez **ignorer ou supprimer** le dossier `.github` et `scripts` : l'application fonctionne sans eux.

Aucune donnee n'est envoyee sur Internet : tout le traitement se fait dans le navigateur.
