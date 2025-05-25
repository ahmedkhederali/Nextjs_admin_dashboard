// src/app/api/proxy-users/route.ts
import { NextResponse } from 'next/server';
export async function GET() {
  const STATIC_TOKEN = process.env.NEXT_PUBLIC_URL;
  const res = await fetch(`${STATIC_TOKEN}`);
  const data = await res.json();
  return NextResponse.json(data);
}