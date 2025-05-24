import { NextResponse } from 'next/server';

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const token = request.headers.get('Authorization');

    if (!token) {
      return NextResponse.json({ message: 'No token provided' }, { status: 401 });
    }

    const res = await fetch(`https://mini-admin-portal.vercel.app/api/users/${params.id}`, {
      headers: {
        'Authorization': token,
      },
    });

    if (!res.ok) {
      return NextResponse.json(
        { message: 'Failed to fetch user' },
        { status: res.status }
      );
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching user:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const body = await request.json();
    const token = request.headers.get('Authorization');

    if (!token) {
      return NextResponse.json({ message: 'No token provided' }, { status: 401 });
    }

    const res = await fetch(`https://mini-admin-portal.vercel.app/api/users/${params.id}`, {
      method: 'PUT',
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

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    const token = request.headers.get('Authorization');

    if (!token) {
      return NextResponse.json({ message: 'No token provided' }, { status: 401 });
    }

    const res = await fetch(`https://mini-admin-portal.vercel.app/api/users/${params.id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': token,
      },
    });

    if (!res.ok) {
      const errorText = await res.text();
      return NextResponse.json({ message: errorText }, { status: res.status });
    }

    return NextResponse.json({ message: 'User deleted successfully' });
  } catch {
    return NextResponse.json({ message: 'Something went wrong' }, { status: 500 });
  }
}
