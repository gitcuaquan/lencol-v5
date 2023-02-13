export default function useMesh() {
  const meshSelected = useState("meshSelected", () => {});
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
    },
    {
      name: "Sleeve left",
      meshName: "C",
      canvasExport: {
        x: 2,
        y: 3,
        w: 4,
        h: 5,
      },
      link: "/Women T-Shirt/overlay/sleeve.png",
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
