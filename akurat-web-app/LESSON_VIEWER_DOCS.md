# AKURAT Lesson Viewer System Documentation

## Overview

The AKURAT Lesson Viewer System is a complete implementation for displaying chemistry lessons with progress tracking, XP rewards, and comprehensive navigation. It provides a modern, responsive interface for students to learn through structured lessons within modules.

## Architecture

### Service Layer

#### `features/lesson/services/lesson.service.ts`

Core business logic for lesson management:

```typescript
// Fetch lesson by URL slug with module data
getLessonBySlug(slug: string): Promise<LessonDetail | null>

// Get user's progress on a specific lesson
getLessonProgress(lessonId: string, userId: string): Promise<LessonProgress | null>

// Get the next lesson in the module
getNextLesson(moduleId: string, currentOrderIndex: number): Promise<Lesson | null>

// Get the previous lesson in the module
getPreviousLesson(moduleId: string, currentOrderIndex: number): Promise<Lesson | null>

// Mark a lesson as completed and update progress
completeLesson(lessonId: string, userId: string, xpReward?: number): Promise<{ success: boolean; error?: string }>
```

**Key Features:**
- Queries Supabase directly for real lesson data
- Handles 404 when lesson not found
- Supports lesson navigation through module ordering
- Type-safe with exported types

### UI Components

#### `components/lesson/lesson-content.tsx`

Displays the main lesson content:

- **Video Section**: Plays embedded videos from lesson metadata
- **Content Section**: Renders HTML lesson content
- **Metadata Section**: Shows duration and publication status
- **Loading State**: Skeleton loader while fetching data

Features:
- Safely extracts video URL from polymorphic JSON metadata
- Responsive layout
- HTML content sanitization support
- Loading skeleton animation

#### `components/lesson/lesson-sidebar.tsx`

Sticky sidebar with lesson progress and completion:

**Display Elements:**
- Lesson order index with title
- Progress bar (0% → 100%)
- Module information
- Duration and XP reward stats
- Complete lesson button
- Success/error feedback

**Functionality:**
- Complete lesson action with loading state
- XP reward display (+50 points)
- Visual feedback on completion
- Error handling and display

#### `components/lesson/lesson-navigation.tsx`

Navigation cards for next/previous lessons:

- Contextual navigation within module
- Disabled state for first/last lessons
- Hover effects and transitions
- Titles truncated for long names

### Client-Side Hook

#### `features/lesson/hooks/useCompleteLessonAction.ts`

React hook for lesson completion:

```typescript
const { completeLesson, isLoading, error } = useCompleteLessonAction()

// Call API to complete lesson
const result = await completeLesson(lessonId, userId, xpReward)
// result.success: true | false
// result.error: error message if failed
```

**Benefits:**
- Encapsulates API interaction logic
- State management (loading, error)
- Reusable across components

### API Endpoint

#### `app/api/lessons/complete/route.ts`

Server-side endpoint that:

1. **Authentication Check**: Verifies user is authenticated
2. **Progress Update**: Marks lesson as completed
3. **XP Calculation**: Adds XP and calculates level
4. **Profile Update**: Saves new XP and level to profile
5. **Transaction Logging**: Records XP transaction

**Response:**
```json
{
  "success": true,
  "data": {
    "xpGained": 50,
    "newXp": 250,
    "newLevel": 1
  }
}
```

## Page Structure

### Route: `/dashboard/lessons/[slug]`

**File:** `app/dashboard/lessons/[slug]/page.tsx`

**Features:**
- Server-side rendering
- Metadata generation for SEO
- Real Supabase data fetching
- Authentication protection (notFound if not logged in)
- 3-column responsive layout

**Data Flow:**
1. Extract slug from URL params
2. Fetch lesson by slug
3. Check user authentication
4. Fetch lesson progress
5. Fetch adjacent lessons for navigation
6. Render UI with all data

## Type Safety

All components are fully type-safe with database types from Supabase:

```typescript
import type { Tables } from '@/src/types/database'

type Lesson = Tables<'lessons'>
type LessonProgress = Tables<'lesson_progress'>
type Module = Tables<'modules'>
```

Generated types ensure:
- Compile-time safety
- IDE autocomplete
- Database schema alignment
- No runtime type errors

## User Experience Flow

### Lesson Viewing

1. User navigates to `/dashboard/lessons/chemistry-basics`
2. Page loads lesson content from database
3. Video loads from metadata URL (if available)
4. Progress bar shows completion status
5. UI displays:
   - Lesson title and module
   - Estimated duration
   - XP reward value
   - Next/previous lesson options

