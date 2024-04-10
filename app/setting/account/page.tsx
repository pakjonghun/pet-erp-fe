'use client';

import { useGetUserList } from '@/api/graphql/hooks/users/useGetAccountList';
import { Box, Button, Grid } from '@mui/material';
import AccountCard from './_components/AccountCard';
import { useState } from 'react';
import PersonAddAltOutlinedIcon from '@mui/icons-material/PersonAddAltOutlined';
import { SelectedOption, SelectedUser } from './type';
import EditRoleModal from './_components/EditRoleModal';
import EditPasswordModal from './_components/EditPasswordModal';
import DeleteAccountModal from './_components/DeleteAccountModal';
import CreateAccountModal from './_components/CreateAccountModal';

const AccountPage = () => {
  const { data } = useGetUserList();
  const [selectedUser, setSelectedUser] = useState<SelectedUser | null>(null);
  const [selectedOption, setSelectedOption] = useState<null | SelectedOption>(null);
  const [openCreateAccount, setOpenCreateAccount] = useState(false);

  const handleSelectOption = (option: SelectedOption, user: SelectedUser) => {
    setSelectedUser(user);
    setSelectedOption(option);
  };

  const handleCloseModal = () => {
    setSelectedUser(null);
    setSelectedOption(null);
  };

  return (
    <Box sx={{ p: 5 }}>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Button
          onClick={() => setOpenCreateAccount(true)}
          endIcon={<PersonAddAltOutlinedIcon />}
          variant="contained"
          sx={{ ml: 'auto', mb: 2 }}
        >
          계정생성
        </Button>
      </Box>
      <CreateAccountModal open={openCreateAccount} onClose={() => setOpenCreateAccount(false)} />

      {!!selectedUser && (
        <EditRoleModal
          selectedUser={selectedUser}
          open={selectedOption === 'role' && !!selectedUser}
          onClose={handleCloseModal}
        />
      )}

      {!!selectedUser && (
        <EditPasswordModal
          selectedUser={selectedUser}
          open={selectedOption === 'password' && !!selectedUser}
          onClose={handleCloseModal}
        />
      )}
      {!!selectedUser && (
        <DeleteAccountModal
          selectedUser={selectedUser}
          open={selectedOption === 'delete' && !!selectedUser}
          onClose={handleCloseModal}
        />
      )}
      <Grid container rowSpacing={3} columnSpacing={4}>
        {data?.users.map((user) => (
          <Grid item xs={12} sm={6} lg={4} xl={3} key={user.id}>
            <AccountCard onSelectUser={handleSelectOption} user={user!} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default AccountPage;
