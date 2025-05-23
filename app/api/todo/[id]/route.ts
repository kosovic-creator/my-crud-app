import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

function getIdFromRequest(request: NextRequest) {
  const url = new URL(request.url);
  const id = url.pathname.split('/').pop(); // poslednji segment je id
  if (!id) throw new Error('ID param not found');
  return id;
}

// READ ONE
export async function GET(request: NextRequest) {
  try {
    const id = getIdFromRequest(request);
    const todo = await prisma.todo.findUnique({
      where: { id: Number(id) },
    });
    if (!todo) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    return NextResponse.json(todo);
  } catch {
    return NextResponse.json({ error: 'Invalid ID' }, { status: 400 });
  }
}

// UPDATE
export async function PUT(request: NextRequest) {
  try {
    const id = getIdFromRequest(request);
    const { title } = await request.json();
    const updated = await prisma.todo.update({
      where: { id: Number(id) },
      data: { title },
    });
    return NextResponse.json(updated);
  } catch {
    return NextResponse.json({ error: 'Not found or invalid data' }, { status: 404 });
  }
}

// DELETE
export async function DELETE(request: NextRequest) {
  try {
    const id = getIdFromRequest(request);
    await prisma.todo.delete({
      where: { id: Number(id) },
    });
    return NextResponse.json({ message: 'Deleted' });
  } catch {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }
}
