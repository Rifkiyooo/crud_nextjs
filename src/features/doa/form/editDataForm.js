import { editDoa } from "../../query";
import { Button, Group, Modal, TextInput, Textarea } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useMutation } from "@tanstack/react-query";
import { notifications } from "@mantine/notifications";
import { useRouter } from "next/router";
import { useEffect } from "react";

const handleValidateForm = (data, field) => {
  return data === "" || data === null ? `${field} must filled` : null;
};

export default function EditDataForm(props) {
  console.log(props);
  const router = useRouter();
  const form = useForm({
    initialValues: {
      judul: props.judul,
      deskripsi: props.deskripsi,
      ayat: props.ayat,
      latin: props.latin,
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

  const { mutate, isLoading } = useMutation(editDoa, {
    onSuccess: (response) => {
      if (response.status === 201) {
        handleCloseModal();
        props.refetch();
        notifications.show({
          title: "Success",
          message: "Success created data!",
        });
      }
    },
    onError: () => {
      notifications.show({
        title: "Failed",
        message: "Failed add data!",
        color: "red",
      });
    },
  });

  return (
    <>
      <Modal opened={props.isOpen} withCloseButton onClose={handleCloseModal} size="md" radius="md" title="Edit Doa">
        <form onSubmit={form.onSubmit((values) => mutate({ id: props.idData, ...values }))}>
          <TextInput withAsterisk label="Judul" placeholder="Input your judul doa" {...form.getInputProps("judul")} />
          <Textarea style={{ marginTop: "10px" }} withAsterisk label="Deskripsi" placeholder="Input your deskripsi doa" {...form.getInputProps("deskripsi")} />
          <Textarea style={{ marginTop: "10px" }} withAsterisk label="Ayat" placeholder="Input your ayat doa" {...form.getInputProps("ayat")} />
          <Textarea style={{ marginTop: "10px" }} withAsterisk label="Latin" placeholder="Input your latin doa" {...form.getInputProps("latin")} />
          <Group align="flex-end" style={{ marginTop: "20px" }}>
            <Button type="submit" loading={isLoading}>
              Save
            </Button>
          </Group>
        </form>
      </Modal>
    </>
  );
}