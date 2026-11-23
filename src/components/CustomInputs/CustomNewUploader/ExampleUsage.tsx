import { useEffect } from "react";

import { Form, Button, UploadFile } from "antd";

import CustomNewUploader from "./CustomNewUploader";

const ExampleUsage = () => {
  const [form] = Form.useForm();

  // Simulating data fetching for "Already Uploaded" images
  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      const existingImages: UploadFile[] = [
        {
          uid: "-1",
          name: "existing_image.png",
          status: "done",
          url: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
        },
      ];

      // Set the form value
      form.setFieldsValue({
        userProfile: existingImages, // Field name must match the component's 'name'
      });
    }, 1000);
  }, [form]);

  const onFinish = (values: any) => {
    console.warn("Form values:", values);
    // values.files will differ based on backend needs.
    // Standard Antd gives: [{ uid, name, status, response, ... }]
  };

  return (
    <Form form={form} onFinish={onFinish} layout="vertical">
      {/* 
        NEW USAGE:
        1. No need to pass 'fileList' and 'setFileList' manually.
        2. 'name' inside Form.Item handles the state.
        3. 'rules' handled by Ant Design Form validation.
        4. 'isCropperEnabled' enables the cropping feature.
      */}
      <CustomNewUploader
        name="userProfile"
        label="Upload Profile Picture"
        isCropperEnabled={true}
        cropAspect={1}
        cropShape="rect"
        maxCount={3}
        rules={[{ required: true, message: "Please upload an image" }]}
        uploadText="Click or Drag"
        accept="image/*"
      />

      <CustomNewUploader
        name="documents"
        label="Document Attachments"
        multiple
        uploadText="Add Documents"
        // isCropperEnabled={false} // Default
        validFileFormat={["application/pdf", "image/png"]}
      />

      <Button type="primary" htmlType="submit">
        Submit
      </Button>
    </Form>
  );
};

export default ExampleUsage;
