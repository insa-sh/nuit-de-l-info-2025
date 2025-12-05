export const ameliorations = [
  {
    id: 1,
    title: "Eteindre les appareils pendant la nuit",
    icone: "/images/computer2.jpg",
    cost: 20,
    cps: 1,
    multiplier: 1,
    choix: [
      {
        nom: "",
        description:
          "Éteindre les PC durant la nuit réduit la consommation d’énergie et prolonge la durée de vie du matériel !",
      },
    ],
  },
  {
    id: 2,
    title:
      "Utiliser des authentifications par mot de passe au lieu de de l’authentification globale de Google",
    icone: "/images/password.jpg",
    cost: 100,
    cps: 5,
    multiplier: 5,
    choix: [
      {
        nom: "",
        description:
          "Utiliser des mots de passe plutôt que l’authentification globale Google réduit la dépendance à un service unique et limite la collecte de données.",
      },
    ],
  },
  {
    id: 3,
    title: "Utiliser un navigateur open source",
    icone: "",
    cost: 500,
    cps: 10,
    multiplier: 5,
    choix: [
      {
        nom: "Firefox",
        description:
          "Navigateur complet, respectueux de la vie privée, soutenu par la fondation Mozilla.",
        icone: "/images/firefox.svg",
      },
      {
        nom: "Chromium",
        description:
          "Base open source de Google Chrome, rapide et largement compatible avec les standards du web.",
        icone: "/images/chromium.svg",
      },
      {
        nom: "Brave",
        description:
          "Navigateur axé sur la confidentialité, bloqueurs de pubs intégrés et performance optimisée.",
        icone: "/images/brave.svg",
      },
    ],
  },
  {
    id: 4,
    title: "Utiliser LibreOffice",
    icone: "/images/libreoffice.svg",
    cost: 1000,
    cps: 10,
    multiplier: 15,
    choix: [
      {
        nom: "",
        description:
          "Passer son traitement de texte à LibreOffice permet de controller la télémétrie, contrairement à Word, ou Google Docs. Les textes rédigés ne seront pas utilisés pour entraîner de l’intelligence artificielle.",
      },
    ],
  },
  {
    id: 5,
    title: "Configurer AdBlock, refuser les cookies inutile, lire les CGU",
    icone: "/images/ublockorigin.png",
    cost: 5000,
    cps: 30,
    multiplier: 25,
    choix: [
      {
        nom: "",
        description:
          "Configurer un AdBlock, refuser les cookies superflus, supprimer les cookies après usage et lire les CGU permet de mieux contrôler ses données personnelles et de réduire le suivi en ligne.",
      },
    ],
  },
  {
    id: 6,
    title: "Reparer au lieu de jeter et donner une seconde vie aux appareils",
    icone: "/images/fixing pc.png",
    cost: 25000,
    cps: 35,
    multiplier: 30,
    choix: [
      {
        nom: "",
        description:
          "Réparer ou donner une seconde vie à ses appareils peut prolonger leur durée de vie de plusieurs années, réduire jusqu’à 80 % de l’empreinte environnementale liée à leur fabrication et limiter la production de déchets électroniques.",
      },
    ],
  },
  {
    id: 7,
    title: "Installer un système d’exploitation open source",
    icone: "/images/tux.png",
    cost: 100000,
    cps: 50,
    multiplier: 40,
    choix: [
      {
        nom: "Ubuntu",
        description:
          "Un système d’exploitation assez facile à prendre en main et très répandu auprès des débutants. Ubuntu a pendant longtemps été la distribution la plus populaire, bien que ça ne soit plus le cas aujourd’hui.",
        icone: "/images/ubuntu.png",
      },
      {
        nom: "Fedora",
        description:
          "Un système d’exploitation plus avancé, mais qui reste une très bonne porte d’entrée dans l’écosystème Linux. Red Hat, l’entreprise qui participe majoritairement au maintien de la distribution, a la plus grande quantité de contribution au noyau Linux.",
        icone: "/images/fedora.png",
      },
      {
        nom: "OpenSuse",
        description:
          "Distribution moins populaire que les autres propositions, mais qui reste tout de même un choix très solide pour apprendre à utiliser Linux. Cette distribution est la plus centrée sur l’Europe de tous les choix, puisque Suse, le sponsor principal de la distribution, est basé en Allemagne.",
        icone: "/images/openSuse.png",
      },
    ],
  },
  {
    id: 8,
    title: "Changer de fournisseur mail",
    icone: "/images/mail.png",
    cost: 200000,
    cps: 75,
    multiplier: 75,
    choix: [
      {
        nom: "Proton mail",
        description:
          "Service de mail chiffré de bout en bout (c’est à dire que seul vous et le destinataire pouvez voir le contenu des mails) qui vient avec toute une suite d’outils. Un très bon choix pour ajouter de la vie privée dans votre vie sans friction.",
        icone: "/images/protonmail.png",
      },
      {
        nom: "Murena",
        description:
          "Service mail basé en France, avec une infrastructure open source. N’est pas chiffré de bout en bout par défaut, mais permet de ne pas céder tout le contenu de ses mails pour de la publicité personnalisée.",
        icone: "/images/murena.jpeg",
      },
    ],
  },
  {
    id: 9,
    title: "Utiliser des store alternatifs",
    icone: "/images/degoogled.webp",
    cost: 500000,
    cps: 100,
    multiplier: 100,
    choix: [
      {
        nom: "Utiliser des application-store open-source: FDroid, AuroraStore, Obtainium",
        description:
          "Le PlayStore est extrêmement gourmand en collecte de données. Utiliser des stores open-sources permet de garder le contrôle sur ses données tout en s’ouvrant l’accès à de nouveaux types d’applications, souvent rejetées par le PlayStore.",
        icone: "",
      },
    ],
  },
  {
    id: 10,
    title: "MicroG",
    icone: "/images/microg.png",
    cost: 1000000,
    cps: 500,
    multiplier: 250,
    choix: [
      {
        nom: "",
        description:
          "MicroG est une ré-implémentation open-source des services Google, et permet d’accéder à ces services normalement, tout en limitant énormément la quantité d’informations récoltées par Google sur votre appareil.",
      },
    ],
  },
  {
    id: 11,
    title:
      "Changer de système d’exploitation sur son téléphone: GrapheneOS, LineageOS, eOS",
    icone: "/images/GrapheneOS.png",
    cost: 5000000,
    cps: 800,
    multiplier: 500,
    choix: [
      {
        nom: "",
        description:
          "L’étape la plus drastique, mais pas nécessairement si compliquée. Changer de système d’exploitation sur un appareil mobile semble être une tâche très chronophage mais ne l’est pas forcément, et permet un niveau de contrôle sur son appareil incomparable à toutes les autres techniques mentionnées.",
        icone: "/images/GrapheneOS.png",
      },
    ],
  },
  {
    id: 12,
    title: "Héberger ses propres services",
    icone: "/images/self_hosting.png",
    cost: 8000000,
    cps: 1000,
    multiplier: 1000,
    choix: [
      {
        nom: "",
        description:
          "Au lieu de vous reposer sur les services proposés par d’autres, vous hébergez maintenant vous-même un maximum de services. Vous pouvez vous assurer que vos données privées restent privées, et que la qualité de vos services ne va pas se dégrader pour qu’une entreprise puisse augmenter ses profits. Vous pouvez désormais profiter de votre drive, de votre service de streaming, gestionnaire de mot de passe, et tout ce qui vous fait envie !",
      },
    ],
  },
  {
    id: 13,
    title: "Acheter et installer son propre serveur",
    icone: "/images/hosting_server.png",
    cost: 10000000,
    cps: 1500,
    multiplier: 1500,
    choix: [
      {
        nom: "",
        description:
          "Vous avez acheté un serveur pour avoir plus de contrôle sur tous les services que vous hébergez et l’avez installé chez vous. Vous pouvez plus facilement gérer sa consommation d’énergie et garantir que vos données restent privées.",
      },
    ],
  },
];
