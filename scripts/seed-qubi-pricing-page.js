/**
 * seed-qubi-pricing-page.js — Creates the Pricing page entry with qubi
 * pageBuilder blocks (hero, plans explorer + compare table, platform
 * components, execution, comparison table, FAQ, final CTA). Content mirrors
 * the current myqubi.com/pricing page; every visible text comes from here.
 *
 * Titles: a new line is a line break, *text* is the orange italic highlight.
 *
 * Run from the project root:  node scripts/seed-qubi-pricing-page.js [--force]
 * --force overwrites the pageBuilder of an existing "pricing" page.
 */
"use strict";

const DEMO_URL = "https://meetings.hubspot.com/enterprisedemo/qubi-consultation";
const FORCE = process.argv.includes("--force");

const texts = (items) => items.map((text) => ({ text }));

const pageBuilder = [
  {
    __component: "acf-sections.qubi-simple-hero",
    badge_text: "Outcome-Based Pricing",
    main_title: "You pay for the\n*work completed,*\nnot licenses consumed",
    description:
      "qubi is a managed service, not a software subscription. We run your operations end-to-end and charge based on outcomes delivered.",
  },
  {
    __component: "acf-sections.qubi-plans-section",
    eyebrow: "Plans",
    main_title: "Execution programs\nfor every scale",
    cta_url: DEMO_URL,
    nav_label: "Choose a program",
    popular_label: "Most Popular",
    compare_button_label: "Compare plans ↗",
    fit_label: "Best fit",
    profile_label: "Program profile",
    profile_items: [
      { label: "Delivery", value: "Managed execution" },
      { label: "Pricing", value: "Outcome-based" },
    ],
    plans: [
      {
        tagline: "For single-workflow deployments",
        title: "Starter Execution",
        tab_label: "Single workflow",
        popular: false,
        description: "Ideal for organizations that want to start with one critical workflow and prove ROI before scaling.",
        cta_label: "Talk to Us →",
        fit_title: "Start with one critical workflow",
        fit_description: "Best suited to organizations validating ROI before expanding to broader execution.",
        features: texts([
          "1 end-to-end workflow execution",
          "DoqumentAI for up to 3 document types",
          "AI agent decision-making",
          "Up to 5 enterprise system integrations",
          "Standard SLA (business hours)",
          "Dedicated implementation engineer",
          "Monthly outcome reporting",
        ]),
      },
      {
        tagline: "For multi-workflow, enterprise-scale operations",
        title: "Enterprise Execution",
        tab_label: "Multi-workflow",
        popular: true,
        description: "Full-scale AI execution across multiple workflows, with our team running everything as a managed service.",
        cta_label: "Talk to Us →",
        fit_title: "Multi-workflow execution at scale",
        fit_description:
          "The most comprehensive standard program for organizations running multiple workflows as a managed service.",
        features: texts([
          "Unlimited workflow executions",
          "Full DoqumentAI any document type",
          "Advanced AI agent orchestration",
          "Unlimited enterprise integrations",
          "24/7 managed service SLA",
          "Dedicated execution team",
          "Real-time outcome dashboards",
          "Exception handling and escalation management",
        ]),
      },
      {
        tagline: "For transformational initiatives",
        title: "Custom Program",
        tab_label: "Transformational initiative",
        popular: false,
        description: "Co-design an enterprise AI execution program aligned to your most critical operational transformation goals.",
        cta_label: "Contact Us →",
        fit_title: "Enterprise transformation",
        fit_description:
          "Designed around high-priority initiatives that require custom outcomes, governance, and delivery alignment.",
        features: texts([
          "Everything in Enterprise Execution",
          "Co-designed execution roadmap",
          "Executive sponsorship alignment",
          "Custom outcome metrics and SLAs",
          "Dedicated VP of Delivery",
          "Innovation lab access",
          "Priority feature development",
        ]),
      },
    ],
    compare_title: "Compare execution programs",
    compare_aspect_label: "Aspect",
    // One value per plan, in plan order (Starter, Enterprise, Custom). "—" shows as muted.
    compare_rows: [
      ["Program fit", "Single critical workflow", "Multi-workflow, enterprise-scale operations", "Transformational initiatives"],
      ["Workflow execution", "1 end-to-end workflow execution", "Unlimited workflow executions", "Everything in Enterprise Execution"],
      ["DoqumentAI", "Up to 3 document types", "Full DoqumentAI any document type", "Everything in Enterprise Execution"],
      ["AI orchestration", "AI agent decision-making", "Advanced AI agent orchestration", "Custom execution roadmap"],
      ["Enterprise integrations", "Up to 5 enterprise system integrations", "Unlimited enterprise integrations", "Everything in Enterprise Execution"],
      ["Service level", "Standard SLA (business hours)", "24/7 managed service SLA", "Custom outcome metrics and SLAs"],
      ["Delivery support", "Dedicated implementation engineer", "Dedicated execution team", "Dedicated VP of Delivery"],
      ["Reporting", "Monthly outcome reporting", "Real-time outcome dashboards", "Custom outcome metrics and SLAs"],
      ["Additional program elements", "—", "Exception handling and escalation management", "Executive sponsorship alignment · Innovation lab access · Priority feature development"],
    ].map(([aspect, ...values]) => ({ aspect, values: texts(values) })),
  },
  {
    __component: "acf-sections.qubi-icon-grid-section",
    eyebrow: "The Execution Engine",
    main_title: "Platform Components",
    description: "Not standalone products. Components of one execution engine, working together to run your operations.",
    items: [
      { icon: "▣", title: "DoqumentAI", description: "Intelligent document processing that reads, extracts, and validates at scale." },
      { icon: "✦", title: "AI Agents", description: "Autonomous agents that make decisions and take action within your workflows." },
      { icon: "⚙", title: "Workflow Automation", description: "End-to-end process orchestration that connects every step." },
      { icon: "↔", title: "Orchestration", description: "Enterprise-grade coordination across systems, teams, and exceptions." },
    ],
  },
  {
    __component: "acf-sections.qubi-execution-section",
    main_title: "AI is not the problem.",
    title_highlight: "Execution is.",
    description: "Most enterprise AI promises intelligence. But intelligence without action is just another dashboard.",
    // Each line of a card's description is one bullet.
    items: [
      { title: "Analyzes but does not act", description: "Insight-only tools generate dashboards while your team still executes manually.\nAI that never acts is not reducing your workload." },
      { title: "Assists but does not complete", description: "Copilots and assistants help, but they do not finish the job.\nSomeone still has to validate, correct, and push through every system." },
      { title: "Sits outside operations", description: "Disconnected from your systems.\nDisconnected from your workflows.\nDisconnected from where the actual work happens." },
    ],
    // Each line is shown on its own; the second line is the muted part.
    callout_title: "qubi does not sell intelligence.\nWe sell execution.",
    callout_description: "Stop managing AI projects.\nStart getting work done.",
  },
  {
    __component: "acf-sections.qubi-comparison-section",
    eyebrow: "Comparison",
    main_title: "Why qubi, not workflow tools?",
    aspect_label: "Aspect",
    them_label: "Workflow Automation Tools",
    us_label: "qubi",
    rows: [
      { aspect: "AI Role", them: "Optional add-on", us: "Core decision engine" },
      { aspect: "Document Processing", them: "Requires separate tools", us: "Built-in DoqumentAI" },
      { aspect: "Delivery Model", them: "You build and operate", us: "We design and run (managed)" },
      { aspect: "Success Metric", them: "Task completion", us: "Business outcomes" },
      { aspect: "Exception Handling", them: "Manual intervention", us: "AI-powered escalation" },
      { aspect: "Pricing Model", them: "Per-seat or per-task licenses", us: "Outcome-based" },
    ],
  },
  {
    __component: "acf-sections.qubi-faq-section",
    eyebrow: "FAQ",
    main_title: "Common questions",
    // A URL inside an answer is shown as a "Learn more" link.
    items: [
      {
        question: "How is qubi priced?",
        answer:
          "qubi operates on an outcome-based model. You pay for work completed, not licenses consumed. Pricing is scoped per workflow based on volume, complexity, and the number of systems involved. We provide a detailed SOW after a discovery session.",
      },
      {
        question: "How can I validate qubi before making a long-term commitment?",
        answer:
          "qBotica participates in the Clutch Guarantee program, giving eligible new engagements a 14-day, no-questions-asked refund period. This gives you the opportunity to begin working with qubi and evaluate the engagement with greater confidence. If it isn't the right fit within the first 14 days, you can cancel in writing and receive a refund of eligible fees under the terms of the Clutch Guarantee. https://clutch.co/profile/qbotica",
      },
      {
        question: "How long does implementation take?",
        answer:
          "Most workflows go live within 6-10 weeks. Complex multi-system orchestrations may take 12-16 weeks. We provide a detailed timeline during scoping.",
      },
      {
        question: "What systems does qubi integrate with?",
        answer:
          "qubi has 500+ pre-built connectors covering SAP, Oracle, Salesforce, ServiceNow, Workday, and most major enterprise platforms. We also build custom integrations as part of the managed service.",
      },
      {
        question: "What happens when there is an exception?",
        answer:
          "qubi handles most exceptions autonomously using AI-powered escalation logic. Cases requiring human judgment are routed to the right person with full context - no manual triage needed.",
      },
      {
        question: "How do you measure success?",
        answer:
          "We measure success by the business outcomes defined in your SOW - processing time reduction, cost savings, accuracy improvement, and throughput increase. Every client has a custom outcome dashboard.",
      },
    ],
  },
  {
    __component: "acf-sections.qubi-final-cta-section",
    main_title: "Get a custom proposal\nfor your workflow",
    description:
      "Every engagement starts with a 30-minute discovery call. We will scope your workflow, define success metrics, and provide a tailored proposal.",
    button: { label: "Talk to an Expert →", url: DEMO_URL },
  },
];

async function main() {
  const { createStrapi, compileStrapi } = require("@strapi/strapi");
  const appContext = await compileStrapi();
  const app = await createStrapi(appContext).load();
  app.log.level = "error";

  try {
    const existing = await app.documents("api::page.page").findFirst({
      filters: { slug: "pricing" },
    });

    if (existing && !FORCE) {
      console.log(
        `Page 'pricing' already exists (documentId=${existing.documentId}). Re-run with --force to overwrite its pageBuilder.`
      );
    } else if (existing) {
      await app.documents("api::page.page").update({
        documentId: existing.documentId,
        data: { pageBuilder },
      });
      console.log(`Updated 'pricing' page with ${pageBuilder.length} qubi blocks.`);
    } else {
      const created = await app.documents("api::page.page").create({
        data: {
          title: "Pricing",
          slug: "pricing",
          pageType: "landing",
          pageBuilder,
        },
      });
      console.log(
        `Created 'pricing' page (documentId=${created.documentId}) with ${pageBuilder.length} qubi blocks.`
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
