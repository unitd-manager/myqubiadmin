import { factories } from '@strapi/strapi';

export default factories.createCoreController('api::setting.setting', ({ strapi }) => ({
  async publicFind() {
    const records = await strapi.documents('api::setting.setting').findMany({
      filters: { key: { $in: ['ga4', 'gsc'] } },
      fields: ['title', 'description', 'key', 'text'],
    });

    return {
      data: records.map(({ title, description, key, text }) => ({
        title,
        description,
        key,
        text,
      })),
    };
  },
}));
