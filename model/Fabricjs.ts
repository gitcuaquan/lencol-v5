import { fabric } from "fabric";

export default class Frabric {
  //thuộc tính classs
  private canvas: fabric.Canvas;
  private canvasExport: fabric.StaticCanvas;
  private width: number = 800;
  private height: number = 800;
  private image: fabric.Image;
  private meshName: string;
  // --- khởi tạo cần
  constructor(canvas: HTMLCanvasElement, canvasExport: HTMLCanvasElement,meshName:string) {
    this.meshName = meshName
    this.CustomFrabricJs();
    this.Init(canvas, canvasExport);
  }
  private Init(canvas: HTMLCanvasElement, canvasExport: HTMLCanvasElement) {
    this.canvas = new fabric.Canvas(canvas);
  
    this.canvasExport = new fabric.StaticCanvas(canvasExport);
    this.canvas.setBackgroundColor(
      "#ffffff",
      this.canvas.renderAll.bind(this.canvas)
    );
    this.canvasExport.setBackgroundColor(
      "#c5c9d4",
      this.canvasExport.renderAll.bind(this.canvas)
    );
    this.canvas.controlsAboveOverlay = true;

    this.Resize();
    this.WatchCanvas();
  }
  /**
   * Hàm này được sử dụng để đặt các thuộc tính mặc định của  các đối tượng fabric.js
   */
  private CustomFrabricJs() {
    fabric.Object.prototype.transparentCorners = false;
    fabric.Object.prototype.cornerColor = "#e74c3c";
    fabric.Object.prototype.cornerStyle = "circle";
    fabric.Object.prototype.cornerSize = 10;
    fabric.Object.prototype.controls.mtr.offsetY = -50;
    fabric.Object.prototype.set({
      borderScaleFactor: 1,
    });
  }
  private Resize() {
    const fnc = () => {
      this.canvas.setDimensions({
        width: this.width,
        height: this.height,
      });
      this.canvasExport.setDimensions({
        width: this.width,
        height: this.height,
      });
    };
    fnc();
    window.addEventListener("resize", fnc);
  }
  public SetOverlayImage(url: string) {
    fabric.Image.fromURL(url, async (image: fabric.Image) => {
      await this.canvas.setOverlayImage(
        image,
        this.canvas.renderAll.bind(this.canvas),
        {
          scaleX: image.height ? this.canvas.height / image.height : 0,
          scaleY: image.height ? this.canvas.height / image.height : 0,
        }
      );
    });
  }
  public AddImage(url: string) {
    fabric.Image.fromURL(url, (image: fabric.Image) => {
      var newOptions = this.ResizeImage(image);
      image.set({
        left: newOptions.left,
        top: newOptions.top,
      });
      image.scale(newOptions.scale);
      image.clone((img: any) => {
        this.canvasExport.add(img);
      });
      this.image = image;
      this.canvas.insertAt(image, 1);
      this.canvas.setActiveObject(image);
      this.ExportImage()
    });
  }
  /**
   * It takes an image and returns an object with the image's width, height, left and top properties.
   * @param Image - fabric.Image
   * @returns An object with the properties width, height, left, and top.
   */
  private ResizeImage(Image: fabric.Image) {
    var scale: number = 300 / Number(Image.width),
      left: number = 250,
      top: number = 200;
    // =====
    return {
      left,
      top,
      scale,
    };
  }
  WatchCanvas() {
    this.canvas.on("object:moving", (e: any) => {
      this.image.clone((img: any) => {
        this.canvasExport.remove(this.canvasExport.item(0));
        this.canvasExport.add(img);
        this.ExportImage();
      });
    });
    this.canvas.on("object:scaling", (e: any) => {
      this.image.clone((img: any) => {
        this.canvasExport.remove(this.canvasExport.item(0));
        this.canvasExport.add(img);
        this.ExportImage();
      });
    });
    this.canvas.on("object:rotating", (e: any) => {
      this.image.clone((img: any) => {
        this.canvasExport.remove(this.canvasExport.item(0));
        this.canvasExport.add(img);
        this.ExportImage();
      });
    });
    this.canvas.on("object:added", (e: any) => {
      this.image.clone((img: any) => {
        this.canvasExport.remove(this.canvasExport.item(0));
        this.canvasExport.add(img);
        this.ExportImage();
      });
    });
  }
  async ExportImage() {
    if (this.canvasExport) {
      window.dispatchEvent(
        new CustomEvent("export:image", {
          detail:{
            meshName : this.meshName,
            canvas: this.canvasExport.toCanvasElement()
          },
        })
      );
    }
  }
}
