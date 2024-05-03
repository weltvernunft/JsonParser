import React, { useState, useEffect } from "react";
import PrimaryButton from "./UI-components/PrimaryButton";
import ColorPicker from "./UI-components/ColorPicker";
import Input from "./UI-components/Input";
import Checkbox from "./UI-components/Checkbox";
import Select from "./UI-components/Select";
import Files from "./UI-components/Files";
import SecondaryButton from "./UI-components/SecondaryButton";

interface JsonData {
  name: string;
  form_name: string;
  form_description: string;
  form_fields: FormField[];
  form_buttons: FormButton[];
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
  options?: string[];
  multiple?: boolean;
  formats?: string;
  max_count: number;
}

interface FormButton {
  name: string;
  type: string;
}

const JsonRender: React.FC<{ jsonData: JsonData }> = ({ jsonData }) => {
  const [fileData, setFileData] = useState<JsonData | null>(null);
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [submitAction, setSubmitAction] = useState(false);
  const [errorSumm, setErrorSumm] = useState<Record<string, boolean>>({});
  const [filledRequired, setFilledRequired] = useState<Record<string, boolean>>(
    {}
  );
  const [disabled, setDisabled] = useState(true);

  useEffect(() => {
    console.log(filledRequired);
  }, [filledRequired]);

  const fillRequiredState = (id: string, value: boolean) => {
    setFilledRequired((prevState) => ({
      ...prevState,
      [id]: value,
    }));

    setDisabled(Object.values(filledRequired).some((item) => item === false));
    console.log("Disabled state: ", disabled);
    return disabled;
  };

  const handleInputChange = (
    id: string,
    value: string,
    error: boolean | null
  ) => {
    setFormData((prevData) => {
      const updatedData = {
        ...prevData,
        [id]: value,
      };
      console.log("Form data: ", updatedData);
      return updatedData;
    });

    setErrorSumm((prevData) => ({
      ...prevData,
      [`${id} field has error`]: error !== null ? error : false, // Convert null to false
    }));
  };

  const onUpload = (data: JsonData | null) => {
    if (data) {
      setFileData(data);
      handleInputChange("img", data.name.toString(), false);
      console.log("Image name: ", data.name);
    } else {
      setFileData(null);
      setFormData((prevData) => {
        const updatedData = { ...prevData };
        delete updatedData["img"];
        return updatedData;
      });
    }
  };

  const handleSubmitAction = async () => {
    if (Object.values(errorSumm).every((value) => value === false)) {
      console.log("Form Data: ", formData);

      try {
        const response = await fetch("http://localhost:3000/data", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const responseData = await response.json();
        console.log(responseData);
      } catch (error) {
        console.error(
          "There has been a problem with your fetch operation:",
          error
        );
      }
    }
    setSubmitAction(true);
  };

  return (
    <form
      className="bg-white rounded-sm py-7 px-5 inline-block text-left "
      onSubmit={(e) => e.preventDefault()}
    >
      <h2 className="text-3xl font-bold">{jsonData.form_name}</h2>
      <p className="mb-6">{jsonData.form_description}</p>
      <ul className="flex flex-col gap-5 mb-6">
        {jsonData.form_fields.map((field, index) => (
          <li key={index}>
            {field.type === "text" && (
              <Input
                onInputChange={(value, error) =>
                  handleInputChange(field.id, value, error)
                }
                field={field}
                setSubmitAction={setSubmitAction}
                submitAction={submitAction}
                fillRequiredState={fillRequiredState}
              />
            )}
            {field.type === "textarea" && (
              <textarea
                id={field.id}
                name={field.id}
                placeholder={field.placeholder}
                required={field.required}
                maxLength={field.maxlength}
                minLength={field.minlength}
                onChange={(e) =>
                  handleInputChange(field.id, e.target.value, false)
                }
                className="shadow p-4 w-full rounded-md"
              />
            )}

            {field.type === "color" && (
              <ColorPicker
                id={field.id}
                label={field.label}
                required={field.required}
                options={field.options}
                onColorChange={(color) =>
                  handleInputChange(field.id, color, false)
                }
              />
            )}
            {field.type === "file" && <Files onUpload={onUpload} />}
            {field.type === "checkbox" && <Checkbox {...field} />}
            {field.type === "select" && (
              <Select
                field={field}
                onSelectChange={(value) =>
                  handleInputChange(field.id, value, false)
                }
              />
            )}
            {field.type === "password" && (
              <Input
                onInputChange={(value, error) =>
                  handleInputChange(field.id, value, error)
                }
                field={field}
                setSubmitAction={setSubmitAction}
                submitAction={submitAction}
                fillRequiredState={fillRequiredState}
              />
            )}
          </li>
        ))}
      </ul>
      <ul className="flex flex-col sm:flex-row gap-2 ">
        {jsonData.form_buttons.map((button, index) => (
          <li key={index} className="flex-grow">
            {button.type === "submit" ? (
              <PrimaryButton
                type="submit"
                onClick={handleSubmitAction}
                disabled={disabled}
              >
                {button.name}
              </PrimaryButton>
            ) : (
              <SecondaryButton type="button">{button.name}</SecondaryButton>
            )}
          </li>
        ))}
      </ul>
    </form>
  );
};

export default JsonRender;
