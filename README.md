# Portfolio Valentin ALCALA

Vitrine personnelle — React 19 + Vite 8 (frontend) / Symfony 7 (backend API).

---

## Prérequis

| Outil | Version minimale |
|---|---|
| Node.js | 20+ |
| PHP | 8.2+ |
| Composer | 2+ |
| MariaDB / MySQL | 10.6+ |

---

## Lancer le Frontend

```bash
# Installer les dépendances
npm install

# Démarrer le serveur de développement (http://localhost:5173)
npm run dev

# Build de production
npm run build
```

---

## Lancer le Backend

```bash
cd backend

# 1. Installer les dépendances PHP
composer install

# 2. Copier et configurer l'environnement
cp .env .env.local
# → Renseigne DATABASE_URL avec tes accès MariaDB
# → Renseigne MAILER_DSN (Mailtrap pour les tests, Gmail pour la prod)

# 3. Créer la base de données
php bin/console doctrine:database:create

# 4. Exécuter la migration (crée la table `contact`)
php bin/console doctrine:migrations:migrate

# 5. Lancer le serveur Symfony (http://localhost:8000)
symfony server:start
# ou : php -S localhost:8000 -t public/
```

---

## Point d'entrée API

| Méthode | Route | Description |
|---|---|---|
| `POST` | `/api/contact` | Enregistre un message et envoie un email de notification |

**Body JSON attendu :**
```json
{
  "name":    "Jean Dupont",
  "email":   "jean@example.com",
  "subject": "Opportunité d'alternance",
  "message": "Bonjour Valentin, ...",
  "website": ""
}
```
> Le champ `website` est un honeypot anti-spam — laisser vide.

**Réponses :**
- `201 Created` — message enregistré
- `422 Unprocessable Entity` — erreurs de validation (JSON avec détail champ par champ)
- `429 Too Many Requests` — 1 envoi max par IP / 60 secondes

---

## Stack Technique

**Frontend**
- React 19 + TypeScript + Vite 8
- Tailwind CSS v3 (design Clean Tech vert)
- Framer Motion v12 (animations, scroll reveal)
- Lenis (smooth scroll)

**Backend**
- Symfony 7 (API mode)
- Doctrine ORM + MariaDB
- Symfony Mailer (notifications email)
- Nelmio CORS Bundle

---

## Structure du projet

```
PortfolioValentin/
├── src/                    # Frontend React
│   ├── components/
│   │   ├── Hero/
│   │   ├── Projects/
│   │   ├── About/
│   │   ├── TechStack/
│   │   └── Contact/
│   ├── data/
│   │   └── config.ts       # Données centralisées (projets, profil, techs)
│   └── hooks/
├── backend/                # Backend Symfony 7
│   ├── src/
│   │   ├── Controller/
│   │   │   └── ContactController.php
│   │   └── Entity/
│   │       └── Contact.php
│   ├── migrations/
│   ├── templates/emails/
│   └── config/
└── public/
```
