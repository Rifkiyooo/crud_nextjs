import { addDoa } from "../../query";
import { Button, Group, Modal, TextInput, Textarea } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useMutation } from "@tanstack/react-query";
import { notifications } from "@mantine/notifications";
import { useRouter } from "next/router";

const handleValidateForm = (data, field) => {
  return data === "" || data === null ? `${field} must filled` : null;
};

export default function AddDataForm(props) {
  const router = useRouter();
  const form = useForm({
    initialValues: {
      judul: "",
      deskripsi: "",
      ayat: "",
      latin: "",
    },

    validate: {
      judul: (value) => handleValidateForm(value, "Judul"),
      deskripsi: (value) => handleValidateForm(value, "Deskripsi"),
      ayat: (value) => handleValidateForm(value, "Ayat"),
      latin: (value) => handleValidateForm(value, "Latin"),
    },
  });

  const handleCloseModal = () => {
    props.onClose();
    router.reload();
    form.reset();
  };

  const { mutate, isLoading } = useMutation(addDoa, {
    onSuccess: () => {
        handleCloseModal();
        props.onClose();
        router.reload();
        form.reset();
        props.refetch();
        notifications.show({
          title: "Success",
          message: "Success created data!",
        });
    },
    onError: () => {
      notifications.show({
        title: "Success",
        message: "Success created data!",
      });

      notifications.show({
        title: "Failed",
        message: "Failed add data!",
        color: "red",
      });
    },
  });

  return (
    <>
      <Modal
        opened={props.isOpen}
        withCloseButton
        onClose={handleCloseModal}
        size="md"
        radius="md"
        title="Add Doa"
      >
        <form onSubmit={form.onSubmit((values) => mutate(values))}>
          <TextInput
            withAsterisk
            label="Judul"
            placeholder="Input your judul product"
            {...form.getInputProps("judul")}
          />
          <Textarea
            style={{ marginTop: "10px" }}
            withAsterisk
            label="Deskripsi"
            placeholder="Input your deskripsi product"
            {...form.getInputProps("deskripsi")}
          />
          <Textarea
            style={{ marginTop: "10px" }}
            withAsterisk
            label="Ayat"
            placeholder="Input your ayat product"
            {...form.getInputProps("ayat")}
          />
          <Textarea
            style={{ marginTop: "10px" }}
            withAsterisk
            label="Latin"
            placeholder="Input your latin product"
            {...form.getInputProps("latin")}
          />
          <Group align="flex-end" style={{ marginTop: "20px" }}>
            <Button
              variant="gradient"
              gradient={{
                from: "rgba(0, 133, 0, 1)",
                to: "rgba(0, 133, 0, 1)",
                deg: 146,
              }}
              type="submit"
              loading={isLoading}
            >
              Save
            </Button>
          </Group>
        </form>
      </Modal>
    </>
  );
}
