import React from "react";
import prisma from "@/lib/prisma";
import ProjectsClient from "./ProjectsClient";
import { projectsData, ProjectItem } from "@/lib/mockData";

export const dynamic = "force-dynamic";

export default async function ProjectsPage() {
  let projects: ProjectItem[] = projectsData;
  let clients: any[] = [];

  try {
    const [dbProjects, dbClients] = await Promise.all([
      prisma.project.findMany({
        orderBy: { createdAt: "desc" },
      }),
      prisma.clientReference.findMany({
        where: { isActive: true, category: "client" },
        orderBy: { orderIndex: "asc" },
      }),
    ]);

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
        isFeatured: p.isFeatured || false,
      }));
    }

    if (dbClients && dbClients.length > 0) {
      clients = dbClients;
    }
  } catch (err) {
    console.error("Failed to query live projects for SSR:", err);
  }

  return <ProjectsClient initialProjects={projects} initialClients={clients} />;
}
