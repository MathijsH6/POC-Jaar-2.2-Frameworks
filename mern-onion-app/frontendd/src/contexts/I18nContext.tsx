import React, { createContext, useContext, useEffect, useState } from 'react';

type Lang = 'nl' | 'en';
type I18nCtx = {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (key: string) => string;
};

const translations: Record<Lang, Record<string, string>> = {
  nl: {
    'app.name': 'KeuzeKompas',
    'header.keuzemodules': 'Keuzemodules',
    'header.login': 'Login',
    'header.register': 'Registreren',
    'header.favorites': 'Mijn favorieten',
    'header.logout': 'Uitloggen',
    'header.lang': 'Taal',
    'header.toggle_theme_on': 'Schakel donkere modus aan',
    'header.toggle_theme_off': 'Schakel donkere modus uit',
    'header.about': 'Over',

    'login.title': 'Login',
    'login.subtitle': 'Log in om verder te gaan',
    'login.email': 'Email',
    'login.password': 'Wachtwoord',
    'login.submit': 'Login',
    'login.cancel': 'Annuleren',
    'login.register_cta': 'Nog geen account? Registreren',

    'register.title': 'Registreren',
    'register.name': 'Naam',
    'register.email': 'Email',
    'register.password': 'Wachtwoord',
    'register.submit': 'Maak account',
    'register.cancel': 'Annuleren',
    'register.login_cta': 'Heb je al een account? Login',

    'list.title': 'Keuzemodules',
    'filters.search_placeholder': 'Zoek op titel, beschrijving, tags...',
    'filters.min_ec': 'min EC',
    'filters.max_ec': 'max EC',
    'filters.all_locations': 'Alle locaties',
    'filters.all_levels': 'Alle niveaus',
    'filters.reset': 'Reset',
    'filters.keywords': 'Keywords',

    'ec': 'EC',
    'card.favorite': 'Favoriet',
    'card.favorite_add': 'Favoriteren',
    'card.view': 'Bekijk',
    'detail.description': 'Beschrijving',
    'detail.content': 'Inhoud',
    'detail.learningoutcomes': 'Leerdoelen',
    'detail.back': 'Terug',
    'detail.remove_favorite': 'Verwijder uit favorieten',
    'detail.add_favorite': 'Voeg toe aan favorieten',

    'compare.title': 'Vergelijk favorieten',
    'compare.left': 'Vergelijking 1',
    'compare.right': 'Vergelijking 2',
    'compare.center': 'Je favorieten (sleep naar links of rechts)',
    'compare.drop_hint': 'Sleep hier een module heen',
    'compare.reset': 'Reset',
    'compare.done': 'Klaar',
    'compare.remove_from_favorites': 'Verwijder uit favorieten',
    'compare.info': 'Meer info',
    'favorites.empty': 'Geen favorieten',

    'loading': 'Loading...',
    'no_results': 'Geen modules gevonden met de huidige filters.',

    // Home / accessibility texts
    'home.welcome': 'Welkom',
    'home.guest': 'gast',
    'home.description': 'Dit dashboard helpt je bij het vinden en vergelijken van keuzemodules. Je kunt:',
    'home.list.item1': 'Keuzemodules doorzoeken en filteren op locatie, niveau en EC.',
    'home.list.item2': 'Modules openen voor volledige details en leerdoelen.',
    'home.list.item3': 'Favorieten opslaan en vergelijken in de "Mijn favorieten"-pagina.',
    'home.accessibility.title': 'Toegankelijkheid & gebruik',
    'home.accessibility.tips_summary': 'Tips voor schermlezers en toetsenbordgebruik',
    'home.accessibility.p1': 'Gebruik de Tab-toets om door interactieve elementen te navigeren. De site ondersteunt een "Skip to main content" link die verschijnt zodra je tabt.',
    'home.accessibility.p2': 'Voor Windows: (Druk op Windows-logo + ctrl + Enter) NVDA of Narrator werkt goed. Start de schermlezer en navigeer met Tab/Enter. NVDA leest links en headings zodat je snel door de pagina kunt springen.',
    'home.accessibility.p3': 'Voor macOS: gebruik VoiceOver (Cmd+F5) en navigeer met de VoiceOver-toetsen of Tab. Headings en landmark (main) zijn aanwezig om snel te navigeren.',
    'home.accessibility.p4': 'Modal/overlay (bijv. vergelijken) zet focus automatisch in het dialoogvenster en sluit met Escape. Gebruik Enter/Space om acties te activeren.',
    'home.accessibility.p5': 'Taal wissel en thema (licht/donker) vind je rechtsboven in de header; deze staan ook in hetzelfde focuspad als andere knoppen.',
    'home.checklist.summary': 'Snelle controlelijst',
    'home.checklist.item1': 'Tab één keer: zie "Skip to main content".',
    'home.checklist.item2': 'Enter op de skip-link: focus gaat naar de hoofdcontent.',
    'home.checklist.item3': 'Open "Mijn favorieten" en probeer de vergelijk-overlay; sluit met Esc.',
    'home.login_prompt': 'Log in om favorieten op te slaan en te vergelijken.',
    'home.logout': 'Uitloggen',

    'auth.login_required': 'Log eerst in om dit te doen.',
    'errors.favorite_failed': 'Kon favoriet niet bijwerken.',
    'errors.general': 'Er is iets misgegaan. Probeer het opnieuw.',
  },
  en: {
    'app.name': 'KeuzeKompas',
    'header.keuzemodules': 'Modules',
    'header.login': 'Login',
    'header.register': 'Register',
    'header.favorites': 'My favorites',
    'header.logout': 'Logout',
    'header.lang': 'Language',
    'header.toggle_theme_on': 'Enable dark mode',
    'header.toggle_theme_off': 'Disable dark mode',
    'header.about': 'About',

    'login.title': 'Login',
    'login.subtitle': 'Sign in to continue',
    'login.email': 'Email',
    'login.password': 'Password',
    'login.submit': 'Login',
    'login.cancel': 'Cancel',
    'login.register_cta': "Don't have an account? Register",

    'register.title': 'Register',
    'register.name': 'Name',
    'register.email': 'Email',
    'register.password': 'Password',
    'register.submit': 'Create account',
    'register.cancel': 'Cancel',
    'register.login_cta': 'Already have an account? Login',

    'list.title': 'Modules',
    'filters.search_placeholder': 'Search by title, description, tags...',
    'filters.min_ec': 'min ECTS',
    'filters.max_ec': 'max ECTS',
    'filters.all_locations': 'All locations',
    'filters.all_levels': 'All levels',
    'filters.reset': 'Reset',
    'filters.keywords': 'Keywords',

    'ec': 'ECTS',
    'card.favorite': 'Favorite',
    'card.favorite_add': 'Add favorite',
    'card.view': 'View',
    'detail.description': 'Description',
    'detail.content': 'Content',
    'detail.learningoutcomes': 'Learning outcomes',
    'detail.back': 'Back',
    'detail.remove_favorite': 'Remove from favorites',
    'detail.add_favorite': 'Add to favorites',

    'compare.title': 'Compare favorites',
    'compare.left': 'Compare 1',
    'compare.right': 'Compare 2',
    'compare.center': 'Your favorites (drag to left or right)',
    'compare.drop_hint': 'Drop a module here',
    'compare.reset': 'Reset',
    'compare.done': 'Done',
    'compare.remove_from_favorites': 'Remove from favorites',
    'compare.info': 'More info',
    'favorites.empty': 'No favorites',

    'loading': 'Loading...',
    'no_results': 'No modules found with current filters.',

    // Home / accessibility texts
    'home.welcome': 'Welcome',
    'home.guest': 'guest',
    'home.description': 'This dashboard helps you find and compare elective modules. You can:',
    'home.list.item1': 'Search and filter modules by location, level and ECTS.',
    'home.list.item2': 'Open modules for full details and learning outcomes.',
    'home.list.item3': 'Save favorites and compare them in the "My favorites" page.',
    'home.accessibility.title': 'Accessibility & usage',
    'home.accessibility.tips_summary': 'Tips for screen readers and keyboard users',
    'home.accessibility.p1': 'Use the Tab key to move between interactive elements. The site supports a "Skip to main content" link that appears when you tab.',
    'home.accessibility.p2': 'On Windows: (Press Windows-logo + Ctrl + Enter) NVDA or Narrator work well. Start the screen reader and navigate with Tab/Enter. NVDA announces links and headings so you can jump quickly.',
    'home.accessibility.p3': 'On macOS: use VoiceOver (Cmd+F5) and navigate with VoiceOver keys or Tab. Headings and the main landmark are present to jump quickly.',
    'home.accessibility.p4': 'Modal/overlay (e.g. compare) sets focus inside the dialog and closes with Escape. Use Enter/Space to activate actions.',
    'home.accessibility.p5': 'Language switch and theme (light/dark) are in the top-right header; they are in the same focus order as other controls.',
    'home.checklist.summary': 'Quick checklist',
    'home.checklist.item1': 'Press Tab once: see "Skip to main content".',
    'home.checklist.item2': 'Press Enter on the skip link: focus moves to main content.',
    'home.checklist.item3': 'Open "My favorites" and try the compare overlay; close with Esc.',
    'home.login_prompt': 'Log in to save and compare favorites.',
    'home.logout': 'Logout',

    'auth.login_required': 'Please log in first to do that.',
    'errors.favorite_failed': 'Could not update favorite.',
    'errors.general': 'Something went wrong. Please try again.',
  },
};

const I18nContext = createContext<I18nCtx | undefined>(undefined);

export const I18nProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [lang, setLang] = useState<Lang>(() => (localStorage.getItem('lang') as Lang) || 'nl');

  useEffect(() => {
    localStorage.setItem('lang', lang);
    document.documentElement.lang = lang;
  }, [lang]);

  const t = (key: string) => translations[lang][key] ?? key;

  return <I18nContext.Provider value={{ lang, setLang, t }}>{children}</I18nContext.Provider>;
};

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error('useI18n must be used within I18nProvider');
  return ctx;
}