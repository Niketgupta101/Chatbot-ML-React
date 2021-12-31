import React,{ useState } from "react";
import { submitForm } from "../../api";
import { useSelector } from "react-redux";
import Form from "./Form/Form";
import FormContent from "./FormContent/FormContent";
import './styles.css';

const FormPage = () => {
  const [formData, setFormData] = useState([]);
  const user = JSON.parse(localStorage.getItem('profile'));
  const store = useSelector(state => state.Vars);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    console.log(user?.result.id, formData);
    await submitForm(user?.result.id, formData);
    window.location='/';
  }

  return (
    <div className="formPage">
      <Form formData={formData} setFormData={setFormData} store={store}/>
      <FormContent formData={formData} setFormData={setFormData} />
      <button className="addItem" onClick={handleFormSubmit}>Submit</button>
    </div>
  );
};

export default FormPage;
