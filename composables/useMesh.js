export default function useMesh() {
  const meshSelected = useState("meshSelected", () => ({
    name: "Font",
    meshName: "A",
    canvasExport: {
      x: 2,
      y: 3,
      w: 4,
      h: 5,
    },
    link: "/Women T-Shirt/overlay/front.png",
    canvas: null,
    canvas_export:null,
    image: '/img/anh.jpeg',
  }));

  const meshList = useState("meshList", () => [
    {
      name: "Font",
      meshName: "A",
      canvasExport: {
        x: 2,
        y: 3,
        w: 4,
        h: 5,
      },
      link: "/Women T-Shirt/overlay/front.png",
      canvas: null,
      canvas_export:null,
      image: '/img/anh.jpeg',
    },
    {
      name: "Back",
      meshName: "B",
      canvasExport: {
        x: 2,
        y: 3,
        w: 4,
        h: 5,
      },
      link: "/Women T-Shirt/overlay/back.png",
      canvas: null,
      canvas_export:null,
      image: null,
    },
    {
      name: "Sleeve Left",
      meshName: "C",
      canvasExport: {
        x: 2,
        y: 3,
        w: 4,
        h: 5,
      },
      link: "/Women T-Shirt/overlay/sleeve.png",
      canvas: null,
      canvas_export:null,
      image: null,
    },
    {
      name: "Sleeve Right",
      meshName: "D",
      canvasExport: {
        x: 2,
        y: 3,
        w: 4,
        h: 5,
      },
      link: "/Women T-Shirt/overlay/sleeve.png",
      canvas: null,
      canvas_export:null,
      image: null,
    },
    {
      name: "Collar",
      meshName: "E",
      canvasExport: {
        x: 2,
        y: 3,
        w: 4,
        h: 5,
      },
      link: "/Women T-Shirt/overlay/collar.png",
      canvas: null,
      canvas_export:null,
      image: null,
    },
  ]);

  function setMeshSelected(payload) {
    meshSelected.value = payload;
  }
  function setMeshList(payload) {
    meshList.value = [...meshList.value, payload];
  }
  return {
    meshSelected,
    setMeshSelected,
    meshList,
    setMeshList,
  };
}
