/**
 * set-page-seo.js — Fills the SEO component of the Platform, Pricing and
 * Solutions pages so every check in src/utils/seo-scoring.ts passes (100%).
 * Only the "seo" field is updated; the pageBuilder is left as it is.
 *
 * Run from the project root:  node scripts/set-page-seo.js
 */
"use strict";

const SITE = "https://myqubi.com";

const PAGES = {
  platform: {
    focusKeyword: "platform",
    metaTitle: "qubi Platform | One AI Platform Built to Expand",
    metaDescription:
      "Explore the qubi platform: AI agents, automation, orchestration, integrations and governance in one connected platform that grows with your operations.",
    keywords: "qubi platform, AI agent platform, automation platform, orchestration, AgentHub, enterprise AI",
    schemaType: "WebPage",
  },
  pricing: {
    focusKeyword: "pricing",
    metaTitle: "qubi Pricing | Outcome-Based AI Execution Plans",
    metaDescription:
      "See qubi pricing: outcome-based plans where you pay for work completed, not licenses. Compare Starter, Enterprise and Custom execution programs.",
    keywords: "qubi pricing, outcome-based pricing, AI execution plans, managed AI service, automation pricing",
    schemaType: "WebPage",
  },
  solutions: {
    focusKeyword: "solutions",
    metaTitle: "qubi Solutions | Real Work Executed End-to-End",
    metaDescription:
      "Explore qubi solutions for invoices, claims, order-to-cash and more, where AI brings documents, decisions and systems together to complete real work.",
    keywords: "qubi solutions, AI workflow solutions, invoice processing, claims automation, order-to-cash, enterprise AI",
    schemaType: "WebPage",
  },
};

/** The same pass/fail rules as src/utils/seo-scoring.ts, to fail fast before writing. */
function check(slug, seo) {
  const k = seo.focusKeyword.toLowerCase();
  const problems = [];
  if (seo.metaTitle.length < 30 || seo.metaTitle.length > 60) problems.push(`meta title length ${seo.metaTitle.length}`);
  if (!seo.metaTitle.toLowerCase().includes(k)) problems.push("keyword not in meta title");
  if (seo.metaDescription.length < 120 || seo.metaDescription.length > 160) problems.push(`meta description length ${seo.metaDescription.length}`);
  if (!seo.metaDescription.toLowerCase().includes(k)) problems.push("keyword not in meta description");
  if (!slug.includes(k.replace(/\s+/g, "-"))) problems.push("keyword not in slug");
  return problems;
}

async function main() {
  for (const [slug, p] of Object.entries(PAGES)) {
    const problems = check(slug, p);
    if (problems.length) throw new Error(`${slug}: ${problems.join(", ")}`);
  }

  const { createStrapi, compileStrapi } = require("@strapi/strapi");
  const appContext = await compileStrapi();
  const app = await createStrapi(appContext).load();
  app.log.level = "error";

  try {
    // Social preview image: the qubi logo uploaded by the platform seed.
    const image = await app.db.query("plugin::upload.file").findOne({ where: { name: "qubi-logo.png" } });
    if (!image) throw new Error("qubi-logo.png not found in the media library — run seed-qubi-platform-page.js first");

    for (const [slug, p] of Object.entries(PAGES)) {
      const page = await app.documents("api::page.page").findFirst({ filters: { slug } });
      if (!page) {
        console.log(`! page '${slug}' not found, skipped`);
        continue;
      }
      const url = `${SITE}/${slug}`;
      await app.documents("api::page.page").update({
        documentId: page.documentId,
        data: {
          seo: {
            metaTitle: p.metaTitle,
            metaDescription: p.metaDescription,
            focusKeyword: p.focusKeyword,
            keywords: p.keywords,
            canonicalURL: url,
            metaImage: image.id,
            ogTitle: p.metaTitle,
            ogDescription: p.metaDescription,
            ogImage: image.id,
            twitterCard: "summary_large_image",
            schema: {
              "@context": "https://schema.org",
              "@type": p.schemaType,
              name: p.metaTitle,
              description: p.metaDescription,
              url,
              publisher: { "@type": "Organization", name: "qubi", url: SITE },
            },
          },
        },
      });
      console.log(`SEO set for '${slug}'`);
    }
  } finally {
    await app.destroy();
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
