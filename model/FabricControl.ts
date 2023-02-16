import { fabric } from 'fabric';

export class DeleteControl extends fabric.Control {
  private color: string;
  private size: number;

  constructor(options: fabric.ControlOptions = {}) {
    super(options);

    this.color = options.color || '#333';
    this.size = options.size || 30;
    this.cursorStyle = 'pointer';
  }

  render(ctx: CanvasRenderingContext2D, left: number, top: number, styleOverride?: any, fabricObject?: fabric.Object): void {
    const size = this.size;

    if(fabricObject){
        var stroke = !fabricObject.stroke || fabricObject.stroke === 'none' ? this.color : fabricObject.stroke;
    }

    ctx.save();
    ctx.translate(left, top);
    ctx.strokeStyle = stroke;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(0, 0, size / 2, 0, 2 * Math.PI, false);
    ctx.moveTo(-size / 4, -size / 4);
    ctx.lineTo(size / 4, size / 4);
    ctx.moveTo(size / 4, -size / 4);
    ctx.lineTo(-size / 4, size / 4);
    ctx.stroke();
    ctx.restore();
  }

  onMouseDown(eventData: fabric.IEvent, target: fabric.Object): void {
    target.canvas?.remove(target);
    target.canvas?.renderAll();
  }
}

