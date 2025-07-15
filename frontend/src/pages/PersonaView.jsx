import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { parsePersonaTxt } from "@/utils/parsePersonaTxt";
import PersonaCard from "@/components/PersonaCard";
import Loader from "@/components/Loader";

export default function PersonaView() {
  const { username } = useParams();
  const [text, setText] = useState("");
  const [parsed, setParsed] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPersona = async () => {
      try {
        const res = await fetch(
          `http://localhost:8000/persona-file?username=${username}`
        );
        const data = await res.json();

        if (data.error) {
          setError(data.error);
        } else {
          setText(data.text);
          const parsedData = parsePersonaTxt(data.text);
          setParsed(parsedData);
        }
      } catch (err) {
        setError("Failed to fetch persona.");
        console.log(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPersona();
  }, [username]);

  if (loading) return <Loader />;
  if (error) return <p className="text-red-600 text-center">{error}</p>;

  return (
    <div className="min-h-screen text-white px-10 pt-37 w-full mx-auto">
      {parsed ? (
        <PersonaCard persona={parsed} />
      ) : (
        <pre className="whitespace-pre-wrap text-sm text-muted-foreground">
          {text}
        </pre>
      )}
    </div>
  );
}
