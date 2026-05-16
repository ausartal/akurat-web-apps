# AKURAT - Project Context (Comprehensive)

## Project Summary

**AKURAT** (Asesmen Kimia Ukur Adaptif Terpadu) adalah platform edukasi berbasis AI menggunakan teknologi **Multistage Adaptive Testing (MSAT)** khusus untuk asesmen Chemistry Stoichiometry. Platform ini dirancang untuk pembelajaran, latihan, ujian adaptif, dan analisis mendalam profil pemahaman konsep serta miskonsepsi siswa.

**Target Primary**: Asosiasi Kimia Indonesia (eksklusif untuk anggota)  
**Secondary Targets**: SMA, Lembaga Kursus, Guru Privat, Platform Tryout Online, Pelatihan Akademik

---

## 1. PLATFORM VISION & POSITIONING

### Core Philosophy
- **Adaptive Learning**: Sistem otomatis menyesuaikan tingkat kesulitan soal berdasarkan performa real-time
- **Diagnostic-Driven**: Mengidentifikasi bukan hanya skor, tapi profil miskonsepsi dan capaian kompetensi siswa
- **Premium UX**: Minimal, modern, clean interface dengan glassmorphism dan smooth animations
- **AI-Ready Ecosystem**: Siap ekspansi fitur AI (explainable AI, predictive analytics, adaptive hints)

### Design Inspiration
- Notion (minimalist, modular)
- Duolingo (engagement, adaptive difficulty)
- Khan Academy (learning progression)
- Vercel Dashboard (modern SaaS)
- Linear (intuitive workflows)

### Homepage Design Requirement
- Homepage harus mirip pola dan feel homepage Duolingo untuk meminimalisir kebingungan pengguna.
- Gunakan gaya edukatif yang playful, jelas, dan mudah dipahami.
- Tampilan harus fun, ramah, dan tidak mengintimidasi.
- Light mode only (tidak ada dark mode).
- Warna utama harus colorful dengan referensi palette:
  - #1A73E8
  - #00C2FF
  - #FF9500
  - #EDF2F2

---

## 2. TARGET USERS & ROLES

### A. Student (Siswa)
- **Primary Journey**:
  1. Login/Register (email, OAuth)
  2. Browse Materi (Stoichiometry topics)
  3. Practice dengan Latihan Soal
  4. Take Trial Exam (ujian coba)
  5. Take Final Exam (ujian sebenarnya)
  6. View Results & Learning Record
  7. Access Communication Room
  8. Review Progress & Competency Report

- **Key Features**:
  - Dashboard dengan analytics cards (progress, achievements, strengths/weaknesses)
  - Materi-materi terstruktur per chapter dengan reading progress
  - Latihan soal (non-adaptif, instant feedback)
  - Ujian adaptif (MSAT mode, no feedback during test)
  - Profil: personal data + exam records + competency report
  - Ruang komunikasi dengan mentor/guru
  - Calculator support
  - Progress tracking

### B. Teacher/Educator (Guru)
- **Primary Journey**:
  1. Login/Create Account
  2. Create/Upload Materi Belajar
  3. Create Quiz & Exam (MSAT structure)
  4. Monitor Peserta Didik Progress
  5. Review Student Responses & Misconceptions
  6. Generate Analytics & Reports
  7. Manage Student Classes
  8. Communicate dengan Students

- **Key Features**:
  - Dashboard: student enrollment, material uploads, exam creation
  - Materi Management: upload konten, track student access
  - Quiz Builder: drag-drop soal interface, set timer, passing grade
  - Test Analytics: per-student results, misconception patterns, competency distribution
  - Student Profile Monitoring: real-time progress, weak areas
  - Communication Center: chat dengan students
  - Report Generation: automatic insights & recommendations

### C. Admin/System Manager
- **Primary Journey**:
  1. Dashboard Analytics
  2. User Management
  3. Content Moderation
  4. Subscription/Access Control
  5. Platform Health Monitoring
  6. Research Data Export

