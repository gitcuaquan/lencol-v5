export interface Mesh {
  name: string;
  meshName: string;
  canvasExport: canvasExport;
  link: string;
  type?:Mesh
}

export interface canvasExport {
  x: number;
  y: number;
  w: number;
  h: number;
}
