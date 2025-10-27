import { useState, useEffect } from "react";

const AccountComponent = ({ clientId }: { clientId: string | null }) => {
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [handlePlanChangePopup, setHandlePlanChangePopup] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [updating, setUpdating] = useState(false);
  const [client, setClient] = useState(null);
  const [planChange, setPlanChange] = useState('');

  const handleDelete = async () => {
    setDeleting(true);
    try {
      const res = await fetch(
        `https://connorsnowpt.onrender.com/api/delete-client/${clientId}`,
        {
          method: "DELETE",
        },
      );

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

  const handlePlanChange = async () => {
    setUpdating(true);

    try {
      const res = await fetch(
        `https://connorsnowpt.onrender.com/api/update-client-plan/${clientId}`,
        {
          method: "POST",
        },
      );

      if (res.ok) {
        setHandlePlanChangePopup(false);
      }  
    }

    catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const clientId = searchParams.get("id");

    console.log("Client ID:", clientId);

    fetch(`https://connorsnowpt.onrender.com/api/client-by-id/${clientId}`)
      .then((res) =>
        res.ok ? res.json() : Promise.reject("Failed to fetch client"),
      )
      .then(setClient)
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="p-4">
      <div className="flex flex-row gap-4">
        <button
          onClick={() => setShowDeletePopup(true)}
          className="rounded bg-red-600 px-4 py-2 text-white hover:bg-red-700"
        >
          Delete Account
        </button>

        <div className="rounded bg-green-600 px-4 py-2 text-white hover:bg-green-700">
          <button onClick={() => setHandlePlanChangePopup(true)}>
            Change Plan Type
          </button>
        </div>
      </div>

    {/* Delete Popup */}
      {showDeletePopup && (
        <div className="z-99999 fixed inset-0 flex items-center justify-center bg-black/50">
          <div className="max-w-sm rounded-lg bg-white p-6 shadow-lg">
            <h3 className="mb-2 text-lg font-bold text-gray-900">
              Delete Account
            </h3>
            <p className="mb-6 text-gray-600">
              Are you sure? This cannot be undone.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowDeletePopup(false)}
                className="flex-1 rounded bg-gray-300 px-4 py-2 text-gray-900 hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                disabled={deleting}
                className="flex-1 rounded bg-red-600 px-4 py-2 text-white hover:bg-red-700 disabled:opacity-50"
              >
                {deleting ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}


      {/* Change Plan Type Popup */}
            {handlePlanChangePopup && (
        <div className="z-99999 fixed inset-0 flex items-center justify-center bg-black/50">
          <div className="max-w-sm rounded-lg bg-white p-6 shadow-lg">
            <h3 className="mb-2 text-lg font-bold text-gray-900">
              Change Plan Type
            </h3>
            <p className="mb-6 text-gray-600 w-64">
              Update a clients plan here.
            </p>


              {/* update plan selector */}
              <label htmlFor="PlanType">Select New Plan Type:</label>
              <select className="mt-2 mb-8 w-full border border-black p-4 rounded-lg" name="PlanType" id="" onChange={(e) => setPlanChange(e.target.value)} >
                <option value="Bronze">Bronze</option>
                <option value="Silver">Silver</option>
                <option value="Gold">Gold</option>
              </select>

            <div className="flex gap-3">
              {/* cancel button */}
              <button
                onClick={() => setHandlePlanChangePopup(false)}
                className="flex-1 rounded bg-gray-300 px-4 py-2 text-gray-900 hover:bg-gray-400"
              >
                Cancel
              </button>

              {/* confirm button */}
              <button
                onClick={handlePlanChange}
                disabled={updating}
                className="flex-1 rounded bg-green-600 px-4 py-2 text-white hover:bg-green-700 disabled:opacity-50"
              >
                {updating ? "Updating..." : "Update"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AccountComponent;
