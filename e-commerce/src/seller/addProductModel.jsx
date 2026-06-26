import axios from "axios";
import { X } from "lucide-react";
import { useState } from "react";

function AddProductModal({
  onClose,
  refreshProducts,
}) {
  const user = JSON.parse(
    localStorage.getItem("user") || "{}"
  );

  const [formData, setFormData] = useState({
    seller_id: user?.seller_id || "",
    category_id: "",
    name: "",
    description: "",
    price: "",
    stock: "",
    reserved_stock: 0,
    warehouse_location: "",
  });

  const [selectedFile, setSelectedFile] =
    useState(null);

  const [preview, setPreview] =
    useState(null);

  const [loading, setLoading] =
    useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value,
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    setSelectedFile(file);

    const reader =
      new FileReader();

    reader.onloadend = () => {
      setPreview(reader.result);
    };

    reader.readAsDataURL(file);
  };

  const addProduct = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const data =
        new FormData();

      Object.keys(formData).forEach(
        (key) => {
          data.append(
            key,
            formData[key]
          );
        }
      );

      if (selectedFile) {
        data.append(
          "file",
          selectedFile
        );
      }

      const res =
        await axios.post(
          "https://e-commerce-backend-l9wv.onrender.com/addproduct",
          data,
          {
            headers: {
              "Content-Type":
                "multipart/form-data",
            },
          }
        );

      if (res.data.success) {
        refreshProducts();
        onClose();
      }
    } catch (err) {
      console.log(err);
      alert(
        "Failed to add product"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50 p-4">
      <div className="bg-white w-full max-w-4xl rounded-2xl overflow-hidden max-h-[95vh] overflow-y-auto">
        <div className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white p-6 flex justify-between items-center">
          <h2 className="text-2xl font-semibold">
            Add Product
          </h2>

          <button
            onClick={onClose}
          >
            <X size={28} />
          </button>
        </div>

        <form
          onSubmit={addProduct}
          className="p-6 flex flex-col gap-5"
        >
          <div>
            <label>
              Product Name
            </label>

            <input
              type="text"
              name="name"
              value={
                formData.name
              }
              onChange={
                handleChange
              }
              required
              className="w-full border rounded-lg p-3 mt-2"
            />
          </div>

          <div>
            <label>
              Description
            </label>

            <textarea
              rows="5"
              name="description"
              value={
                formData.description
              }
              onChange={
                handleChange
              }
              className="w-full border rounded-lg p-3 mt-2"
            />
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label>
                Price
              </label>

              <input
                type="number"
                name="price"
                value={
                  formData.price
                }
                onChange={
                  handleChange
                }
                required
                className="w-full border rounded-lg p-3 mt-2"
              />
            </div>

            <div>
              <label>
                Category ID
              </label>

              <input
                type="number"
                name="category_id"
                value={
                  formData.category_id
                }
                onChange={
                  handleChange
                }
                required
                className="w-full border rounded-lg p-3 mt-2"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <label>
                Stock
              </label>

              <input
                type="number"
                name="stock"
                value={
                  formData.stock
                }
                onChange={
                  handleChange
                }
                required
                className="w-full border rounded-lg p-3 mt-2"
              />
            </div>

            <div>
              <label>
                Reserved Stock
              </label>

              <input
                type="number"
                name="reserved_stock"
                value={
                  formData.reserved_stock
                }
                onChange={
                  handleChange
                }
                className="w-full border rounded-lg p-3 mt-2"
              />
            </div>

            <div>
              <label>
                Warehouse
              </label>

              <input
                type="text"
                name="warehouse_location"
                value={
                  formData.warehouse_location
                }
                onChange={
                  handleChange
                }
                className="w-full border rounded-lg p-3 mt-2"
              />
            </div>
          </div>

          <div>
            <label>
              Product Image
            </label>

            <input
              type="file"
              accept="image/*"
              onChange={
                handleFileChange
              }
              className="w-full border rounded-lg p-3 mt-2"
            />
          </div>

          {preview && (
            <img
              src={preview}
              alt="preview"
              className="w-full h-[350px] object-cover rounded-xl border"
            />
          )}

          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-3 bg-gray-200 rounded-lg"
            >
              Cancel
            </button>

            <button
              disabled={
                loading
              }
              type="submit"
              className="px-6 py-3 bg-purple-600 text-white rounded-lg"
            >
              {loading
                ? "Adding..."
                : "Add Product"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddProductModal;