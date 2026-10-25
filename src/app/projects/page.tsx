import React from "react";
import prisma from "@/lib/prisma";
import ProjectsClient from "./ProjectsClient";
import { projectsData, ProjectItem } from "@/lib/mockData";

export const dynamic = "force-dynamic";

export default async function ProjectsPage() {
  let projects: ProjectItem[] = projectsData;

  try {
    const dbProjects = await prisma.project.findMany({
      orderBy: { createdAt: "desc" },
    });

    if (dbProjects && dbProjects.length > 0) {
      projects = dbProjects.map((p) => ({
        id: p.id,
        slug: p.slug,
        title: p.title,
        category: p.category,
        client: p.client,
        location: p.location,
        completionDate: p.completionDate,
        description: p.description,
        image: p.image,
        gallery: (Array.isArray(p.gallery) ? p.gallery : []) as any,
        scope: p.scope || [],
      }));
    }
  } catch (err) {
    console.error("Failed to query live projects for SSR:", err);
  }

  return <ProjectsClient initialProjects={projects} />;
}
