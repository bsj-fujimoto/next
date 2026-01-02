import { NextRequest, NextResponse } from "next/server";
import { loadComponentMarkdown } from "@/lib/markdown";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const markdown = loadComponentMarkdown(id);

  if (!markdown) {
    return NextResponse.json({ error: "Component not found" }, { status: 404 });
  }

  return NextResponse.json(markdown);
}

