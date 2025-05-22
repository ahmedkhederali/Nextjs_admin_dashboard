// src/app/api/proxy-users/route.ts
import { NextResponse } from 'next/server';

export async function GET() {
  const res = await fetch('https://mini-admin-portal.vercel.app/api/users');
  const data = await res.json();
  return NextResponse.json(data);
}