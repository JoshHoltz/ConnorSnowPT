import { useState } from "react";

const AccountComponent = ({ clientId }: { clientId: string | null }) => {
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const handleDelete = async () => {
    setDeleting(true);
    try {
      const res = await fetch(`https://connorsnowpt.onrender.com/api/delete-client/${clientId}`, {
        method: "DELETE",
      });

      if (res.ok) {
        setShowDeletePopup(false);
        window.location.href = "/admin/AdminClients";
      } else {
        setShowDeletePopup(false);
      }
    } catch (error) {
      console.error(error);
      setShowDeletePopup(false);
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="p-4">
      <button
        onClick={() => setShowDeletePopup(true)}
        className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
      >
        Delete Account
      </button>

      {showDeletePopup && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-99999">
          <div className="bg-white rounded-lg p-6 shadow-lg max-w-sm">
            <h3 className="text-lg font-bold text-gray-900 mb-2">Delete Account</h3>
            <p className="text-gray-600 mb-6">Are you sure? This cannot be undone.</p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowDeletePopup(false)}
                className="flex-1 bg-gray-300 text-gray-900 px-4 py-2 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                disabled={deleting}
                className="flex-1 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 disabled:opacity-50"
              >
                {deleting ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AccountComponent;