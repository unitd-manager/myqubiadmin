/**
 * hide-json-fields.js — Removes JSON fields (the dark code-editor boxes) from
 * the admin edit form of the Page content type and the SEO component.
 *
 * Same as Content Manager → "Configure the view" → removing the field from the
 * layout. Only the stored view configuration changes: the fields, their data
 * and the API stay as they are (Page "acf" holds the pageBuilder hash used on
 * save; SEO "schema" is the JSON-LD the site renders and the SEO score checks).
 *
 * Run from the project root:
 *   node scripts/hide-json-fields.js          # dry run
 *   node scripts/hide-json-fields.js --apply  # writes the change
 */
"use strict";

require("dotenv").config();
const fs = require("fs");
const path = require("path");
const mysql = require("mysql2/promise");

const APPLY = process.argv.includes("--apply");

const TARGETS = [
  {
    key: "plugin_content_manager_configuration_content_types::api::page.page",
    schema: "src/api/page/content-types/page/schema.json",
  },
  {
    key: "plugin_content_manager_configuration_components::shared.seo",
    schema: "src/components/shared/seo.json",
  },
];

(async () => {
  const c = await mysql.createConnection({
    host: process.env.DATABASE_HOST,
    port: +process.env.DATABASE_PORT,
    user: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    connectTimeout: 20000,
  });

  for (const { key, schema } of TARGETS) {
    const attributes = JSON.parse(fs.readFileSync(path.join(process.cwd(), schema), "utf8")).attributes;
    const jsonFields = Object.keys(attributes).filter((name) => attributes[name].type === "json");

    const [[row]] = await c.query("SELECT id, value FROM strapi_core_store_settings WHERE `key`=?", [key]);
    if (!row) {
      console.log(`! no configuration for ${key}`);
      continue;
    }
    const config = JSON.parse(row.value);
    const before = JSON.stringify([config.layouts.edit, config.metadatas]);
    config.layouts.edit = config.layouts.edit
      .map((r) => r.filter((cell) => !jsonFields.includes(cell.name)))
      .filter((r) => r.length > 0);
    for (const name of jsonFields) {
      if (config.metadatas[name]?.edit) config.metadatas[name].edit.visible = false;
    }

    const changed = before !== JSON.stringify([config.layouts.edit, config.metadatas]);
    console.log(`${key}: hide ${jsonFields.join(", ") || "(none)"}${changed ? "" : " (already hidden)"}`);
    if (APPLY && changed) {
      await c.query("UPDATE strapi_core_store_settings SET value=? WHERE id=?", [JSON.stringify(config), row.id]);
      console.log("  APPLIED");
    }
  }
  await c.end();
})().catch((e) => {
  console.error(e.message);
  process.exit(1);
});
