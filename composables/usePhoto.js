/**
* Nó tạo ra một biến trạng thái gọi là listphoto và trả về một đối tượng với ba thuộc tính: listphoto,
 * SetListPhoto và RemovePhoto.
 * @returns Giá trị trả về là một đối tượng có ba thuộc tính : listPhoto, SetListPhoto, and
 * RemovePhoto.
 */
export default function usePhoto() {

 /*Tạo một biến trạng thái gọi là Listphoto. */
  const listPhoto = useState("listPhoto", () => []);

/**
 * Nó mất một tải trọng và đẩy nó vào mảng listphoto.value.
 * @param payload - Dữ liệu sẽ được đẩy đến mảng listphoto.value
 */
  const SetListPhoto = (payload) => {
    listPhoto.value.push(payload);
  };
/**
 * Nó loại bỏ ảnh khỏi mảng listphoto.value tại chỉ mục được chỉ định bởi tham số chỉ mục.
 * @param index - chỉ mục của bức ảnh được xóa
 */
  const RemovePhoto = (index) => {
    listPhoto.value.splice(index, 1);
  }
  return {
    listPhoto,
    SetListPhoto,
    RemovePhoto
  };
}
