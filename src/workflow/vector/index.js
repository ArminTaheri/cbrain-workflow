export const add = (p1, p2) => ({ x: p1.x + p2.x, y: p1.y + p2.y });
export const sub = (p1, p2) => ({ x: p1.x - p2.x, y: p1.y - p2.y });
export const scale = (p, k) => ({ x: k * p.x, y: k * p.y });
export const trans = (tx, ty) => p => ({ x: tx(p.x), y: ty(p.y) });
