import React, { useState } from "react";
import "./App.css";
import Files from "./UI-components/Files";
import JsonRender from "./JsonRender";

interface JsonData {
  form_name: string;
  form_fields: FormField[];
  form_buttons: FormButton[];
  form_description: string;
}

interface FormField {
  id: string;
  type: string;
  label: string;
  required: boolean;
  placeholder: string;
  maxlength: number;
  minlength?: number;
  pattern?: string;
}

interface FormButton {
  name: string;
  type: string;
}

function App() {
  const [jsonData, setJsonData] = useState<JsonData | null>(null);

  const handleJsonData = (data: JsonData) => {
    setJsonData(data);
  };

  return (
    <div className="items-center">
      <Files onUpload={handleJsonData} />
      {jsonData && <JsonRender jsonData={jsonData} />}
    </div>
  );
}

export default App;
