import { NextResponse } from "next/server"
import path from "path"
import { promises as fs } from "fs"

export async function GET() {
  try {
    const galleryDir = path.join(process.cwd(), "public", "gallery")
    const files = await fs.readdir(galleryDir)

    const images = files
      .filter((file) => /\.(jpe?g|png|webp|gif)$/i.test(file))
      .map((file) => ({
        src: `/gallery/${file}`,
        alt: file.replace(/\.[^.]+$/, "").replace(/[-_]/g, " "),
      }))

    return NextResponse.json({ images })
  } catch (error) {
    console.error("[gallery] Failed to load images", error)
    return NextResponse.json({ images: [] }, { status: 500 })
  }
}
