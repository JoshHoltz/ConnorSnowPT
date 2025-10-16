import React, { useState } from "react";
import { X } from "lucide-react";

export const AddClient = ({ onClose, onSuccess }: { onClose: () => void; onSuccess: () => void }) => {
  const [formData, setFormData] = useState({
    client_firstname: "",
    client_lastname: "",
    client_preferred_contact: "",
    client_plan_type: "",
    client_goals: "",
    user_firstname: "",
    user_lastname: "",
    user_username: "",
    user_password: "",
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
        "https://connorsnowpt.onrender.com/api/create-client",
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
        setError(data.error || "Failed to create client");
      }
    } catch (err) {
      setError("Error creating client");
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
          <h2 className="text-xl font-bold text-slate-900">Add New Client</h2>
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
              First Name
            </label>
            <input
              type="text"
              name="client_firstname"
              value={formData.client_firstname}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-blue-900 focus:ring-2 focus:ring-blue-900"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-900 mb-1">
              Last Name
            </label>
            <input
              type="text"
              name="client_lastname"
              value={formData.client_lastname}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-blue-900 focus:ring-2 focus:ring-blue-900"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-900 mb-1">
              Preferred Contact
            </label>
            <input
              type="text"
              name="client_preferred_contact"
              value={formData.client_preferred_contact}
              onChange={handleChange}
              placeholder="Email or phone"
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-blue-900 focus:ring-2 focus:ring-blue-900"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-900 mb-1">
              Plan Type
            </label>
            <select
              name="client_plan_type"
              value={formData.client_plan_type}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-blue-900 focus:ring-2 focus:ring-blue-900"
              required
            >
              <option value="">Select a plan</option>
              <option value="Basic">Basic</option>
              <option value="Premium">Premium</option>
              <option value="Elite">Elite</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-900 mb-1">
              Client Goals
            </label>
            <textarea
              name="client_goals"
              value={formData.client_goals}
              onChange={handleChange}
              placeholder="Enter client goals..."
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-blue-900 focus:ring-2 focus:ring-blue-900 resize-none"
              rows={3}
            />
          </div>

          <hr className="my-6" />

          <div>
            <label className="block text-sm font-medium text-slate-900 mb-1">
              Username
            </label>
            <input
              type="text"
              name="user_username"
              value={formData.user_username}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-blue-900 focus:ring-2 focus:ring-blue-900"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-900 mb-1">
              Password
            </label>
            <input
              type="password"
              name="user_password"
              value={formData.user_password}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-blue-900 focus:ring-2 focus:ring-blue-900"
              required
            />
          </div>

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