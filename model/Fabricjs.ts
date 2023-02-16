import { fabric } from "fabric";
import { DeleteControl } from "./FabricControl";
export default class Frabric {
  //thuộc tính classs

  private canvas!: fabric.Canvas;
  private canvasExport!: fabric.StaticCanvas;
  private width: number = 800;
  private height: number = 800;
  private image!: fabric.Image;
  private meshName: string;
  // --- khởi tạo cần
  constructor(
    canvas: HTMLCanvasElement,
    canvasExport: HTMLCanvasElement,
    meshName: string
  ) {
    this.meshName = meshName;
    this.CustomFrabricJs();
    this.Init(canvas, canvasExport);
  }
  /**
   * Hàm này khởi tạo các biến Canvas và CanvasExport, đặt màu nền của
   * Canvas và canvasexport, sau đó gọi các hàm thay đổi kích thước () và watchcanvas ().
   * @param {HTMLCanvasElement} canvas - HTMLCanvasElement, canvasExport: HTMLCanvasElement
   * @param {HTMLCanvasElement} canvasExport - HTMLCanvasElement - this is the canvas that I want to
   * export to a PNG.
   */
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
  /**
   * "Khi cửa sổ được thay đổi kích thước, khung vẽ được thay đổi kích thước để khớp với kích thước của cửa sổ."
   *
   * Hàm được gọi trong hàm tạo.
   */
  private Resize() {
    const fnc = () => {
      if (this.canvas)
        this.canvas.setDimensions({
          width: this.width,
          height: this.height,
        });
      if (this.canvasExport)
        this.canvasExport.setDimensions({
          width: this.width,
          height: this.height,
        });
    };
    fnc();
    window.addEventListener("resize", fnc);
  }
  /**
   * "Nếu Canvas có chiều cao, hãy đặt hình ảnh lớp phủ thành URL và mở rộng nó lên chiều cao của
   * Canvas."
   *
   * Vấn đề là hình ảnh lớp phủ không mở rộng lên chiều cao của khung vẽ
   * @param {string} url - string - URL của hình ảnh được sử dụng làm lớp phủ.
   */
  public SetOverlayImage(url: string) {
    if (this.canvas.height) var height = this.canvas.height;
    fabric.Image.fromURL(url, (image: fabric.Image) => {
      this.canvas.setOverlayImage(
        image,
        this.canvas.renderAll.bind(this.canvas),
        {
          scaleX: image.height ? height / image.height : 0,
          scaleY: image.height ? height / image.height : 0,
        }
      );
    });
  }
  /**
   *  đang thêm một hình ảnh vào một bức tranh, sau đó nhân bản nó vào một tấm bạt khác, sau đó xuất hình thứ hai
   * Tranh sơn dầu.
   *
   * Vấn đề là hình ảnh không được nhân bản vào khung vẽ thứ hai.
   * sử dụng mã sau để sao chép hình ảnh:
   *
   * image.clone((img: any) => {
   *   this.canvasExport.add(img);
   * });
   *
   * @param {string} url - string - URL của hình ảnh được thêm vào
   */
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
      this.canvas.add(image);
      this.canvas.setActiveObject(image);
      this.ExportImage();
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
  /**
   *Khi người dùng di chuyển, chia tỷ lệ, xoay hoặc thêm một đối tượng vào khung vẽ, sao chép hình ảnh và thêm nó vào
   * Canvas xuất, sau đó xuất hình ảnh.
   */
  WatchCanvas() {
    this.canvas.on("object:moving", (e: any) => {
      this.ExportImage();
    });
    this.canvas.on("object:scaling", (e: any) => {
      this.ExportImage();
    });
    this.canvas.on("object:rotating", (e: any) => {
      this.ExportImage();
    });
    this.canvas.on("object:added", (e: any) => {
      this.ExportImage();
    });
  }
  /**
   * "Khi người dùng nhấp vào nút Xuất, Canvas được chuyển đổi thành phần tử Canvas và được gửi ddi thông quan event của window
   *
   */
  async ExportImage() {
    if (this.canvasExport) {
      this.image.clone((img: any) => {
        const firstObject = this.canvasExport.item(0);
        if (firstObject instanceof fabric.Object) {
          this.canvasExport.remove(firstObject);
        }
        this.canvasExport.add(img);
        window.dispatchEvent(
          new CustomEvent("export:image", {
            detail: {
              meshName: this.meshName,
              canvas: this.canvasExport.toCanvasElement(),
            },
          })
        );
      });
    }
  }
}
