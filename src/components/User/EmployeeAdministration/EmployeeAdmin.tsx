import SimpleCard from "../../Utils/Cards/SimpleCard";
import { Box, Button, Modal, Stack, TextField, Typography } from "@mui/material";
import type { User } from "../User";
import EmployeesAutocomplete from "../../Employee/EmployeesAutocomplete";
import { useState } from "react";
import type { Employee } from "../../Employee/Employee";
import useEmployeeService from "../../Employee/useEmployeeService";

interface EmployeeAdminProps {
  user?: User;
}
function EmployeeAdmin(props: EmployeeAdminProps) {
  const [employeeSelected, setEmployeeSelected] = useState<Employee | null>(
    null,
  );
  const { user } = props;
  const [openModal, setOpenModal] = useState(false);

  const { mapEmployeeMutation, createEmployeeMutation } = useEmployeeService();

  if (!user) return null;

  const handleAssociateEmployee = () => {
    if (!employeeSelected || !user.keycloakId) return;
    mapEmployeeMutation.mutate({
      employeeId: employeeSelected.employeeId,
      keyCloackId: user.keycloakId,
    });
  };

  const handleOnCreateEmployee = () => {
    if (!user.firstname || !user.lastname) return;
    createEmployeeMutation.mutate({
      email: user.email,
      firstName: user.firstname,
      name: user.lastname,
    });
  };

  const handleCreateEmployee = () => {
    return toggleOpenModal();
  };

  const toggleOpenModal = () => setOpenModal((old) => !old);

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  return (
    <>
      <SimpleCard title="Administration Utilisateur">
        <Box>
          <Typography fontSize={18}>Administration Utilisateur</Typography>
          <Box mt={2}>
            {!user.userId && (
              <>
                <Typography>Associer un utilisateur</Typography>
                <Stack mt={2}>
                  <EmployeesAutocomplete
                    onChange={(_e, value) => setEmployeeSelected(value)}
                    onNoOptionClick={handleCreateEmployee}
                  />
                  <Button
                    disabled={
                      !employeeSelected || mapEmployeeMutation.isPending
                    }
                    variant="text"
                    onClick={handleAssociateEmployee}
                  >
                    Associer
                  </Button>
                </Stack>
              </>
            )}
          </Box>
        </Box>
      </SimpleCard>
      <Modal open={openModal} onClose={toggleOpenModal}>
        <Stack sx={style} spacing={2}>
          <Typography>Créer un utilisateur</Typography>
          <TextField label="Email" size="small" value={user.email} />
          <TextField label="Prénom" size="small" value={user.firstname} />
          <TextField label="Nom" size="small" value={user.lastname} />
          <Button onClick={handleOnCreateEmployee}>Créer utilisateur</Button>
        </Stack>
      </Modal>
    </>
  );
}

export default EmployeeAdmin;
