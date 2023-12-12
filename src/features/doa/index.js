import { useQueryUsers } from "./service";
// import { deleteProduct } from "@/common/query/product";
import AddDataForm from "./form/addDataForm";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  Table,
  ScrollArea,
  UnstyledButton,
  Group,
  Text,
  Center,
  TextInput,
  rem,
  Modal,
  Button,
  ActionIcon,
} from "@mantine/core";
import {
  IconSelector,
  IconChevronDown,
  IconChevronUp,
  IconSearch,
  IconEdit,
  IconTrash,
} from "@tabler/icons-react";
import classes from "./table.module.css";
import { useEffect, useState } from "react";
import { Loading } from "@/components/loading";
import { getDoa } from "../query";
import EditDataForm from "./form/editDataForm";
import { deleteDoas } from "./query";

const DoaFeatures = () => {
  const [page, setPage] = useState(1);
  const [skip, setSkip] = useState(0);

  const {
    data: doa,
    refetch,
    isFetching,
  } = useQuery(["list-doa", skip], () => getDoa(skip), {
    initialData: [],
  });
  const [search, setSearch] = useState("");
  const [sortedData, setSortedData] = useState(doa);
  const [sortBy, setSortBy] = useState(null);
  const [setId, setIdDoa] = useState(null);
  const [reverseSortDirection, setReverseSortDirection] = useState(false);
  const [isOpenDelete, setIsOpenDelete] = useState(false);
  const [isOpenAdd, setIsOpenAdd] = useState(false);
  const [isOpenEdit, setIsOpenEdit] = useState(false);
  const [idData, setIdData] = useState("");

  const [judul, setJudul] = useState("");
  const [deskripsi, setDeskripsi] = useState("");
  const [ayat, setAyat] = useState("");
  const [latin, setLatin] = useState("");

  useEffect(() => {
    setSortedData(
      sortData(doa, { sortBy, reversed: reverseSortDirection, search })
    );
  }, [doa, reverseSortDirection, search, sortBy]);

  const setSorting = (field) => {
    const reversed = field === sortBy ? !reverseSortDirection : false;
    setReverseSortDirection(reversed);
    setSortBy(field);
    setSortedData(sortData(doa, { sortBy: field, reversed, search }));
  };

  const handleSearchChange = (event) => {
    const { value } = event.currentTarget;
    setSearch(value);
    setSortedData(
      sortData(doa, {
        sortBy,
        reversed: reverseSortDirection,
        search: value,
      })
    );
  };

  const onHandleDeleteData = (isOpen, id) => {
    setIsOpenDelete(isOpen);
    setIdDoa(id);
  };

  const onHandleEditData = (isOpen, id, judul, deskripsi, ayat, latin) => {
    setIsOpenEdit(isOpen);
    setIdData(id);
    setJudul(judul);
    setDeskripsi(deskripsi);
    setAyat(ayat);
    setLatin(latin);
  };

  const { mutate, isLoading: isLoadingDelete } = useMutation(deleteDoas, {
    onSuccess: (response) => {
      if (response.status === 200) {
        setIsOpenDelete(false);
        refetch();
        notifications.show({
          title: "Success",
          message: "Success deleted data!",
        });
      }
    },
    onError: () => {
      notifications.show({
        title: "Failed",
        message: "Failed deleted data!",
        color: "red",
      });
    },
  });

  const rows = sortedData?.map((row) => (
    <tr key={row.id}>
      <td>{row.judul}</td>
      <td>{row.deskripsi}</td>
      <td>{row.ayat}</td>
      <td>{row.latin}</td>
      <td>{row.createAt}</td>
      <td>{row.updateAt}</td>
      <td>
        <Group spacing={4} position="center" noWrap>
          <ActionIcon
            color="blue"
            onClick={() =>
              onHandleEditData(
                true,
                row.id,
                row.judul,
                row.deskripsi,
                row.ayat,
                row.latin
              )
            }
          >
            <IconEdit size={16} />
          </ActionIcon>
          <ActionIcon
            color="red"
            onClick={() => onHandleDeleteData(true, row.id)}
          >
            <IconTrash size={16} />
          </ActionIcon>
        </Group>
      </td>
    </tr>
  ));

  return (
    <ScrollArea>
      <TextInput
        style={{ marginBottom: "1.5rem" }}
        placeholder="Search by any field"
        mb="md"
        leftSection={
          <IconSearch
            style={{ width: rem(16), height: rem(16) }}
            stroke={1.5}
          />
        }
        value={search}
        onChange={handleSearchChange}
      />

      <section
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "20px",
        }}
      >
        <Text fw={700} fz="lg">
          Doa List
        </Text>
        <Button
          variant="gradient"
          gradient={{
            from: "rgba(0, 133, 0, 1)",
            to: "rgba(0, 133, 0, 1)",
            deg: 146,
          }}
          onClick={() => setIsOpenAdd(true)}
        >
          Create Data Doa
        </Button>
      </section>

      <ScrollArea h={500}>
        <Table
          style={{ margin: rem(0, 15, 0, 15) }}
          withBorder
          horizontalSpacing="md"
          verticalSpacing="xs"
          layout="fixed"
        >
          <tbody>
            <tr>
              <Th
                sorted={sortBy === "judul"}
                reversed={reverseSortDirection}
                onSort={() => setSorting("judul")}
              >
                Judul
              </Th>
              <Th
                sorted={sortBy === "deskripsi"}
                reversed={reverseSortDirection}
                onSort={() => setSorting("deskripsi")}
              >
                Deskripsi
              </Th>
              <Th
                sorted={sortBy === "ayat"}
                reversed={reverseSortDirection}
                onSort={() => setSorting("ayat")}
              >
                Ayat
              </Th>
              <Th
                sorted={sortBy === "latin"}
                reversed={reverseSortDirection}
                onSort={() => setSorting("latin")}
              >
                Latin
              </Th>
              <Th
                sorted={sortBy === "createdAt"}
                reversed={reverseSortDirection}
                onSort={() => setSorting("createdAT")}
              >
                Created At
              </Th>
              <Th
                sorted={sortBy === "updatedAt"}
                reversed={reverseSortDirection}
                onSort={() => setSorting("updatedAt")}
              >
                Updated At
              </Th>
              <Th
                sorted={sortBy === "updatedAt"}
                reversed={reverseSortDirection}
                onSort={() => setSorting("updatedAt")}
              >
                Actions
              </Th>
            </tr>
          </tbody>
          <tbody>
            {rows?.length > 0 ? (
              rows
            ) : (
              <tr>
                <td colSpan={!isFetching ? doa.keys(doa[0]).length : ""}>
                  <Center>
                    <Loading />
                  </Center>
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      </ScrollArea>

      <AddDataForm
        isOpen={isOpenAdd}
        onClose={() => setIsOpenAdd(false)}
        refetch={refetch}
      />

      <Modal
        opened={isOpenDelete}
        withCloseButton
        onClose={() => setIsOpenDelete(false)}
        size="sm"
        radius="md"
        title="Konfirmasi hapus data"
      >
        <Text size="sm" mb="sm" weight={500}>
          Apakah yakin ingin menghapus data ini?
        </Text>

        <Group align="flex-end">
          <Button
            color="red"
            onClick={() => mutate(setId)}
            loading={isLoadingDelete}
          >
            Hapus
          </Button>
        </Group>
      </Modal>
      <EditDataForm
        isOpen={isOpenEdit}
        onClose={() => setIsOpenEdit(false)}
        refetch={refetch}
        idData={idData}
        judul={judul}
        deskripsi={deskripsi}
        ayat={ayat}
        latin={latin}
      />
    </ScrollArea>
  );
};

export default DoaFeatures;

function Th({ children, reversed, sorted, onSort }) {
  const Icon = sorted
    ? reversed
      ? IconChevronUp
      : IconChevronDown
    : IconSelector;
  return (
    <th className={classes.th}>
      <UnstyledButton onClick={onSort} className={classes.control}>
        <Group justify="space-between">
          <Text fw={500} fz="sm">
            {children}
          </Text>
          <Center className={classes.icon}>
            <Icon style={{ width: rem(16), height: rem(16) }} stroke={1.5} />
          </Center>
        </Group>
      </UnstyledButton>
    </th>
  );
}

function filterData(data, search) {
  const query = search.toLowerCase().trim();
  return data?.filter((item) =>
    Object.keys(data[0]).some(
      (key) =>
        typeof item[key] === "string" && item[key].toLowerCase().includes(query)
    )
  );
}

function sortData(data, payload) {
  var sortBy = payload.sortBy;

  if (!sortBy) {
    return filterData(data, payload.search);
  }

  return filterData(
    data?.slice().sort(function (a, b) {
      if (payload.reversed) {
        return b[sortBy].localeCompare(a[sortBy]);
      }

      return a[sortBy].localeCompare(b[sortBy]);
    }),
    payload.search
  );
}
