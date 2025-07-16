export interface BoundingBox {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface Mask {
  polygon: [number, number][];
}

export interface Predictions {
  boxes?: BoundingBox[];
  masks?: Mask[];
}
