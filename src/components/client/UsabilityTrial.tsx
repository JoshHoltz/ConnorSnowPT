import React, { useState } from "react";
import { X } from "lucide-react";

export const UseabilityTrial = ({ onClose }) => {
  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  // form stages
  const [formStageOne, setFormStageOne] = useState(true);
  const [formStageTwo, setFormStageTwo] = useState(false);
  const [formStageThree, setFormStageThree] = useState(false);

  // Client fitness progression
  const [fitnessImproved, setFitnessImproved] = useState("");
  const [fitnessDetails, setFitnessDetails] = useState("");
  const [fitnessScale, setFitnessScale] = useState("");

  // Client usability
  const [usabilityScore, setUsabilityScore] = useState("");
  const [progressTracking, setProgressTracking] = useState("");
  const [fitnessProgressText, setFitnessProgressText] = useState("");

  // Motivation & Encouragement Hypothesis
  const [progressAnalyticsMotivation, setProgressAnalyticsMotivation] =
    useState("");
  const [appusability, setAppusability] = useState("");
  const [aiAnalyticsThoughts, setAIAnalyticsThoughts] = useState("");

  const handleSubmit = async () => {
    if (
      !fitnessImproved ||
      !fitnessScale ||
      !usabilityScore ||
      !progressTracking ||
      !fitnessProgressText ||
      !progressAnalyticsMotivation ||
      !appusability ||
      !aiAnalyticsThoughts
    ) {
      alert("Please fill in all required fields");
      return;
    }

    setLoading(true);

    try {
      const params = new URLSearchParams();
      params.append("fitnessImproved", fitnessImproved);
      params.append("fitnessDetails", fitnessDetails);
      params.append("fitnessScale", fitnessScale);
      params.append("usabilityScore", usabilityScore);
      params.append("progressTracking", progressTracking);
      params.append("fitnessProgressText", fitnessProgressText);
      params.append("progressAnalyticsMotivation", progressAnalyticsMotivation);
      params.append("appusability", appusability);
      params.append("aiAnalyticsThoughts", aiAnalyticsThoughts);

      const response = await fetch(
        "https://connorsnowpt.onrender.com/api/insert-client-hypothesis",
        {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: params,
        },
      );

      if (response.ok) {
        setShowSuccess(true);
        setTimeout(() => {
          onClose();
        }, 2000);
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
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
      onClick={onClose}
    >
      <div
        className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white shadow-2xl transition-all duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-200 bg-gray-50 px-6 py-4">
          <div>
            <h2 className="text-xl font-bold text-gray-900">
              Website Feedback
            </h2>
            <p className="text-sm text-gray-600">
              Please share your experience and insights with us!
            </p>
          </div>
          <button
            onClick={onClose}
            className="rounded-full p-1.5 text-gray-500 transition hover:bg-gray-200 hover:text-gray-800"
          >
            <X size={22} />
          </button>
        </div>

        <p className="px-6 pt-3 text-sm italic text-gray-500">
          Note: Your feedback will remain anonymous. <br /> This will help your
          trainer understand areas of improvement for the website.
        </p>

        {/* Body */}
        <div className="space-y-8 p-6">
          {/* Client Fitness Progression Hypothesis */}

          {formStageOne && (
            <>
              <section className="rounded-xl border border-gray-100 bg-gray-50/70 p-5 shadow-sm">
                <div className="flex justify-between">
                  <h1 className="mb-4 text-lg font-semibold text-gray-800">
                    Client Fitness Progression Hypothesis
                  </h1>

                  <h1>1/3</h1>
                </div>

                {/* Q1 */}
                <label className="mt-2 block font-medium text-gray-700">
                  Has your overall fitness levels increased?
                </label>
                <select
                  id="usabilityScore"
                  value={fitnessImproved}
                  onChange={(e) => setFitnessImproved(e.target.value)}
                  className="mt-2 w-full rounded-lg border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select a Option</option>
                  <option>Yes</option>
                  <option>No</option>
                </select>

                {/* Q2 */}
                {fitnessImproved === "Yes" && (
                  <div className="mb-4">
                    <label className="block font-medium text-gray-700">
                      If so, please provide more details:
                    </label>
                    <textarea
                      value={fitnessDetails}
                      onChange={(e) => setFitnessDetails(e.target.value)}
                      className="mt-2 w-full rounded-lg border border-gray-300 p-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      rows={3}
                      placeholder="Describe how your fitness has improved..."
                    />
                  </div>
                )}

                {/* Q3 */}
                <div className="mt-2">
                  <label
                    htmlFor="fitnessIncrease"
                    className="block font-medium text-gray-700"
                  >
                    Do you feel your physical fitness has increased since using
                    the app? (1-10)
                  </label>
                  <select
                    id="fitnessIncrease"
                    value={fitnessScale}
                    onChange={(e) => setFitnessScale(e.target.value)}
                    className="mt-2 w-full rounded-lg border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select a Rating</option>
                    {[...Array(10)].map((_, i) => (
                      <option key={i + 1} value={i + 1}>
                        {i + 1}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Q4 */}
                <div>
                  <label className="mt-2 block font-medium text-gray-700">
                    Has the app influenced your fitness habits or motivation to
                    exercise?
                  </label>
                  <textarea
                    placeholder="Share your thoughts..."
                    className="mt-2 w-full rounded-lg border border-gray-300 p-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    rows={3}
                  />
                </div>

                <button
                  onClick={() => {
                    setFormStageOne(false);
                    setFormStageTwo(true);
                  }}
                  className="w-full rounded-lg bg-blue-600 py-3 font-semibold text-white shadow-md transition-all duration-200 hover:bg-blue-700 hover:shadow-lg disabled:bg-gray-400"
                >
                  Next
                </button>
              </section>
            </>
          )}

          {/* Usability & Depth Hypothesis */}

          {formStageTwo && (
            <section className="rounded-xl border border-gray-100 bg-gray-50/70 p-5 shadow-sm">
              <div className="flex justify-between">
                <h1 className="mb-4 text-lg font-semibold text-gray-800">
                  System Usability & Depth Hypothesis
                </h1>

                <h1>2/3</h1>
              </div>

              <label className="block font-medium text-gray-700">
                What score would you give the app for usability (1-10)?
              </label>
              <select
                id="usabilityScore"
                value={usabilityScore}
                onChange={(e) => setUsabilityScore(e.target.value)}
                className="mt-2 w-full rounded-lg border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select a Rating</option>
                {[...Array(10)].map((_, i) => (
                  <option key={i + 1} value={i + 1}>
                    {i + 1}
                  </option>
                ))}
              </select>

              <label className="mt-2 block font-medium text-gray-700">
                To what extent do you agree that the features help you track
                progress?
              </label>
              <select
                id="usabilityScore"
                value={progressTracking}
                onChange={(e) => setProgressTracking(e.target.value)}
                className="mt-2 w-full rounded-lg border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select a Option</option>
                <option>Strongly Disagree</option>
                <option>Disagree</option>
                <option>Agree</option>
                <option>Strongly Agree</option>
              </select>

              <label
                htmlFor=""
                className="mt-2 block font-medium text-gray-700"
              >
                Which parts of the app best support your fitness progress?
              </label>
              <textarea
                value={fitnessProgressText}
                placeholder="Share your thoughts..."
                className="mt-2 w-full rounded-lg border border-gray-300 p-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows={3}
                onChange={(e) => setFitnessProgressText(e.target.value)}
              />

              <div className="flex gap-4">
                <button
                  onClick={() => {
                    setFormStageOne(true);
                    setFormStageTwo(false);
                  }}
                  className="w-full rounded-lg bg-red-600 py-3 font-semibold text-white shadow-md transition-all duration-200 hover:bg-red-700 hover:shadow-lg disabled:bg-gray-400"
                >
                  Back
                </button>

                <button
                  onClick={() => {
                    setFormStageTwo(false);
                    setFormStageThree(true);
                  }}
                  className="w-full rounded-lg bg-blue-600 py-3 font-semibold text-white shadow-md transition-all duration-200 hover:bg-blue-700 hover:shadow-lg disabled:bg-gray-400"
                >
                  Next
                </button>
              </div>
            </section>
          )}

          {/* Motivation & Encouragement Hypothesis */}
          {formStageThree && (
            <section className="rounded-xl border border-gray-100 bg-gray-50/70 p-5 shadow-sm">
              <div className="flex justify-between">
                <h1 className="mb-4 text-lg font-semibold text-gray-800">
                  Motivation & Encouragement Hypothesis
                </h1>

                <h1>3/3</h1>
              </div>

              <label
                htmlFor="fitnessIncrease"
                className="block font-medium text-gray-700"
              >
                Do you feel motiviated after viewing your progress analytics and
                charts? (1-10)
              </label>
              <select
                id="fitnessIncrease"
                value={progressAnalyticsMotivation}
                onChange={(e) => setProgressAnalyticsMotivation(e.target.value)}
                className="mt-2 w-full rounded-lg border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select a Rating</option>
                {[...Array(10)].map((_, i) => (
                  <option key={i + 1} value={i + 1}>
                    {i + 1}
                  </option>
                ))}
              </select>

              <label
                htmlFor="fitnessIncrease"
                className="mt-2 block font-medium text-gray-700"
              >
                How likely are you to keep using the app's features? (1-10)
              </label>
              <select
                id="fitnessIncrease"
                value={appusability}
                onChange={(e) => setAppusability(e.target.value)}
                className="mt-2 w-full rounded-lg border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select a Rating</option>
                {[...Array(10)].map((_, i) => (
                  <option key={i + 1} value={i + 1}>
                    {i + 1}
                  </option>
                ))}
              </select>

              <label
                htmlFor=""
                className="mt-2 block font-medium text-gray-700"
              >
                How do the AI analytics and visual graphs make you feel about
                your achivements?
              </label>
              <textarea
                value={aiAnalyticsThoughts}
                placeholder="Share your thoughts..."
                className="mt-2 w-full rounded-lg border border-gray-300 p-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows={3}
                onChange={(e) => setAIAnalyticsThoughts(e.target.value)}
              />

              {/* Submit */}
              <div className="flex gap-4">
                <button
                  onClick={() => {
                    setFormStageTwo(true);
                    setFormStageThree(false);
                  }}
                  className="w-full rounded-lg bg-red-600 py-3 font-semibold text-white shadow-md transition-all duration-200 hover:bg-red-700 hover:shadow-lg disabled:bg-gray-400"
                >
                  Back
                </button>

                <button
                  onClick={handleSubmit}
                  disabled={loading}
                  className="w-full rounded-lg bg-blue-600 py-3 font-semibold text-white shadow-md transition-all duration-200 hover:bg-blue-700 hover:shadow-lg disabled:bg-gray-400"
                >
                  {loading ? "Submitting..." : "Submit Feedback"}
                </button>
              </div>
            </section>
          )}
        </div>
      </div>
      {showSuccess && (
        <div className="fixed right-4 top-4 rounded-lg bg-green-500/80 px-6 py-3 text-white shadow-lg">
          ✓ Form Submitted Successfully!
        </div>
      )}
    </div>
  );
};
