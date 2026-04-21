import { designers, type Designer } from "@/designers/registry"
import { notFound } from "next/navigation"
import dynamic from "next/dynamic"
import type { ComponentType } from "react"

export function generateStaticParams() {
  return designers.map((d) => ({ slug: d.slug }))
}

export default async function DesignerPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const designer = designers.find((d) => d.slug === slug)
  if (!designer) notFound()

  // Each designer has their own .tsx file in /designers/[slug].tsx
  const DesignerPage = dynamic(
    () => import(`@/designers/${slug}`) as Promise<{ default: ComponentType<{ designer: Designer }> }>
  )

  return <DesignerPage designer={designer} />
}
