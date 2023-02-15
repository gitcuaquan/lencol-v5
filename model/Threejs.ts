import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

export default class ThreeJS {
  private scene: THREE.Scene = new THREE.Scene();
  private camera: THREE.PerspectiveCamera = new THREE.PerspectiveCamera();
  private renderer: THREE.WebGLRenderer = new THREE.WebGLRenderer();
  private loader: GLTFLoader = new GLTFLoader();
  private light: THREE.HemisphereLight = new THREE.HemisphereLight();
  private control: OrbitControls = new OrbitControls(
    this.camera,
    this.renderer.domElement
  );
  private textureLoader: THREE.TextureLoader = new THREE.TextureLoader();
  private ratio: number = 1;
  private meshSelector: THREE.Mesh = new THREE.Mesh();
  constructor(canvas: HTMLCanvasElement, wapper: HTMLCanvasElement) {
    this.init(canvas);
    this.Resize(wapper);
    const animate = () => {
      requestAnimationFrame(animate);
      this.renderer.render(this.scene, this.camera);
      this.control.update();
      // console.log(this.camera.position);
      // console.log(this.camera.rotation);
    };
    animate();
  }
  /**
   * Chức năng này tạo ra một cảnh mới, một máy ảnh mới, thêm máy ảnh vào cảnh, tạo ra một cảnh mới
   * Kết xuất, đặt kích thước của trình kết xuất và hiển thị cảnh bằng máy ảnh.
   * @param {HTMLCanvasElement} canvas - Yếu tố canvas mà bạn muốn làm cho cảnh.
   */
  private init(canvas: HTMLCanvasElement) {
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(50.0, this.ratio, 0.01, 10000);
    this.camera.position.set(0.649,0.079,1.508);
    this.scene.add(this.camera);
    // this.Addlight([0, 10, 4]);
    // this.Addlight([0, 0, -3]);
    // this.Addlight([0, -5, 7.5]);
    var light = new THREE.HemisphereLight(0xffffff, 0xe8e5fe, 1);
    this.light.position.set(0, 10, 0);
    this.scene.add(light);

    this.renderer = new THREE.WebGLRenderer({
      canvas: canvas,
      preserveDrawingBuffer: true,
    });

    this.renderer.render(this.scene, this.camera);
    this.renderer.setClearColor(0xd1c4ff, 1);
    this.control = new OrbitControls(this.camera, this.renderer.domElement);
    this.control.enableDamping = true;
    this.loader = new GLTFLoader();
    this.textureLoader = new THREE.TextureLoader();
  }
  private Addlight(position: Array<number>) {
    var light = new THREE.SpotLight(0xffffff, 0.9);
    light.position.set(position[0], position[1], position[2]);
    light.castShadow = true;
    this.scene.add(light);
  }
  public AddTexture(canvas: HTMLCanvasElement) {
    const texture = new THREE.Texture(canvas);
    texture.flipY = false;
    texture.needsUpdate = true;
    var material = new THREE.MeshBasicMaterial({ map: texture });
    this.meshSelector.material = material;
  }
  /**
   * Nó tải mô hình 3D từ một liên kết, sau đó nó nhận được tất cả các mắt lưới từ mô hình, và sau đó nó áp dụng một
   * Kết cấu cho lưới với tên "A".
   *
   * Vấn đề là kết cấu không được áp dụng cho lưới.
   *
   * Tôi đã cố gắng áp dụng kết cấu vào lưới theo những cách sau:
   *
   * 1.
   *
   * mesh.material.map = texture;
   *
   * 2.
   *
   * mesh.material.map = new THREE.TextureLoader().load('/img/anh.jpeg');
   *
   * 3.
   *
   * mesh.material.map = new THREE.TextureLoader().load('/img/anh.jpeg', function (texture) {
   *   mesh.material.map = texture;
   * });
   *
   * 4.
   *
   * mesh.material.map = new
   * @param {string} link - liên kết đến mô hình 3D
   */
  AddModel3D(link: string) {
    this.loader.load(link, (glb: any) => {
      this.scene.add(glb.scene);
      const meshes = this.getAllMeshes(glb.scene);
      for (var i = 0; i < meshes.length; i++) {
        var mesh = meshes[i];
        if (mesh.name == "A") {
          this.meshSelector = mesh;
        }
      }
    });
  }
  /**
   * three.Object3D và trả về một mảng của tất cả ba.
   * @param {any} root - Nút gốc của cảnh.
   * @returns Một mảng lưới.
   */
  private getAllMeshes(root: any): Array<THREE.Mesh> {
    var meshes: Array<THREE.Mesh> = [];
    root.traverse(function (node: any) {
      if (node instanceof THREE.Mesh) {
        meshes.push(node);
      }
    });
    return meshes;
  }
  /**
   * "Hàm được gọi khi cửa sổ được thay đổi kích thước và nó đặt kích thước của trình kết xuất theo kích thước
   * của phần tử Canvas, và sau đó gọi hàm UpdateCamera. "
   *
   * Hàm UpdateCamera được xác định như sau:
   * @param {HTMLCanvasElement} wapper - HTMLCanvasElement =&gt;yếu tố canvas mà bajs
   * Cảnh được hiển thị thành
   */
  private Resize(wapper: HTMLCanvasElement) {
    const resizer = () => {
      this.ratio = wapper.offsetWidth / wapper.offsetHeight;
      this.renderer.setSize(wapper.offsetWidth, wapper.offsetHeight);
      this.UpdateCamera();
    };
    resizer();
    window.addEventListener("resize", resizer);
  }
  /**
   * Hàm `UpdateCamera ()` Cập nhật tỷ lệ khung hình của camera để phù hợp với tỷ lệ khung hình của
   * Tranh sơn dầu.
   */
  private UpdateCamera() {
    this.camera.aspect = this.ratio;
    this.camera.updateProjectionMatrix();
  }
  public setCamera(position: Array<number>) {
    console.log(
      "📢📢 >>> file: Threejs.ts:151 >>> ThreeJS >>> setCamera >>> position",
      position
    );
    if (position) {
      this.camera.position.set(position[0], position[1], position[2]);
    }
  }
  public setRotation(rotation: Array<number>) {
    console.log(
      "📢📢 >>> file: Threejs.ts:158 >>> ThreeJS >>> setRotation >>> rotation",
      rotation
    );
    if (rotation) {
      this.camera.rotation.set(rotation[0], rotation[1], rotation[2]);
    }
  }
  /**
   * Image3dTo2d
   */
  public Image3dTo2d(position: Array<number>, rotation: Array<number>) {
    var camera1 = new THREE.PerspectiveCamera(40, this.ratio, 0.1, 100000);
    if (position) {
      camera1.position.set(position[0], position[1], position[2]);
    }
    if (rotation) {
      camera1.rotation.set(rotation[0], rotation[1], rotation[2]);
    }
    // this.scene.add(camera1);
    this.renderer.render(this.scene, camera1);
    return this.renderer.domElement.toDataURL();
  }
}