- **Key Features**:
  - System Dashboard: total users, active materials, access distribution
  - User Directory: teacher + student management, activation
  - Content Approval: material verification untuk quality control
  - Subscription Management: trial vs paid access, access codes
  - SPU (Specific User) Management: control per-asosiasi-member access
  - Analytics & Research Data: aggregate insights untuk penelitian
  - Platform Monitoring: system performance metrics

---

## 3. CORE FEATURE SET

### Phase 1: MVP (Immediate)

#### 3.1 Authentication & Access Control
- **Email/Password registration** dengan OTP verification
- **OAuth integration** (Google, Facebook)
- **Role-based access control**: Student, Teacher, Admin
- **Trial account system**: Free limited access (7 days or N questions)
- **Premium/Paid tiers**: Full exam access dengan subscription
- **Access code validation**: Untuk asosiasi member verification
- **Session management & security**: JWT-based, RLS di database

#### 3.2 Learning Materials (Materi)
- **Structured content**: Bab → Sub-Bab → Materi
- **Stoichiometry curriculum**: 
  - Konsep dasar (mol, massa molar, volume)
  - Reaksi kesetimbangan & pereaksi pembatas
  - Perhitungan kimia (massa → volume conversions)
  - Gas laws & STP
  - Empirical & molecular formulas
  - Solution concentration (molarity, molality)

- **Features**:
  - Rich text editor (markdown support)
  - Embedded equations (MathJax)
  - Images & diagrams
  - Progress tracking per material
  - Reading time estimation
  - Prerequisite linking

#### 3.3 Practice Quiz System
- **Non-adaptive practice**: Standard quiz format dengan instant feedback
- **Soal types**:
  - Multiple choice (5 pilihan)
  - Checkbox (multiple correct answers)
  - True/False
  - Short answer (manual grading by teacher)
  - Essay (planned for Phase 2)

- **Quiz Features**:
  - Timer per soal (configurable)
  - Pagination & progress bar
  - Randomized order option
  - Attempt limitation setting
  - Passing grade threshold
  - Instant feedback & explanation
  - XP/Points reward system

#### 3.4 MSAT (Multistage Adaptive Testing) Exam System

**Structure**: Four-Tier Framework per exam session
1. **Router Test (Stage 1)**: Soal sedang (difficulty = 0.3-0.7) untuk semua siswa
2. **Adaptive Module (Stage 2)**: Based on Stage 1 results:
   - If CORRECT → Mudah module (0.7-1.0 difficulty)
   - If INCORRECT → Sulit module (0.0-0.3 difficulty)
3. **Refinement (Stage 3)**: Soal dengan kesulitan yang sama seperti Stage 2 untuk confirmation
4. **Confidence Rating (Stage 4)**: "YAKIN" or "TIDAK YAKIN" pada setiap stage

**Adaptive Logic**:
```
Estimated Ability = f(response patterns, confidence, IRT parameters)
Next Item Selection = argmax(Information Function | estimated ability)
Stopping Rule = min(items completed ≥ N AND SE(ability) ≤ threshold)
```

**Exam Features**:
- Automatic difficulty branching
- Real-time ability estimation (IRT)
- No feedback during test (results only after completion)
- Question randomization (per module)
- Mandatory timer with countdown
- Exam access code requirement
- Limited access window (teacher-set dates)
- Auto-save on every response
- Disconnect recovery (resume from last point)

#### 3.5 Results & Analysis
- **Immediate report** setelah exam completion:
  - Competency category (Paham Konsep, Paham Sebagian, Miskonsepsi, Tidak Paham)
  - Score breakdown per competency domain
  - Per-soal correctness summary (tidak ada pembahasan)
  
- **Detailed Profile** (accessible later):
  - Historical exam records dengan timestamps
  - Progress trend graph
  - Misconception profile (berdasarkan response patterns)
  - Strength & weakness analysis
  - Competency distribution chart

#### 3.6 Communication System (Ruang Komunikasi)
- **Features**:
  - Student-to-Teacher direct messaging
  - Class discussion forum
  - Mentor pairing (for premium tier)
  - File sharing support
  - Notification system
  - Search & archive functionality

