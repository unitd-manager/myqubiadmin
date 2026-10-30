/**
 * seed-qubi-solutions-page.js — Creates the Solutions page entry with
 * pageBuilder blocks (hero + proof stats, use cases, industries, execution
 * steps, business difference, platform bridge, final CTA). Content mirrors the
 * current myqubi.com/solutions page. Reuses existing components only, so no
 * new tables are needed.
 *
 * Run from the project root:  node scripts/seed-qubi-solutions-page.js [--force]
 * --force overwrites the pageBuilder of an existing "solutions" page.
 */
"use strict";

const DEMO_URL = "https://meetings.hubspot.com/enterprisedemo/qubi-consultation";
const FORCE = process.argv.includes("--force");

const USE_CASES = [
  ["Financial Services", "Invoice Processing & ERP Posting", "From document intake to validated ERP posting with zero manual touch. AI reads invoices, validates against POs, resolves exceptions, and posts — end-to-end.", ["21 days → 2 days processing", "95% accuracy", "$2M annual savings"]],
  ["Healthcare & Insurance", "Claims Intake to Adjudication", "End-to-end claims processing with AI-driven decisions. Extract claim data, validate against policy rules, route complex cases, and adjudicate — automatically.", ["60% reduction in processing time", "3x throughput increase", "98% accuracy"]],
  ["Shared Services", "Order-to-Cash Workflows", "From order capture to cash reconciliation, fully executed. qubi orchestrates order validation, fulfillment triggers, invoicing, and payment matching across systems.", ["Manual data entry eliminated", "50% faster O2C cycle", "99.2% accuracy"]],
  ["Finance & Accounting", "Financial Reconciliation", "Cross-system matching, exception handling, and reporting. Done. AI agents compare ledgers, flag discrepancies, and close the books without your team pulling all-nighters.", ["Month-end close accelerated", "Exceptions auto-resolved", "Full audit trail"]],
  ["Customer Operations", "Customer Onboarding", "Document collection, verification, and system setup, automated completely. New customers go from application to active in hours, not days.", ["Onboarding time cut by 70%", "Zero manual data entry", "Compliance enforced automatically"]],
  ["Cross-Industry", "Document-Heavy Decision Workflows", "Complex multi-document processes with intelligent routing. Contracts, applications, reports — qubi reads them, extracts what matters, and routes to the right action.", ["Any document type supported", "AI extracts structured data", "Decisions in minutes not days"]],
  ["Supply Chain & Logistics", "Supply Chain Document Processing", "Automate document processing and system updates across the supply chain. Bills of lading, shipping manifests, customs documents — processed and posted automatically.", ["Processing time from days to hours", "Zero manual keying", "Real-time visibility"]],
  ["Healthcare", "Prior Authorization Workflows", "Automate prior authorization workflows end-to-end. Extract clinical data, validate against payer rules, submit and track — with AI handling the complexity.", ["Auth turnaround from days to hours", "Denial rates reduced", "Clinical staff freed up"]],
];

const INDUSTRIES = [
  ["Financial Services", "AI-driven execution for the workflows that power financial operations, from invoice reconciliation to compliance reporting.", ["Close the books faster with AI-driven reconciliation", "Process invoices end-to-end without manual bottlenecks", "Automate three-way matching and exception handling", "Continuous invoice processing at scale"]],
  ["Healthcare and Insurance", "Handle the complexity of healthcare workflows with AI agents that understand clinical data, payer rules, and compliance requirements.", ["Process claims end-to-end without human bottlenecks", "Automate prior authorization workflows", "AI-driven eligibility verification", "Denial management and appeals automation"]],
  ["Shared Services and Operations", "Unify fragmented operations across shared service centers with AI orchestration that connects every system and every step.", ["Automate order-to-cash across systems", "Extract, validate, and act on financial data in minutes", "HR document processing and onboarding", "Cross-system reconciliation and reporting"]],
  ["Supply Chain and Logistics", "Keep goods moving with AI that processes shipping documents, updates systems, and handles exceptions without human bottlenecks.", ["Automate document processing and system updates", "Reduce processing time from days to hours", "Bills of lading and customs document automation", "Freight invoice processing and matching"]],
  ["Accounts Payable and Procurement", "Transform AP from a cost center into a strategic advantage with AI execution that handles the entire invoice lifecycle.", ["Three-way matching and exception handling", "Continuous invoice processing at scale", "Vendor onboarding and compliance checks", "Early payment discount capture"]],
  ["Customer Operations", "Deliver better customer experiences by automating the back-office work that backs every customer interaction.", ["Automate customer onboarding workflows", "Reduce manual data entry and system updates", "Contract processing and activation", "Customer document verification at scale"]],
];

