/**
 * set-field-labels.js — Sets the admin edit-view label of every field in the
 * components used by the Platform, Pricing and Solutions pages to Title Case
 * ("main_title" → "Main Title", "eyebrowLabel" → "Eyebrow Label").
 *
 * This is the same setting as Content Manager → (component) → "Configure the
 * view" → field label. It only changes the stored view configuration; field
 * names, tables and content are untouched.
 *
 * Start Strapi once after schema changes (so every field has a configuration),
 * then run from the project root:
 *   node scripts/set-field-labels.js          # dry run, prints the changes
 *   node scripts/set-field-labels.js --apply  # writes them
 */
"use strict";

require("dotenv").config();
const mysql = require("mysql2/promise");

const APPLY = process.argv.includes("--apply");

const COMPONENTS = [
  // sections
  "acf-sections.platform-hero",
  "acf-sections.platform-story",
  "acf-sections.platform-explorer",
  "acf-sections.platform-foundation",
  "acf-sections.platform-scale",
  "acf-sections.platform-bridge",
  "acf-sections.solutions-use-cases-layout",
  "acf-sections.qubi-simple-hero",
  "acf-sections.qubi-plans-section",
  "acf-sections.qubi-icon-grid-section",
  "acf-sections.qubi-execution-section",
  "acf-sections.qubi-comparison-section",
  "acf-sections.qubi-faq-section",
  "acf-sections.qubi-final-cta-section",
  // repeatable items inside them
  "acf-shared.platform-label-value",
  "acf-shared.platform-step-item",
  "acf-shared.platform-product-item",
  "acf-shared.platform-foundation-card",
  "acf-shared.qubi-text-paragraph",
  "acf-shared.qubi-plan-item",
  "acf-shared.qubi-plan-compare-row",
  "acf-shared.qubi-icon-card-item",
  "acf-shared.qubi-comparison-row",
  "acf-shared.qubi-faq-item",
  "acf-shared.solutions-use-cases-layout-items",
  "acf-shared.solutions-use-cases-layout-stat-item",
  "shared.menu-item",
  "shared.seo",
];

/** "main_title" / "eyebrowLabel" / "Publish" → "Main Title" / "Eyebrow Label" / "Publish" */
const titleCase = (name) =>
  name
    .replace(/([a-z0-9])([A-Z])/g, "$1 $2")
    .split(/[_\s-]+/)
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

(async () => {
  const c = await mysql.createConnection({
    host: process.env.DATABASE_HOST,
    port: +process.env.DATABASE_PORT,
    user: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    connectTimeout: 20000,
  });

  const updates = [];
  for (const uid of COMPONENTS) {
    const key = `plugin_content_manager_configuration_components::${uid}`;
    const [[row]] = await c.query("SELECT id, value FROM strapi_core_store_settings WHERE `key`=?", [key]);
    if (!row) {
      console.log(`! no configuration yet for ${uid} (start Strapi once, then re-run)`);
      continue;
    }
    const config = JSON.parse(row.value);
    let changed = 0;
    for (const [field, meta] of Object.entries(config.metadatas ?? {})) {
      if (field === "id" || field === "documentId") continue;
      const label = titleCase(field);
      for (const view of ["edit", "list"]) {
        if (meta[view] && meta[view].label !== label) {
          if (view === "edit") console.log(`${uid}.${field}: "${meta[view].label}" -> "${label}"`);
          meta[view].label = label;
          changed++;
        }
      }
    }
    if (changed) updates.push({ id: row.id, value: JSON.stringify(config) });
  }

  console.log(`${updates.length} component configurations to update`);
  if (APPLY && updates.length) {
    for (const u of updates) await c.query("UPDATE strapi_core_store_settings SET value=? WHERE id=?", [u.value, u.id]);
    console.log("APPLIED");
  }
  await c.end();
})().catch((e) => {
  console.error(e.message);
  process.exit(1);
});
