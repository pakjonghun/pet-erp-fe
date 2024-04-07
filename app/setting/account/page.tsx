'use client';

import { useGetUserList } from '@/api/graphql/hooks/useGetAccountList';
import { Box, Grid } from '@mui/material';
import AccountCard from './_components/AccountCard';
import { useState } from 'react';
import { User } from '@/api/graphql/codegen/graphql';
import { SelectedOption, SelectedUser } from './type';
import EditRoleModal from './_components/EditRoleModal';
import EditPasswordModal from './_components/EditPasswordModal';
import DeleteAccountModal from './_components/DeleteAccountModal';

const AccountPage = () => {
  const { data } = useGetUserList();
  const [selectedUser, setSelectedUser] = useState<SelectedUser | null>(null);
  const [selectedOption, setSelectedOption] = useState<null | SelectedOption>(null);

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
