export const zero = () => ({ x: 0, y: 0 });
export const basis = () => ({ x: { x: 1, y: 0 }, y: { x: 0, y: 1 } });
export const add = (p1, p2) => ({ x: p1.x + p2.x, y: p1.y + p2.y });
export const sub = (p1, p2) => ({ x: p1.x - p2.x, y: p1.y - p2.y });
export const scale = (p, k) => ({ x: k * p.x, y: k * p.y });
export const trans = (tx, ty) => p => ({ x: tx(p.x), y: ty(p.y) });
export const fromMouseEvent = (e, scale) => {
  const { left, top } = e.currentTarget.getBoundingClientRect();
  const x = e.clientX - left;
  const y = e.clientY - top;
  if (scale) {
    return { x: scale.scaleX.invert(x), y: scale.scaleY.invert(y) };
  }
  return { x, y };
};
