export default function useLayer() {
  const layers = useState("layers", () => [
    {
      meshName: "A",
      images: [],
      name: "Font",
    },
  ]);
  const AddLayer = (payload) => {
    const { meshName, link,name } = payload;
    const index = layers.value.findIndex((item) => item.meshName == meshName);
    console.log("📢📢 >>> file: useLayer.js:11 >>> AddLayer >>> index", index);
    if (index != -1) {
      layers.value[index].images.push(link);
    } else {
      layers.value = [
        ...layers.value,
        {
          meshName: meshName,
          images: [link],
          name:name
        },
      ];
    }
  };
  const GetLayer = (meshName) => {
    return layers.value.find((item) => item.meshName == meshName);
  };

  const RemoveLayer = (payload) => {
    const { meshName, link } = payload;
    const index = layers.value.findIndex((item) => item.meshName == meshName);
    const img_index = layers.value[index].images.findIndex(
      (item) => (item = link)
    );
    layers.value[index].images.splice(img_index, 1);
  };
  return {
    layers,
    AddLayer,
    GetLayer,
    RemoveLayer,
  };
}
