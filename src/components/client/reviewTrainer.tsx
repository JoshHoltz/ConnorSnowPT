import React from "react";
import { useState } from "react";
import { X } from "lucide-react";
import { Star } from 'lucide-react';

export const ReviewTrainer = ({ onClose }) => {
    const [rating, setRating] = useState(0);
    const [description, setDescription] = useState('');
    const [name, setName] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async () => {
      if (!name || !rating || !description) {
        alert("Please fill in all fields");
        return;
      }

      setLoading(true);

      try {
        const params = new URLSearchParams();
        params.append("name", name);
        params.append("stars", String(rating));
        params.append("description", description);
        params.append("date", new Date().toISOString());

        const response = await fetch("https://connorsnowpt.onrender.com/api/insert-client-review", {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: params
        });

        if (response.ok) {
          alert("Review submitted!");
          onClose();
        } else {
          const data = await response.json();
          alert(data.error || "Failed to submit review");
        }
      } catch (error) {
        console.error("Error:", error);
        alert("Error submitting review");
      } finally {
        setLoading(false);
      }
    };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="mx-4 max-h-[90vh] w-full max-w-md overflow-y-auto rounded-lg bg-white shadow-lg">

        <div className="flex items-center justify-between border-b border-slate-200 bg-slate-50 p-6">
          <div>
            <h2 className="text-xl font-bold text-slate-900">
              Leave me a Review!
            </h2>
            <p className="mt-1 text-slate-600">
              Want to leave me a review?
            </p>
          </div>
          <button onClick={onClose} className="text-slate-500 hover:text-slate-900">
            <X size={24} />
          </button>
        </div>

        <div className="p-6">

          <label className="block text-lg font-semibold mb-2">Name</label>
          <input 
            type="text" 
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
            className="w-full p-2 border border-gray-300 rounded-lg mb-4"
          />

          <label className="block text-lg font-semibold mb-4">Rating</label>
          <div className="flex gap-2 mb-6">
            <button type="button" onClick={() => setRating(1)}><Star size={32} className={rating >= 1 ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'} /></button>
            <button type="button" onClick={() => setRating(2)}><Star size={32} className={rating >= 2 ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'} /></button>
            <button type="button" onClick={() => setRating(3)}><Star size={32} className={rating >= 3 ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'} /></button>
            <button type="button" onClick={() => setRating(4)}><Star size={32} className={rating >= 4 ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'} /></button>
            <button type="button" onClick={() => setRating(5)}><Star size={32} className={rating >= 5 ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'} /></button>
          </div>

          <label className="block text-lg font-semibold mb-4">Your Review</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Share your experience..."
            className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none mb-4"
            rows={6}
          />

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full bg-blue-600 text-white font-semibold py-3 rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-400"
          >
            {loading ? "Submitting..." : "Submit Review"}
          </button>

          <p className="text-sm italic mt-4 text-gray-600">Note: This could be displayed on the public website!</p>

        </div>

      </div>
    </div>
  );
};