import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import Loader from "./Loader";

export default function InputForm() {
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleGenerate = async () => {
    if (!username.trim()) {
      toast.error("Username can't be empty");
      return;
    }

    setLoading(true);
    const toastId = toast.loading("Generating persona...");

    try {
      const url = `http://localhost:8000/generate?profile_url=https://www.reddit.com/r/${username}/`;
      const res = await fetch(url);
      const data = await res.json();

      if (data.persona) {
        toast.success("Persona generated!", { id: toastId });
        navigate(`/personas/${username}`);
      } else {
        toast.error("Failed to generate persona.", { id: toastId });
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong.", { id: toastId });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8 max-w-md mx-auto">
      <Input
        placeholder="Enter Reddit username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="bg-transparent p-8 border-b-2 border-gray-50"
      />
      <Button
        onClick={handleGenerate}
        disabled={loading}
        className="w-fit rounded-sm text-2xl py-10 px-6 cursor-pointer text-gray-900 bg-white hover:text-gray-50 font-semibold"
      >
        {loading ? <Loader /> : "Generate Persona"}
        <span className="text-2xl font-bold">→</span>
      </Button>
    </div>
  );
}