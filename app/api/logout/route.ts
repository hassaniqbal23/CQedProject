import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

type Data = {
  message: string;
};

export async function POST(request: Request) {
  cookies().delete('token');
  return NextResponse.json({ message: 'Hello World' });
}
