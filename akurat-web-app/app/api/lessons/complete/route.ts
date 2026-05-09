import { NextRequest, NextResponse } from 'next/server'
import { createClient as createServerClient } from '@/lib/supabase/server'

export async function POST(request: NextRequest) {
  try {
    const { lessonId, userId, xpReward = 50 } = await request.json()

    if (!lessonId || !userId) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    const supabase = await createServerClient()

    // Verify user is authenticated
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user || user.id !== userId) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    // Upsert lesson progress
    const { error: progressError } = await supabase
      .from('lesson_progress')
      .upsert(
        {
          lesson_id: lessonId,
          user_id: userId,
          is_completed: true,
          progress_percent: 100,
          completed_at: new Date().toISOString(),
        },
        { onConflict: 'lesson_id,user_id' }
      )

    if (progressError) {
      console.error('Error updating lesson progress:', progressError)
      return NextResponse.json(
        { error: 'Failed to mark lesson as completed' },
        { status: 500 }
      )
    }

    // Get current user profile to add XP
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('xp, level')
      .eq('id', userId)
      .single()

    if (profileError) {
      console.error('Error fetching profile:', profileError)
      return NextResponse.json(
        { error: 'Failed to fetch user profile' },
        { status: 500 }
      )
    }

    // Calculate new XP and level
    const newXp = (profile.xp || 0) + xpReward
    const newLevel = Math.floor(newXp / 500) + 1

    // Update profile with new XP and level
    const { error: updateError } = await supabase
      .from('profiles')
      .update({
        xp: newXp,
        level: newLevel,
      })
      .eq('id', userId)

    if (updateError) {
      console.error('Error updating profile:', updateError)
      return NextResponse.json(
        { error: 'Failed to award XP' },
        { status: 500 }
      )
    }

    // Log XP transaction
    const { error: transactionError } = await supabase
      .from('xp_transactions')
      .insert({
        user_id: userId,
        amount: xpReward,
        reason: `Completed lesson: ${lessonId}`,
      })

    if (transactionError) {
      console.error('Error logging XP transaction:', transactionError)
      // Don't fail the request, just log the error
    }

    return NextResponse.json({
      success: true,
      data: {
        xpGained: xpReward,
        newXp,
        newLevel,
      },
    })
  } catch (error) {
    console.error('Error completing lesson:', error)
    return NextResponse.json(
      { error: 'An unexpected error occurred' },
      { status: 500 }
    )
  }
}

