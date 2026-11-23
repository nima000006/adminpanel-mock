import { FormInstance } from "antd";

// اسکرول به اولین فیلد خطادار
export const formScroller = (form: FormInstance<any>, err: any) => {
  if (err?.errorFields?.length > 0) {
    form.scrollToField(err.errorFields[0].name, {
      behavior: "smooth", // optional: makes the scroll smooth
      block: "end", // aligns field to the top of the view
    });
  }
};
