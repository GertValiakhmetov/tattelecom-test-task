import React, { useEffect, useState } from 'react';
import { DataGrid, ColDef } from '@material-ui/data-grid';
import { UsersState } from '../app/App';

type Props = {
    users: Array<UsersState>
}

type TableRow = {
    id: number,
    username: string,
    name: string,
    email: string,
    phone: string,
    website: string,
    company: string,
    address: string
}

const Users: React.FC<Props> = ({ users }: Props) => {
  const [tableRows, setRows] = useState<Array<TableRow>>([]);

  const columns: ColDef[] = [
    { field: 'username', headerName: 'Username', width: 150 },
    { field: 'name', headerName: 'Name', flex: 1 },
    { field: 'email', headerName: 'Email', flex: 1 },
    { field: 'phone', headerName: 'Phone', flex: 1 },
    { field: 'website', headerName: 'Website', flex: 1 },
    { field: 'company', headerName: 'Company', flex: 1 },
    { field: 'address', headerName: 'Address', flex: 1 },
  ];

  useEffect(() => {
    const rows = users.map((user: UsersState) => ({
      id: user.id,
      username: user.username,
      name: user.name,
      email: user.email,
      phone: user.phone,
      website: user.website,
      company: user.company.name,
      address: `${user.address.city}, ${user.address.street}`,
    }));
    setRows(rows);
  }, [users]);

  return (
    <div style={{ height: 650, width: '100%' }}>
      <DataGrid rows={tableRows} columns={columns} />
    </div>
  );
};

export default Users;
