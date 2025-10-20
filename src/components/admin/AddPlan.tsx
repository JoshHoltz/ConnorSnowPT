import React, { useState } from "react";
import { X } from "lucide-react";

export const AddPlan = ({ onClose, onSuccess }: { onClose: () => void; onSuccess: () => void }) => {
  const [formData, setFormData] = useState({
    plan_name: "",
    plan_description: "",
    plan_pages: "",
    plan_price: "",
    plan_stripe_link: "",
    plan_image: ""
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        "https://connorsnowpt.onrender.com/api/create-plan",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );

      if (response.ok) {
        onSuccess();
        onClose();
      } else {
        const data = await response.json();
        setError(data.error || "Failed to create plan");
      }
    } catch (err) {
      setError("Error creating plan");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg max-w-md w-full mx-4 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-slate-200">
          <h2 className="text-xl font-bold text-slate-900">Create Plan</h2>
          <button onClick={onClose} className="text-slate-500 hover:text-slate-900">
            <X size={24} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
              {error}
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-slate-900 mb-1">
              Plan Name
            </label>
            <input
              type="text"
              name="plan_name"
              value={formData.plan_name}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-blue-900 focus:ring-2 focus:ring-blue-900"
              required
              placeholder="Get Fit Before Summer!"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-900 mb-1">
              Plan Description
            </label>
            <textarea
              type="text"
              name="plan_description"
              value={formData.plan_description}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-blue-900 focus:ring-2 focus:ring-blue-900"
              required
              placeholder="Wanting to increase your bench, this is how..."
              rows={3}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-900 mb-1">
              Number of Pages
            </label>
            <input
              type="text"
              name="plan_pages"
              value={formData.plan_pages}
              onChange={handleChange}
              placeholder="12"
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-blue-900 focus:ring-2 focus:ring-blue-900"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-900 mb-1">
              Plan Price
            </label>
            <input
              name="plan_price"
              value={formData.plan_price}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-blue-900 focus:ring-2 focus:ring-blue-900"
              required
              placeholder="£9.99"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-900 mb-1">
              Stripe Link
            </label>
            <input
              name="plan_stripe_link"
              value={formData.plan_stripe_link}
              onChange={handleChange}
              placeholder="Enter stripe link e.g. https://stripe..."
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-blue-900 focus:ring-2 focus:ring-blue-900 resize-none"
            />
          </div>

            <div>
            <label className="block text-sm font-medium text-slate-900 mb-1">
              Plan Image
            </label>
            <input
              name="plan_image"
              type="file"
              value={formData.plan_image}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-blue-900 focus:ring-2 focus:ring-blue-900 resize-none"
            />
          </div>

          <hr className="my-6" />
          <p className="italic text-sm">Remember To Add the PDF File on Stripe!</p>

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-slate-300 text-slate-900 rounded-lg hover:bg-slate-50 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 px-4 py-2 bg-blue-900 text-white rounded-lg hover:bg-blue-950 transition disabled:opacity-50"
            >
              {loading ? "Creating..." : "Create Client"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};