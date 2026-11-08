import React from "react";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import prisma from "@/lib/prisma";
import { projectsData, ProjectItem } from "@/lib/mockData";
import ProjectDetailsClient from "./ProjectDetailsClient";

export const dynamic = "force-dynamic";

interface ProjectPageProps {
  params: {
    slug: string;
  };
}

async function getProject(slug: string): Promise<ProjectItem | null> {
  const slugClean = decodeURIComponent(slug).toLowerCase().trim();

  try {
    const dbProject = await prisma.project.findFirst({
      where: {
        OR: [
          { slug: { equals: slugClean, mode: "insensitive" } },
          { id: { equals: slug, mode: "insensitive" } },
        ],
      },
    });

    if (dbProject) {
      // Query subCategory raw in case of cached runtime model
      let subCat = (dbProject as any).subCategory;
      if (!subCat) {
        try {
          const raw: any[] = await prisma.$queryRawUnsafe(
            `SELECT "subCategory" FROM "Project" WHERE "id" = $1 LIMIT 1`,
            dbProject.id
          );
          if (raw && raw[0]?.subCategory) {
            subCat = raw[0].subCategory;
          }
        } catch (e) {
          // ignore
        }
      }

      return {
        id: dbProject.id,
        slug: dbProject.slug,
        title: dbProject.title,
        category: dbProject.category,
        subCategory: subCat || undefined,
        client: dbProject.client,
        location: dbProject.location,
        completionDate: dbProject.completionDate,
        description: dbProject.description,
        image: dbProject.image,
        gallery: (Array.isArray(dbProject.gallery) ? dbProject.gallery : []) as any,
        scope: dbProject.scope || [],
        isFeatured: dbProject.isFeatured || false,
      };
    }
  } catch (err) {
    console.error("Error fetching project from DB:", err);
  }

  // Fallback to mock projects
  const mockFound = projectsData.find(
    (p) =>
      p.slug.toLowerCase() === slugClean ||
      p.id.toLowerCase() === slugClean
  );

  return mockFound || null;
}

async function getRelatedProjects(category: string, currentId: string): Promise<ProjectItem[]> {
  try {
    const dbProjects = await prisma.project.findMany({
      where: {
        id: { not: currentId },
      },
      orderBy: { createdAt: "desc" },
      take: 3,
    });

    if (dbProjects && dbProjects.length > 0) {
      return dbProjects.map((p) => ({
        id: p.id,
        slug: p.slug,
        title: p.title,
        category: p.category,
        subCategory: (p as any).subCategory || undefined,
        client: p.client,
        location: p.location,
        completionDate: p.completionDate,
        description: p.description,
        image: p.image,
        gallery: (Array.isArray(p.gallery) ? p.gallery : []) as any,
        scope: p.scope || [],
        isFeatured: p.isFeatured || false,
      }));
    }
  } catch (err) {
    console.error("Error fetching related projects:", err);
  }

  return projectsData
    .filter((p) => p.id !== currentId)
    .slice(0, 3);
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const project = await getProject(params.slug);
  if (!project) {
    return {
      title: "Project Not Found | Elite Standard Limited",
      description: "The requested engineering case study could not be located.",
    };
  }

  const sub = project.subCategory ? ` (${project.subCategory})` : "";
  return {
    title: `${project.title}${sub} | Turnkey Project Case Study | Elite Standard Limited`,
    description:
      project.description?.slice(0, 160) ||
      `Comprehensive MEP engineering execution for ${project.client} in ${project.location} by Elite Standard Limited.`,
    openGraph: {
      title: `${project.title} - ${project.client}`,
      description: project.description?.slice(0, 160),
      images: [
        {
          url: project.image,
          alt: project.title,
        },
      ],
    },
  };
}

export default async function ProjectDetailsPage({ params }: ProjectPageProps) {
  const project = await getProject(params.slug);

  if (!project) {
    notFound();
  }

  const related = await getRelatedProjects(project.category, project.id);

  return (
    <ProjectDetailsClient
      project={project}
      relatedProjects={related}
    />
  );
}

