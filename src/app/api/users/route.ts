// src/app/api/users/route.ts
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const token = request.headers.get('Authorization');

    if (!token) {
      return NextResponse.json({ message: 'No token provided' }, { status: 401 });
    }
  const STATIC_TOKEN = process.env.NEXT_PUBLIC_URL;

    const res = await fetch(`${STATIC_TOKEN}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token,
      },
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      const errorText = await res.text();
      return NextResponse.json({ message: errorText }, { status: res.status });
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch {
    return NextResponse.json({ message: 'Something went wrong' }, { status: 500 });
  }
}