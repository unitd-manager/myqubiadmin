/**
 * seed-qubi-platform-page.js — Creates the Platform page entry with the
 * platform pageBuilder blocks (hero, story, capability explorer, foundation,
 * scale ladder, solutions bridge, final CTA). Content mirrors the current
 * myqubi.com/platform page.
 *
 * Run from the project root:  node scripts/seed-qubi-platform-page.js [--force]
 * --force overwrites the pageBuilder of an existing "platform" page.
 */
"use strict";

const WALKTHROUGH_URL = "https://meetings.hubspot.com/enterprisedemo/qubi-consultation";
const FORCE = process.argv.includes("--force");

const CATEGORIES = [
  "Build & Intelligence",
  "Automate & Execute",
  "Connect & Orchestrate",
  "Govern & Manage",
  "Discover & Improve",
  "Operate & Support",
];

const PRODUCTS = [
  {
    category: "Build & Intelligence",
    tag: "Build",
    title: "AgentHub / AI Builder",
    description:
      "A visual IDE for chat agents, voice agents, and agentic workflows. Design agents with governance guardrails, evaluations, and model fallback built in, then chain them into workflows with variables and versions.",
    capabilities: [
      "Chat & voice agents on their own runtime",
      "Model-agnostic; credentials encrypted at rest",
      "Skills & MCP servers for external tools",
      "RAG sources chunked and embedded",
      "Jobs, queues & triggers on demand or scheduled",
      "Memory & vaults for encrypted continuity",
    ],
  },
  {
    category: "Govern & Manage",
    tag: "Govern",
    title: "Qubi Platform",
    description:
      "Secure authentication, access management, and the launcher for everything. Single sign-on with one directory of people and role-based access applied across the platform.",
    capabilities: [
      "Single sign-on with claims kept server-side",
      "User profiles unified across products",
      "Roles & permissions granular per product",
      "Organizations & tenants with isolated data",
      "Organization units scope what each person sees",
      "Product catalog & signed licensing",
    ],
  },
  {
    category: "Build & Intelligence",
    tag: "Automate",
    title: "Automation Studio",
    description:
      "Low-code, drag-and-drop automation building. Compose end-to-end automations visually without heavy engineering, and hand them off to run on the platform.",
    capabilities: ["Drag-and-drop builder", "Reusable automation components", "No deep coding required"],
  },
  {
    category: "Govern & Manage",
    tag: "Orchestrate",
    title: "Control Hub",
    description:
      "Centralized orchestration and monitoring. Run, schedule, and observe every automation and agent from one operational control plane.",
    capabilities: ["Centralized orchestration", "Real-time monitoring", "Single pane of control"],
  },
  {
    category: "Automate & Execute",
    tag: "Execute",
    title: "Bot Agents",
    description:
      "Digital workers for attended and unattended work. Deploy bots that carry out repetitive, rules-based tasks alongside people or fully in the background.",
    capabilities: ["Attended & unattended modes", "Repetitive work offloaded", "Scales with demand"],
  },
  {
    category: "Connect & Orchestrate",
    tag: "Connect",
    title: "Integration Hub",
    description:
      "Third-party APIs, connections, and data sync. Wire qubi into the systems you already run so work flows between them without manual keying.",
    capabilities: ["Third-party API connections", "Data sync across systems", "Prebuilt & custom connectors"],
  },
  {
    category: "Connect & Orchestrate",
    tag: "Act",
    title: "Action Hub",
    description:
      "Business users act directly on a workflow. Give non-technical teams a place to review, approve, and push work forward without leaving the platform.",
    capabilities: ["Business-user friendly", "Act directly on live workflows", "Human decisions in the loop"],
  },
  {
    category: "Discover & Improve",
    tag: "Discover",
    title: "Idea Hub",
    description:
      "Automation ideas, assessment, and ROI. Capture candidate processes, score them, and prioritize what to automate next by expected return.",
    capabilities: ["Idea capture & pipeline", "Automation assessment", "ROI prioritization"],
  },
  {
    category: "Discover & Improve",
    tag: "Measure",
    title: "Analytics Hub",
    description:
      "Performance dashboards and ROI measurement. Track execution, throughput, and value delivered across the platform from one analytics layer.",
    capabilities: ["Performance dashboards", "ROI measurement", "Cross-product visibility"],
  },
  {
    category: "Operate & Support",
    tag: "Support",
    title: "Support Hub",
    description:
      "Ticketing and incident management. Raise, route, and resolve issues across the platform so operations keep moving.",
    capabilities: ["Ticketing built in", "Incident management", "Faster resolution"],
  },
];