---

### Phase 2: Enhanced Features

#### 3.7 AI Explanations
- **Explainable AI**: Natural language explanations untuk jawaban soal
- **Multi-language**: Indonesian + English
- **Adaptive depth**: Based on student misconception pattern

#### 3.8 AI Question Generator
- **Prompt-based generation**: Teacher-friendly interface
- **Parameter control**: Difficulty, topic, question type
- **Validation**: Auto-check for clarity & correctness
- **Bank integration**: Save & reuse generated questions

#### 3.9 Smart Analytics & Recommendations
- **Predictive modeling**: Forecast student mastery trajectory
- **Targeted interventions**: Recommend specific topics for review
- **Class-wide insights**: Teacher analytics dashboard
- **Research-grade data export**: For academic research

#### 3.10 Calculator Tool
- **Full chemistry calculator**:
  - Molar mass computation
  - Mol-gram conversions
  - Gas volume @ STP
  - Molarity & concentration calculations
  - Percentage composition
  - Stoichiometric calculations (mol-ratio-mass chains)

#### 3.11 Content Recommendation Engine
- **Based on**: Learning history, misconceptions, learning gaps
- **Display**: "Recommended for you" card on home
- **Personalization**: Refine as student progresses

#### 3.12 Remedial & Enrichment Tests
- **Adaptive pathways**: 
  - If weak → targeted remedial quiz
  - If strong → enrichment/challenge problems
- **Follow-up scheduling**: Auto-schedule retry attempts

---

## 4. TECHNICAL STACK

### Frontend
- **Framework**: Next.js 16 (App Router)
- **React Version**: 19 with Hooks
- **Language**: TypeScript (strict mode)
- **Styling**: 
  - TailwindCSS v4
  - shadcn/ui (Radix-based)
  - CSS variables for design tokens
- **Animation**: 
  - Framer Motion (page transitions, micro-interactions)
  - GSAP (complex sequences)
  - Lenis (smooth scroll)
- **Icons**: Lucide Icons
- **Form Handling**: React Hook Form + Zod validation
- **State Management**: Zustand (lightweight, performant)
- **HTTP Client**: Fetch API + custom hooks

### Backend & Data
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth (JWT-based)
  - Email/password
  - OAuth providers
  - RLS (Row Level Security) policies
- **Storage**: Supabase Storage (file uploads)
- **Real-time**: Supabase RealtimeDB (chat, notifications)
- **API Layer**: Custom API routes in Next.js (SSR/API)

### Deployment & DevOps
- **Hosting**: Vercel
- **Database Backup**: Automated Supabase backups
- **CDN**: Vercel's global edge network
- **Monitoring**: Vercel Analytics + Sentry (error tracking)
- **CI/CD**: GitHub Actions (auto-deploy on main branch)

### Advanced Features (Optional)
- **PDF Generation**: pdfkit or similar untuk report export
- **Email Service**: SendGrid atau Firebase Cloud Functions
- **Analytics**: PostHog atau Plausible (privacy-first)
- **WebSocket**: Supabase Realtime atau Socket.io for live features

---

## 5. DATABASE SCHEMA (Key Tables)

