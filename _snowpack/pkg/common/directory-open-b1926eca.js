// @license © 2020 Google LLC. Licensed under the Apache License, Version 2.0.
const e = async (t, r, i = t.name) => {
  const a = [],
        n = [];

  for await (const s of t.getEntries()) {
    const o = `${i}/${s.name}`;
    s.isFile ? n.push(s.getFile().then(e => (e.directoryHandle = t, Object.defineProperty(e, "webkitRelativePath", {
      configurable: !0,
      enumerable: !0,
      get: () => o
    })))) : s.isDirectory && r && a.push(e(s, r, o));
  }

  return [...(await Promise.all(a)).flat(), ...(await Promise.all(n))];
};

var directoryOpen = (async (t = {}) => {
  t.recursive = t.recursive || !1;
  const r = await window.chooseFileSystemEntries({
    type: "open-directory"
  });
  return e(r, t.recursive);
});

export default directoryOpen;