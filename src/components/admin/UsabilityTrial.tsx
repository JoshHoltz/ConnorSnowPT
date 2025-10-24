import React, { useState } from "react";
import { X } from "lucide-react";

export const TrainerFeedbackForm = ({ onClose }) => {
  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  // form stages
  const [formStageOne, setFormStageOne] = useState(true);
  const [formStageTwo, setFormStageTwo] = useState(false);
  const [formStageThree, setFormStageThree] = useState(false);
  const [formStageFour, setFormStageFour] = useState(false);

  // Client Management
  const [clientManagementEffectiveness, setClientManagementEffectiveness] = useState("");
  const [progressTracking, setProgressTracking] = useState("");
  const [managementChallenges, setManagementChallenges] = useState("");

  // Operational Efficiency
  const [workflowEfficiency, setWorkflowEfficiency] = useState("");
  const [taskCompletion, setTaskCompletion] = useState("");
  const [efficiencyImprovements, setEfficiencyImprovements] = useState("");

  // Client Retention
  const [retentionPercentage, setRetentionPercentage] = useState("");
  const [engagementLikelihood, setEngagementLikelihood] = useState("");
  const [retentionFactors, setRetentionFactors] = useState("");

  // Revenue and Market Reach
  const [revenueIncrease, setRevenueIncrease] = useState("");
  const [acquisitionContribution, setAcquisitionContribution] = useState("");
  const [businessGrowth, setBusinessGrowth] = useState("");

  const handleSubmit = async () => {
    // Validation
    if (
      !clientManagementEffectiveness ||
      !progressTracking ||
      !managementChallenges ||
      !workflowEfficiency ||
      !taskCompletion ||
      !efficiencyImprovements ||
      !retentionPercentage ||
      !engagementLikelihood ||
      !retentionFactors ||
      !revenueIncrease ||
      !acquisitionContribution ||
      !businessGrowth
    ) {
      alert("Please fill in all required fields");
      return;
    }

    setLoading(true);

    try {
      const params = new URLSearchParams();
      params.append("clientManagementEffectiveness", clientManagementEffectiveness);
      params.append("progressTracking", progressTracking);
      params.append("managementChallenges", managementChallenges);
      params.append("workflowEfficiency", workflowEfficiency);
      params.append("taskCompletion", taskCompletion);
      params.append("efficiencyImprovements", efficiencyImprovements);
      params.append("retentionPercentage", retentionPercentage);
      params.append("engagementLikelihood", engagementLikelihood);
      params.append("retentionFactors", retentionFactors);
      params.append("revenueIncrease", revenueIncrease);
      params.append("acquisitionContribution", acquisitionContribution);
      params.append("businessGrowth", businessGrowth);

      const response = await fetch(
        "https://connorsnowpt.onrender.com/api/insert-trainer-feedback",
        {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: params,
        }
      );

      if (response.ok) {
        setShowSuccess(true);
        setTimeout(() => {
          onClose();
        }, 2000);
      } else {
        const data = await response.json();
        alert(data.error || "Failed to submit feedback");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error submitting feedback");
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
              Trainer Feedback & Impact Assessment
            </h2>
            <p className="text-sm text-gray-600">
              Help us understand how the platform is working for your business
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
          Note: Your feedback is valuable and helps us improve. <br /> Your responses will be kept confidential.
        </p>

        {/* Body */}
        <div className="space-y-8 p-6">
          {/* Stage 1: Client Management */}
          {formStageOne && (
            <section className="rounded-xl border border-gray-100 bg-gray-50/70 p-5 shadow-sm">
              <div className="flex justify-between">
                <h1 className="mb-4 text-lg font-semibold text-gray-800">
                  1. Client Management
                </h1>
                <h1>1/4</h1>
              </div>

              {/* Q1 */}
              <label className="mt-2 block font-medium text-gray-700">
                How effectively does the solution help you manage your clients? (1-5)
              </label>
              <select
                value={clientManagementEffectiveness}
                onChange={(e) => setClientManagementEffectiveness(e.target.value)}
                className="mt-2 w-full rounded-lg border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select a Rating</option>
                {[...Array(5)].map((_, i) => (
                  <option key={i + 1} value={i + 1}>
                    {i + 1}
                  </option>
                ))}
              </select>

              {/* Q2 */}
              <label className="mt-4 block font-medium text-gray-700">
                How easy is it to track client progress using the platform? (1-5)
              </label>
              <select
                value={progressTracking}
                onChange={(e) => setProgressTracking(e.target.value)}
                className="mt-2 w-full rounded-lg border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select a Rating</option>
                {[...Array(5)].map((_, i) => (
                  <option key={i + 1} value={i + 1}>
                    {i + 1}
                  </option>
                ))}
              </select>

              {/* Q3 */}
              <label className="mt-4 block font-medium text-gray-700">
                What challenges, if any, have you faced while using the system for managing clients?
              </label>
              <textarea
                value={managementChallenges}
                onChange={(e) => setManagementChallenges(e.target.value)}
                className="mt-2 w-full rounded-lg border border-gray-300 p-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows={3}
                placeholder="Share your thoughts..."
              />

              <button
                onClick={() => {
                  setFormStageOne(false);
                  setFormStageTwo(true);
                }}
                className="mt-6 w-full rounded-lg bg-blue-600 py-3 font-semibold text-white shadow-md transition-all duration-200 hover:bg-blue-700 hover:shadow-lg"
              >
                Next
              </button>
            </section>
          )}

          {/* Stage 2: Operational Efficiency */}
          {formStageTwo && (
            <section className="rounded-xl border border-gray-100 bg-gray-50/70 p-5 shadow-sm">
              <div className="flex justify-between">
                <h1 className="mb-4 text-lg font-semibold text-gray-800">
                  2. Operational Efficiency
                </h1>
                <h1>2/4</h1>
              </div>

              {/* Q1 */}
              <label className="block font-medium text-gray-700">
                How much has the platform improved your daily workflow efficiency? (1-5)
              </label>
              <select
                value={workflowEfficiency}
                onChange={(e) => setWorkflowEfficiency(e.target.value)}
                className="mt-2 w-full rounded-lg border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select a Rating</option>
                {[...Array(5)].map((_, i) => (
                  <option key={i + 1} value={i + 1}>
                    {i + 1}
                  </option>
                ))}
              </select>

              {/* Q2 */}
              <label className="mt-4 block font-medium text-gray-700">
                How easy is it to complete regular tasks (scheduling, progress tracking)? (1-5)
              </label>
              <select
                value={taskCompletion}
                onChange={(e) => setTaskCompletion(e.target.value)}
                className="mt-2 w-full rounded-lg border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select a Rating</option>
                {[...Array(5)].map((_, i) => (
                  <option key={i + 1} value={i + 1}>
                    {i + 1}
                  </option>
                ))}
              </select>

              {/* Q3 */}
              <label className="mt-4 block font-medium text-gray-700">
                What areas of the system could be improved to further enhance efficiency?
              </label>
              <textarea
                value={efficiencyImprovements}
                onChange={(e) => setEfficiencyImprovements(e.target.value)}
                className="mt-2 w-full rounded-lg border border-gray-300 p-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows={3}
                placeholder="Share your thoughts..."
              />

              <div className="mt-6 flex gap-4">
                <button
                  onClick={() => {
                    setFormStageOne(true);
                    setFormStageTwo(false);
                  }}
                  className="w-full rounded-lg bg-red-600 py-3 font-semibold text-white shadow-md transition-all duration-200 hover:bg-red-700 hover:shadow-lg"
                >
                  Back
                </button>
                <button
                  onClick={() => {
                    setFormStageTwo(false);
                    setFormStageThree(true);
                  }}
                  className="w-full rounded-lg bg-blue-600 py-3 font-semibold text-white shadow-md transition-all duration-200 hover:bg-blue-700 hover:shadow-lg"
                >
                  Next
                </button>
              </div>
            </section>
          )}

          {/* Stage 3: Client Retention */}
          {formStageThree && (
            <section className="rounded-xl border border-gray-100 bg-gray-50/70 p-5 shadow-sm">
              <div className="flex justify-between">
                <h1 className="mb-4 text-lg font-semibold text-gray-800">
                  3. Client Retention
                </h1>
                <h1>3/4</h1>
              </div>

              {/* Q1 */}
              <label className="block font-medium text-gray-700">
                What percentage of your clients continue to use the platform after 30 days? (%)
              </label>
              <input
                type="number"
                min="0"
                max="100"
                value={retentionPercentage}
                onChange={(e) => setRetentionPercentage(e.target.value)}
                className="mt-2 w-full rounded-lg border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter percentage (0-100)"
              />

              {/* Q2 */}
              <label className="mt-4 block font-medium text-gray-700">
                How likely are clients to remain engaged through the platform? (1-5)
              </label>
              <select
                value={engagementLikelihood}
                onChange={(e) => setEngagementLikelihood(e.target.value)}
                className="mt-2 w-full rounded-lg border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select a Rating</option>
                {[...Array(5)].map((_, i) => (
                  <option key={i + 1} value={i + 1}>
                    {i + 1}
                  </option>
                ))}
              </select>

              {/* Q3 */}
              <label className="mt-4 block font-medium text-gray-700">
                What factors do you believe contribute to clients continuing to use the system?
              </label>
              <textarea
                value={retentionFactors}
                onChange={(e) => setRetentionFactors(e.target.value)}
                className="mt-2 w-full rounded-lg border border-gray-300 p-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows={3}
                placeholder="Share your thoughts..."
              />

              <div className="mt-6 flex gap-4">
                <button
                  onClick={() => {
                    setFormStageTwo(true);
                    setFormStageThree(false);
                  }}
                  className="w-full rounded-lg bg-red-600 py-3 font-semibold text-white shadow-md transition-all duration-200 hover:bg-red-700 hover:shadow-lg"
                >
                  Back
                </button>
                <button
                  onClick={() => {
                    setFormStageThree(false);
                    setFormStageFour(true);
                  }}
                  className="w-full rounded-lg bg-blue-600 py-3 font-semibold text-white shadow-md transition-all duration-200 hover:bg-blue-700 hover:shadow-lg"
                >
                  Next
                </button>
              </div>
            </section>
          )}

          {/* Stage 4: Revenue and Market Reach */}
          {formStageFour && (
            <section className="rounded-xl border border-gray-100 bg-gray-50/70 p-5 shadow-sm">
              <div className="flex justify-between">
                <h1 className="mb-4 text-lg font-semibold text-gray-800">
                  4. Revenue and Market Reach
                </h1>
                <h1>4/4</h1>
              </div>

              {/* Q1 */}
              <label className="block font-medium text-gray-700">
                What has been the percentage increase in total revenue since adopting the platform? (%)
              </label>
              <input
                type="number"
                value={revenueIncrease}
                onChange={(e) => setRevenueIncrease(e.target.value)}
                className="mt-2 w-full rounded-lg border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter percentage (e.g., 15)"
              />

              {/* Q2 */}
              <label className="mt-4 block font-medium text-gray-700">
                How much do you believe the platform contributes to new client acquisition? (1-5)
              </label>
              <select
                value={acquisitionContribution}
                onChange={(e) => setAcquisitionContribution(e.target.value)}
                className="mt-2 w-full rounded-lg border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select a Rating</option>
                {[...Array(5)].map((_, i) => (
                  <option key={i + 1} value={i + 1}>
                    {i + 1}
                  </option>
                ))}
              </select>

              {/* Q3 */}
              <label className="mt-4 block font-medium text-gray-700">
                How has the solution impacted your business growth and financial outcomes?
              </label>
              <textarea
                value={businessGrowth}
                onChange={(e) => setBusinessGrowth(e.target.value)}
                className="mt-2 w-full rounded-lg border border-gray-300 p-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows={3}
                placeholder="Share your thoughts..."
              />

              {/* Submit */}
              <div className="mt-6 flex gap-4">
                <button
                  onClick={() => {
                    setFormStageThree(true);
                    setFormStageFour(false);
                  }}
                  className="w-full rounded-lg bg-red-600 py-3 font-semibold text-white shadow-md transition-all duration-200 hover:bg-red-700 hover:shadow-lg"
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
          ✓ Feedback Submitted Successfully!
        </div>
      )}
    </div>
  );
};

export default TrainerFeedbackForm;