```sql
-- Users & Profiles
profiles (id, email, name, role, organization, created_at, updated_at)
user_preferences (id, user_id, language, theme, notifications_enabled)

-- Materials & Content
materials (id, title, category, sub_category, content, teacher_id, is_verified, created_at)
material_sections (id, material_id, section_number, title, content)
material_progress (id, user_id, material_id, progress_percentage, last_accessed)

-- Questions & Quiz
questions (id, question_text, question_type, difficulty_score, irt_parameters, category)
question_options (id, question_id, option_text, is_correct)
question_metadata (id, question_id, misconception_type, cognitive_level, topic_id)

-- Quiz & Practice
quizzes (id, title, teacher_id, description, is_published, created_at)
quiz_questions (id, quiz_id, question_id, order_number)

-- Adaptive Tests (MSAT)
exams (id, title, teacher_id, start_date, end_date, access_code, passing_score, structure)
exam_modules (id, exam_id, module_type, difficulty_range, question_ids)
exam_attempts (id, user_id, exam_id, start_time, end_time, status)
exam_responses (id, attempt_id, question_id, response_text, is_correct, confidence_level, module_type, timestamp)

-- Scoring & Analytics
attempt_scores (id, attempt_id, raw_score, estimated_ability, standard_error, competency_level)
misconception_profiles (id, user_id, misconception_category, frequency, last_detected)

-- Communication
messages (id, sender_id, recipient_id, subject, body, created_at, read_at)
forum_threads (id, created_by, title, content, created_at)
forum_replies (id, thread_id, user_id, content, created_at)

-- Subscription & Access
subscriptions (id, user_id, plan_type, start_date, end_date, status)
access_codes (id, organization_id, code, is_used, used_by, created_at, expires_at)

-- Research & Audit
research_export_logs (id, admin_id, export_date, data_type, row_count)
activity_logs (id, user_id, action, entity_type, timestamp)
```

---

## 6. ARCHITECTURAL DECISIONS

### A. Routing & File Structure
```
app/
├── (auth)/                 # Auth layout (login, register)
│   ├── login/
│   ├── register/
│   └── forgot-password/
├── (dashboard)/           # Protected dashboard routes
│   ├── student/
│   │   ├── page.tsx       # Home dashboard
│   │   ├── materials/
│   │   ├── practice/
│   │   ├── exams/
│   │   ├── results/
│   │   ├── profile/
│   │   └── communication/
│   ├── teacher/
│   │   ├── page.tsx
│   │   ├── materials/
│   │   ├── quizzes/
│   │   ├── analytics/
│   │   └── students/
│   └── admin/
│       ├── page.tsx
│       ├── users/
│       ├── content/
│       └── analytics/
├── api/                   # API routes
│   ├── auth/
│   ├── materials/
│   ├── quizzes/
│   ├── exams/
│   ├── responses/
│   └── analytics/
├── components/            # Reusable UI components
│   ├── common/
│   ├── dashboard/
│   ├── forms/
│   └── quiz/
├── features/              # Domain services & hooks
│   ├── auth/
│   ├── materials/
│   ├── quiz/
│   ├── exams/
│   ├── analytics/
│   └── communication/
├── lib/                   # Utilities & configurations
│   ├── supabase.ts
│   ├── constants.ts
│   ├── validators.ts
│   └── utils/
├── types/                 # Generated from database
│   └── database.ts
└── styles/
    └── globals.css        # Tailwind + design tokens
```

### B. Component Strategy
- **Server components** as default
- **Client components** only for interactivity (forms, real-time updates)
- **Composition over inheritance**
- **Typed props** everywhere (TypeScript strict)
- **Accessible** (WCAG 2.1 AA minimum)
- **Responsive** (mobile-first design)

### C. Data Flow
1. **Client Components** → Call API routes via `fetch()`
2. **API Routes** → Middleware for auth + validation
3. **Services Layer** → Business logic (quiz scoring, adaptive logic)
4. **Supabase Client** → Database queries with RLS enforcement
5. **Zustand Store** → Global state (user, exam session, notifications)

### D. Security & RLS Policies
```sql
-- Students can only view own materials & exam results
CREATE POLICY student_material_access ON materials
  FOR SELECT USING (is_published = true OR teacher_id = auth.uid());

-- Students can only submit responses to allowed exams
CREATE POLICY exam_response_submission ON exam_responses
  FOR INSERT WITH CHECK (
    attempt_id IN (
      SELECT id FROM exam_attempts 
      WHERE user_id = auth.uid() 
      AND exam_id IN (SELECT id FROM exams WHERE start_date <= NOW() AND end_date >= NOW())
    )
  );

-- Teachers can only see own students' data
CREATE POLICY teacher_class_analytics ON attempt_scores
  FOR SELECT USING (
    attempt_id IN (
      SELECT id FROM exam_attempts 
      WHERE exam_id IN (
        SELECT id FROM exams WHERE teacher_id = auth.uid()
      )
    )
  );
```

