import { useQueryUsers } from "./service";
// import { deleteProduct } from "@/common/query/product";
// import AddDataForm from "./form/addDataForm";
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
import { getUsers } from "../query";

const UsersFeatures = () => {
  const [page, setPage] = useState(1);
  const [skip, setSkip] = useState(0);

  const {
    data: users,
    refetch,
    isFetching,
  } = useQuery(["list-users", skip], () => getUsers(skip), {
    initialData: [],
  });
  const [search, setSearch] = useState("");
  const [sortedData, setSortedData] = useState(users);
  const [sortBy, setSortBy] = useState(null);
  const [reverseSortDirection, setReverseSortDirection] = useState(false);
  const [isOpenDelete, setIsOpenDelete] = useState(false);
  const [isOpenAdd, setIsOpenAdd] = useState(false);
  const [isOpenEdit, setIsOpenEdit] = useState(false);

  useEffect(() => {
    setSortedData(
      sortData(users, { sortBy, reversed: reverseSortDirection, search })
    );
  }, [users, reverseSortDirection, search, sortBy]);

  const setSorting = (field) => {
    const reversed = field === sortBy ? !reverseSortDirection : false;
    setReverseSortDirection(reversed);
    setSortBy(field);
    setSortedData(sortData(users, { sortBy: field, reversed, search }));
  };

  const handleSearchChange = (event) => {
    const { value } = event.currentTarget;
    setSearch(value);
    setSortedData(
      sortData(users, {
        sortBy,
        reversed: reverseSortDirection,
        search: value,
      })
    );
  };

  const onHandleDeleteData = (isOpen, id) => {
    setIsOpenDelete(isOpen);
    setIdProduct(id);
  };

  // const { mutate, isLoading: isLoadingDelete } = useMutation(deleteProduct, {
  //   onSuccess: (response) => {
  //     if(response.status === 200) {
  //       setIsOpenDelete(false);
  //       refetch();
  //       notifications.show({
  //         title: 'Success',
  //         message: 'Success deleted data!',
  //       })
  //     }
  //   },
  //   onError: () => {
  //     notifications.show({
  //       title: 'Failed',
  //       message: 'Failed deleted data!',
  //       color: 'red'
  //     })
  //   }
  // });

  const rows = sortedData?.map((row) => (
    <tr key={row.id}>
      <td>{row.nama}</td>
      <td>{row.username}</td>
      <td>{row.createAt}</td>
      <td>{row.updateAt}</td>
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
          List Data User
        </Text>
        {/* <Button
          variant="gradient"
          gradient={{ from: "indigo", to: "cyan" }}
          onClick={() => setIsOpenAdd(true)}
        >
          Create Products
        </Button> */}
      </section>

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
              sorted={sortBy === "nama"}
              reversed={reverseSortDirection}
              onSort={() => setSorting("nama")}
            >
              Nama Pengguna
            </Th>
            <Th
              sorted={sortBy === "username"}
              reversed={reverseSortDirection}
              onSort={() => setSorting("username")}
            >
              Username
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
          </tr>
        </tbody>
        <tbody>
          {rows?.length > 0 ? (
            rows
          ) : (
            <tr>
              <td colSpan={!isFetching ? users.keys(users[0]).length : ""}>
                <Center>
                  <Loading />
                </Center>
              </td>
            </tr>
          )}
        </tbody>
      </Table>
      {/* <Modal
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
              onClick={() => mutate(idProduct)}
              loading={isLoadingDelete}
            >
              Hapus
            </Button>
          </Group>
        </Modal> */}

      {/* <AddDataForm 
          isOpen={isOpenAdd} 
          onClose={()=>setIsOpenAdd(false)} 
          refetch={refetch}
        /> */}
    </ScrollArea>
  );
};

export default UsersFeatures;

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
