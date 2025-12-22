
import css from "./NewTool.module.css";

import AddEditToolForm from "@/components/forms/AddEditToolForm/AddEditToolForm";


export default function CreateToolPage() {


  return (
    <section>
      <div className="container">
        <h1 className={css.title}>Публікація інструменту</h1>
        <AddEditToolForm />
      </div>
    </section>
  );
}