---

## 7. EXAM (UJIAN) DETAILED SPECIFICATION

### 7.1 Ujian Coba (Trial Exam)
- **Access**: Free for all users (limited)
- **Duration**: 30 minutes (configurable per exam)
- **Structure**: MSAT 4-tier (router + adaptive stages)
- **Feedback**: Results only, no item-level explanation during test
- **Purpose**: Familiarization dengan exam format
- **Database Tracking**: Tracked tapi hasil tidak affect final score

### 7.2 Ujian Sebenarnya (Final Exam)
- **Access**: Premium/Paid users + Asosiasi Kimia members only
- **Access Control**: 
  - Require valid access code + date verification
  - IP tracking & device fingerprinting (prevent cheating)
  - Limited attempts (typically 1-2 per exam)
- **Duration**: 90-150 minutes (depends on module branching)
- **Structure**: MSAT adaptive with 3 branching stages + confidence rating
- **Security**:
  - Proctoring-ready (future: webcam monitoring via AI)
  - Disable copy/paste, screenshot on test pages
  - Session logging & audit trail

### 7.3 Remedial Exam (Optional)
- **Trigger**: Paham Sebagian or Tidak Paham results
- **Purpose**: Targeted review & retry
- **Schedule**: Auto-scheduled by teacher or on-demand by student
- **Results**: Improvement tracking vs first attempt

### 7.4 Exam Results & Reporting

**Student View**:
```
┌─────────────────────────────────────┐
│ Exam Results - Stoichiometry Test   │
├─────────────────────────────────────┤
│ Overall Competency: Paham Sebagian  │
│ Final Estimated Ability (θ): 0.42   │
│ Standard Error: 0.18                 │
├─────────────────────────────────────┤
│ Per-Competency Breakdown:            │
│ • Mol & Calculations: Paham (78%)   │
│ • Limiting Reactant: Paham Sebagian  │
│ • Gas Laws: Tidak Paham (35%)       │
├─────────────────────────────────────┤
│ Misconceptions Detected:             │
│ • Common misunderstanding in limiting │
│   reactant calculations             │
└─────────────────────────────────────┘
```

**Teacher View**:
```
Exam Analytics Dashboard
├─ Completion Rate: 85% (34/40 students)
├─ Average Ability: 0.21 (SD: 0.35)
├─ Competency Distribution:
│  └─ Paham Konsep: 25%
│  └─ Paham Sebagian: 40%
│  └─ Miskonsepsi: 20%
│  └─ Tidak Paham: 15%
├─ Most Common Misconceptions:
│  └─ Limiting reactant errors: 55% of students
│  └─ Mol conversion mistakes: 48% of students
└─ Recommended Actions:
   └─ Reteach limiting reactant concept
   └─ Provide extra practice on conversions
```

---

## 8. EXAM DESIGN PARAMETERS

### Item Calibration (IRT Parameters)
Each question stores:
- **a (discrimination)**: 0.0 - 2.5 (higher = better discrimination)
- **b (difficulty)**: -3.0 - 3.0 (higher = harder)
- **c (guessing)**: 0.0 - 0.25 (pseudo-chance level)
- **Item Information Function (IIF)**: Calculated at different ability levels

### Difficulty Categorization
```
Sangat Mudah:    b < -1.5
Mudah:           -1.5 ≤ b < -0.5
Sedang:          -0.5 ≤ b < 0.5
Sulit:           0.5 ≤ b < 1.5
Sangat Sulit:    b ≥ 1.5
```

### Branching Logic
```
Stage 1 (Router): Select from Sedang difficulty questions
  ├─ If CORRECT & CONFIDENT → Proceed to Mudah module
  ├─ If CORRECT & DOUBTFUL  → Proceed to Sedang module
  ├─ If WRONG & CONFIDENT   → Proceed to Sulit module
  └─ If WRONG & DOUBTFUL    → Proceed to Sulit module

Stage 2 (Adaptive Module): Present difficulty-matched items
  └─ Based on preliminary θ estimate

Stage 3 (Refinement): Confirm estimate with same difficulty
  └─ Continue if |SE(θ)| > threshold

Stage 4 (Confidence): Record confidence level
  └─ Final interpretation combines responses + confidence
```

