import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma'

// CREATE
export async function POST(request: NextRequest) {
  const { title } = await request.json();
  const newTodo = await prisma.todo.create({
    data: { title },
  });
  return NextResponse.json(newTodo);
}

// READ (svi todo)
export async function GET() {
  const todos = await prisma.todo.findMany();
  return NextResponse.json(todos);
}
