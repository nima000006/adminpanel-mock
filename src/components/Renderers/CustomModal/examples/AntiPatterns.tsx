/**
 * CustomModal Anti-Patterns
 *
 * ⚠️ WARNING: These are examples of WHAT NOT TO DO.
 * Each example shows a common mistake and the correct alternative.
 */

import { useState } from "react";

import { Modal, Button } from "antd";

import CustomModal from "../CustomModal";

// =============================================================================
// ❌ ANTI-PATTERN 1: Not using controlled state properly
// =============================================================================
export const BadUncontrolledModal = () => {
  // ❌ BAD: Using a ref or DOM manipulation to control modal
  // This can lead to state desync issues

  return (
    <CustomModal
      open={true} // ❌ Always true - modal can never close!
      title="مودال مشکل‌دار"
    >
      <p>این مودال هیچوقت بسته نمی‌شود!</p>
    </CustomModal>
  );

  // ✅ GOOD:
  // const [isOpen, setIsOpen] = useState(false);
  // return (
  //   <CustomModal
  //     open={isOpen}
  //     onCancel={() => setIsOpen(false)}
  //     title="مودال صحیح"
  //   >
  //     <p>این مودال به درستی کنترل می‌شود.</p>
  //   </CustomModal>
  // );
};

// =============================================================================
// ❌ ANTI-PATTERN 2: Using raw antd Modal instead of CustomModal
// =============================================================================
export const BadRawModal = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    // ❌ BAD: Using raw antd Modal loses consistent styling and RTL support
    <Modal
      open={isOpen}
      onCancel={() => setIsOpen(false)}
      title="مودال خام"
      okText="تایید"
      cancelText="انصراف"
    >
      <p>این مودال استایل یکپارچه ندارد.</p>
    </Modal>
  );

  // ✅ GOOD: Use CustomModal for consistent styling
  // <CustomModal
  //   open={isOpen}
  //   onCancel={() => setIsOpen(false)}
  //   title="مودال سفارشی"
  // >
  //   <p>این مودال استایل یکپارچه دارد.</p>
  // </CustomModal>
};

// =============================================================================
// ❌ ANTI-PATTERN 3: Not handling form reset on close
// =============================================================================
export const BadFormNotReset = () => {
  const [isOpen, setIsOpen] = useState(false);
  // Form state would persist across modal open/close!

  return (
    <CustomModal
      open={isOpen}
      // ❌ BAD: Just closing without resetting form
      onCancel={() => setIsOpen(false)}
      title="فرم مشکل‌دار"
    >
      <p>فرم بعد از بستن ریست نمی‌شود</p>
    </CustomModal>
  );

  // ✅ GOOD:
  // const [form] = Form.useForm();
  // <CustomModal
  //   open={isOpen}
  //   onCancel={() => {
  //     setIsOpen(false);
  //     form.resetFields(); // Reset form on close
  //   }}
  //   destroyOnClose // Or use this prop
  //   title="فرم صحیح"
  // >
  //   <Form form={form}>...</Form>
  // </CustomModal>
};

// =============================================================================
// ❌ ANTI-PATTERN 4: Inline width without using size prop
// =============================================================================
export const BadInlineWidth = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <CustomModal
      open={isOpen}
      onCancel={() => setIsOpen(false)}
      title="عرض نامناسب"
      // ❌ BAD: Using magic numbers instead of size prop
      width={847}
    >
      <p>از سایزهای استاندارد استفاده کنید</p>
    </CustomModal>
  );

  // ✅ GOOD: Use predefined sizes
  // <CustomModal
  //   open={isOpen}
  //   onCancel={() => setIsOpen(false)}
  //   title="عرض مناسب"
  //   size="large" // Uses consistent 900px
  // >
  //   <p>سایز استاندارد</p>
  // </CustomModal>
};

// =============================================================================
// ❌ ANTI-PATTERN 5: Manual footer instead of using props
// =============================================================================
export const BadManualFooter = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <CustomModal
      open={isOpen}
      onCancel={() => setIsOpen(false)}
      title="فوتر دستی"
      // ❌ BAD: Manually creating footer when props exist
      footer={
        <div style={{ display: "flex", gap: 8, justifyContent: "flex-end" }}>
          <Button onClick={() => setIsOpen(false)}>انصراف</Button>
          <Button type="primary" danger onClick={() => setIsOpen(false)}>
            حذف
          </Button>
        </div>
      }
    >
      <p>فوتر به صورت دستی ساخته شده</p>
    </CustomModal>
  );

  // ✅ GOOD: Use built-in props
  // <CustomModal
  //   open={isOpen}
  //   onCancel={() => setIsOpen(false)}
  //   title="فوتر خودکار"
  //   confirmText="حذف"
  //   confirmDanger
  //   onConfirm={() => setIsOpen(false)}
  // >
  //   <p>فوتر به صورت خودکار</p>
  // </CustomModal>
};

// =============================================================================
// ❌ ANTI-PATTERN 6: Not using variant for semantic styling
// =============================================================================
export const BadNoVariant = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <CustomModal
      open={isOpen}
      onCancel={() => setIsOpen(false)}
      title="حذف آیتم"
      // ❌ BAD: Delete modal without danger variant
      // Missing visual cues that this is a destructive action
    >
      <p>آیا از حذف مطمئن هستید؟</p>
    </CustomModal>
  );

  // ✅ GOOD: Use appropriate variant
  // <CustomModal
  //   open={isOpen}
  //   onCancel={() => setIsOpen(false)}
  //   title="حذف آیتم"
  //   variant="danger"
  //   confirmDanger
  // >
  //   <p>آیا از حذف مطمئن هستید؟</p>
  // </CustomModal>
};

// =============================================================================
// ❌ ANTI-PATTERN 7: Multiple modals without proper state management
// =============================================================================
export const BadMultipleModals = () => {
  // ❌ BAD: Separate state for each modal - hard to manage
  const [isModal1Open, setIsModal1Open] = useState(false);
  const [isModal2Open, setIsModal2Open] = useState(false);
  const [isModal3Open, setIsModal3Open] = useState(false);

  return (
    <>
      <CustomModal
        open={isModal1Open}
        onCancel={() => setIsModal1Open(false)}
        title="مودال ۱"
      >
        <p>محتوا</p>
      </CustomModal>
      <CustomModal
        open={isModal2Open}
        onCancel={() => setIsModal2Open(false)}
        title="مودال ۲"
      >
        <p>محتوا</p>
      </CustomModal>
      <CustomModal
        open={isModal3Open}
        onCancel={() => setIsModal3Open(false)}
        title="مودال ۳"
      >
        <p>محتوا</p>
      </CustomModal>
    </>
  );

  // ✅ GOOD: Use a single state with modal type
  // type ModalType = 'create' | 'edit' | 'delete' | null;
  // const [activeModal, setActiveModal] = useState<ModalType>(null);
  //
  // return (
  //   <>
  //     <CustomModal
  //       open={activeModal === 'create'}
  //       onCancel={() => setActiveModal(null)}
  //       title="ایجاد"
  //     />
  //     <CustomModal
  //       open={activeModal === 'edit'}
  //       onCancel={() => setActiveModal(null)}
  //       title="ویرایش"
  //     />
  //     <CustomModal
  //       open={activeModal === 'delete'}
  //       onCancel={() => setActiveModal(null)}
  //       title="حذف"
  //       variant="danger"
  //     />
  //   </>
  // );
};