---

## 9. COMPETENCY FRAMEWORK

### Stoichiometry Learning Outcomes
| Competency | Indicators |
|------------|-----------|
| **Basic Concepts** | Understand mol, molar mass, unit conversions |
| **Stoichiometric Ratios** | Determine mole ratios from balanced equations |
| **Limiting Reactants** | Identify & calculate with limiting reagents |
| **Gas Laws** | Apply volume-mol relationships @ STP |
| **Molecular Formulas** | Determine empirical & molecular formulas |
| **Solution Chemistry** | Calculate molarity, molality, percentages |
| **Problem-Solving** | Multi-step calculations with correct reasoning |

### Misconception Categories (Stoichiometry)
1. **Coefficient Misunderstanding**: Confusing coefficients with atomic/molecular counts
2. **Unit Confusion**: Mixing volume-mol or gram-mol relationships
3. **Limiting Reactant Errors**: Not correctly identifying limiting reactant
4. **Percentage vs Decimal**: Wrong conversion in concentration calculations
5. **Molar Volume Misconceptions**: Wrong volumes @ STP for gas calculations
6. **Conceptual Gaps**: Missing understanding of fundamental relationships

---

## 10. DESIGN SYSTEM

### Color Palette
- **Primary**: #0066CC (Blue) - for CTAs, highlights
- **Secondary**: #00D9FF (Cyan) - complementary
- **Success**: #00B84D (Green)
- **Warning**: #FFB800 (Orange)
- **Error**: #E63946 (Red)
- **Background**: #F8FAFB (Off-white)
- **Surface**: #FFFFFF
- **Text Primary**: #0F172A (Dark slate)
- **Text Secondary**: #475569 (Slate)

#### Homepage Primary Colors (Light Mode Only)
- #1A73E8
- #00C2FF
- #FF9500
- #EDF2F2

### Typography
- **Font Family**: Inter (system), Fira Code (code)
- **Heading Scale**: 3.5xl, 3xl, 2xl, xl, lg, base
- **Line Height**: 1.5x (body), 1.2x (headings)

### Spacing
- **Scale**: 4px, 8px, 12px, 16px, 24px, 32px, 48px, 64px
- **Grid**: 4px baseline

### Components Library (shadcn/ui)
- Button, Input, Textarea, Select, Checkbox, Radio
- Card, Tabs, Dialog, Dropdown Menu
- Alert, Toast, Badge, Progress
- Table, DataTable (with sorting/filtering)
- Collapsible, Accordion

---

## 11. CURRENT DEVELOPMENT STATUS

### ✅ Completed
- Next.js App Router setup (TypeScript strict)
- Landing page (modular sections)
- Global design tokens & Tailwind setup
- Auth UI (login/register) with role selection
- Student Dashboard UI (analytics cards, progress, activity)
- Supabase client (browser + server setup)
- Auth service (signUp, signIn, signOut, getCurrentUser)
- Profile service (getMyProfile)
- Lesson/Material service (fetch, progress, completion)
- Quiz system foundation (fetch, submit, scoring)
- Lesson completion API (XP reward, transactions)
- Custom hooks (useCompleteLessonAction, etc.)

### 🚧 In Progress
- Quiz engine UI/UX (full flow)
- Exam system (MSAT structure, adaptive logic)
- Exam results & analytics page
- Admin dashboard setup
- Teacher material management
- MSAT algorithm implementation

### 📋 Next Priorities
1. **Database schema refinement** + RLS policies
2. **Auth middleware** + protected routes
3. **Quiz/Exam CRUD** (teacher interface)
4. **Adaptive test branching logic** + IRT parameter handling
5. **Scoring & ability estimation** algorithm
6. **Results visualization** (charts, competency report)
7. **Communication system** (messaging, forum)
8. **Analytics dashboard** (teacher + admin)
9. **Integration testing** & load testing
10. **Pilot phase** with sample users (Group A)
11. **Full deployment** & research phase (Group B)

