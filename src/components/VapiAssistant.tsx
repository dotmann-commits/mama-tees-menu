import { useRef, useState } from "react";
import { Mic, PhoneOff } from "lucide-react";

type Status = "idle" | "connecting" | "connected" | "error";

export function useVapi() {
  const vapiRef = useRef<any>(null);
  const [status, setStatus] = useState<Status>("idle");

  const isCalling =
    status === "connecting" || status === "connected";

  const start = async () => {
    try {
      if (!vapiRef.current) {
        const VapiModule = await import("@vapi-ai/web");
        const Vapi = VapiModule.default;

        vapiRef.current = new Vapi(
          import.meta.env.VITE_VAPI_PUBLIC_KEY
        );

        vapiRef.current.on("call-start", () => {
          setStatus("connected");
        });

        vapiRef.current.on("call-end", () => {
          setStatus("idle");
        });

        vapiRef.current.on("error", (error: unknown) => {
          console.error("Vapi error:", error);
          setStatus("error");
        });
      }

      if (isCalling) {
        vapiRef.current.stop();
        setStatus("idle");
        return;
      }

      setStatus("connecting");

      await vapiRef.current.start(
        import.meta.env.VITE_VAPI_ASSISTANT_ID,
        {
          firstMessage:
            "Hello, thank you for calling Mama Tee's Kitchen. My name is Ada. You can place your order now.",
        }
      );
    } catch (error) {
      console.error("Failed to start Vapi:", error);
      setStatus("error");
    }
  };

  const stop = () => {
    vapiRef.current?.stop();
    setStatus("idle");
  };

  return {
    start,
    stop,
    status,
    isCalling,
  };
}

export function VapiOverlay() {
  return null;
}

export default function VapiAssistant() {
  const { start, stop, isCalling } = useVapi();

  return (
    <button
      onClick={isCalling ? stop : start}
      className={`fixed bottom-6 right-6 z-50 flex items-center justify-center rounded-full w-16 h-16 shadow-lg transition-all duration-300 ${
        isCalling
          ? "bg-red-500 hover:bg-red-600"
          : "bg-orange-500 hover:bg-orange-600"
      }`}
    >
      {isCalling ? (
        <PhoneOff className="w-7 h-7 text-white" />
      ) : (
        <Mic className="w-7 h-7 text-white" />
      )}
    </button>
  );
}
