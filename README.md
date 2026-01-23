# SportHub

En webbaserad applikation byggd med **React**, **React Router**, **Tailwind CSS** och **DaisyUI** som hämtar och visualiserar sportdata från ett externt API.  
Applikationen presenterar ligor, tabeller, lag och statistik i ett modernt och responsivt gränssnitt byggt i React.

---

## Syfte

Målet med plattformen är att ge användare en överskådlig och attraktiv presentation av sportdata i realtid.  
Applikationen integrerar ett API från everysport.com, där viss mängd data har gjorts tillgänglig genom tilldelad API-nyckel
---

## Funktioner

- Hämtar ligor, tabeller och lagdata från ett sport-API  
- Filtrering efter sport och säsong  
- Responsivt gränssnitt optimerat för desktop och mobil  
- Klickbara rader som leder till lag- eller ligadetaljer  
- Skeleton loaders vid laddning  
- Dark/light mode via DaisyUI  
- Uppdelning i återanvändbara React-komponenter  
- Felhantering och fallback-komponenter  

---

## Teknologier

| Teknologi | Användning |
|------------|-------------|
| **React** | Bygger gränssnittet med komponenter |
| **React Router** | Navigering mellan sidor |
| **Tailwind CSS** | Utility-first CSS för snabb design |
| **DaisyUI** | Färdiga Tailwind-komponenter och teman |
| **Custom Hooks** | Abstraktion av dataloggik |

---
## Filstruktur

```plaintext
src
├── app
│   ├── App.css
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── assets
│   └── icons
│       ├── floorball.svg
│       ├── hockeystick.svg
│       ├── matcher.svg
│       └── soccer.svg
├── config.js
├── features
│   └── sports
│       ├── api.jsx
│       ├── components
│       │   ├── eventComponents
│       │   │   ├── EventHeader.jsx
│       │   │   ├── EventStatistics.jsx
│       │   │   ├── EventStatsShots.jsx
│       │   │   ├── EventTimeline.jsx
│       │   │   └── RenderScoreBasedOnStatus.jsx
│       │   ├── genericComponents
│       │   │   ├── AllLeagues.jsx
│       │   │   ├── Footer.jsx
│       │   │   ├── GamesFilter.jsx
│       │   │   ├── GamesTable.jsx
│       │   │   ├── Hero.jsx
│       │   │   ├── NavBar.jsx
│       │   │   ├── SearchComponent.jsx
│       │   │   ├── StandningsTable.jsx
│       │   │   └── TeamSeasonSelector.jsx
│       │   ├── icons etc
│       │   │   ├── IconFactory.jsx
│       │   │   └── ThemeButton.jsx
│       │   └── leaguePageComponents
│       │       ├── AssistLeadersTable.jsx
│       │       ├── LeagueStandingsTable.jsx
│       │       ├── ScoringLeadersTable.jsx
│       │       ├── SeasonSelector.jsx
│       │       └── ShowDiffrentTablesSelector.jsx
│       ├── hooks
│       │   ├── EventHooks.jsx
│       │   ├── LeagueHooks.jsx
│       │   └── TeamHooks.jsx
│       ├── MockData.js
│       └── pages
│           ├── EventPage.jsx
│           ├── HomePage.jsx
│           ├── info
│           │   ├── AboutUsPage.jsx
│           │   ├── ContactPage.jsx
│           │   └── NotFoundPage.jsx
│           ├── LeaguePage.jsx
│           └── TeamPage.jsx
└── lib
    └── fetcher.jsx
