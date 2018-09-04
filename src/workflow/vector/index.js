export const zero = () => ({ x: 0, y: 0 });
export const basis = () => ({ x: { x: 1, y: 0 }, y: { x: 0, y: 1 } });
export const add = (p1, p2) => ({ x: p1.x + p2.x, y: p1.y + p2.y });
export const sub = (p1, p2) => ({ x: p1.x - p2.x, y: p1.y - p2.y });
export const min = (...ps) => ({
  x: Math.min(...ps.map(p => p.x)),
  y: Math.min(...ps.map(p => p.y))
});
export const max = (...ps) => ({
  x: Math.max(...ps.map(p => p.x)),
  y: Math.max(...ps.map(p => p.y))
});
export const scale = (p, k) => ({ x: k * p.x, y: k * p.y });
export const trans = (tx, ty) => p => ({ x: tx(p.x), y: ty(p.y) });
export const boxContains = (box, p) => {
  const minp = min(box.start, box.end);
  const maxp = max(box.start, box.end);

  return minp.x <= p.x && minp.y <= p.y && maxp.x >= p.x && maxp.y >= p.y;
};
export const fromMouseEvent = (e, scale) => {
  const { left, top } = e.currentTarget.getBoundingClientRect();
  const x = e.clientX - left;
  const y = e.clientY - top;
  if (scale) {
    return { x: scale.scaleX(x), y: scale.scaleY(y) };
  }
  return { x, y };
};
