import { useState } from "react";

export default function Home() {
  const [entryType, setEntryType] = useState("przychod");
  const [file, setFile] = useState(null);
  const [ocrResult, setOcrResult] = useState("");

  const handleFileChange = async (e) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);

      const reader = new FileReader();
      reader.onload = async () => {
        const base64Data = reader.result.split(",")[1];

        const response = await fetch(
          "https://vision.googleapis.com/v1/images:annotate?key=AIzaSyCiUI4HZ-tH0D6bEK-6h9yMVbtPjDnLnZc",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              requests: [
                {
                  image: { content: base64Data },
                  features: [{ type: "TEXT_DETECTION" }],
                },
              ],
            }),
          }
        );

        const data = await response.json();
        const text =
          data.responses?.[0]?.fullTextAnnotation?.text || "Brak danych";
        setOcrResult(text);
        console.log("Tekst z OCR:", text);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const handleSubmit = () => {
    if (!file) return alert("Wybierz plik PDF z fakturą.");
    alert("[DEMO] Dane z faktury przesłane do OCR. Sprawdź konsolę przeglądarki.");
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h1>PrompTax – dodaj fakturę do KPiR</h1>
      <label>
        Typ wpisu:
        <select value={entryType} onChange={(e) => setEntryType(e.target.value)}>
          <option value="przychod">Przychód</option>
          <option value="koszt">Koszt</option>
        </select>
      </label>
      <br />
      <input type="file" accept="application/pdf" onChange={handleFileChange} />
      <br />
      <button onClick={handleSubmit}>Zatwierdź i przetwórz fakturę</button>

      {ocrResult && (
        <div style={{ marginTop: "2rem", whiteSpace: "pre-wrap", background: "#f9f9f9", padding: "1rem" }}>
          <h3>📄 Wynik OCR (surowy tekst):</h3>
          {ocrResult}
        </div>
      )}
    </div>
  );
}
