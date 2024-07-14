import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

type Data = {
  message: string;
};

export async function POST(request: Request) {
  const body = await request.json();
  const token = body.token;
  if (!token) {
    return NextResponse.json({ message: 'Token is required' }, { status: 400 });
  }
  cookies().set('token', token);
  return NextResponse.json({ message: 'Hello World' });
}
