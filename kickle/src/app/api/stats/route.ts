import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  // TODO: Get user from Supabase session and return their stats
  /*
  const supabase = createServerClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  
  const { data } = await supabase
    .from('user_stats')
    .select('*')
    .eq('user_id', user.id)
    .single();
  
  return NextResponse.json(data);
  */

  return NextResponse.json({ message: 'Connect Supabase for persistent stats' });
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  // TODO: Upsert stats to Supabase
  return NextResponse.json({ success: true });
}
