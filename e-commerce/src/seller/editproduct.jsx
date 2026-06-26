import axios from "axios";
import { X } from "lucide-react";
import { useState } from "react";

function EditProductModal({
  product,
  onClose,
  refreshProducts,
}) {
  const [formData, setFormData] =
    useState({
      name:
        product?.name || "",
      description:
        product?.description ||
        "",
      price:
        product?.price || "",
      stock:
        product?.stock || "",
      category_id:
        product?.category_id ||
        "",
      reserved_stock:
        product?.reserved_stock ||
        0,
      warehouse_location:
        product?.warehouse_location ||
        "",
    });

  const [
    selectedFile,
    setSelectedFile,
  ] = useState(null);

  const [preview, setPreview] =
    useState(
      product?.thumbnail
        ? `data:image/jpeg;base64,${product.thumbnail}`
        : null
    );

  const [loading, setLoading] =
    useState(false);

  const handleChange = (
    e
  ) => {
    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value,
    });
  };

  const handleFileChange = (
    e
  ) => {
    const file =
      e.target.files[0];

    if (!file) return;

    setSelectedFile(file);

    const reader =
      new FileReader();

    reader.onloadend =
      () => {
        setPreview(
          reader.result
        );
      };

    reader.readAsDataURL(
      file
    );
  };

  const updateProduct =
    async (e) => {
      e.preventDefault();

      try {
        setLoading(true);

        const data =
          new FormData();

        data.append(
          "name",
          formData.name
        );

        data.append(
          "description",
          formData.description
        );

        data.append(
          "price",
          formData.price
        );

        data.append(
          "stock",
          formData.stock
        );

        data.append(
          "category_id",
          formData.category_id
        );

        data.append(
          "reserved_stock",
          formData.reserved_stock
        );

        data.append(
          "warehouse_location",
          formData.warehouse_location
        );

        if (
          selectedFile
        ) {
          data.append(
            "file",
            selectedFile
          );
        }

        const res =
          await axios.put(
            `https://e-commerce-backend-l9wv.onrender.com/updateproduct/${product.id}`,
            data,
            {
              headers: {
                "Content-Type":
                  "multipart/form-data",
              },
            }
          );

        if (
          res.data.success
        ) {
          refreshProducts();
          onClose();
        }
      } catch (err) {
        console.log(err);

        alert(
          "Failed to update product"
        );
      } finally {
        setLoading(false);
      }
    };

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50 p-4">
      <div className="bg-white w-full max-w-4xl rounded-2xl overflow-hidden max-h-[95vh] overflow-y-auto">
        <div className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white p-6 flex justify-between items-center">
          <h2 className="text-2xl font-semibold">
            Edit Product
          </h2>

          <button
            onClick={
              onClose
            }
          >
            <X size={28} />
          </button>
        </div>

        <form
          onSubmit={
            updateProduct
          }
          className="p-6 flex flex-col gap-5"
        >
          <div>
            <label className="font-medium">
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
              className="w-full border rounded-lg p-3 mt-2"
              required
            />
          </div>

          <div>
            <label className="font-medium">
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
              <label className="font-medium">
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
                className="w-full border rounded-lg p-3 mt-2"
                required
              />
            </div>

            <div>
              <label className="font-medium">
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
                className="w-full border rounded-lg p-3 mt-2"
                required
              />
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <label className="font-medium">
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
                className="w-full border rounded-lg p-3 mt-2"
                required
              />
            </div>

            <div>
              <label className="font-medium">
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
              <label className="font-medium">
                Warehouse Location
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
            <label className="font-medium">
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
              src={
                preview
              }
              alt="Preview"
              className="w-full h-[350px] object-cover rounded-xl border"
            />
          )}

          <div className="flex justify-end gap-4 mt-4">
            <button
              type="button"
              onClick={
                onClose
              }
              className="px-6 py-3 rounded-lg bg-gray-200"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={
                loading
              }
              className="px-6 py-3 rounded-lg bg-purple-600 text-white"
            >
              {loading
                ? "Updating..."
                : "Update Product"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditProductModal;