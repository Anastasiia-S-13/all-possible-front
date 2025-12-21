
import css from "./NewTool.module.css";

import AddEditToolForm from "@/app/(site)/tools/(private routes)/new/AddEditToolForm";


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
