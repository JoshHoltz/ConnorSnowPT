import React, { useEffect } from "react";

export const VoiceChat = ({ clientId }: { clientId: string | null }) => {
  useEffect(() => {
    if (!clientId) return;
    
    fetch(`https://connorsnowpt.onrender.com/api/voice-agent/${clientId}/start`, {
      method: "POST"
    })
      .then(res => res.json())
      .catch(console.error);
  }, [clientId]);

  return (
    <div>
      {React.createElement("elevenlabs-convai", { 
        "agent-id": "agent_1501kdn3q7eaersbm021gktm7g61"
      })}
    </div>
  );
};