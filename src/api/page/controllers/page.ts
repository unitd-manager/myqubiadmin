import { factories } from '@strapi/strapi';
import { buildDynamicZonePopulate } from '../../../utils/deep-populate';

// Read the pageBuilder component list from the Page schema at runtime, so any
// section registered in config/section-components.js (then written into the
// schema by `npm run build:page-schema`) is populated without editing this file.
const getPageBuilderComponents = (): string[] =>
  (strapi.contentType('api::page.page').attributes as any).pageBuilder?.components ?? [];

export default factories.createCoreController(
  'api::page.page',
  ({ strapi }) => ({
    async findBySlug(ctx) {
      const { slug } = ctx.params;

      const entries = await strapi
        .documents('api::page.page')
        .findMany({
          filters: { slug },
          status: 'published',

          populate: {
            pageBuilder: {
              on: buildDynamicZonePopulate(getPageBuilderComponents()),
            },

            seo: {
              populate: {
                ogImage: true,
                metaImage: true,
              },
            },
          },
        });

      if (!entries || entries.length === 0) {
        return ctx.notFound();
      }

      ctx.body = {
        data: entries[0],
      };
    },
  })
);