---

## 12. FEATURE-SPECIFIC REQUIREMENTS

### Kalkulator
- **UI**: Floating button or dedicated page
- **Functions**:
  - Molar mass calculator (element lookup)
  - Mol ↔ Gram converter
  - Gas volume @ STP
  - Molarity/Molality calculator
  - Stoichiometry calculator (mol chains)
  - Percentage composition

### Platform Characteristics (from Meeting Notes)
- **"Sepi"** (less crowded, exclusive): Limited to verified users
- **Material Verification**: Content review system before publishing
- **User Exclusive Access**: Research partnership (requires access code)
- **One-Subject Per Session**: Single stoichiometry focus
- **Trial + Real**: Clear separation between practice & official exams
- **Research Data**: Privacy-compliant export for academic partners

### Academic Integration
- **K-13 Curriculum Alignment**: KD 3.10 (Stoichiometry)
- **HOTS Questions**: Higher-order thinking (analysis, synthesis)
- **Misconception Research**: Aligned with educational research standards
- **Teacher Support**: Built-in guidance for remedial teaching

---

## 13. SUCCESS METRICS

### Usage Metrics
- DAU (Daily Active Users)
- Material completion rate
- Quiz attempt frequency
- Exam pass rate

### Learning Metrics
- Improvement in exam scores
- Misconception reduction over time
- Topic mastery distribution

### Engagement
- Session duration
- Feature adoption (materials vs exams vs communication)
- User retention (day 7, day 30)

### Research Metrics (Academic Focus)
- Misconception profile accuracy
- Adaptive algorithm effectiveness
- Test-retest reliability

---

## 14. TECHNOLOGY ROADMAP

### Phase 1 (Q2-Q3 2026): MVP
- Core MSAT system
- Basic analytics
- Communication foundation
- Pilot with Group A

### Phase 2 (Q4 2026): Production
- Scale to Group B (schools)
- AI features (explanations, question generation)
- Advanced analytics
- Mobile app (React Native)

### Phase 3 (2027+): Enterprise
- Institutional partnerships
- Advanced proctoring
- Certification programs
- API for 3rd-party integration

---

## 15. CODING STANDARDS & GUIDELINES

- **TypeScript**: Strict mode, full type coverage
- **Component Structure**: Server-first, client only when needed
- **Service Layer**: Abstraction for DB access (no direct queries in components)
- **Error Handling**: Try-catch blocks, custom error boundaries
- **Testing**: Unit tests for services, integration tests for critical flows
- **Code Review**: PR reviews before merge to main
- **Accessibility**: WCAG 2.1 AA minimum, semantic HTML
- **Performance**: Lighthouse score > 90, <3s FCP

---

## 16. DOCUMENTATION REFERENCES

- **Database Schema**: `/docs/DATABASE_SCHEMA.md`
- **API Documentation**: `/docs/API_ENDPOINTS.md`
- **Design System**: `/docs/DESIGN_SYSTEM.md`
- **MSAT Algorithm**: `/docs/ADAPTIVE_LOGIC.md`
- **Deployment Guide**: `/docs/DEPLOYMENT.md`

---

## 17. TEAM & ROLES

- **Project Lead**: Product Owner
- **Frontend Engineers**: 2-3 developers (TypeScript/Next.js)
- **Backend Engineers**: 1-2 developers (Supabase, database design)
- **Product Designer**: UX/UI specialist
- **QA Engineer**: Testing & validation
- **Educational Expert**: Curriculum alignment, misconception validation
- **DevOps**: Vercel deployment, monitoring

---

## 18. COMMUNICATION & RESOURCES

- **Design System**: Available in Figma
- **API Documentation**: Generated from OpenAPI schema
- **Database Docs**: Supabase dashboard + SQL comments
- **Meeting Notes**: Updated quarterly
- **Slack Channel**: #akurat-dev for team coordination

---

**Last Updated**: May 2026  
**Version**: 2.0 (Comprehensive)  
**Status**: Development - MVP Phase