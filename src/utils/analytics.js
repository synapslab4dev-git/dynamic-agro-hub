/**
 * Google Analytics 4 (GA4) & High-Intent Alert Engine (Option C)
 * Property: Dynamic Agro Hub — Cockpit
 * Measurement ID: G-0FXTMMGJ3W
 * Notification Email: synaps.lab4dev@gmail.com
 */

export const GA_MEASUREMENT_ID = 'G-0FXTMMGJ3W';
const ALERT_EMAIL = 'synaps.lab4dev@gmail.com';
const NTFY_TOPIC = 'cv-francois-kinda-cids';

// Track sent alerts in memory to prevent spamming in a single session
const notifiedEvents = new Set();

export function sendGAEvent(eventName, params = {}) {
  try {
    if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
      window.gtag('event', eventName, {
        ...params,
        send_to: GA_MEASUREMENT_ID,
      });
    }
  } catch (err) {
    console.debug('[GA4] Event error:', err);
  }
}

export function notifyHighIntent(actionType, details = {}) {
  try {
    const dedupeKey = `${actionType}_${JSON.stringify(details)}`;
    if (notifiedEvents.has(dedupeKey)) {
      return;
    }
    notifiedEvents.add(dedupeKey);

    const now = new Date();
    const timestamp = now.toLocaleString('fr-FR', { timeZone: 'Africa/Ouagadougou' }) + ' (GMT+0 Ouaga)';

    const payload = {
      _subject: `🔔 [Démo Dynamic Agro] Action Observateur : ${actionType}`,
      _template: 'table',
      _captcha: 'false',
      Action: actionType,
      Details: typeof details === 'object' ? JSON.stringify(details, null, 2) : String(details),
      Date_Heure: timestamp,
      Referrer: typeof document !== 'undefined' ? (document.referrer || 'Accès direct / Lien direct') : 'N/A',
      Page_URL: typeof window !== 'undefined' ? window.location.href : 'N/A',
      Navigateur: typeof navigator !== 'undefined' ? navigator.userAgent : 'N/A',
    };

    fetch(`https://formsubmit.co/ajax/${ALERT_EMAIL}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(payload),
      keepalive: true,
    }).catch(() => {});

    fetch(`https://ntfy.sh/${NTFY_TOPIC}`, {
      method: 'POST',
      headers: {
        'Title': `Visite Démo CIDS: ${actionType}`,
        'Priority': 'urgent',
        'Tags': 'chart_with_upwards_trend,bell',
      },
      body: `Action: ${actionType}\nDétails: ${JSON.stringify(details)}\nHeure: ${timestamp}`,
      keepalive: true,
    }).catch(() => {});

  } catch (err) {
    console.debug('[Notify] Alert error:', err);
  }
}

/**
 * 1. Track Role Switch (App/Marketing/Direction)
 */
export function trackRoleSwitch(roleName) {
  sendGAEvent('switch_role_view', {
    role: roleName,
    event_category: 'navigation',
  });
  
  if (roleName === 'direction') {
    notifyHighIntent('Accès Vue Direction', {
      message: 'Le visiteur explore le tableau de bord Direction Générale.',
    });
  } else if (roleName === 'marketing') {
    notifyHighIntent('Accès Vue Marketing', {
      message: 'Le visiteur explore le cockpit Marketing & CRM.',
    });
  }
}

/**
 * 2. Track Specific Feature Clicks (e.g. Modify Structure, OCR, Banking Scorecard)
 */
export function trackFeatureUse(featureName) {
  sendGAEvent('use_feature', {
    feature: featureName,
    event_category: 'engagement',
  });
}

/**
 * 3. Track Return to CV
 */
export function trackReturnToCV() {
  sendGAEvent('return_to_cv', {
    event_category: 'conversion',
  });
  notifyHighIntent('Retour au CV', {
    action: 'Le visiteur a cliqué sur le bouton de retour au CV depuis la démo.',
  });
}
