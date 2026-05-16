/**
 * AKURAT brand tokens.
 *
 * Single source of truth for brand colors, gradients, and shared styling values
 * referenced from non-CSS contexts (inline styles, framer-motion, charts, etc).
 *
 * The Tailwind palette and CSS variables in `app/globals.css` continue to be the
 * primary styling channel. Use these tokens for places where Tailwind tokens are
 * inconvenient (e.g. SVG fills, dynamic data colors).
 */

export const BRAND_COLORS = {
  /** Primary brand blue used for CTAs, key headlines, focused states. */
  primary: '#1A73E8',
  primaryDark: '#155FC3',
  primarySoft: '#EAF3FF',
  primaryBorder: '#BFEFFF',

  /** Secondary cyan used as the supportive accent. */
  cyan: '#00C2FF',
  cyanDark: '#00A9D6',
  cyanSoft: '#E8FAFF',

  /** Warm accent used to highlight callouts, alerts, gamified moments. */
  orange: '#FF9500',
  orangeDark: '#B86200',
  orangeSoft: '#FFF3DF',

  /** Success / mastery indicator. */
  green: '#00B84D',
  greenSoft: '#ECFDF5',

  /** Warning indicator. */
  amber: '#FFB800',
  amberSoft: '#FEF3C7',

  /** Error / miskonsepsi indicator. */
  red: '#E63946',
  redSoft: '#FEE2E2',

  /** Neutral surfaces. */
  surface: '#FFFFFF',
  surfaceMuted: '#F8FAFB',
  surfaceTint: '#EDF2F2',

  /** Text and stroke neutrals. */
  ink: '#0F172A',
  inkSoft: '#1E293B',
  textPrimary: '#0F172A',
  textSecondary: '#475569',
  textMuted: '#64748B',
  textFaint: '#94A3B8',

  /** Subtle dividers and card outlines. */
  border: '#E2E8F0',
  borderSoft: '#F1F5F9',
  borderBlue: '#D9EEF2',
} as const

export const BRAND_GRADIENTS = {
  /** Default hero gradient used on auth and dashboard hero panels. */
  hero: `linear-gradient(135deg, ${BRAND_COLORS.primary} 0%, ${BRAND_COLORS.cyan} 100%)`,
  /** Soft surface gradient used for cards behind illustrations. */
  surface: `linear-gradient(135deg, ${BRAND_COLORS.surfaceMuted} 0%, ${BRAND_COLORS.primarySoft} 100%)`,
  /** Warm gradient used for gamification rewards. */
  warm: `linear-gradient(135deg, ${BRAND_COLORS.orange} 0%, #FFB95A 100%)`,
} as const

export const BRAND_SHADOWS = {
  /** Soft elevation used for cards. */
  card: '0 12px 32px -22px rgba(15, 23, 42, 0.45)',
  /** Stronger elevation used for hero blocks and CTAs. */
  feature: '0 28px 80px -48px rgba(26, 115, 232, 0.55)',
} as const

/** Difficulty colors used in adaptive UI elements. */
export const DIFFICULTY_PALETTE = {
  'Sangat Mudah': BRAND_COLORS.green,
  'Mudah': BRAND_COLORS.cyan,
  'Sedang': BRAND_COLORS.primary,
  'Sulit': BRAND_COLORS.orange,
  'Sangat Sulit': BRAND_COLORS.red,
} as const

export type DifficultyLevel = keyof typeof DIFFICULTY_PALETTE
