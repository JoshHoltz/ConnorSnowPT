import React from "react";

function getToken() {
  const user_id = sessionStorage.getItem("user_id");
  if (user_id) return { user_id };
  return null;
}

export const BodyInputs = () => {
  return (
    <div className="w-full rounded bg-white p-4 shadow">
      <h1 className="font-bold">Update Body Measurements</h1>

      <form onSubmit="" className="mt-4">
        <input type="hidden" name="client_id" value={getToken()?.user_id} />

        <input
          type="hidden"
          name="submitted_date"
          value={new Date().toISOString().split("T")[0]} // YYYY-MM-DD
        />

        <div className="mb-4">
          <label htmlFor="body_weight">Body Weight Current:</label>
          <input
            type="number"
            name="body_weight"
            className="w-full rounded border px-2 py-1"
            placeholder="Enter your current body weight"
            required
          />
        </div>

        <button
          type="submit"
          className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
        >
          Submit
        </button>
      </form>
    </div>
  );
};
