import type { Metadata } from "next";
import { areasPracticaSeo } from "@/app/lib/areas-practica-seo";
import { SITE_URL } from "@/app/lib/site";

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const area = areasPracticaSeo[id];

  if (!area) {
    return {
      title: "Área no encontrada",
    };
  }

  return {
    title: area.title,
    description: area.description,
    alternates: {
      canonical: `${SITE_URL}/areas-practica/${id}`,
    },
    openGraph: {
      title: `${area.title} | MEP Compliance`,
      description: area.description,
      url: `${SITE_URL}/areas-practica/${id}`,
    },
  };
}

export default function AreaPracticaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