const pageBuilder = [
  {
    __component: "acf-sections.platform-hero",
    eyebrow: "The qubi Platform",
    main_title: "One platform.",
    title_highlight: "Built to expand.",
    description:
      "Bring AI agents, automation, orchestration, integrations, human decisions, analytics, and governance into one connected environment — and add capabilities as your operation grows.",
    intro_text:
      "A growing platform designed to let teams start where they need and expand without rebuilding the foundation.",
    stats: [
      { value: "One", label: "shared identity" },
      { value: "Flexible", label: "capability adoption" },
      { value: "Connected", label: "enterprise execution" },
    ],
  },
  {
    __component: "acf-sections.platform-story",
    eyebrow: "How it fits together",
    main_title: "Start with what you need.",
    title_highlight: "Expand from there.",
    description:
      "The platform is designed so teams can adopt individual capabilities, connect them through a common foundation, and add more as their automation and AI programs mature.",
    steps: [
      { title: "Sign in", description: "Move across the platform through a shared identity and access model." },
      { title: "Adopt", description: "Begin with the capability that solves the immediate operational need." },
      {
        title: "Connect",
        description: "Bring agents, automations, systems, data, and human decisions into the same operating environment.",
      },
      {
        title: "Govern",
        description: "Manage users, roles, permissions, organizations, and access from a shared foundation.",
      },
      { title: "Expand", description: "Add new platform capabilities as teams, workflows, and use cases grow." },
    ],
  },
  {
    __component: "acf-sections.platform-explorer",
    eyebrow: "Explore the Platform",
    main_title: "Explore qubi by",
    title_highlight: "capability.",
    description:
      "Select a capability area on the left to explore the products and functions available across the platform. The structure can continue to grow as new capabilities are introduced.",
    sidebar_label: "Platform capabilities",
    details_heading: "Key capabilities",
    footer_text: "Part of the connected qubi platform ecosystem",
    categories: CATEGORIES.map((text) => ({ text })),
    products: PRODUCTS.map(({ capabilities, ...product }) => ({
      ...product,
      capabilities: capabilities.map((text) => ({ text })),
    })),
  },
  {
    __component: "acf-sections.platform-foundation",
    eyebrow: "Platform Foundation",
    main_title: "The layers that keep everything",
    title_highlight: "connected.",
    description:
      "The platform is more than a catalog of products. Shared intelligence, identity, governance, and operational control give each capability a common foundation.",
    cards: [
      {
        eyebrow: "Intelligence & Agent Foundation",
        title: "AgentHub / AI Builder",
        description:
          "A visual environment for chat agents, voice agents, and agentic workflows, with governance guardrails, evaluations, model fallback, RAG, tools, jobs, queues, triggers, memory, and encrypted continuity.",
        dark: true,
        points: [
          { label: "Models", value: "Model-agnostic execution" },
          { label: "Knowledge", value: "RAG sources + retrieval" },
          { label: "Tools", value: "Skills + MCP servers" },
          { label: "Operations", value: "Jobs, queues + triggers" },
        ],
      },
      {
        eyebrow: "Identity & Governance Foundation",
        title: "Qubi Platform",
        description:
          "Secure authentication, access management, and the launcher for the platform — one directory of people with role-based access and tenant-aware governance.",
        dark: false,
        points: [
          { label: "Identity", value: "OpenID Connect + OAuth 2.0" },
          { label: "Access", value: "Roles + permissions" },
          { label: "Structure", value: "Organizations + tenants" },
          { label: "Catalog", value: "Products + licensing" },
        ],
      },
    ],
  },
  {
    __component: "acf-sections.platform-scale",
    eyebrow: "Designed to Grow",
    main_title: "Not a fixed suite.",
    title_highlight: "An expandable platform.",
    description:
      "qubi does not need to be defined by a fixed number of products. New capabilities can join the same ecosystem while the customer experience — identity, governance, connections, and operations — stays consistent.",
    steps: [
      { number: "01", title: "Start focused", description: "Adopt the capability that addresses the immediate need." },
      { number: "02", title: "Connect the work", description: "Link enterprise systems, agents, automation, and people." },
      {
        number: "03",
        title: "Govern centrally",
        description: "Apply shared identity, roles, access, and operational visibility.",
      },
      {
        number: "04",
        title: "Expand continuously",
        description: "Add capabilities and use cases without redesigning the platform foundation.",
      },
    ],
  },
  {
    __component: "acf-sections.platform-bridge",
    eyebrow: "Platform + Solutions",
    main_title: "See what the platform can put to work.",
    description:
      "The Platform page explains what qubi is made of. The Solutions page shows how those capabilities come together across real workflows and industries.",
    button: { label: "Explore Solutions →", url: "/solutions" },
    // Empty url: the frontend opens its demo video modal for this button.
    secondary_button: { label: "Watch the Demo", url: "" },
  },
  {
    __component: "acf-sections.qubi-final-cta-section",
    main_title: "Build from where you are.",
    description:
      "Explore the qubi platform with your current workflows in mind, then expand the environment as your automation and AI needs grow.",
    button: { label: "Book a Platform Walkthrough →", url: WALKTHROUGH_URL },
  },
];

async function main() {
  const { createStrapi, compileStrapi } = require("@strapi/strapi");
  const appContext = await compileStrapi();
  const app = await createStrapi(appContext).load();
  app.log.level = "error";

  try {
    const existing = await app.documents("api::page.page").findFirst({
      filters: { slug: "platform" },
    });

    if (existing && !FORCE) {
      console.log(
        `Page 'platform' already exists (documentId=${existing.documentId}). Re-run with --force to overwrite its pageBuilder.`
      );
    } else if (existing) {
      await app.documents("api::page.page").update({
        documentId: existing.documentId,
        data: { pageBuilder },
      });
      console.log(`Updated 'platform' page with ${pageBuilder.length} blocks.`);
    } else {
      const created = await app.documents("api::page.page").create({
        data: {
          title: "Platform",
          slug: "platform",
          pageType: "landing",
          seo: {
            metaTitle: "Qubi Platform | One Platform Built to Expand",
            metaDescription: "Explore qubi Platform",
          },
          pageBuilder,
        },
      });
      console.log(
        `Created 'platform' page (documentId=${created.documentId}) with ${pageBuilder.length} blocks.`
      );
    }
  } finally {
    await app.destroy();
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