### Lesson Completion

1. User clicks "Complete Lesson" button
2. Button shows loading state
3. API request sent to `/api/lessons/complete`
4. Server updates:
   - Adds entry to `lesson_progress` table
   - Adds XP to `profiles.xp`
   - Recalculates level
   - Logs transaction
5. UI updates:
   - Button changes to "✓ Completed"
   - Success message shown
   - Progress bar to 100%
   - XP earned displayed

### Navigation

- **Next Lesson**: Click card to navigate to next lesson
- **Previous Lesson**: Click card to navigate to previous lesson
- **Disabled States**: First and last lessons show disabled cards
- **Breadcrumb**: Module name shown in sidebar

## Database Schema Integration

### Tables Used

| Table | Purpose |
|-------|---------|
| `lessons` | Lesson content, metadata, timing |
| `modules` | Lesson organization, grouping |
| `lesson_progress` | User completion tracking |
| `profiles` | User XP and level |
| `xp_transactions` | XP history logging |

### Relationships

```
Module (1)
  ├─ Lesson (Many)
  │  ├─ Lesson Progress (User-specific)
  │  └─ Quiz (if exists)
  │
Profile (1)
  ├─ Lesson Progress (Many)
  ├─ XP Transactions (Many)
  └─ User Achievements (Many)
```

## Styling

### Color Scheme

| Element | Color |
|---------|-------|
| Primary Accent | Blue (`bg-blue-600`) |
| Background | White/Gray (`bg-white`, `bg-gray-50`) |
| Success | Green (`bg-green-50`, `text-green-700`) |
| Error | Red (`bg-red-50`, `text-red-700`) |
| Borders | Gray (`border-gray-200`, `border-blue-200`) |

### Layout

- **Desktop**: 2-column + 1-column layout (sidebar sticky)
- **Mobile**: Single column with sidebar below content
- **Responsive**: Breakpoint at `lg` (1024px)
- **Spacing**: Tailwind scale (8px base unit)

## Features Implemented

✅ **Complete Lesson Functionality**
- Mark lessons as completed
- Persist progress to database
- Award XP on completion
- Update user level

✅ **Progress Tracking**
- Visual progress bar
- Completion status display
- XP reward calculation

✅ **Content Display**
- HTML lesson content rendering
- Embedded video support
- Lesson metadata and timing
- Module context

✅ **Navigation**
- Next/previous lesson links
- Module-aware ordering
- Disabled states for boundaries
- Smooth transitions

✅ **Type Safety**
- Full TypeScript support
- Database type generation
- Zero type-related runtime errors

✅ **Error Handling**
- Lesson not found (404)
- User not authenticated
- API error messages
- Loading states

✅ **Mobile Responsive**
- Responsive grid layout
- Touch-friendly button sizes
- Flexible spacing

✅ **Performance**
- Server-side rendering
- Optimized database queries
- Minimal client-side JavaScript
- Static generation where possible

## Future Enhancements

1. **Quiz Integration**: Add quiz sections within lessons
2. **Achievements**: Award badges for lesson milestones
3. **Streak Tracking**: Maintain learning streaks
4. **Social Features**: Comments and discussions
5. **Adaptive Learning**: Difficulty adjustment
6. **Accessibility**: WCAG compliance
7. **Analytics**: Track learning patterns
8. **Recommend Content**: AI-based suggestions

## Deployment Checklist

- [x] Database schema created
- [x] Supabase types generated
- [x] Services implemented
- [x] Components built
- [x] API endpoint created
- [x] Type checking passing
- [x] Build successful
- [x] No runtime errors
- [ ] Environment variables configured
- [ ] Database migration deployed
- [ ] RLS policies configured (if needed)

## Testing Scenarios

### Happy Path
1. Navigate to lesson with slug
2. See lesson content load
3. Click "Complete Lesson"
4. See XP award and success message
5. Navigate to next lesson

### Edge Cases
1. Invalid lesson slug → 404
2. Not authenticated → 404
3. First lesson → no previous button
4. Last lesson → no next button
5. Already completed lesson → disabled button

## Debugging Tips

**Check database data:**
```bash
# In Supabase dashboard
SELECT * FROM lessons ORDER BY created_at DESC;
SELECT * FROM lesson_progress WHERE user_id = 'USER_ID';
```

**Check API response:**
Open browser DevTools → Network tab → find `/api/lessons/complete` request

**Check component rendering:**
Use React DevTools to inspect component props and state

## Support

For issues or questions:
1. Check TypeScript error messages
2. Review API response in Network tab
3. Check Supabase logs
4. Verify environment variables
