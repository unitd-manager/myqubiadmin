export default {
  routes: [
    {
      method: 'GET',
      path: '/public-settings',
      handler: 'setting.publicFind',
      config: {
        auth: false,
        policies: [],
      },
    },
  ],
};
