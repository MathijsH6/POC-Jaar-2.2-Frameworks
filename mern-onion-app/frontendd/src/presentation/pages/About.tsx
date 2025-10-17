import React from 'react';
import { useI18n } from '../../contexts/I18nContext';

const content: Record<string, any> = {
  nl: {
    title: 'Over de Proof of Concept',
    overview:
      'Korte productomschrijving: deze POC toont een full‑stack applicatie voor het zoeken, bekijken en bewaren van keuzemodules. De focus ligt op gebruiksvriendelijkheid, theming (incl. colorblind‑palette) en een eenvoudige, uitbreidbare backend met MongoDB.',
    featuresTitle: 'Belangrijkste functionaliteiten',
    features: [
      { title: 'Authenticatie', desc: 'Registratie, login en sessiebeheer met token-based auth. Beschermde acties vereisen inloggen.' },
      { title: 'Keuzemodules', desc: 'Zoeken, filteren (tags, locatie, niveau, EC-range) en paginatie. Detailpagina met inhoud en leerdoelen.' },
      { title: 'Favorieten', desc: 'Gebruikers kunnen modules als favoriet markeren en een overzicht daarvan bekijken.' },
      { title: 'Theming & Accessibility', desc: 'Light / Dark / Colorblind themes; panels en inputs respecteren thema‑variabelen voor consistente UI.' },
    ],
    userFlowsTitle: 'Korte user flows',
    userFlows: [
      'Als bezoeker registreer ik me → ik kan inloggen → favoriete modules opslaan.',
      'Als student zoek ik modules via zoekveld en filters → open detailpanel → voeg favoriet toe.',
      'Als product owner demonstreer ik: filters, detail-view, favorieten en thema‑switch.',
    ],
    acceptanceTitle: 'Acceptatiecriteria (kort)',
    acceptance: [
      'Registratie/login werkt; na login zijn beschermde endpoints bereikbaar.',
      'Zoek- en filterfunctionaliteit levert relevante, pagineerbare resultaten.',
      'Detailpagina toont alle gevraagde velden en staat centraal in een panel.',
      'Favorieten synchroniseren met backend en zijn zichtbaar op aparte pagina.',
      'UI volgt thema‑variabelen (ook colorblind) en is keyboard‑vriendelijk.',
    ],
    metricsTitle: 'Succes‑indicatoren',
    metrics: [
      'Basisfunctie: registratie, login, lijst, detail en favorieten werken end‑to‑end.',
      'Performance: zoekresultaten < 500ms (lokale dev ≈ afhankelijk van dataset).',
      'Accessibility: keyboard-navigatie, labels aanwezig, colorblind theme beschikbaar.',
    ],
  },

  en: {
    title: 'About the Proof of Concept',
    overview:
      'Product summary: this POC demonstrates a full‑stack app for searching, viewing and saving elective modules. Focus is on usability, theming (incl. colorblind palette) and a simple, extensible backend with MongoDB.',
    featuresTitle: 'Key features',
    features: [
      { title: 'Authentication', desc: 'Registration, login and token-based session handling. Protected actions require login.' },
      { title: 'Elective modules', desc: 'Search, filters (tags, location, level, EC range) and pagination. Detail view with content and learning outcomes.' },
      { title: 'Favorites', desc: 'Users can mark modules as favorites and view them on a dedicated page.' },
      { title: 'Theming & Accessibility', desc: 'Light / Dark / Colorblind themes; panels and inputs follow theme variables for consistent UI.' },
    ],
    userFlowsTitle: 'Short user flows',
    userFlows: [
      'As a visitor I register → I can login → save favorite modules.',
      'As a student I search modules with filters → open detail panel → add favorite.',
      'As a product owner I demo: filters, detail view, favorites and theme switching.',
    ],
    acceptanceTitle: 'Acceptance criteria (short)',
    acceptance: [
      'Registration/login work; after login protected endpoints are reachable.',
      'Search and filters return relevant, paginated results.',
      'Detail page shows the requested fields and is centered in a panel.',
      'Favorites sync with backend and are visible on a dedicated page.',
      'UI follows theme variables (including colorblind) and is keyboard-friendly.',
    ],
    metricsTitle: 'Success indicators',
    metrics: [
      'Core functionality: register, login, list, detail and favorites work end-to-end.',
      'Performance: search results < 500ms (local dev depends on dataset).',
      'Accessibility: keyboard navigation, labels present, colorblind theme available.',
    ],
  },
};

export const About: React.FC = () => {
  const { lang } = useI18n();
  const L = content[lang] || content.en;

  return (
    <main className="min-h-screen pt-20 flex items-start justify-center bg-[var(--app-bg)]">
      <section className="w-full max-w-3xl mx-4">
        <div className="app-card p-8 rounded-lg shadow-lg">
          <h1 className="text-2xl font-semibold mb-3">{L.title}</h1>
          <p className="mb-4 app-muted">{L.overview}</p>

          <h2 className="text-lg font-medium mt-4 mb-2">{L.featuresTitle}</h2>
          <ul className="list-disc pl-5 space-y-2">
            {L.features.map((f: any) => (
              <li key={f.title}>
                <strong>{f.title}:</strong> <span className="app-muted">{f.desc}</span>
              </li>
            ))}
          </ul>

          <h2 className="text-lg font-medium mt-4 mb-2">{L.userFlowsTitle}</h2>
          <ul className="list-disc pl-5 app-muted">
            {L.userFlows.map((u: string, i: number) => <li key={i}>{u}</li>)}
          </ul>

          <h2 className="text-lg font-medium mt-4 mb-2">{L.acceptanceTitle}</h2>
          <ul className="pl-5 app-muted">
            {L.acceptance.map((a: string, i: number) => <li key={i}>• {a}</li>)}
          </ul>

          <h2 className="text-lg font-medium mt-4 mb-2">{L.metricsTitle}</h2>
          <ul className="pl-5 app-muted">
            {L.metrics.map((m: string, i: number) => <li key={i}>• {m}</li>)}
          </ul>
        </div>
      </section>
    </main>
  );
};

export default About;