function setTitleByMeta(to, from, next) {
  const nearestWithTitle = to.matched.slice().reverse().find((r) => r.meta && r.meta.title);
  const nearestWithMeta = to.matched.slice().reverse().find((r) => r.meta && r.meta.metaTags);

  document.title = nearestWithTitle ? `Hyone - ${nearestWithTitle.meta.title}` : 'Hyone';

  Array.from(document.querySelectorAll('[data-vue-router-controlled]')).map((el) => el.parentNode.removeChild(el));

  if (!nearestWithMeta) return next();

  nearestWithMeta.meta.metaTags.map((tagDef) => {
    const tag = document.createElement('meta');

    Object.keys(tagDef).forEach((key) => {
      tag.setAttribute(key, tagDef[key]);
    });

    tag.setAttribute('data-vue-router-controlled', '');

    return tag;
  }).forEach((tag) => document.head.appendChild(tag));

  return next();
}

export { setTitleByMeta };