const values = (items) => items.map((value) => ({ value }));

const pageBuilder = [
  {
    __component: "acf-sections.platform-hero",
    eyebrow: "Solutions",
    main_title: "Real work.",
    title_highlight: "Executed end-to-end.",
    description:
      "Explore the workflows and operational areas where qubi brings documents, decisions, systems, and actions together to deliver measurable outcomes.",
    intro_text: "Not demos. Not isolated tasks. Real operational workflows designed around completed work.",
    stats: [
      { value: "85%", label: "Reduction in processing time" },
      { value: "10x", label: "Increase in throughput" },
      { value: "99.2%", label: "Accuracy rate achieved" },
    ],
  },
  {
    __component: "acf-sections.solutions-use-cases-layout",
    eyebrowLabel: "Use Cases",
    heading: "Start with the work you need to",
    highlightedHeading: "improve.",
    description:
      "Explore real workflows qubi can execute end-to-end, from intake and decision-making through system action and completion.",
    useCases: USE_CASES.map(([categoryLabel, title, description, results]) => ({
      categoryLabel,
      title,
      description,
      stats: results.map((text) => ({ text })),
    })),
  },
  {
    __component: "acf-sections.platform-foundation",
    eyebrow: "Industries & Operations",
    main_title: "Built around the work your teams",
    title_highlight: "already run.",
    description:
      "The same execution model can support different operational needs across industries and enterprise functions.",
    cards: INDUSTRIES.map(([title, description, work]) => ({ title, description, points: values(work) })),
  },
  {
    __component: "acf-sections.platform-story",
    eyebrow: "How qubi Executes",
    main_title: "From input to",
    title_highlight: "outcome.",
    description:
      "This page focuses on what happens to the work. For the agents, automation, orchestration, integrations, governance, and other capabilities behind it, explore the qubi Platform.",
    steps: [
      { title: "Documents", description: "Ingest and understand invoices, claims, contracts, financials, and other business documents." },
      { title: "Decisions", description: "Apply AI, rules, and business context to determine what should happen next." },
      { title: "Actions", description: "Execute across the enterprise systems involved in the workflow." },
      { title: "Outcomes", description: "Complete, verify, and deliver the work end-to-end." },
    ],
  },
  {
    // Second platform-foundation on the page: the two comparison columns.
    __component: "acf-sections.platform-foundation",
    eyebrow: "The Business Difference",
    main_title: "Most AI assists.",
    title_highlight: "qubi executes.",
    description:
      "Many tools stop at analysis or assistance. qubi is designed around completing operational work across the systems and decisions involved.",
    cards: [
      { title: "Traditional approach", points: values(["Analyze data", "Assist users", "Require teams to execute", "Sit outside workflows"]) },
      { title: "qubi", points: values(["Executes work", "Completes processes", "Owns outcomes", "Operates inside systems"]) },
    ],
  },
  {
    __component: "acf-sections.platform-bridge",
    eyebrow: "Explore the Platform",
    main_title: "See what powers every qubi solution.",
    description:
      "Explore the agents, automation, orchestration, integrations, governance, analytics, and other capabilities that make end-to-end execution possible.",
    button: { label: "Explore the qubi Platform →", url: "/platform" },
  },
  {
    __component: "acf-sections.qubi-final-cta-section",
    main_title: "Don't see your workflow?",
    description:
      "We work across operations where documents, decisions, and system actions need to happen together. Tell us what your team needs to execute.",
    button: { label: "Book a Demo →", url: DEMO_URL },
  },
];

async function main() {
  const { createStrapi, compileStrapi } = require("@strapi/strapi");
  const appContext = await compileStrapi();
  const app = await createStrapi(appContext).load();
  app.log.level = "error";

  try {
    const existing = await app.documents("api::page.page").findFirst({
      filters: { slug: "solutions" },
    });

    if (existing && !FORCE) {
      console.log(
        `Page 'solutions' already exists (documentId=${existing.documentId}). Re-run with --force to overwrite its pageBuilder.`
      );
    } else if (existing) {
      await app.documents("api::page.page").update({
        documentId: existing.documentId,
        data: { pageBuilder },
      });
      console.log(`Updated 'solutions' page with ${pageBuilder.length} blocks.`);
    } else {
      const created = await app.documents("api::page.page").create({
        data: {
          title: "Solutions",
          slug: "solutions",
          pageType: "landing",
          seo: {
            metaTitle: "qubi Solutions | Real Work Executed End-to-End",
            metaDescription:
              "Explore workflows where qubi brings documents, decisions, systems and actions together.",
          },
          pageBuilder,
        },
      });
      console.log(
        `Created 'solutions' page (documentId=${created.documentId}) with ${pageBuilder.length} blocks.`
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
