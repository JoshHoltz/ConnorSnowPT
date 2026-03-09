import React, { useState } from "react";
import { X, PlusCircle, Trash2 } from "lucide-react";

export const AddPremadeWorkoutForm = ({ onClose, onSave, saving }) => {
  const [workoutName, setWorkoutName] = useState("");
  const [exercises, setExercises] = useState([]);

  const handleAddExercise = () => {
    setExercises([
      ...exercises,
      { name: "", sets: "", reps: "", howTo: "" }
    ]);
  };

  const handleRemoveExercise = (index) => {
    const updated = [...exercises];
    updated.splice(index, 1);
    setExercises(updated);
  };

  const handleChange = (index, field, value) => {
    const updated = [...exercises];
    updated[index][field] = value;
    setExercises(updated);
  };

  const handleSubmit = () => {
    if (!workoutName.trim()) {
      alert("Please enter a workout name");
      return;
    }

    onSave({
      name: workoutName,
      exercises
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex justify-center items-center p-4">
      <div className="bg-white max-w-3xl w-full rounded-2xl shadow-xl p-6">

        <div className="flex justify-between mb-6">
          <h2 className="text-xl font-bold">Add Premade Workout</h2>
          <button onClick={onClose}>
            <X size={22} />
          </button>
        </div>

        <label className="block mb-2 font-medium">Workout Name</label>
        <input
          type="text"
          value={workoutName}
          onChange={(e) => setWorkoutName(e.target.value)}
          className="w-full border p-2 rounded mb-4"
        />

        <div className="flex justify-between mb-3">
          <h3 className="font-semibold">Exercises</h3>
          <button
            onClick={handleAddExercise}
            className="flex items-center gap-2 text-blue-600"
          >
            <PlusCircle size={18} /> Add
          </button>
        </div>

        {exercises.map((exercise, index) => (
          <div key={index} className="border p-3 rounded mb-3">

            <div className="flex justify-between mb-2">
              <strong>Exercise {index + 1}</strong>
              <button onClick={() => handleRemoveExercise(index)}>
                <Trash2 size={16} />
              </button>
            </div>

            <input
              placeholder="Exercise name"
              value={exercise.name}
              onChange={(e) =>
                handleChange(index, "name", e.target.value)
              }
              className="w-full border p-2 rounded mb-2"
            />

            <div className="flex gap-2">
              <input
                placeholder="Sets"
                value={exercise.sets}
                onChange={(e) =>
                  handleChange(index, "sets", e.target.value)
                }
                className="w-full border p-2 rounded"
              />

              <input
                placeholder="Reps"
                value={exercise.reps}
                onChange={(e) =>
                  handleChange(index, "reps", e.target.value)
                }
                className="w-full border p-2 rounded"
              />
            </div>

          </div>
        ))}

        <div className="flex gap-3 mt-4">
          <button
            onClick={onClose}
            className="w-full bg-gray-400 text-white p-3 rounded"
          >
            Cancel
          </button>

          <button
            onClick={handleSubmit}
            disabled={saving}
            className="w-full bg-blue-600 text-white p-3 rounded"
          >
            {saving ? "Saving..." : "Save"}
          </button>
        </div>

      </div>
    </div>
  );
};
