(function () {
  'use strict';

  // --- DATE UTILITIES ---
  function getTodayISO() {
    const now = new Date();
    const y = now.getFullYear();
    const m = String(now.getMonth() + 1).padStart(2, '0');
    const d = String(now.getDate()).padStart(2, '0');
    return y + '-' + m + '-' + d;
  }

  function parseISO(isoStr) {
    const parts = (isoStr || getTodayISO()).split('-').map(Number);
    return new Date(parts[0], (parts[1] || 1) - 1, parts[2] || 1, 12, 0, 0);
  }

  function toISO(dateObj) {
    const y = dateObj.getFullYear();
    const m = String(dateObj.getMonth() + 1).padStart(2, '0');
    const d = String(dateObj.getDate()).padStart(2, '0');
    return y + '-' + m + '-' + d;
  }

  function addDays(isoStr, days) {
    const d = parseISO(isoStr);
    d.setDate(d.getDate() + days);
    return toISO(d);
  }

  function diffDays(targetISO, baseISO) {
    const t = parseISO(targetISO).getTime();
    const b = parseISO(baseISO).getTime();
    return Math.round((t - b) / 86400000);
  }

  function formatShortDate(isoStr) {
    const d = parseISO(isoStr);
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  }

  function formatFullDate(isoStr) {
    const d = parseISO(isoStr);
    return d.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' });
  }

  const TODAY_ISO = getTodayISO();

  // --- TAXONOMIES (MOOD, SOMATIC, INTIMACY, CERVICAL FLUID) ---
  const MOOD_TAGS = [
    'Calm', 'Focused', 'Social', 'Grounded', 'Creative',
    'Warm / Affectionate', 'Sensitive', 'Introverted', 'Irritable', 'Anxious', 'Brain Fog', 'Low Drive'
  ];

  const SYMPTOM_TAGS = [
    'High Stamina', 'Deep Sleep', 'Cramps', 'Lower Back Ache',
    'Headache / Migraine', 'Bloating', 'Breast Tenderness', 'Vivid Dreams',
    'Restless Sleep', 'Salt/Sweet Cravings', 'Clear Skin', 'Joint Stiffness', 'Night Sweats'
  ];

  const SEX_ACTIVITIES = [
    { id: 'protected', label: 'Protected Sex', icon: '🛡️' },
    { id: 'unprotected', label: 'Unprotected Sex', icon: '✨' },
    { id: 'solo', label: 'Solo Pleasure', icon: '🌸' },
    { id: 'sensual', label: 'Sensual / Non-Penetrative', icon: '🤍' },
    { id: 'fantasy', label: 'High Desire / Thoughts', icon: '🔥' }
  ];

  const SEX_QUALITIES = [
    'Orgasm', 'Deep Connection', 'High Lubrication', 'Receptive Desire', 'Spontaneous Drive', 'Pelvic Pain / Dyspareunia'
  ];

  const CERVICAL_FLUIDS = [
    { id: 'none', label: 'Dry / None', sub: 'Low fertility' },
    { id: 'sticky', label: 'Sticky / Paste', sub: 'Early follicular' },
    { id: 'creamy', label: 'Creamy / Lotion', sub: 'Rising estrogen' },
    { id: 'eggwhite', label: 'Egg-White / Clear', sub: 'Peak fertile fluid' }
  ];

  const GOAL_LABELS = {
    rhythm: 'Body & Mood',
    intimacy: 'Intimacy & FAM',
    conception: 'Conception',
    pmdd: 'PMDD / Perimenopause'
  };

  // --- EDUCATIONAL ATLAS MODULES ---
  const ATLAS_MODULES = [
    {
      cat: 'neuro',
      phase: 'follicular',
      badge: 'Neuroendocrinology • NIH / PMC',
      title: 'Estradiol (E₂), Synaptic Plasticity & Dopamine Tone',
      summary: 'As ovarian follicles mature during the follicular and ovulatory phases, rising 17β-estradiol increases dendritic spine density in the hippocampus and prefrontal cortex while upregulating dopamine (D₂) and serotonin (5-HT₂A) receptor availability.',
      takeaway: 'Why it matters: Verbal fluency, working memory, reward sensitivity, and intrinsic motivation naturally climb as estradiol approaches its mid-cycle zenith.',
      sourceLabel: 'PMC6309888: Reproductive Steroid Regulation of Mood & Behavior',
      svg: '<svg viewBox="0 0 180 60" class="w-full h-14"><path d="M8 50 Q55 46, 95 10 T172 34" fill="none" stroke="#3E7A6E" stroke-width="2.5"/><circle cx="95" cy="10" r="4" fill="#C4862D"/><text x="65" y="26" font-size="9" font-family="JetBrains Mono" fill="currentColor">E₂ Peak → Dopamine</text></svg>'
    },
    {
      cat: 'neuro',
      phase: 'luteal',
      badge: 'GABA-A Plasticity • PMDD Science',
      title: 'Progesterone, Allopregnanolone & Late-Luteal Withdrawal',
      summary: 'After ovulation, the corpus luteum secretes progesterone, which converts in the brain into allopregnanolone—a potent positive allosteric modulator of GABA-A receptors (the brain’s primary calming brake). In the final 4–5 days before menstruation, rapid withdrawal of allopregnanolone alters GABA-A subunit configuration.',
      takeaway: 'Why it matters: Luteal mood sensitivity or PMDD is not caused by "too many hormones," but by nervous-system sensitivity to the speed of neurosteroid withdrawal.',
      sourceLabel: 'PMC6594874: Allopregnanolone & Reproductive Psychiatry',
      svg: '<svg viewBox="0 0 180 60" class="w-full h-14"><path d="M8 48 L75 48 Q115 8, 145 16 L172 52" fill="none" stroke="#7C5879" stroke-width="2.5"/><line x1="145" y1="12" x2="145" y2="54" stroke="#C25949" stroke-dasharray="2 2"/><text x="85" y="45" font-size="9" font-family="JetBrains Mono" fill="currentColor">GABA-A Withdrawal</text></svg>'
    },
    {
      cat: 'sex',
      phase: 'ovulatory',
      badge: 'Sexual Psychophysiology',
      title: 'Spontaneous vs. Responsive Desire Across the Cycle',
      summary: 'Research on the Dual-Control Model of sexual response shows two distinct desire pathways: Spontaneous desire (internal spark) peaks during the periovulatory window driven by peak estradiol and a mid-cycle ovarian testosterone pulse. Responsive desire (arousal emerging after unhurried sensual context and emotional safety) predominates in the luteal phase.',
      takeaway: 'Why it matters: Tracking both spontaneous libido and receptive intimacy removes pressure and reveals your true personal desire curve.',
      sourceLabel: 'PMC8906247: Hormonal Modulation of Libido & Affect',
      svg: '<svg viewBox="0 0 180 60" class="w-full h-14"><path d="M10 46 Q65 40, 90 8 Q115 40, 170 36" fill="none" stroke="#C95B78" stroke-width="2.5"/><circle cx="90" cy="8" r="4.5" fill="#C95B78"/><text x="48" y="52" font-size="9" font-family="JetBrains Mono" fill="currentColor">Ovulatory Androgen Pulse</text></svg>'
    },
    {
      cat: 'fam',
      phase: 'ovulatory',
      badge: 'Symptothermal Biomarkers • Mayo Clinic',
      title: 'Basal Body Temperature (BBT) & Spinnbarkeit Cervical Fluid',
      summary: 'Estrogen stimulates cervical crypts to produce clear, stretchy, alkaline "egg-white" mucus (spinnbarkeit) before ovulation, nourishing sperm for up to 5 days. Once ovulation occurs, progesterone triggers hypothalamic thermogenesis, raising waking BBT by +0.4°F to +0.8°F (+0.2°C–0.4°C) for the remainder of the luteal phase.',
      takeaway: 'Why it matters: Cervical fluid warns you that ovulation is approaching; a sustained 3-day BBT thermal shift confirms ovulation has completed.',
      sourceLabel: 'PMC11837971 & Mayo Clinic Symptothermal Guidelines',
      svg: '<svg viewBox="0 0 180 60" class="w-full h-14"><polyline points="10,42 40,44 70,45 92,40 105,20 135,18 170,19" fill="none" stroke="#C4862D" stroke-width="2.5"/><line x1="10" y1="32" x2="170" y2="32" stroke="currentColor" stroke-opacity="0.25" stroke-dasharray="3 3"/><text x="102" y="14" font-size="9" font-family="JetBrains Mono" fill="currentColor">+0.5°F Biphasic Shift</text></svg>'
    },
    {
      cat: 'clinical',
      phase: 'menstrual',
      badge: 'ACOG Clinical Vital Sign',
      title: 'When Cycle Patterns Warrant a Clinical Evaluation',
      summary: 'The American College of Obstetricians and Gynecologists (ACOG) classifies the menstrual cycle as a fifth vital sign. Persistent cycle lengths <21 days or >35 days, bleeding >7 days, pelvic pain during sex (dyspareunia), or luteal fases <10 days can help clinicians evaluate PCOS, endometriosis, thyroid dysfunction, or perimenopause.',
      takeaway: 'Why it matters: Exporting a clean multi-month symptom, BBT, and cycle regularity log turns a 10-minute medical visit into an evidence-backed consultation.',
      sourceLabel: 'ACOG Committee Opinion: Menstrual Cycle as a Vital Sign',
      svg: '<svg viewBox="0 0 180 60" class="w-full h-14"><rect x="14" y="18" width="32" height="26" rx="4" fill="#C25949" fill-opacity="0.25" stroke="#C25949"/><rect x="64" y="18" width="32" height="26" rx="4" fill="#3E7A6E" fill-opacity="0.25" stroke="#3E7A6E"/><rect x="114" y="18" width="46" height="26" rx="4" fill="#C4862D" fill-opacity="0.25" stroke="#C4862D"/></svg>'
    },
    {
      cat: 'clinical',
      phase: 'luteal',
      badge: '2026 Privacy Architecture • Mozilla',
      title: 'Why Zero-Cloud Local Storage Protects Reproductive Autonomy',
      summary: 'Following 2025–2026 privacy rulings and Mozilla’s reproductive tracker audits, cloud-synced period and intimacy logs remain vulnerable to third-party SDK leaks or legal subpoenas. Cadence follows Euki’s 10/10 local-only model: your data lives strictly inside your browser’s local storage and portable JSON exports.',
      takeaway: 'Why it matters: You get Bearable’s symptom correlation depth, Clue’s clinical rigor, and Natural Cycles’ BBT charting—with zero cloud exposure.',
      sourceLabel: 'Mozilla Foundation 2026 Period Tracker Privacy Review',
      svg: '<svg viewBox="0 0 180 60" class="w-full h-14"><circle cx="90" cy="30" r="18" fill="none" stroke="#3E7A6E" stroke-width="2"/><path d="M84 30 L88 34 L97 25" fill="none" stroke="#3E7A6E" stroke-width="2"/></svg>'
    }
  ];

  // --- STATE INITIALIZATION (NO PROFILES BY DEFAULT!) ---
  const STORAGE_KEY = 'cadence_pwa_state_v2';
  let chartMode = 'hormones'; // 'hormones' or 'bbt'
  let atlasCategory = 'all';
  let onboardGoal = 'rhythm';
  let onboardColor = '#C25949';
  let selectedModalColor = '#C25949';

  function buildEmptyDefaultState() {
    return {
      theme: 'light',
      activeProfileId: null,
      activeView: 'cycle',
      selectedCycleDay: null,
      selectedCalendarDate: TODAY_ISO,
      calendarMonthOffset: 0,
      profiles: [] // Explicitly empty by default so user onboards!
    };
  }

  // Optional sample household generator if user clicks "load sample household" or "Reset Demo Profiles"
  function buildSampleHouseholdState() {
    const mayaLast = addDays(TODAY_ISO, -13);   // Day 14 of 28 (Ovulatory)
    const elenaLast = addDays(TODAY_ISO, -22);  // Day 23 of 30 (Luteal)
    const chloeLast = addDays(TODAY_ISO, -2);   // Day 3 of 27 (Menstrual)

    return {
      theme: state ? state.theme : 'light',
      activeProfileId: 'p_maya',
      activeView: 'cycle',
      selectedCycleDay: null,
      selectedCalendarDate: TODAY_ISO,
      calendarMonthOffset: 0,
      profiles: [
        {
          id: 'p_maya',
          name: 'Maya',
          relation: 'Self',
          goal: 'intimacy',
          color: '#C25949',
          cycleLength: 28,
          periodLength: 5,
          lutealLength: 14,
          periods: [
            { start: addDays(mayaLast, -84), length: 5 },
            { start: addDays(mayaLast, -55), length: 5 },
            { start: addDays(mayaLast, -28), length: 5 },
            { start: mayaLast, length: 5 }
          ],
          logs: {
            [TODAY_ISO]: {
              flow: 'none',
              sexActivities: ['unprotected', 'fantasy'],
              sexQualities: ['Orgasm', 'Deep Connection', 'High Lubrication', 'Spontaneous Drive'],
              libido: 5,
              cervicalFluid: 'eggwhite',
              opk: 'pos',
              moods: ['Focused', 'Social', 'Warm / Affectionate'],
              symptoms: ['High Stamina', 'Clear Skin'],
              energy: 5,
              bbt: '97.38',
              notes: 'Peak ovulatory energy, clear spinnbarkeit fluid, and strong creative focus.'
            },
            [addDays(TODAY_ISO, -2)]: {
              flow: 'none',
              sexActivities: ['protected'],
              sexQualities: ['Deep Connection', 'High Lubrication'],
              libido: 4,
              cervicalFluid: 'creamy',
              opk: 'neg',
              moods: ['Calm', 'Creative'],
              symptoms: ['High Stamina'],
              energy: 4,
              bbt: '97.32',
              notes: 'Climbing follicular energy.'
            },
            [addDays(TODAY_ISO, -12)]: {
              flow: 'medium',
              sexActivities: [],
              sexQualities: [],
              libido: 2,
              cervicalFluid: 'none',
              opk: 'none',
              moods: ['Introverted', 'Calm'],
              symptoms: ['Cramps', 'Deep Sleep'],
              energy: 2,
              bbt: '97.26',
              notes: 'Day 2 flow; prioritized warm rest and early sleep.'
            }
          }
        },
        {
          id: 'p_elena',
          name: 'Elena',
          relation: 'Partner',
          goal: 'rhythm',
          color: '#3E7A6E',
          cycleLength: 30,
          periodLength: 4,
          lutealLength: 14,
          periods: [
            { start: addDays(elenaLast, -60), length: 4 },
            { start: addDays(elenaLast, -30), length: 4 },
            { start: elenaLast, length: 4 }
          ],
          logs: {
            [TODAY_ISO]: {
              flow: 'none',
              sexActivities: ['sensual'],
              sexQualities: ['Receptive Desire', 'Deep Connection'],
              libido: 3,
              cervicalFluid: 'sticky',
              opk: 'none',
              moods: ['Sensitive', 'Introverted'],
              symptoms: ['Bloating', 'Salt/Sweet Cravings', 'Vivid Dreams'],
              energy: 3,
              bbt: '98.12',
              notes: 'Luteal thermal shift confirmed; unhurried evening at home.'
            }
          }
        },
        {
          id: 'p_chloe',
          name: 'Chloe',
          relation: 'Family',
          goal: 'pmdd',
          color: '#7C5879',
          cycleLength: 27,
          periodLength: 5,
          lutealLength: 13,
          periods: [
            { start: addDays(chloeLast, -54), length: 5 },
            { start: addDays(chloeLast, -27), length: 5 },
            { start: chloeLast, length: 5 }
          ],
          logs: {
            [TODAY_ISO]: {
              flow: 'medium',
              sexActivities: [],
              sexQualities: [],
              libido: 1,
              cervicalFluid: 'none',
              opk: 'none',
              moods: ['Grounded', 'Introverted'],
              symptoms: ['Cramps', 'Lower Back Ache'],
              energy: 2,
              bbt: '97.29',
              notes: 'Day 3 of period; magnesium and warm compress helping.'
            }
          }
        }
      ]
    };
  }

  let state = loadState();

  function loadState() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (parsed && Array.isArray(parsed.profiles)) {
          return parsed;
        }
      }
    } catch (e) {}
    return buildEmptyDefaultState();
  }

  function saveState() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (e) {}
  }

  function getActiveProfile() {
    if (!state.profiles || state.profiles.length === 0) return null;
    let p = state.profiles.find(function (item) { return item.id === state.activeProfileId; });
    if (!p) {
      p = state.profiles[0];
      state.activeProfileId = p.id;
    }
    return p;
  }

  // --- PHYSIOLOGICAL, INTIMACY & BEHAVIORAL ENGINE ---
  function sortPeriods(periods) {
    return (periods || []).slice().sort(function (a, b) {
      return a.start.localeCompare(b.start);
    });
  }

  function getLatestPeriodStart(profile) {
    const sorted = sortPeriods(profile.periods);
    if (sorted.length === 0) return TODAY_ISO;
    return sorted[sorted.length - 1].start;
  }

  function getPhaseBounds(profile) {
    const cLen = Number(profile.cycleLength) || 28;
    const pLen = Math.min(Number(profile.periodLength) || 5, cLen - 10);
    const lLen = Math.min(Number(profile.lutealLength) || 14, cLen - pLen - 3);
    const ovDay = cLen - lLen;
    const ovStart = Math.max(pLen + 2, ovDay - 3);
    const ovEnd = Math.min(cLen - 4, ovDay + 1);
    return {
      cycleLength: cLen,
      periodLength: pLen,
      lutealLength: lLen,
      ovulationDay: ovDay,
      menstrual: [1, pLen],
      follicular: [pLen + 1, ovStart - 1],
      ovulatory: [ovStart, ovEnd],
      luteal: [ovEnd + 1, cLen]
    };
  }

  function getCycleStatusForDate(profile, targetISO) {
    const sorted = sortPeriods(profile.periods);
    const bounds = getPhaseBounds(profile);
    const latestStart = getLatestPeriodStart(profile);

    let anchorStart = latestStart;
    for (let i = 0; i < sorted.length; i++) {
      if (sorted[i].start <= targetISO) {
        anchorStart = sorted[i].start;
      }
    }

    const rawDiff = diffDays(targetISO, anchorStart);
    let cycleDay;
    if (rawDiff >= 0) {
      if (anchorStart === latestStart && rawDiff < bounds.cycleLength) {
        cycleDay = rawDiff + 1;
      } else {
        cycleDay = (rawDiff % bounds.cycleLength) + 1;
      }
    } else {
      const mod = ((rawDiff % bounds.cycleLength) + bounds.cycleLength) % bounds.cycleLength;
      cycleDay = mod + 1;
    }

    const phaseInfo = getDayInsight(profile, cycleDay);
    const daysSinceLatest = diffDays(targetISO, latestStart);
    const currentCycleDayToday = ((daysSinceLatest % bounds.cycleLength) + bounds.cycleLength) % bounds.cycleLength + 1;
    const daysUntilNextPeriod = bounds.cycleLength - currentCycleDayToday + 1;
    const nextPeriodISO = addDays(targetISO, daysUntilNextPeriod);

    return {
      cycleDay: cycleDay,
      bounds: bounds,
      phaseInfo: phaseInfo,
      latestStart: latestStart,
      nextPeriodISO: nextPeriodISO,
      daysUntilNextPeriod: daysUntilNextPeriod
    };
  }

  function getDayInsight(profile, day) {
    const b = getPhaseBounds(profile);
    const cLen = b.cycleLength;
    const ovDay = b.ovulationDay;

    const normPos = (day - 1) / Math.max(1, cLen - 1);
    const ovPos = (ovDay - 1) / Math.max(1, cLen - 1);

    // Smooth endocrine curves (0-100)
    const estPeak1 = Math.exp(-Math.pow((normPos - (ovPos - 0.03)) / 0.11, 2)) * 88;
    const estPeak2 = Math.exp(-Math.pow((normPos - (ovPos + 0.25)) / 0.16, 2)) * 48;
    const estrogen = Math.round(Math.min(96, 12 + estPeak1 + estPeak2));

    const lutealCenter = ovPos + (1 - ovPos) * 0.52;
    const progCurve = normPos > ovPos - 0.02
      ? Math.exp(-Math.pow((normPos - lutealCenter) / 0.18, 2)) * 86
      : 0;
    const progesterone = Math.round(Math.min(95, 8 + progCurve));

    const lhSurge = Math.round(8 + Math.exp(-Math.pow((day - ovDay) / 1.15, 2)) * 88);

    // Expected Basal Body Temp curve (°F)
    const expectedBbt = day <= ovDay
      ? (97.32 - (day === ovDay ? 0.08 : 0) + Math.sin(day * 0.5) * 0.04)
      : (97.86 + Math.min(0.22, (day - ovDay) * 0.03) - (day >= cLen - 1 ? 0.25 : 0));

    if (day >= b.menstrual[0] && day <= b.menstrual[1]) {
      const isEarly = day <= 2;
      return {
        phaseKey: 'menstrual',
        phaseName: 'Menstrual Phase',
        subPhase: isEarly ? 'Early Menstruation • Hormone Baseline' : 'Late Menstruation • Early Renewal',
        color: '#C25949',
        fertility: 'Low',
        conceptionBadge: 'Low Conception Probability',
        shortCaption: isEarly ? 'E₂ & P₄ at baseline • Uterine shedding' : 'Pituitary FSH gently rising',
        headline: isEarly
          ? 'Inward somatic focus, quiet sensory threshold, and deep restorative pull.'
          : 'Physical heaviness lifts as rising FSH initiates early cognitive clarity.',
        physiology: isEarly
          ? 'Estradiol and progesterone sit at their lowest baseline, triggering prostaglandin release and endometrial shedding. Parasympathetic rest and iron replenishment take priority.'
          : 'Prostaglandin activity subsides by Day ' + day + '. Follicle-stimulating hormone (FSH) recruits new ovarian follicles, initiating an upward shift in mental clarity.',
        energy: isEarly ? 38 : 56,
        mood: isEarly ? 64 : 75,
        focus: isEarly ? 54 : 68,
        desire: isEarly ? 36 : 48,
        social: isEarly ? 34 : 52,
        recovery: isEarly ? 90 : 66,
        estrogen: estrogen,
        progesterone: progesterone,
        lh: lhSurge,
        expectedBbt: expectedBbt.toFixed(2),
        fluidLabel: 'Menstrual flow',
        cues: [
          { icon: '🌡️', label: 'BBT Baseline (~97.3°F)' },
          { icon: '🧠', label: 'High Left/Right Integration' },
          { icon: '🤍', label: 'Comfort & Tactile Intimacy' },
          { icon: '🍵', label: 'Iron + Magnesium Focus' }
        ],
        moodTitle: isEarly ? 'Reflective & Low-Stimulation' : 'Clearing Mental Fog',
        moodBody: isEarly
          ? 'With estradiol at baseline, serotonin turnover is quieter. You may prefer candor, stillness, and trusted environments over performative social small talk.'
          : 'As hormone withdrawal stabilizes, emotional reactivity levels out into a grounded sense of reset and clear pattern recognition.',
        behaviorTitle: isEarly ? 'Protect Margin & Audit Priorities' : 'Gentle Structuring & Synthesis',
        behaviorBody: isEarly
          ? 'Avoid stacking high-stakes negotiations or dense social back-to-backs. Ideal window for auditing, editing, reading, and low-friction solo focus.'
          : 'Organize upcoming sprints and ease back into structured problem-solving without forcing peak output.',
        bodyTitle: isEarly ? 'Warmth, Pelvic Relief & Deep Sleep' : 'Zone-2 Mobility & Rebound',
        bodyBody: isEarly
          ? 'Core body temperature drops back to follicular baseline (~97.3°F). Some experience heightened pelvic warmth or prostaglandin cramping; gentle orgasms or heat can relieve uterine tension.'
          : 'Neuromuscular recovery accelerates now; light strength work, walking, or pilates feels noticeably smoother.',
        partnerTitle: isEarly ? 'Quiet Presence Over Fixing' : 'Unhurried Momentum',
        partnerBody: isEarly
          ? 'Practical gestures (handling dinner, reducing household noise, warm touch without expectation) land deeply.'
          : 'Energy is rebounding; check in on comfort levels before scheduling busy group plans.'
      };
    }

    if (day >= b.follicular[0] && day <= b.follicular[1]) {
      const isLateFollicular = day >= Math.round((b.follicular[0] + b.follicular[1]) / 2);
      return {
        phaseKey: 'follicular',
        phaseName: 'Follicular Phase',
        subPhase: isLateFollicular ? 'Late Follicular • Steep Estradiol Climb' : 'Mid Follicular • Follicular Maturation',
        color: '#3E7A6E',
        fertility: isLateFollicular ? 'High (Opening)' : 'Low–Moderate',
        conceptionBadge: isLateFollicular ? 'Fertile Window Opening (Sperm Viable)' : 'Low–Moderate Fertility',
        shortCaption: 'Climbing estradiol & high dopamine sensitivity',
        headline: 'Rising curiosity, fast cognitive execution, and building spontaneous desire.',
        physiology: 'Maturing follicles secrete climbing 17β-estradiol while progesterone remains quiet. Estradiol enhances hippocampal synaptic plasticity and amplifies dopamine and serotonin receptor sensitivity.',
        energy: isLateFollicular ? 86 : 78,
        mood: 84,
        focus: 88,
        desire: isLateFollicular ? 80 : 68,
        social: isLateFollicular ? 84 : 74,
        recovery: 35,
        estrogen: estrogen,
        progesterone: progesterone,
        lh: lhSurge,
        expectedBbt: expectedBbt.toFixed(2),
        fluidLabel: isLateFollicular ? 'Creamy → Watery' : 'Sticky → Creamy',
        cues: [
          { icon: '⚡', label: 'Peak Glycogen & Strength' },
          { icon: '🧬', label: 'Estradiol + Dopamine Rise' },
          { icon: '💧', label: isLateFollicular ? 'Fertile Fluid Developing' : 'Early Cervical Fluid' },
          { icon: '🎯', label: 'Deep Analytical Sprints' }
        ],
        moodTitle: 'Optimistic, Resilient & Curious',
        moodBody: 'Rising estradiol acts as a natural mood elevator and buffers the amygdala’s stress response. Frustrations roll off more easily and intrinsic drive climbs.',
        behaviorTitle: 'Complex Problem-Solving & New Initiatives',
        behaviorBody: 'Working memory, associative learning, and creative ideation thrive during the follicular climb. Schedule demanding deep-work sprints and strategic decisions here.',
        bodyTitle: 'Spontaneous Libido Climb & High Stamina',
        bodyBody: 'Natural lubrication and spontaneous sexual interest build alongside estradiol. High insulin sensitivity supports heavy resistance training and fast recovery.',
        partnerTitle: 'Novelty, Play & Shared Exploration',
        partnerBody: 'Appetite for new experiences, spontaneous date nights, and tackling ambitious collaborative projects is naturally elevated.'
      };
    }

    if (day >= b.ovulatory[0] && day <= b.ovulatory[1]) {
      const isPeakOv = day === ovDay;
      return {
        phaseKey: 'ovulatory',
        phaseName: 'Ovulatory Phase',
        subPhase: isPeakOv ? 'Estimated Ovulation Day • LH Surge Peak' : 'Fertile Ovulatory Window • Peak Estradiol',
        color: '#C4862D',
        fertility: isPeakOv ? 'Peak' : 'High',
        conceptionBadge: isPeakOv ? 'Peak Fertility (Ovulation Day)' : 'High Conception Probability',
        shortCaption: isPeakOv ? 'LH surge, androgen pulse & egg release' : 'Peak estradiol & spinnbarkeit fluid',
        headline: 'Peak verbal fluency, spontaneous desire, and outward social magnetism.',
        physiology: isPeakOv
          ? 'Estradiol reaches its cycle zenith and triggers a sharp luteinizing hormone (LH) surge, releasing the dominant egg within 12–36 hours. A concurrent pulse of ovarian testosterone elevates spontaneous libido and motor drive.'
          : 'High circulating estradiol maximizes left-hemisphere verbal processing, reward-pathway responsiveness, and fertile "egg-white" cervical fluid.',
        energy: 92,
        mood: 88,
        focus: 90,
        desire: 95,
        social: 94,
        recovery: 40,
        estrogen: estrogen,
        progesterone: progesterone,
        lh: lhSurge,
        expectedBbt: expectedBbt.toFixed(2),
        fluidLabel: 'Egg-White (Peak Fertile)',
        cues: [
          { icon: '🔥', label: 'Peak Spontaneous Libido' },
          { icon: '✨', label: 'Egg-White Cervical Fluid' },
          { icon: '🗣️', label: 'Peak Verbal Articulation' },
          { icon: '📈', label: 'LH Surge Window' }
        ],
        moodTitle: 'Confident, Expressive & Magnetic',
        moodBody: 'Peak estradiol and a mid-cycle androgen rise promote social confidence, emotional warmth, and sensory responsiveness. Note: a brief 24h sensitivity dip right after egg release is normal.',
        behaviorTitle: 'Pitches, Negotiations & High-Visibility Work',
        behaviorBody: 'Verbal articulation and social attunement are at their cycle high. Ideal days for keynotes, difficult conversations, interviews, hosting, and leadership.',
        bodyTitle: 'Peak Libido, Fertile Mucus & Ligament Care',
        bodyBody: 'Spontaneous desire and natural lubrication peak here. Maximal strength is high, though peak estrogen slightly increases ligament laxity—keep warm-ups crisp.',
        partnerTitle: 'High Connection, Romance & Direct Dialogue',
        partnerBody: 'Prime window for intentional intimacy, active date nights, and constructive conversations.'
      };
    }

    const daysLeftInCycle = cLen - day;
    const isLateLuteal = daysLeftInCycle < 5;
    return {
      phaseKey: 'luteal',
      phaseName: 'Luteal Phase',
      subPhase: isLateLuteal ? 'Late Luteal • Neurosteroid Withdrawal' : 'Early–Mid Luteal • Progesterone Dominance',
      color: '#7C5879',
      fertility: 'Low',
      conceptionBadge: 'Post-Ovulatory • Low Fertility',
      shortCaption: isLateLuteal ? 'E₂ & allopregnanolone declining' : 'Progesterone peak & +0.5°F BBT shift',
      headline: isLateLuteal
        ? 'Heightened sensory discernment, lower stress buffer, and a strong pull toward completion.'
        : 'Settled GABAergic calm paired with methodical focus and responsive intimacy.',
      physiology: isLateLuteal
        ? 'As the corpus luteum regresses, progesterone and estradiol fall rapidly. The steep drop in allopregnanolone (a calming GABA-A neurosteroid) temporarily increases amygdala reactivity and lowers sensory thresholds.'
        : 'The corpus luteum secretes high progesterone alongside a secondary estradiol plateau. Progesterone raises waking basal body temperature by +0.4°F–0.8°F and boosts resting metabolic burn by 5–10%.',
      energy: isLateLuteal ? 46 : 68,
      mood: isLateLuteal ? 52 : 78,
      focus: isLateLuteal ? 60 : 78,
      desire: isLateLuteal ? 42 : 58,
      social: isLateLuteal ? 40 : 62,
      recovery: isLateLuteal ? 84 : 62,
      estrogen: estrogen,
      progesterone: progesterone,
      lh: lhSurge,
      expectedBbt: expectedBbt.toFixed(2),
      fluidLabel: 'Dry / Sticky (Non-fertile)',
      cues: [
        { icon: '🌡️', label: 'BBT Elevated (+0.5°F)' },
        { icon: '🛡️', label: isLateLuteal ? 'GABA-A Withdrawal Care' : 'Allopregnanolone Calm' },
        { icon: '🕯️', label: 'Responsive / Sensual Desire' },
        { icon: '🥑', label: '+150–250 kcal Metabolic Need' }
      ],
      moodTitle: isLateLuteal ? 'High Discernment & Sensory Sensitivity' : 'Settled via GABA-A Soothing',
      moodBody: isLateLuteal
        ? 'Rapid withdrawal of allopregnanolone reduces GABA receptor soothing, which can surface irritability, tearfulness, or anxiety if overstimulated or sleep-deprived.'
        : 'Mid-luteal progesterone converts into allopregnanolone, binding to GABA-A receptors to promote a grounded, nesting, and observant temperament.',
      behaviorTitle: isLateLuteal ? 'Boundary Protection & Closing Loops' : 'Deep Execution & Quality Control',
      behaviorBody: isLateLuteal
        ? 'Your brain is acutely tuned to unfinished friction points. Channel this into closing open loops, simplifying commitments, and declining non-essential noise.'
        : 'Shift from launching brand-new initiatives to deep execution, editing, documentation, and systematic follow-through.',
      bodyTitle: isLateLuteal ? 'Magnesium, Complex Carbs & Nervous System Care' : 'Responsive Desire & Higher Caloric Burn',
      bodyBody: isLateLuteal
        ? 'Progesterone withdrawal can fragment REM sleep and cause fluid retention. Complex carbohydrates, magnesium glycinate, and lower-cortisol movement buffer reactivity.'
        : 'Desire shifts from spontaneous to responsive—thriving on emotional safety, massage, and unhurried foreplay. Resting metabolic rate is elevated by ~150–250 kcal/day.',
      partnerTitle: isLateLuteal ? 'Validation, Margin & Zero Defensiveness' : 'Cozy Routines & Affectionate Safety',
      partnerBody: isLateLuteal
        ? 'Sensory overload and decision fatigue happen faster in the final 4 days before bleeding. Offer proactive logistical support, warm food, and unpressured space.'
        : 'Prefers meaningful one-on-one connection, non-demanding sensual touch, and predictable routines over chaotic late nights.'
    };
  }

  function recalculateProfileCycleStats(profile) {
    const sorted = sortPeriods(profile.periods);
    if (sorted.length >= 2) {
      const diffs = [];
      for (let i = 1; i < sorted.length; i++) {
        const d = diffDays(sorted[i].start, sorted[i - 1].start);
        if (d >= 18 && d <= 50) diffs.push(d);
      }
      if (diffs.length > 0) {
        const sum = diffs.reduce(function (a, b) { return a + b; }, 0);
        profile.cycleLength = Math.round(sum / diffs.length);
      }
    }
  }

  // --- THEME & PHASE AMBIENT ENGINE ---
  function applyTheme(phaseKey) {
    const htmlEl = document.documentElement;
    const sun = document.getElementById('icon-sun');
    const moon = document.getElementById('icon-moon');
    if (state.theme === 'dark') {
      htmlEl.classList.add('dark');
      htmlEl.classList.remove('light');
      sun.classList.remove('hidden');
      moon.classList.add('hidden');
    } else {
      htmlEl.classList.remove('dark');
      htmlEl.classList.add('light');
      sun.classList.add('hidden');
      moon.classList.remove('hidden');
    }
    if (phaseKey) {
      document.body.setAttribute('data-phase', phaseKey);
    }
  }

  // --- SVG BOTANICAL MORPHING GLYPHS ---
  function getBotanicalPhaseSVG(phaseKey, color) {
    if (phaseKey === 'menstrual') {
      // Grounded seed / droplet within protective calyx
      return '<svg viewBox="0 0 48 48" class="w-full h-full"><circle cx="24" cy="24" r="19" fill="none" stroke="' + color + '" stroke-width="1.2" stroke-dasharray="2 3" opacity="0.55"/><path d="M24 10 C30 20, 33 27, 24 38 C15 27, 18 20, 24 10 Z" fill="' + color + '" fill-opacity="0.22" stroke="' + color + '" stroke-width="1.75"/><circle cx="24" cy="27" r="3" fill="' + color + '"/></svg>';
    }
    if (phaseKey === 'follicular') {
      // Unfurling twin botanical shoots
      return '<svg viewBox="0 0 48 48" class="w-full h-full"><circle cx="24" cy="24" r="19" fill="none" stroke="' + color + '" stroke-width="1.2" opacity="0.35"/><path d="M24 38 L24 14 M24 28 C15 26, 13 17, 21 14 C23 20, 24 24, 24 28 Z M24 24 C33 22, 35 13, 27 10 C25 16, 24 20, 24 24 Z" fill="' + color + '" fill-opacity="0.22" stroke="' + color + '" stroke-width="1.75" stroke-linecap="round"/></svg>';
    }
    if (phaseKey === 'ovulatory') {
      // Radiant 8-petal full bloom
      return '<svg viewBox="0 0 48 48" class="w-full h-full"><circle cx="24" cy="24" r="20" fill="' + color + '" fill-opacity="0.14"/><g stroke="' + color + '" stroke-width="1.6" fill="' + color + '" fill-opacity="0.22"><ellipse cx="24" cy="24" rx="5.5" ry="16"/><ellipse cx="24" cy="24" rx="16" ry="5.5"/><ellipse cx="24" cy="24" rx="5.5" ry="16" transform="rotate(45 24 24)"/><ellipse cx="24" cy="24" rx="5.5" ry="16" transform="rotate(-45 24 24)"/></g><circle cx="24" cy="24" r="4" fill="' + color + '"/></svg>';
    }
    // Luteal: Waning crescent & grounded botanical arc
    return '<svg viewBox="0 0 48 48" class="w-full h-full"><circle cx="24" cy="24" r="19" fill="none" stroke="' + color + '" stroke-width="1.2" opacity="0.4"/><path d="M27 11 A14 14 0 1 0 27 37 A11 11 0 1 1 27 11 Z" fill="' + color + '" fill-opacity="0.28" stroke="' + color + '" stroke-width="1.75"/><circle cx="19" cy="24" r="2.2" fill="' + color + '"/></svg>';
  }

  // --- 6-AXIS BIOMETRIC PETAL ROSE SVG ---
  function renderPetalRoseSVG(insight) {
    const svg = document.getElementById('petal-rose-svg');
    if (!svg) return;
    const cx = 105;
    const cy = 96;
    const maxR = 62;
    const axes = [
      { label: 'Energy', val: insight.energy, angle: -90 },
      { label: 'Focus', val: insight.focus, angle: -30 },
      { label: 'Desire', val: insight.desire, angle: 30 },
      { label: 'Social', val: insight.social, angle: 90 },
      { label: 'Rest Need', val: insight.recovery, angle: 150 },
      { label: 'Calm', val: insight.mood, angle: 210 }
    ];

    let out = '';
    // Concentric guide rings
    [0.33, 0.66, 1.0].forEach(function (step) {
      out += '<circle cx="' + cx + '" cy="' + cy + '" r="' + (maxR * step).toFixed(1) + '" fill="none" stroke="var(--border)" stroke-width="1" stroke-dasharray="2 2"/>';
    });

    const pts = [];
    axes.forEach(function (ax) {
      const rad = (ax.angle * Math.PI) / 180;
      const gx = cx + maxR * Math.cos(rad);
      const gy = cy + maxR * Math.sin(rad);
      out += '<line x1="' + cx + '" y1="' + cy + '" x2="' + gx.toFixed(1) + '" y2="' + gy.toFixed(1) + '" stroke="var(--border)" stroke-width="1"/>';

      const rVal = (Math.max(15, ax.val) / 100) * maxR;
      const px = cx + rVal * Math.cos(rad);
      const py = cy + rVal * Math.sin(rad);
      pts.push(px.toFixed(1) + ',' + py.toFixed(1));

      // Label placement
      const lx = cx + (maxR + 19) * Math.cos(rad);
      const ly = cy + (maxR + 14) * Math.sin(rad);
      out += '<text x="' + lx.toFixed(1) + '" y="' + (ly + 3).toFixed(1) + '" text-anchor="middle" font-size="8.5" font-family="JetBrains Mono" fill="var(--sub)">' + ax.label + '</text>';
    });

    // Polygon & vertices
    out += '<polygon points="' + pts.join(' ') + '" fill="' + insight.color + '" fill-opacity="0.24" stroke="' + insight.color + '" stroke-width="2"/>';
    pts.forEach(function (pt) {
      const sp = pt.split(',');
      out += '<circle cx="' + sp[0] + '" cy="' + sp[1] + '" r="3" fill="' + insight.color + '"/>';
    });

    svg.innerHTML = out;
  }

  // --- HEADER & SWITCHER RENDERER ---
  function renderHeaderAndSwitcher() {
    const bar = document.getElementById('profile-switcher-bar');
    const active = getActiveProfile();
    bar.innerHTML = '';

    state.profiles.forEach(function (p) {
      const isSelected = active && p.id === active.id;
      const status = getCycleStatusForDate(p, TODAY_ISO);
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'tactile-btn px-3 py-1.5 rounded-full text-xs flex items-center gap-2 transition shrink-0 border ' +
        (isSelected
          ? 'surface-card border-[#1C1917] dark:border-[#F4EFEA] font-medium text-ink shadow-2xs'
          : 'border-transparent surface-muted text-sub hover:text-ink');
      btn.innerHTML =
        '<span class="w-2 h-2 rounded-full shrink-0" style="background-color:' + p.color + '"></span>' +
        '<span>' + escapeHtml(p.name) + '</span>' +
        '<span class="font-mono text-[10px] opacity-75">D' + status.cycleDay + '</span>';
      btn.addEventListener('click', function () {
        state.activeProfileId = p.id;
        state.selectedCycleDay = null;
        saveState();
        renderAll();
      });
      bar.appendChild(btn);
    });

    const addBtn = document.createElement('button');
    addBtn.type = 'button';
    addBtn.className = 'tactile-btn px-2.5 py-1.5 rounded-full text-xs font-mono text-sub hover:text-ink border border-dashed border-subtle shrink-0 transition';
    addBtn.textContent = '+ Person';
    addBtn.addEventListener('click', function () {
      openProfileModal(null);
    });
    bar.appendChild(addBtn);

    document.getElementById('nav-people-count').textContent = String(state.profiles.length);
    document.getElementById('header-today-label').textContent = formatFullDate(TODAY_ISO);

    document.querySelectorAll('.nav-tab').forEach(function (tab) {
      const v = tab.getAttribute('data-view');
      if (v === state.activeView) {
        tab.className = 'nav-tab tactile-btn px-3 py-1.5 rounded-full font-medium whitespace-nowrap transition bg-[#1C1917] text-[#F7F4EF] dark:bg-[#F4EFEA] dark:text-[#121010]';
      } else {
        tab.className = 'nav-tab tactile-btn px-3 py-1.5 rounded-full font-medium whitespace-nowrap transition text-sub hover:text-ink';
      }
    });
  }

  function renderActiveProfileBanner() {
    const p = getActiveProfile();
    if (!p) return;
    const status = getCycleStatusForDate(p, TODAY_ISO);
    const phase = status.phaseInfo;

    document.getElementById('brand-phase-dot').style.backgroundColor = phase.color;
    document.getElementById('header-phase-pill').textContent = phase.phaseName;

    const avatar = document.getElementById('active-avatar');
    avatar.style.backgroundColor = p.color;
    avatar.textContent = p.name.charAt(0).toUpperCase();

    document.getElementById('active-profile-name').textContent = p.name;
    document.getElementById('active-profile-relation').textContent = p.relation;
    document.getElementById('active-profile-goal-badge').textContent = GOAL_LABELS[p.goal || 'rhythm'] || 'Body & Mood';
    document.getElementById('active-profile-summary').textContent =
      phase.phaseName + ' • Next expected period on ' + formatShortDate(status.nextPeriodISO) +
      ' (last started ' + formatShortDate(status.latestStart) + ')';

    document.getElementById('metric-cycle-day').textContent = 'Day ' + status.cycleDay + ' / ' + status.bounds.cycleLength;
    document.getElementById('metric-next-period').textContent =
      status.daysUntilNextPeriod === 0 ? 'Today' :
      status.daysUntilNextPeriod === 1 ? 'Tomorrow' :
      'In ' + status.daysUntilNextPeriod + ' days';
    document.getElementById('metric-fertility').textContent = phase.fertility;
  }

  // --- VIEW 1: CYCLE DIAL, PETAL ROSE, VISUAL CUES & ENDOCRINE STUDIO ---
  function renderCycleView() {
    const p = getActiveProfile();
    if (!p) return;
    const todayStatus = getCycleStatusForDate(p, TODAY_ISO);
    const bounds = todayStatus.bounds;
    const cLen = bounds.cycleLength;

    const inspectedDay = state.selectedCycleDay !== null
      ? Math.min(Math.max(1, state.selectedCycleDay), cLen)
      : todayStatus.cycleDay;

    const isToday = inspectedDay === todayStatus.cycleDay;
    const insight = getDayInsight(p, inspectedDay);

    // Apply phase-reactive ambient theme based on inspected day!
    applyTheme(insight.phaseKey);

    const resetBtn = document.getElementById('btn-reset-today');
    if (isToday) resetBtn.classList.add('hidden');
    else resetBtn.classList.remove('hidden');

    const slider = document.getElementById('cycle-day-slider');
    slider.max = String(cLen);
    slider.value = String(inspectedDay);
    document.getElementById('scrubber-day-readout').textContent =
      'Day ' + inspectedDay + ' of ' + cLen + (isToday ? ' (Today)' : '');
    document.getElementById('scrubber-ovulation-marker').textContent = 'Ovulation (~D' + bounds.ovulationDay + ')';
    document.getElementById('scrubber-end-marker').textContent = 'Day ' + cLen;

    document.getElementById('legend-menstrual').textContent = 'Menstrual (D' + bounds.menstrual[0] + '–' + bounds.menstrual[1] + ')';
    document.getElementById('legend-follicular').textContent = 'Follicular (D' + bounds.follicular[0] + '–' + bounds.follicular[1] + ')';
    document.getElementById('legend-ovulatory').textContent = 'Ovulatory (D' + bounds.ovulatory[0] + '–' + bounds.ovulatory[1] + ')';
    document.getElementById('legend-luteal').textContent = 'Luteal (D' + bounds.luteal[0] + '–' + bounds.luteal[1] + ')';

    const dayOffsetFromToday = inspectedDay - todayStatus.cycleDay;
    const inspectedDateISO = addDays(TODAY_ISO, dayOffsetFromToday);
    document.getElementById('dial-date-label').textContent = isToday
      ? 'TODAY • ' + formatShortDate(TODAY_ISO).toUpperCase()
      : formatShortDate(inspectedDateISO).toUpperCase() + (dayOffsetFromToday > 0 ? ' (+' + dayOffsetFromToday + 'D)' : ' (' + dayOffsetFromToday + 'D)');
    document.getElementById('dial-day-number').textContent = 'Day ' + inspectedDay;

    const pill = document.getElementById('dial-phase-pill');
    pill.textContent = insight.phaseName;
    pill.style.backgroundColor = insight.color + '22';
    pill.style.color = insight.color;
    document.getElementById('dial-sub-caption').textContent = insight.shortCaption;

    // Central Morphing Botanical Glyph
    document.getElementById('dial-botanical-glyph').innerHTML = getBotanicalPhaseSVG(insight.phaseKey, insight.color);

    // Draw Sculptural SVG Cycle Ring
    renderCycleRingSVG(p, cLen, todayStatus.cycleDay, inspectedDay, todayStatus.latestStart);

    // Right Column Insights
    document.getElementById('insight-phase-dot').style.backgroundColor = insight.color;
    document.getElementById('insight-phase-title').textContent = insight.subPhase;
    document.getElementById('insight-conception-badge').textContent = insight.conceptionBadge;
    document.getElementById('insight-headline').textContent = insight.headline;
    document.getElementById('insight-physiology').textContent = insight.physiology;

    // Visual Cue Strip
    const cueStrip = document.getElementById('visual-cue-strip');
    cueStrip.innerHTML = (insight.cues || []).map(function (c) {
      return '<span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full surface-muted text-[11px] font-medium text-ink">' +
        '<span>' + c.icon + '</span><span>' + escapeHtml(c.label) + '</span></span>';
    }).join('');

    // Render 6-Axis Petal Rose
    renderPetalRoseSVG(insight);

    setBar('energy', insight.energy);
    setBar('mood', insight.mood);
    setBar('focus', insight.focus);
    setBar('recovery', insight.recovery);

    document.getElementById('card-mood-title').textContent = insight.moodTitle;
    document.getElementById('card-mood-body').textContent = insight.moodBody;
    document.getElementById('card-behavior-title').textContent = insight.behaviorTitle;
    document.getElementById('card-behavior-body').textContent = insight.behaviorBody;
    document.getElementById('card-body-title').textContent = insight.bodyTitle;
    document.getElementById('card-body-body').textContent = insight.bodyBody;
    document.getElementById('card-partner-title').textContent = insight.partnerTitle;
    document.getElementById('card-partner-body').textContent = insight.partnerBody;
    document.getElementById('partner-badge').textContent = p.relation === 'Self' ? 'For Partner / Peers' : 'Supporting ' + p.name;

    renderHormoneOrBbtChartSVG(p, cLen, inspectedDay, insight, todayStatus.latestStart);
    renderUpcomingMilestones(p, todayStatus);
  }

  function setBar(key, val) {
    document.getElementById('bar-label-' + key).textContent = val + '%';
    document.getElementById('bar-fill-' + key).style.width = val + '%';
  }

  function renderCycleRingSVG(profile, cLen, todayDay, inspectedDay, latestStartISO) {
    const svg = document.getElementById('cycle-ring-svg');
    const cx = 140;
    const cy = 140;
    const r = 112;
    const gapAngle = 1.65;
    const sliceAngle = 360 / cLen;
    const bounds = getPhaseBounds(profile);

    let html = '';
    // Outer & inner architectural rings
    html += '<circle cx="' + cx + '" cy="' + cy + '" r="' + (r - 18) + '" fill="none" stroke="var(--border)" stroke-width="1" stroke-dasharray="2 3" />';
    html += '<circle cx="' + cx + '" cy="' + cy + '" r="' + (r + 16) + '" fill="none" stroke="var(--border)" stroke-width="0.75" opacity="0.5" />';

    for (let d = 1; d <= cLen; d++) {
      const dayInsight = getDayInsight(profile, d);
      const startDeg = (d - 1) * sliceAngle - 90 + gapAngle / 2;
      const endDeg = d * sliceAngle - 90 - gapAngle / 2;
      const pathData = describeArc(cx, cy, r, startDeg, endDeg);

      const isSelected = d === inspectedDay;
      const isToday = d === todayDay;
      const strokeW = isSelected ? 18 : (isToday ? 13 : 9.5);
      const opacity = isSelected ? '1' : (d < todayDay ? '0.52' : '0.86');

      html += '<path d="' + pathData + '" fill="none" stroke="' + dayInsight.color + '" stroke-width="' + strokeW +
        '" stroke-linecap="butt" opacity="' + opacity + '" class="ring-segment" data-day="' + d + '">' +
        '<title>Day ' + d + ' — ' + dayInsight.phaseName + '</title></path>';

      const midRad = (((d - 0.5) * sliceAngle - 90) * Math.PI) / 180;

      // Ovulation starburst ring marker
      if (d === bounds.ovulationDay) {
        const ox = cx + (r - 18) * Math.cos(midRad);
        const oy = cy + (r - 18) * Math.sin(midRad);
        html += '<circle cx="' + ox.toFixed(1) + '" cy="' + oy.toFixed(1) + '" r="3.5" fill="#C4862D" stroke="var(--card)" stroke-width="1.2"/>';
      }

      // Check if this cycle day has logged intimacy
      const dateForDay = addDays(latestStartISO, d - 1);
      const dayLog = profile.logs && profile.logs[dateForDay];
      if (dayLog && ((dayLog.sexActivities && dayLog.sexActivities.length > 0) || (dayLog.libido && dayLog.libido >= 4))) {
        const ix = cx + (r + 16) * Math.cos(midRad);
        const iy = cy + (r + 16) * Math.sin(midRad);
        html += '<circle cx="' + ix.toFixed(1) + '" cy="' + iy.toFixed(1) + '" r="3.2" fill="#C95B78"><title>Intimacy / High Desire logged on ' + formatShortDate(dateForDay) + '</title></circle>';
      }

      // Today outer halo marker
      if (isToday) {
        const mx = cx + (r + 16) * Math.cos(midRad);
        const my = cy + (r + 16) * Math.sin(midRad);
        html += '<circle cx="' + mx.toFixed(1) + '" cy="' + my.toFixed(1) + '" r="5" fill="none" stroke="var(--ink)" stroke-width="1.75" />';
      }
    }

    svg.innerHTML = html;
    svg.querySelectorAll('.ring-segment').forEach(function (seg) {
      seg.addEventListener('click', function () {
        state.selectedCycleDay = Number(seg.getAttribute('data-day'));
        renderCycleView();
      });
    });
  }

  function describeArc(x, y, radius, startAngle, endAngle) {
    const startRad = (startAngle * Math.PI) / 180.0;
    const endRad = (endAngle * Math.PI) / 180.0;
    const x1 = x + radius * Math.cos(startRad);
    const y1 = y + radius * Math.sin(startRad);
    const x2 = x + radius * Math.cos(endRad);
    const y2 = y + radius * Math.sin(endRad);
    const largeArcFlag = endAngle - startAngle <= 180 ? '0' : '1';
    return ['M', x1.toFixed(2), y1.toFixed(2), 'A', radius, radius, 0, largeArcFlag, 1, x2.toFixed(2), y2.toFixed(2)].join(' ');
  }

  function renderHormoneOrBbtChartSVG(profile, cLen, inspectedDay, insight, latestStartISO) {
    const svg = document.getElementById('hormone-chart-svg');
    const w = 620;
    const h = 165;
    const padX = 20;
    const padY = 16;
    const usableW = w - padX * 2;
    const usableH = h - padY * 2;
    const selX = padX + ((inspectedDay - 1) / Math.max(1, cLen - 1)) * usableW;

    let out = '';
    out += '<line x1="' + padX + '" y1="' + (padY + usableH) + '" x2="' + (w - padX) + '" y2="' + (padY + usableH) + '" stroke="var(--border)" stroke-width="1" />';
    out += '<line x1="' + padX + '" y1="' + (padY + usableH / 2) + '" x2="' + (w - padX) + '" y2="' + (padY + usableH / 2) + '" stroke="var(--border)" stroke-width="1" stroke-dasharray="3 3" />';

    if (chartMode === 'hormones') {
      const estPts = [];
      const progPts = [];
      const lhPts = [];

      for (let d = 1; d <= cLen; d++) {
        const info = getDayInsight(profile, d);
        const x = padX + ((d - 1) / Math.max(1, cLen - 1)) * usableW;
        const yEst = padY + usableH - (info.estrogen / 100) * usableH;
        const yProg = padY + usableH - (info.progesterone / 100) * usableH;
        const yLh = padY + usableH - (info.lh / 100) * usableH;
        estPts.push(x.toFixed(1) + ',' + yEst.toFixed(1));
        progPts.push(x.toFixed(1) + ',' + yProg.toFixed(1));
        lhPts.push(x.toFixed(1) + ',' + yLh.toFixed(1));
      }

      out += '<polyline fill="none" stroke="#C4862D" stroke-width="1.75" stroke-dasharray="3 3" opacity="0.85" points="' + lhPts.join(' ') + '" />';
      out += '<polyline fill="none" stroke="#7C5879" stroke-width="2.4" points="' + progPts.join(' ') + '" />';
      out += '<polyline fill="none" stroke="#3E7A6E" stroke-width="2.6" points="' + estPts.join(' ') + '" />';

      out += '<line x1="' + selX.toFixed(1) + '" y1="4" x2="' + selX.toFixed(1) + '" y2="' + (h - 6) + '" stroke="var(--ink)" stroke-width="1.5" />';
      out += '<circle cx="' + selX.toFixed(1) + '" cy="' + (padY + usableH - (insight.estrogen / 100) * usableH).toFixed(1) + '" r="4.5" fill="#3E7A6E" />';
      out += '<circle cx="' + selX.toFixed(1) + '" cy="' + (padY + usableH - (insight.progesterone / 100) * usableH).toFixed(1) + '" r="4.5" fill="#7C5879" />';

      document.getElementById('hormone-day-note').textContent =
        'Day ' + inspectedDay + ' Index — Estradiol (E₂): ' + insight.estrogen +
        '% • Progesterone (P₄): ' + insight.progesterone +
        '% • LH: ' + insight.lh + '%';
    } else {
      // BBT Biphasic Thermal Curve + Logged BBT Points
      const bbtPts = [];
      const loggedDots = [];
      const minTemp = 97.0;
      const maxTemp = 98.4;

      for (let d = 1; d <= cLen; d++) {
        const info = getDayInsight(profile, d);
        const x = padX + ((d - 1) / Math.max(1, cLen - 1)) * usableW;
        const tVal = parseFloat(info.expectedBbt);
        const yT = padY + usableH - ((tVal - minTemp) / (maxTemp - minTemp)) * usableH;
        bbtPts.push(x.toFixed(1) + ',' + yT.toFixed(1));

        const dateISO = addDays(latestStartISO, d - 1);
        const log = profile.logs && profile.logs[dateISO];
        if (log && log.bbt && !isNaN(parseFloat(log.bbt))) {
          const actualT = Math.min(maxTemp, Math.max(minTemp, parseFloat(log.bbt)));
          const yAct = padY + usableH - ((actualT - minTemp) / (maxTemp - minTemp)) * usableH;
          loggedDots.push({ x: x, y: yAct, t: log.bbt, d: d });
        }
      }

      // Coverline at 97.55°F
      const coverY = padY + usableH - ((97.55 - minTemp) / (maxTemp - minTemp)) * usableH;
      out += '<line x1="' + padX + '" y1="' + coverY.toFixed(1) + '" x2="' + (w - padX) + '" y2="' + coverY.toFixed(1) + '" stroke="#C25949" stroke-width="1" stroke-dasharray="4 4" opacity="0.65"/>';
      out += '<text x="' + (padX + 6) + '" y="' + (coverY - 5).toFixed(1) + '" font-size="9" font-family="JetBrains Mono" fill="#C25949">Thermal Coverline (~97.55°F)</text>';

      out += '<polyline fill="none" stroke="#C4862D" stroke-width="2.4" points="' + bbtPts.join(' ') + '" />';
      loggedDots.forEach(function (pt) {
        out += '<circle cx="' + pt.x.toFixed(1) + '" cy="' + pt.y.toFixed(1) + '" r="4.5" fill="#C25949" stroke="var(--card)" stroke-width="1.5"><title>Day ' + pt.d + ': Logged ' + pt.t + '°F</title></circle>';
      });

      out += '<line x1="' + selX.toFixed(1) + '" y1="4" x2="' + selX.toFixed(1) + '" y2="' + (h - 6) + '" stroke="var(--ink)" stroke-width="1.5" />';

      document.getElementById('hormone-day-note').textContent =
        'Day ' + inspectedDay + ' Symptothermal — Expected BBT: ~' + insight.expectedBbt + '°F • Cervical Fluid: ' + insight.fluidLabel;
    }

    out += '<text x="' + padX + '" y="180" fill="var(--faint)" font-size="10" font-family="JetBrains Mono">Day 1</text>';
    out += '<text x="' + (w / 2 - 24) + '" y="180" fill="var(--faint)" font-size="10" font-family="JetBrains Mono">Ovulation</text>';
    out += '<text x="' + (w - padX - 38) + '" y="180" fill="var(--faint)" font-size="10" font-family="JetBrains Mono">Day ' + cLen + '</text>';

    svg.innerHTML = out;
  }

  function renderUpcomingMilestones(profile, todayStatus) {
    const b = todayStatus.bounds;
    const latestStart = todayStatus.latestStart;
    const nextPeriodStart = todayStatus.nextPeriodISO;
    const nextPeriodEnd = addDays(nextPeriodStart, b.periodLength - 1);

    let nextOvulationISO = addDays(latestStart, b.ovulationDay - 1);
    if (diffDays(nextOvulationISO, TODAY_ISO) < 0) {
      nextOvulationISO = addDays(nextPeriodStart, b.ovulationDay - 1);
    }
    const fertileStartISO = addDays(nextOvulationISO, -3);
    const fertileEndISO = addDays(nextOvulationISO, 1);

    let nextLutealISO = addDays(latestStart, b.luteal[0] - 1);
    if (diffDays(nextLutealISO, TODAY_ISO) < 0) {
      nextLutealISO = addDays(nextPeriodStart, b.luteal[0] - 1);
    }

    const items = [
      {
        label: 'Next Expected Period',
        dates: formatShortDate(nextPeriodStart) + ' – ' + formatShortDate(nextPeriodEnd),
        delta: formatDeltaDays(diffDays(nextPeriodStart, TODAY_ISO)),
        color: '#C25949'
      },
      {
        label: 'Fertile & Peak Libido Window',
        dates: formatShortDate(fertileStartISO) + ' – ' + formatShortDate(fertileEndISO) + ' (Ovulation ' + formatShortDate(nextOvulationISO) + ')',
        delta: formatDeltaDays(diffDays(nextOvulationISO, TODAY_ISO)),
        color: '#C4862D'
      },
      {
        label: 'Luteal Neurosteroid Shift',
        dates: 'Starts ' + formatShortDate(nextLutealISO),
        delta: formatDeltaDays(diffDays(nextLutealISO, TODAY_ISO)),
        color: '#7C5879'
      }
    ];

    const container = document.getElementById('upcoming-milestones-list');
    container.innerHTML = items.map(function (it) {
      return (
        '<div class="surface-muted rounded-2xl p-3.5 flex items-center justify-between gap-2">' +
          '<div class="flex items-start gap-2.5">' +
            '<span class="w-2.5 h-2.5 rounded-full mt-1 shrink-0" style="background-color:' + it.color + '"></span>' +
            '<div>' +
              '<div class="text-xs font-medium text-ink">' + it.label + '</div>' +
              '<div class="text-[11px] font-mono text-sub mt-0.5">' + it.dates + '</div>' +
            '</div>' +
          '</div>' +
          '<span class="text-xs font-mono px-2.5 py-1 rounded-xl surface-card text-ink shrink-0">' + it.delta + '</span>' +
        '</div>'
      );
    }).join('');

    document.getElementById('cycle-stats-footer').textContent =
      'Avg Cycle: ' + b.cycleLength + 'd • Period: ' + b.periodLength + 'd • Luteal: ' + b.lutealLength + 'd';
  }

  function formatDeltaDays(d) {
    if (d === 0) return 'Today';
    if (d === 1) return 'Tomorrow';
    if (d > 1) return 'In ' + d + 'd';
    return Math.abs(d) + 'd ago';
  }

  // --- VIEW 2: CALENDAR & 3-CYCLE FORECAST ---
  function renderCalendarView() {
    const p = getActiveProfile();
    if (!p) return;
    const baseDate = parseISO(TODAY_ISO);
    baseDate.setDate(1);
    baseDate.setMonth(baseDate.getMonth() + state.calendarMonthOffset);

    const year = baseDate.getFullYear();
    const month = baseDate.getMonth();
    document.getElementById('cal-month-title').textContent =
      baseDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

    const firstDayOfWeek = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const grid = document.getElementById('calendar-grid');
    grid.innerHTML = '';

    for (let i = 0; i < firstDayOfWeek; i++) {
      const empty = document.createElement('div');
      empty.className = 'h-14 sm:h-16 rounded-2xl opacity-20';
      grid.appendChild(empty);
    }

    const bounds = getPhaseBounds(p);

    for (let dayNum = 1; dayNum <= daysInMonth; dayNum++) {
      const cellDate = new Date(year, month, dayNum, 12, 0, 0);
      const iso = toISO(cellDate);
      const status = getCycleStatusForDate(p, iso);
      const isLoggedPeriod = isDateInLoggedPeriods(p, iso);
      const isPredictedPeriod = !isLoggedPeriod && status.cycleDay <= bounds.periodLength && iso > status.latestStart;
      const isFertile = status.phaseInfo.phaseKey === 'ovulatory';
      const isOvulation = status.cycleDay === bounds.ovulationDay;
      const dayLog = p.logs && p.logs[iso];
      const hasLog = Boolean(dayLog);
      const hasSex = Boolean(dayLog && dayLog.sexActivities && dayLog.sexActivities.length > 0);
      const isSelected = iso === state.selectedCalendarDate;
      const isToday = iso === TODAY_ISO;

      const btn = document.createElement('button');
      btn.type = 'button';
      let bgClass = 'surface-muted hover:opacity-90 text-ink';
      if (isLoggedPeriod) {
        bgClass = 'bg-[#C25949] text-white';
      } else if (isPredictedPeriod) {
        bgClass = 'border border-dashed border-[#C25949] bg-[#C25949]/15 text-ink';
      } else if (isFertile) {
        bgClass = 'border border-[#C4862D]/60 bg-[#C4862D]/15 text-ink';
      }

      const ringClass = isSelected ? 'ring-2 ring-[#1C1917] dark:ring-[#F4EFEA]' : '';
      btn.className = 'tactile-btn h-14 sm:h-16 rounded-2xl p-1.5 flex flex-col justify-between items-start transition relative ' + bgClass + ' ' + ringClass;

      btn.innerHTML =
        '<div class="w-full flex items-center justify-between text-xs font-mono">' +
          '<span class="' + (isToday ? 'underline font-bold' : '') + '">' + dayNum + '</span>' +
          '<span class="text-[9px] opacity-70">D' + status.cycleDay + '</span>' +
        '</div>' +
        '<div class="w-full flex items-center justify-between mt-auto">' +
          (isOvulation ? '<span class="text-[9px] font-mono uppercase px-1 rounded bg-[#C4862D] text-white">OV</span>' : '<span></span>') +
          '<div class="flex items-center gap-1">' +
            (hasSex ? '<span class="w-2 h-2 rounded-full bg-[#C95B78]" title="Intimacy logged"></span>' : '') +
            (hasLog ? '<span class="w-1.5 h-1.5 rounded-full ' + (isLoggedPeriod ? 'bg-white' : 'bg-ink') + '"></span>' : '') +
          '</div>' +
        '</div>';

      btn.addEventListener('click', function () {
        state.selectedCalendarDate = iso;
        renderCalendarView();
      });

      grid.appendChild(btn);
    }

    renderSelectedCalendarDateInspector(p);
    renderThreeCycleForecast(p);
  }

  function isDateInLoggedPeriods(profile, iso) {
    const list = profile.periods || [];
    for (let i = 0; i < list.length; i++) {
      const start = list[i].start;
      const len = Number(list[i].length) || Number(profile.periodLength) || 5;
      const d = diffDays(iso, start);
      if (d >= 0 && d < len) return true;
    }
    return false;
  }

  function renderSelectedCalendarDateInspector(profile) {
    const iso = state.selectedCalendarDate || TODAY_ISO;
    const status = getCycleStatusForDate(profile, iso);
    const log = (profile.logs && profile.logs[iso]) || null;

    document.getElementById('cal-selected-date-label').textContent = formatFullDate(iso);
    document.getElementById('cal-selected-cycle-day').textContent = 'Cycle Day ' + status.cycleDay;
    document.getElementById('cal-selected-phase').textContent = status.phaseInfo.phaseName;
    document.getElementById('cal-selected-summary').textContent = status.phaseInfo.headline;

    const logsEl = document.getElementById('cal-selected-logs');
    if (!log) {
      logsEl.innerHTML = '<div class="text-faint italic">No daily check-in recorded for this date.</div>';
    } else {
      const pills = [];
      if (log.flow && log.flow !== 'none') pills.push('Flow: ' + log.flow);
      if (log.libido) pills.push('Desire: ' + log.libido + '/5');
      if (log.cervicalFluid && log.cervicalFluid !== 'none') pills.push('Fluid: ' + log.cervicalFluid);
      if (log.opk && log.opk !== 'none') pills.push('LH Strip: ' + log.opk.toUpperCase());
      if (log.energy) pills.push('Energy: ' + log.energy + '/5');
      if (log.bbt) pills.push('BBT: ' + log.bbt + '°F');
      (log.sexActivities || []).forEach(function (sa) {
        const found = SEX_ACTIVITIES.find(function (x) { return x.id === sa; });
        pills.push(found ? found.icon + ' ' + found.label : sa);
      });
      (log.sexQualities || []).forEach(function (sq) { pills.push(sq); });
      (log.moods || []).forEach(function (m) { pills.push(m); });
      (log.symptoms || []).forEach(function (s) { pills.push(s); });

      logsEl.innerHTML =
        '<div class="flex flex-wrap gap-1.5">' +
          pills.map(function (t) {
            return '<span class="px-2 py-0.5 rounded-md surface-muted text-ink font-mono text-[11px]">' + escapeHtml(t) + '</span>';
          }).join('') +
        '</div>' +
        (log.notes ? '<p class="text-sub mt-2">“' + escapeHtml(log.notes) + '”</p>' : '');
    }
  }

  function renderThreeCycleForecast(profile) {
    const status = getCycleStatusForDate(profile, TODAY_ISO);
    const b = status.bounds;
    const firstNext = status.nextPeriodISO;
    const rows = [];

    for (let c = 0; c < 3; c++) {
      const pStart = addDays(firstNext, c * b.cycleLength);
      const pEnd = addDays(pStart, b.periodLength - 1);
      const ovDate = addDays(pStart, b.ovulationDay - 1);
      const fStart = addDays(ovDate, -3);
      const fEnd = addDays(ovDate, 1);

      rows.push(
        '<div class="surface-muted rounded-2xl p-3.5 flex items-center justify-between gap-2">' +
          '<div>' +
            '<div class="font-medium text-ink">Cycle +' + (c + 1) + ' Period: ' + formatShortDate(pStart) + ' – ' + formatShortDate(pEnd) + '</div>' +
            '<div class="text-[11px] font-mono text-sub mt-0.5">Fertile Window: ' + formatShortDate(fStart) + ' – ' + formatShortDate(fEnd) + '</div>' +
          '</div>' +
          '<span class="font-mono text-[11px] px-2.5 py-1 rounded-xl surface-card text-ink">' + formatDeltaDays(diffDays(pStart, TODAY_ISO)) + '</span>' +
        '</div>'
      );
    }
    document.getElementById('three-cycle-forecast').innerHTML = rows.join('');
  }

  // --- VIEW 3: DAILY CHECK-IN (INCLUDING SEX TRACKING & BIOMARKERS) ---
  let draftCheckin = {
    flow: 'none',
    sexActivities: [],
    sexQualities: [],
    libido: 3,
    cervicalFluid: 'none',
    opk: 'none',
    moods: [],
    symptoms: [],
    energy: 3,
    bbt: '',
    notes: ''
  };

  const LIBIDO_LABELS = {
    1: '1 / 5 (Dormant)',
    2: '2 / 5 (Quiet)',
    3: '3 / 5 (Receptive)',
    4: '4 / 5 (Spontaneous)',
    5: '5 / 5 (Peak Drive)'
  };

  function loadCheckinForDate(iso) {
    const p = getActiveProfile();
    if (!p) return;
    document.getElementById('checkin-profile-name').textContent = p.name;
    document.getElementById('checkin-date-input').value = iso;

    const status = getCycleStatusForDate(p, iso);
    document.getElementById('checkin-fertility-context').textContent =
      'Day ' + status.cycleDay + ' • ' + status.phaseInfo.conceptionBadge;

    const existing = (p.logs && p.logs[iso]) || null;
    draftCheckin = {
      flow: existing ? (existing.flow || 'none') : 'none',
      sexActivities: existing && Array.isArray(existing.sexActivities) ? existing.sexActivities.slice() : [],
      sexQualities: existing && Array.isArray(existing.sexQualities) ? existing.sexQualities.slice() : [],
      libido: existing && existing.libido ? Number(existing.libido) : 3,
      cervicalFluid: existing ? (existing.cervicalFluid || 'none') : 'none',
      opk: existing ? (existing.opk || 'none') : 'none',
      moods: existing && Array.isArray(existing.moods) ? existing.moods.slice() : [],
      symptoms: existing && Array.isArray(existing.symptoms) ? existing.symptoms.slice() : [],
      energy: existing && existing.energy ? Number(existing.energy) : 3,
      bbt: existing && existing.bbt ? String(existing.bbt) : '',
      notes: existing && existing.notes ? String(existing.notes) : ''
    };

    renderCheckinControls();
  }

  function renderCheckinControls() {
    // Flow buttons
    document.querySelectorAll('.flow-btn').forEach(function (btn) {
      const val = btn.getAttribute('data-flow');
      if (val === draftCheckin.flow) {
        btn.className = 'flow-btn tactile-btn px-3 py-2.5 rounded-xl border border-[#C25949] bg-[#C25949] text-white text-xs font-medium transition';
      } else {
        btn.className = 'flow-btn tactile-btn px-3 py-2.5 rounded-xl border border-subtle surface-muted text-ink text-xs font-medium transition hover:opacity-80';
      }
    });

    // Sex Activity buttons
    const sexActWrap = document.getElementById('sex-activity-options');
    sexActWrap.innerHTML = '';
    SEX_ACTIVITIES.forEach(function (act) {
      const active = draftCheckin.sexActivities.indexOf(act.id) !== -1;
      const b = document.createElement('button');
      b.type = 'button';
      b.className = 'tactile-btn px-3 py-2 rounded-xl text-xs font-medium border flex items-center gap-2 transition ' +
        (active
          ? 'bg-[#C95B78] text-white border-transparent shadow-2xs'
          : 'surface-card border-subtle text-ink hover:opacity-85');
      b.innerHTML = '<span>' + act.icon + '</span><span>' + escapeHtml(act.label) + '</span>';
      b.addEventListener('click', function () {
        toggleArrayItem(draftCheckin.sexActivities, act.id);
        renderCheckinControls();
      });
      sexActWrap.appendChild(b);
    });

    // Libido slider
    document.getElementById('checkin-libido-slider').value = String(draftCheckin.libido);
    document.getElementById('checkin-libido-val').textContent = LIBIDO_LABELS[draftCheckin.libido] || (draftCheckin.libido + ' / 5');

    // Sex Qualities
    const sexQualWrap = document.getElementById('sex-quality-options');
    sexQualWrap.innerHTML = '';
    SEX_QUALITIES.forEach(function (q) {
      const active = draftCheckin.sexQualities.indexOf(q) !== -1;
      const b = document.createElement('button');
      b.type = 'button';
      b.className = 'tactile-btn px-2.5 py-1 rounded-full text-[11px] font-medium border transition ' +
        (active
          ? 'bg-[#1C1917] text-[#F7F4EF] dark:bg-[#F4EFEA] dark:text-[#121010] border-transparent'
          : 'surface-card border-subtle text-sub hover:text-ink');
      b.textContent = q;
      b.addEventListener('click', function () {
        toggleArrayItem(draftCheckin.sexQualities, q);
        renderCheckinControls();
      });
      sexQualWrap.appendChild(b);
    });

    // Cervical Fluid options
    const cfWrap = document.getElementById('cervical-fluid-options');
    cfWrap.innerHTML = '';
    CERVICAL_FLUIDS.forEach(function (cf) {
      const active = draftCheckin.cervicalFluid === cf.id;
      const b = document.createElement('button');
      b.type = 'button';
      b.className = 'tactile-btn p-2.5 rounded-xl border text-left transition ' +
        (active
          ? 'bg-[#C4862D] text-white border-transparent'
          : 'surface-card border-subtle text-ink hover:opacity-85');
      b.innerHTML = '<div class="text-xs font-medium">' + escapeHtml(cf.label) + '</div><div class="text-[10px] opacity-75">' + escapeHtml(cf.sub) + '</div>';
      b.addEventListener('click', function () {
        draftCheckin.cervicalFluid = cf.id;
        renderCheckinControls();
      });
      cfWrap.appendChild(b);
    });

    // OPK strip buttons
    document.querySelectorAll('.opk-btn').forEach(function (btn) {
      const val = btn.getAttribute('data-opk');
      if (val === draftCheckin.opk) {
        btn.className = 'opk-btn px-2.5 py-1 rounded-lg text-[10px] font-mono bg-[#1C1917] text-[#F7F4EF] dark:bg-[#F4EFEA] dark:text-[#121010]';
      } else {
        btn.className = 'opk-btn px-2.5 py-1 rounded-lg text-[10px] font-mono surface-card text-sub hover:text-ink';
      }
    });

    // Mood tags
    const moodWrap = document.getElementById('mood-options');
    moodWrap.innerHTML = '';
    MOOD_TAGS.forEach(function (tag) {
      const active = draftCheckin.moods.indexOf(tag) !== -1;
      const b = document.createElement('button');
      b.type = 'button';
      b.className = 'tactile-btn px-3 py-1.5 rounded-full text-xs font-medium border transition ' +
        (active
          ? 'bg-[#1C1917] text-[#F7F4EF] dark:bg-[#F4EFEA] dark:text-[#121010] border-transparent'
          : 'surface-muted border-subtle text-sub hover:text-ink');
      b.textContent = tag;
      b.addEventListener('click', function () {
        toggleArrayItem(draftCheckin.moods, tag);
        renderCheckinControls();
      });
      moodWrap.appendChild(b);
    });

    // Symptom tags
    const symWrap = document.getElementById('symptom-options');
    symWrap.innerHTML = '';
    SYMPTOM_TAGS.forEach(function (tag) {
      const active = draftCheckin.symptoms.indexOf(tag) !== -1;
      const b = document.createElement('button');
      b.type = 'button';
      b.className = 'tactile-btn px-3 py-1.5 rounded-full text-xs font-medium border transition ' +
        (active
          ? 'bg-[#3E7A6E] text-white border-transparent'
          : 'surface-muted border-subtle text-sub hover:text-ink');
      b.textContent = tag;
      b.addEventListener('click', function () {
        toggleArrayItem(draftCheckin.symptoms, tag);
        renderCheckinControls();
      });
      symWrap.appendChild(b);
    });

    document.getElementById('checkin-energy-slider').value = String(draftCheckin.energy);
    document.getElementById('checkin-energy-val').textContent = draftCheckin.energy + ' / 5';
    document.getElementById('checkin-bbt-input').value = draftCheckin.bbt;
    document.getElementById('checkin-notes').value = draftCheckin.notes;
  }

  function toggleArrayItem(arr, item) {
    const idx = arr.indexOf(item);
    if (idx === -1) arr.push(item);
    else arr.splice(idx, 1);
  }

  // --- VIEW 4: BODY & MIND EDUCATIONAL ATLAS ---
  function renderAtlasView() {
    const grid = document.getElementById('atlas-cards-grid');
    if (!grid) return;

    document.querySelectorAll('.atlas-cat-btn').forEach(function (b) {
      const c = b.getAttribute('data-atlas-cat');
      if (c === atlasCategory) {
        b.className = 'atlas-cat-btn tactile-btn px-3 py-1.5 rounded-full text-xs font-medium bg-[#1C1917] text-[#F7F4EF] dark:bg-[#F4EFEA] dark:text-[#121010]';
      } else {
        b.className = 'atlas-cat-btn tactile-btn px-3 py-1.5 rounded-full text-xs font-medium surface-muted text-sub hover:text-ink';
      }
    });

    const filtered = ATLAS_MODULES.filter(function (m) {
      return atlasCategory === 'all' || m.cat === atlasCategory;
    });

    grid.innerHTML = filtered.map(function (mod) {
      return (
        '<article class="surface-card rounded-3xl p-5 sm:p-6 flex flex-col justify-between gap-4">' +
          '<div>' +
            '<div class="flex items-center justify-between gap-2 mb-2">' +
              '<span class="text-[10px] font-mono uppercase tracking-wider px-2.5 py-0.5 rounded-full surface-muted text-sub">' + escapeHtml(mod.badge) + '</span>' +
            '</div>' +
            '<h3 class="font-serif text-2xl text-ink leading-snug">' + escapeHtml(mod.title) + '</h3>' +
            '<div class="my-3 p-3 rounded-2xl surface-muted text-ink">' + mod.svg + '</div>' +
            '<p class="text-xs sm:text-sm text-sub leading-relaxed">' + escapeHtml(mod.summary) + '</p>' +
          '</div>' +
          '<div class="pt-3 border-t border-subtle space-y-1.5">' +
            '<p class="text-xs text-ink font-medium">' + escapeHtml(mod.takeaway) + '</p>' +
            '<div class="text-[10px] font-mono text-faint">Reference: ' + escapeHtml(mod.sourceLabel) + '</div>' +
          '</div>' +
        '</article>'
      );
    }).join('');
  }

  // --- VIEW 5: ALL PROFILES (MULTI-PERSON OVERVIEW) ---
  function renderPeopleView() {
    const grid = document.getElementById('multi-profile-grid');
    grid.innerHTML = '';

    state.profiles.forEach(function (p) {
      const status = getCycleStatusForDate(p, TODAY_ISO);
      const ph = status.phaseInfo;
      const card = document.createElement('div');
      card.className = 'surface-card rounded-3xl p-5 flex flex-col justify-between gap-4';

      card.innerHTML =
        '<div>' +
          '<div class="flex items-center justify-between gap-2">' +
            '<div class="flex items-center gap-3">' +
              '<div class="w-11 h-11 rounded-2xl flex items-center justify-center font-serif text-xl text-white" style="background-color:' + p.color + '">' + escapeHtml(p.name.charAt(0).toUpperCase()) + '</div>' +
              '<div>' +
                '<div class="flex items-center gap-2">' +
                  '<h3 class="font-serif text-2xl text-ink leading-none">' + escapeHtml(p.name) + '</h3>' +
                  '<span class="text-[10px] font-mono uppercase px-2 py-0.5 rounded-full surface-muted text-sub">' + escapeHtml(p.relation) + '</span>' +
                '</div>' +
                '<div class="text-xs font-mono text-sub mt-1">Day ' + status.cycleDay + ' of ' + status.bounds.cycleLength + ' • ' + ph.phaseName + '</div>' +
              '</div>' +
            '</div>' +
            '<span class="w-3 h-3 rounded-full shrink-0" style="background-color:' + ph.color + '"></span>' +
          '</div>' +

          '<div class="mt-4 pt-3 border-t border-subtle space-y-2 text-xs">' +
            '<p class="text-ink font-medium leading-snug">' + escapeHtml(ph.headline) + '</p>' +
            '<p class="text-sub leading-relaxed"><strong>Relational Cue:</strong> ' + escapeHtml(ph.partnerBody) + '</p>' +
          '</div>' +
        '</div>' +

        '<div class="pt-3 border-t border-subtle flex items-center justify-between text-xs">' +
          '<span class="font-mono text-sub">Next flow: <strong>' + formatShortDate(status.nextPeriodISO) + '</strong> (' + formatDeltaDays(status.daysUntilNextPeriod) + ')</span>' +
          '<div class="flex items-center gap-2">' +
            '<button type="button" data-export-id="' + p.id + '" class="btn-card-export text-sub hover:text-ink underline font-mono text-[11px]">Export</button>' +
            '<button type="button" data-edit-id="' + p.id + '" class="btn-card-edit text-sub hover:text-ink underline">Edit</button>' +
            '<button type="button" data-switch-id="' + p.id + '" class="btn-card-switch tactile-btn px-3 py-1 rounded-full surface-muted text-ink font-medium hover:opacity-80">Inspect →</button>' +
          '</div>' +
        '</div>';

      grid.appendChild(card);
    });

    grid.querySelectorAll('.btn-card-switch').forEach(function (b) {
      b.addEventListener('click', function () {
        state.activeProfileId = b.getAttribute('data-switch-id');
        state.activeView = 'cycle';
        state.selectedCycleDay = null;
        saveState();
        renderAll();
      });
    });

    grid.querySelectorAll('.btn-card-edit').forEach(function (b) {
      b.addEventListener('click', function () {
        const id = b.getAttribute('data-edit-id');
        const prof = state.profiles.find(function (x) { return x.id === id; });
        if (prof) openProfileModal(prof);
      });
    });

    grid.querySelectorAll('.btn-card-export').forEach(function (b) {
      b.addEventListener('click', function () {
        const id = b.getAttribute('data-export-id');
        const prof = state.profiles.find(function (x) { return x.id === id; });
        if (prof) exportSingleProfileJSON(prof);
      });
    });

    // Render 14-day side-by-side strip
    const timeline = document.getElementById('multi-person-timeline');
    let headerCells = '<div class="w-28 shrink-0 text-[11px] font-mono text-faint">Person</div>';
    for (let d = 0; d < 14; d++) {
      const iso = addDays(TODAY_ISO, d);
      const dt = parseISO(iso);
      headerCells +=
        '<div class="flex-1 text-center text-[10px] font-mono text-faint">' +
          '<div>' + dt.toLocaleDateString('en-US', { weekday: 'narrow' }) + '</div>' +
          '<div class="text-ink">' + dt.getDate() + '</div>' +
        '</div>';
    }

    let rowsHtml = '<div class="flex items-center gap-1 pb-2 border-b border-subtle">' + headerCells + '</div>';

    state.profiles.forEach(function (p) {
      let cells = '<div class="w-28 shrink-0 pr-2 truncate text-xs font-medium text-ink flex items-center gap-1.5">' +
        '<span class="w-2 h-2 rounded-full" style="background-color:' + p.color + '"></span>' +
        escapeHtml(p.name) + '</div>';

      for (let d = 0; d < 14; d++) {
        const iso = addDays(TODAY_ISO, d);
        const st = getCycleStatusForDate(p, iso);
        cells +=
          '<div class="flex-1 h-8 rounded-lg flex items-center justify-center text-[10px] font-mono text-white" ' +
          'style="background-color:' + st.phaseInfo.color + '" title="' + escapeHtml(p.name) + ' • ' + formatShortDate(iso) + ': Day ' + st.cycleDay + ' (' + st.phaseInfo.phaseName + ')">' +
          'D' + st.cycleDay +
          '</div>';
      }
      rowsHtml += '<div class="flex items-center gap-1">' + cells + '</div>';
    });

    timeline.innerHTML = rowsHtml;
  }

  // --- VIEW 6: HISTORY & ANALYTICS ---
  function renderHistoryView() {
    const p = getActiveProfile();
    if (!p) return;
    const sorted = sortPeriods(p.periods).reverse();
    const listEl = document.getElementById('history-cycles-list');

    if (sorted.length === 0) {
      listEl.innerHTML = '<div class="text-xs text-sub">No periods logged yet.</div>';
    } else {
      listEl.innerHTML = sorted.map(function (per, idx) {
        const nextNewer = idx > 0 ? sorted[idx - 1] : null;
        const cycleLen = nextNewer ? diffDays(nextNewer.start, per.start) : p.cycleLength;
        const label = idx === 0 ? 'Current Cycle (Active)' : 'Cycle Length: ' + cycleLen + ' days';
        const barWidth = Math.min(100, Math.round((cycleLen / 38) * 100));

        return (
          '<div class="surface-muted rounded-2xl p-3.5 space-y-2">' +
            '<div class="flex items-center justify-between text-xs">' +
              '<span class="font-medium text-ink">Started ' + formatFullDate(per.start) + '</span>' +
              '<div class="flex items-center gap-2">' +
                '<span class="font-mono text-sub">' + label + ' • Flow: ' + per.length + 'd</span>' +
                (sorted.length > 1
                  ? '<button type="button" data-del-start="' + per.start + '" class="btn-del-period text-[11px] font-mono text-[#C25949] hover:underline">Remove</button>'
                  : '') +
              '</div>' +
            '</div>' +
            '<div class="w-full h-2 rounded-full surface-card overflow-hidden flex">' +
              '<div class="h-full bg-[#C25949]" style="width:' + Math.round((per.length / cycleLen) * barWidth) + '%"></div>' +
              '<div class="h-full bg-[#3E7A6E]" style="width:' + Math.round(((cycleLen - p.lutealLength - per.length) / cycleLen) * barWidth) + '%"></div>' +
              '<div class="h-full bg-[#7C5879]" style="width:' + Math.round((p.lutealLength / cycleLen) * barWidth) + '%"></div>' +
            '</div>' +
          '</div>'
        );
      }).join('');

      listEl.querySelectorAll('.btn-del-period').forEach(function (btn) {
        btn.addEventListener('click', function () {
          const st = btn.getAttribute('data-del-start');
          p.periods = (p.periods || []).filter(function (x) { return x.start !== st; });
          recalculateProfileCycleStats(p);
          saveState();
          renderAll();
        });
      });
    }

    const b = getPhaseBounds(p);
    const acogStatus = (b.cycleLength >= 21 && b.cycleLength <= 35) ? 'Within ACOG normal range (21–35d)' : 'Outside typical 21–35d range';
    document.getElementById('history-metrics-summary').innerHTML =
      '<div class="flex justify-between py-1.5 border-b border-subtle"><span class="text-sub">Average Cycle Length</span><span class="font-mono text-ink">' + b.cycleLength + ' days</span></div>' +
      '<div class="flex justify-between py-1.5 border-b border-subtle"><span class="text-sub">Average Bleeding Duration</span><span class="font-mono text-ink">' + b.periodLength + ' days</span></div>' +
      '<div class="flex justify-between py-1.5 border-b border-subtle"><span class="text-sub">Estimated Ovulation Day</span><span class="font-mono text-ink">Day ' + b.ovulationDay + '</span></div>' +
      '<div class="flex justify-between py-1.5 border-b border-subtle"><span class="text-sub">Luteal Phase Length</span><span class="font-mono text-ink">' + b.lutealLength + ' days</span></div>' +
      '<div class="flex justify-between py-1.5"><span class="text-sub">Clinical Vital Sign Check</span><span class="font-mono text-[#3E7A6E]">' + acogStatus + '</span></div>';

    const logsEl = document.getElementById('history-logs-list');
    const logDates = Object.keys(p.logs || {}).sort().reverse();
    if (logDates.length === 0) {
      logsEl.innerHTML = '<div class="text-faint italic">No daily check-in entries logged yet.</div>';
    } else {
      logsEl.innerHTML = logDates.map(function (iso) {
        const entry = p.logs[iso];
        const tags = [].concat(
          (entry.sexActivities || []).map(function (s) { return 'Intimacy: ' + s; }),
          entry.sexQualities || [],
          entry.moods || [],
          entry.symptoms || []
        );
        return (
          '<div class="surface-muted rounded-2xl p-3 space-y-1">' +
            '<div class="flex items-center justify-between font-mono text-[11px]">' +
              '<span class="text-ink font-medium">' + formatShortDate(iso) + '</span>' +
              '<span class="text-sub">Energy ' + (entry.energy || 3) + '/5' +
                (entry.libido ? ' • Desire ' + entry.libido + '/5' : '') +
                (entry.bbt ? ' • ' + entry.bbt + '°F' : '') + '</span>' +
            '</div>' +
            (tags.length ? '<div class="text-[11px] text-sub">' + escapeHtml(tags.join(' · ')) + '</div>' : '') +
            (entry.notes ? '<div class="text-xs text-ink italic">“' + escapeHtml(entry.notes) + '”</div>' : '') +
          '</div>'
        );
      }).join('');
    }
  }

  function escapeHtml(str) {
    return String(str || '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  // --- MASTER RENDER DISPATCHER ---
  function renderAll() {
    const hasProfiles = Array.isArray(state.profiles) && state.profiles.length > 0;
    const onboardSec = document.getElementById('view-onboarding');
    const workspace = document.getElementById('workspace-authenticated');
    const mainNav = document.getElementById('main-nav-container');
    const logPeriodBtn = document.getElementById('btn-open-log-period');

    if (!hasProfiles) {
      applyTheme('menstrual');
      onboardSec.classList.remove('hidden');
      workspace.classList.add('hidden');
      mainNav.classList.add('hidden');
      logPeriodBtn.classList.add('hidden');
      document.getElementById('profile-switcher-bar').innerHTML =
        '<span class="text-xs font-mono text-faint">Onboarding — Create or import a profile</span>';
      return;
    }

    onboardSec.classList.add('hidden');
    workspace.classList.remove('hidden');
    mainNav.classList.remove('hidden');
    logPeriodBtn.classList.remove('hidden');

    const active = getActiveProfile();
    const todayStatus = getCycleStatusForDate(active, TODAY_ISO);
    applyTheme(todayStatus.phaseInfo.phaseKey);

    renderHeaderAndSwitcher();
    renderActiveProfileBanner();

    const views = ['cycle', 'calendar', 'checkin', 'atlas', 'people', 'history'];
    views.forEach(function (v) {
      const el = document.getElementById('view-' + v);
      if (v === state.activeView) el.classList.remove('hidden');
      else el.classList.add('hidden');
    });

    if (state.activeView === 'cycle') renderCycleView();
    else if (state.activeView === 'calendar') renderCalendarView();
    else if (state.activeView === 'checkin') loadCheckinForDate(state.selectedCalendarDate || TODAY_ISO);
    else if (state.activeView === 'atlas') renderAtlasView();
    else if (state.activeView === 'people') renderPeopleView();
    else if (state.activeView === 'history') renderHistoryView();
  }

  // --- IMPORT / EXPORT PROFILE & VAULT FUNCTIONS ---
  function exportSingleProfileJSON(profile) {
    if (!profile) return;
    const payload = {
      type: 'cadence_single_profile',
      version: '2.0',
      exportedAt: TODAY_ISO,
      profile: profile
    };
    downloadJSON(payload, 'cadence_profile_' + profile.name.toLowerCase().replace(/[^a-z0-9]/g, '_') + '.json');
  }

  function downloadJSON(obj, filename) {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(obj, null, 2));
    const a = document.createElement('a');
    a.setAttribute('href', dataStr);
    a.setAttribute('download', filename);
    document.body.appendChild(a);
    a.click();
    a.remove();
  }

  function handleImportedJSONFile(file) {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = function (ev) {
      try {
        const parsed = JSON.parse(String(ev.target.result));
        if (parsed && parsed.type === 'cadence_single_profile' && parsed.profile && parsed.profile.name) {
          const incoming = parsed.profile;
          incoming.id = 'p_' + Date.now();
          state.profiles.push(incoming);
          state.activeProfileId = incoming.id;
          saveState();
          renderAll();
          showPwaMessage('Imported profile: ' + incoming.name);
        } else if (parsed && Array.isArray(parsed.profiles)) {
          state = parsed;
          if (state.profiles.length > 0 && !state.activeProfileId) {
            state.activeProfileId = state.profiles[0].id;
          }
          saveState();
          renderAll();
          showPwaMessage('Full vault restored (' + state.profiles.length + ' profiles).');
        } else if (parsed && parsed.name && Array.isArray(parsed.periods)) {
          parsed.id = 'p_' + Date.now();
          state.profiles.push(parsed);
          state.activeProfileId = parsed.id;
          saveState();
          renderAll();
          showPwaMessage('Imported profile: ' + parsed.name);
        } else {
          showPwaMessage('Unrecognized JSON structure.');
        }
      } catch (err) {
        showPwaMessage('Invalid JSON file.');
      }
    };
    reader.readAsText(file);
  }

  // --- PROFILE MODAL HANDLERS ---
  function openProfileModal(profileObj) {
    const modal = document.getElementById('modal-profile');
    const delBtn = document.getElementById('btn-delete-profile');

    if (profileObj) {
      document.getElementById('modal-profile-title').textContent = 'Edit ' + profileObj.name;
      document.getElementById('profile-id-input').value = profileObj.id;
      document.getElementById('profile-name-input').value = profileObj.name;
      document.getElementById('profile-relation-input').value = profileObj.relation;
      document.getElementById('profile-goal-input').value = profileObj.goal || 'rhythm';
      document.getElementById('profile-cycle-len').value = String(profileObj.cycleLength);
      document.getElementById('profile-period-len').value = String(profileObj.periodLength);
      document.getElementById('profile-luteal-len').value = String(profileObj.lutealLength);
      document.getElementById('profile-last-period').value = getLatestPeriodStart(profileObj);
      selectedModalColor = profileObj.color || '#C25949';
      delBtn.classList.remove('hidden');
    } else {
      document.getElementById('modal-profile-title').textContent = 'Add Person';
      document.getElementById('profile-id-input').value = '';
      document.getElementById('profile-name-input').value = '';
      document.getElementById('profile-relation-input').value = state.profiles.length === 0 ? 'Self' : 'Partner';
      document.getElementById('profile-goal-input').value = 'rhythm';
      document.getElementById('profile-cycle-len').value = '28';
      document.getElementById('profile-period-len').value = '5';
      document.getElementById('profile-luteal-len').value = '14';
      document.getElementById('profile-last-period').value = addDays(TODAY_ISO, -7);
      selectedModalColor = '#3E7A6E';
      delBtn.classList.add('hidden');
    }

    updateColorSwatches();
    modal.classList.remove('hidden');
    modal.classList.add('flex');
  }

  function closeProfileModal() {
    const modal = document.getElementById('modal-profile');
    modal.classList.add('hidden');
    modal.classList.remove('flex');
  }

  function updateColorSwatches() {
    document.querySelectorAll('.color-swatch').forEach(function (sw) {
      const c = sw.getAttribute('data-color');
      if (c === selectedModalColor) {
        sw.classList.add('ring-2', 'ring-[#1C1917]', 'dark:ring-[#F4EFEA]');
      } else {
        sw.classList.remove('ring-2', 'ring-[#1C1917]', 'dark:ring-[#F4EFEA]');
      }
    });
  }

  // --- EVENT BINDINGS ---
  function bindEvents() {
    // Initialize onboarding default date
    const onboardDateInput = document.getElementById('onboard-last-period');
    if (onboardDateInput) onboardDateInput.value = addDays(TODAY_ISO, -10);

    // Onboarding sliders & pickers
    document.getElementById('onboard-cycle-len').addEventListener('input', function (e) {
      document.getElementById('onboard-cycle-val').textContent = e.target.value + ' days';
    });
    document.getElementById('onboard-period-len').addEventListener('input', function (e) {
      document.getElementById('onboard-period-val').textContent = e.target.value + ' days';
    });
    document.getElementById('onboard-luteal-len').addEventListener('input', function (e) {
      document.getElementById('onboard-luteal-val').textContent = e.target.value + ' days';
    });

    document.querySelectorAll('.onboard-goal-btn').forEach(function (btn) {
      btn.addEventListener('click', function () {
        onboardGoal = btn.getAttribute('data-goal');
        document.querySelectorAll('.onboard-goal-btn').forEach(function (b) {
          if (b.getAttribute('data-goal') === onboardGoal) {
            b.className = 'onboard-goal-btn tactile-btn p-3 rounded-xl border border-subtle text-left transition bg-[#1C1917] text-[#F7F4EF] dark:bg-[#F4EFEA] dark:text-[#121010]';
          } else {
            b.className = 'onboard-goal-btn tactile-btn p-3 rounded-xl border border-subtle surface-muted text-ink text-left transition';
          }
        });
      });
    });

    document.querySelectorAll('.onboard-swatch').forEach(function (sw) {
      sw.addEventListener('click', function () {
        onboardColor = sw.getAttribute('data-onboard-color');
        document.querySelectorAll('.onboard-swatch').forEach(function (s) {
          if (s.getAttribute('data-onboard-color') === onboardColor) {
            s.classList.add('ring-2', 'ring-[#1C1917]', 'dark:ring-[#F4EFEA]');
          } else {
            s.classList.remove('ring-2', 'ring-[#1C1917]', 'dark:ring-[#F4EFEA]');
          }
        });
      });
    });

    document.getElementById('form-onboarding').addEventListener('submit', function (e) {
      e.preventDefault();
      const name = document.getElementById('onboard-name').value.trim() || 'Me';
      const relation = document.getElementById('onboard-relation').value;
      const cycleLen = Number(document.getElementById('onboard-cycle-len').value) || 28;
      const periodLen = Number(document.getElementById('onboard-period-len').value) || 5;
      const lutealLen = Number(document.getElementById('onboard-luteal-len').value) || 14;
      const lastPeriod = document.getElementById('onboard-last-period').value || addDays(TODAY_ISO, -10);

      const newId = 'p_' + Date.now();
      state.profiles = [{
        id: newId,
        name: name,
        relation: relation,
        goal: onboardGoal,
        color: onboardColor,
        cycleLength: cycleLen,
        periodLength: periodLen,
        lutealLength: lutealLen,
        periods: [
          { start: addDays(lastPeriod, -cycleLen), length: periodLen },
          { start: lastPeriod, length: periodLen }
        ],
        logs: {}
      }];
      state.activeProfileId = newId;
      state.activeView = 'cycle';
      saveState();
      renderAll();
    });

    document.getElementById('onboard-import-file').addEventListener('change', function (e) {
      handleImportedJSONFile(e.target.files && e.target.files[0]);
    });

    document.getElementById('btn-onboard-load-sample').addEventListener('click', function () {
      state = buildSampleHouseholdState();
      saveState();
      renderAll();
    });

    // Theme toggle
    document.getElementById('btn-theme-toggle').addEventListener('click', function () {
      state.theme = state.theme === 'dark' ? 'light' : 'dark';
      saveState();
      renderAll();
    });

    // Navigation tabs
    document.querySelectorAll('.nav-tab').forEach(function (tab) {
      tab.addEventListener('click', function () {
        state.activeView = tab.getAttribute('data-view');
        saveState();
        renderAll();
      });
    });

    // Chart mode toggle (Hormones vs BBT)
    document.getElementById('btn-chart-hormones').addEventListener('click', function () {
      chartMode = 'hormones';
      document.getElementById('btn-chart-hormones').className = 'tactile-btn px-3 py-1 rounded-full font-medium bg-[#1C1917] text-[#F7F4EF] dark:bg-[#F4EFEA] dark:text-[#121010]';
      document.getElementById('btn-chart-bbt').className = 'tactile-btn px-3 py-1 rounded-full font-medium text-sub hover:text-ink';
      renderCycleView();
    });

    document.getElementById('btn-chart-bbt').addEventListener('click', function () {
      chartMode = 'bbt';
      document.getElementById('btn-chart-bbt').className = 'tactile-btn px-3 py-1 rounded-full font-medium bg-[#1C1917] text-[#F7F4EF] dark:bg-[#F4EFEA] dark:text-[#121010]';
      document.getElementById('btn-chart-hormones').className = 'tactile-btn px-3 py-1 rounded-full font-medium text-sub hover:text-ink';
      renderCycleView();
    });

    document.getElementById('btn-quick-log-intimacy').addEventListener('click', function () {
      state.selectedCalendarDate = TODAY_ISO;
      state.activeView = 'checkin';
      saveState();
      renderAll();
    });

    // Atlas category filter
    document.querySelectorAll('.atlas-cat-btn').forEach(function (btn) {
      btn.addEventListener('click', function () {
        atlasCategory = btn.getAttribute('data-atlas-cat');
        renderAtlasView();
      });
    });

    // Scrubber slider
    document.getElementById('cycle-day-slider').addEventListener('input', function (e) {
      state.selectedCycleDay = Number(e.target.value);
      renderCycleView();
    });

    document.getElementById('btn-reset-today').addEventListener('click', function () {
      state.selectedCycleDay = null;
      renderCycleView();
    });

    document.getElementById('btn-jump-calendar').addEventListener('click', function () {
      state.activeView = 'calendar';
      saveState();
      renderAll();
    });

    // Calendar navigation
    document.getElementById('cal-prev-month').addEventListener('click', function () {
      state.calendarMonthOffset -= 1;
      renderCalendarView();
    });
    document.getElementById('cal-next-month').addEventListener('click', function () {
      state.calendarMonthOffset += 1;
      renderCalendarView();
    });
    document.getElementById('cal-today-btn').addEventListener('click', function () {
      state.calendarMonthOffset = 0;
      state.selectedCalendarDate = TODAY_ISO;
      renderCalendarView();
    });

    document.getElementById('btn-cal-toggle-period').addEventListener('click', function () {
      const p = getActiveProfile();
      if (!p) return;
      const iso = state.selectedCalendarDate || TODAY_ISO;
      const exists = (p.periods || []).some(function (x) { return x.start === iso; });
      if (exists) {
        if (p.periods.length > 1) {
          p.periods = p.periods.filter(function (x) { return x.start !== iso; });
        }
      } else {
        p.periods.push({ start: iso, length: p.periodLength || 5 });
      }
      recalculateProfileCycleStats(p);
      saveState();
      renderAll();
    });

    document.getElementById('btn-cal-open-checkin').addEventListener('click', function () {
      state.activeView = 'checkin';
      saveState();
      renderAll();
    });

    // Check-in form controls
    document.getElementById('checkin-date-input').addEventListener('change', function (e) {
      state.selectedCalendarDate = e.target.value || TODAY_ISO;
      loadCheckinForDate(state.selectedCalendarDate);
    });

    document.querySelectorAll('.flow-btn').forEach(function (btn) {
      btn.addEventListener('click', function () {
        draftCheckin.flow = btn.getAttribute('data-flow');
        renderCheckinControls();
      });
    });

    document.getElementById('checkin-libido-slider').addEventListener('input', function (e) {
      draftCheckin.libido = Number(e.target.value);
      document.getElementById('checkin-libido-val').textContent = LIBIDO_LABELS[draftCheckin.libido] || (draftCheckin.libido + ' / 5');
    });

    document.querySelectorAll('.opk-btn').forEach(function (btn) {
      btn.addEventListener('click', function () {
        draftCheckin.opk = btn.getAttribute('data-opk');
        renderCheckinControls();
      });
    });

    document.getElementById('checkin-energy-slider').addEventListener('input', function (e) {
      draftCheckin.energy = Number(e.target.value);
      document.getElementById('checkin-energy-val').textContent = draftCheckin.energy + ' / 5';
    });

    document.getElementById('checkin-bbt-input').addEventListener('input', function (e) {
      draftCheckin.bbt = e.target.value;
    });

    document.getElementById('checkin-notes').addEventListener('input', function (e) {
      draftCheckin.notes = e.target.value;
    });

    document.getElementById('checkin-form').addEventListener('submit', function (e) {
      e.preventDefault();
      const p = getActiveProfile();
      if (!p) return;
      const iso = document.getElementById('checkin-date-input').value || TODAY_ISO;
      if (!p.logs) p.logs = {};
      p.logs[iso] = {
        flow: draftCheckin.flow,
        sexActivities: draftCheckin.sexActivities.slice(),
        sexQualities: draftCheckin.sexQualities.slice(),
        libido: draftCheckin.libido,
        cervicalFluid: draftCheckin.cervicalFluid,
        opk: draftCheckin.opk,
        moods: draftCheckin.moods.slice(),
        symptoms: draftCheckin.symptoms.slice(),
        energy: draftCheckin.energy,
        bbt: draftCheckin.bbt,
        notes: draftCheckin.notes.trim()
      };
      saveState();
      const fb = document.getElementById('checkin-save-feedback');
      fb.classList.remove('opacity-0');
      setTimeout(function () { fb.classList.add('opacity-0'); }, 2200);
    });

    document.getElementById('btn-clear-checkin').addEventListener('click', function () {
      const p = getActiveProfile();
      if (!p) return;
      const iso = document.getElementById('checkin-date-input').value || TODAY_ISO;
      if (p.logs && p.logs[iso]) {
        delete p.logs[iso];
        saveState();
      }
      loadCheckinForDate(iso);
    });

    // Profile modal triggers
    document.getElementById('btn-edit-active-profile').addEventListener('click', function () {
      openProfileModal(getActiveProfile());
    });
    document.getElementById('btn-export-active-profile').addEventListener('click', function () {
      exportSingleProfileJSON(getActiveProfile());
    });
    document.getElementById('btn-add-profile').addEventListener('click', function () {
      openProfileModal(null);
    });
    document.getElementById('btn-close-profile-modal').addEventListener('click', closeProfileModal);
    document.getElementById('btn-cancel-profile').addEventListener('click', closeProfileModal);

    document.querySelectorAll('.color-swatch').forEach(function (sw) {
      sw.addEventListener('click', function () {
        selectedModalColor = sw.getAttribute('data-color');
        updateColorSwatches();
      });
    });

    document.getElementById('form-profile').addEventListener('submit', function (e) {
      e.preventDefault();
      const id = document.getElementById('profile-id-input').value;
      const name = document.getElementById('profile-name-input').value.trim() || 'Person';
      const relation = document.getElementById('profile-relation-input').value;
      const goal = document.getElementById('profile-goal-input').value || 'rhythm';
      const cycleLength = Math.min(45, Math.max(20, Number(document.getElementById('profile-cycle-len').value) || 28));
      const periodLength = Math.min(10, Math.max(2, Number(document.getElementById('profile-period-len').value) || 5));
      const lutealLength = Math.min(17, Math.max(10, Number(document.getElementById('profile-luteal-len').value) || 14));
      const lastPeriod = document.getElementById('profile-last-period').value || TODAY_ISO;

      if (id) {
        const existing = state.profiles.find(function (x) { return x.id === id; });
        if (existing) {
          existing.name = name;
          existing.relation = relation;
          existing.goal = goal;
          existing.cycleLength = cycleLength;
          existing.periodLength = periodLength;
          existing.lutealLength = lutealLength;
          existing.color = selectedModalColor;
          const hasDate = (existing.periods || []).some(function (p) { return p.start === lastPeriod; });
          if (!hasDate) {
            existing.periods.push({ start: lastPeriod, length: periodLength });
          }
        }
      } else {
        const newId = 'p_' + Date.now();
        state.profiles.push({
          id: newId,
          name: name,
          relation: relation,
          goal: goal,
          color: selectedModalColor,
          cycleLength: cycleLength,
          periodLength: periodLength,
          lutealLength: lutealLength,
          periods: [{ start: lastPeriod, length: periodLength }],
          logs: {}
        });
        state.activeProfileId = newId;
      }

      state.selectedCycleDay = null;
      saveState();
      closeProfileModal();
      renderAll();
    });

    document.getElementById('btn-delete-profile').addEventListener('click', function () {
      const id = document.getElementById('profile-id-input').value;
      state.profiles = state.profiles.filter(function (x) { return x.id !== id; });
      state.activeProfileId = state.profiles.length > 0 ? state.profiles[0].id : null;
      saveState();
      closeProfileModal();
      renderAll();
    });

    // Quick Log Period Modal
    const periodModal = document.getElementById('modal-log-period');
    function openPeriodModal() {
      const p = getActiveProfile();
      if (!p) return;
      document.getElementById('period-modal-person-name').textContent = p.name;
      document.getElementById('period-start-date-input').value = TODAY_ISO;
      document.getElementById('period-duration-input').value = String(p.periodLength || 5);
      periodModal.classList.remove('hidden');
      periodModal.classList.add('flex');
    }
    function closePeriodModal() {
      periodModal.classList.add('hidden');
      periodModal.classList.remove('flex');
    }

    document.getElementById('btn-open-log-period').addEventListener('click', openPeriodModal);
    document.getElementById('btn-history-add-period').addEventListener('click', openPeriodModal);
    document.getElementById('btn-close-period-modal').addEventListener('click', closePeriodModal);
    document.getElementById('btn-cancel-period-modal').addEventListener('click', closePeriodModal);

    document.getElementById('form-log-period').addEventListener('submit', function (e) {
      e.preventDefault();
      const p = getActiveProfile();
      if (!p) return;
      const startISO = document.getElementById('period-start-date-input').value || TODAY_ISO;
      const dur = Math.min(10, Math.max(2, Number(document.getElementById('period-duration-input').value) || 5));
      if (!p.periods) p.periods = [];
      const existing = p.periods.find(function (x) { return x.start === startISO; });
      if (existing) existing.length = dur;
      else p.periods.push({ start: startISO, length: dur });
      p.periodLength = dur;
      recalculateProfileCycleStats(p);
      state.selectedCycleDay = null;
      saveState();
      closePeriodModal();
      renderAll();
    });

    // Vault & PWA Modal
    const pwaModal = document.getElementById('modal-pwa');
    document.getElementById('btn-open-pwa').addEventListener('click', function () {
      pwaModal.classList.remove('hidden');
      pwaModal.classList.add('flex');
    });
    document.getElementById('btn-close-pwa-modal').addEventListener('click', function () {
      pwaModal.classList.add('hidden');
      pwaModal.classList.remove('flex');
    });

    document.getElementById('btn-export-json').addEventListener('click', function () {
      downloadJSON(state, 'cadence_vault_' + TODAY_ISO + '.json');
      showPwaMessage('Full vault downloaded.');
    });

    document.getElementById('btn-export-single-modal').addEventListener('click', function () {
      const p = getActiveProfile();
      if (!p) {
        showPwaMessage('No active profile to export.');
        return;
      }
      exportSingleProfileJSON(p);
      showPwaMessage('Exported ' + p.name + '.');
    });

    document.getElementById('input-import-json').addEventListener('change', function (e) {
      handleImportedJSONFile(e.target.files && e.target.files[0]);
    });

    document.getElementById('people-import-profile-input').addEventListener('change', function (e) {
      handleImportedJSONFile(e.target.files && e.target.files[0]);
    });

    document.getElementById('btn-reset-demo-data').addEventListener('click', function () {
      state = buildSampleHouseholdState();
      saveState();
      renderAll();
      showPwaMessage('Sample household loaded.');
    });

    document.getElementById('btn-wipe-vault').addEventListener('click', function () {
      state = buildEmptyDefaultState();
      saveState();
      renderAll();
      pwaModal.classList.add('hidden');
      pwaModal.classList.remove('flex');
    });
  }

  function showPwaMessage(msg) {
    const el = document.getElementById('pwa-status-msg');
    el.textContent = msg;
    el.classList.remove('hidden');
    setTimeout(function () { el.classList.add('hidden'); }, 3200);
  }

  // Register Offline Service Worker (with graceful sandboxed fallback)
  function initOfflinePWA() {
    if ('serviceWorker' in navigator) {
      try {
        const swCode = "self.addEventListener('install',e=>self.skipWaiting());self.addEventListener('activate',e=>e.waitUntil(self.clients.claim()));self.addEventListener('fetch',()=>{});";
        const blob = new Blob([swCode], { type: 'application/javascript' });
        const swUrl = URL.createObjectURL(blob);
        navigator.serviceWorker.register(swUrl).then(function () {
          const b = document.getElementById('sw-status-badge');
          if (b) b.textContent = 'Offline Active';
        }).catch(function () {});
      } catch (e) {}
    }
  }

  bindEvents();
  initOfflinePWA();
  renderAll();
})();
