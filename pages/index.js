import { useState } from "react";

export default function Home() {
  const [entryType, setEntryType] = useState("przychod");
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = () => {
    if (!file) return alert("Wybierz plik PDF z fakturą.");
    console.log("Typ wpisu:", entryType);
    console.log("Plik faktury:", file.name);
    alert("[DEMO] Odczytano dane z faktury. Dane widoczne w konsoli.");
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
    </div>
  );
}
