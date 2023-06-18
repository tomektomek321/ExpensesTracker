import React, { useEffect, useState } from 'react';
import { Box, Button, Flex, Input, Spinner, Table, TableContainer, Tbody, Td, Tfoot, Th, Thead, Tr } from '@chakra-ui/react';
import { ICategory } from '../domains/models/ICategory';
import { MdBuild } from 'react-icons/md';
import { AuthGateway } from '../domains/auth/auth-gateway';
import { RecoilSignIn } from '../atoms/auth-atom-utils';
import { useRecoilState } from 'recoil';
import { authState } from '../atoms/AuthAtom';
import { CategoryGateway } from '../domains/categories/categories-gateway';

export default function MyCategories() {

  const [loading, setLoading] =  useState<boolean>(true);
  const [categories, setCategories] =  useState<ICategory[]>([]);
  const [nowEdit, setNowEdit] =  useState<string | null>(null);
  const [nowEditValue, setNowEditValue] =  useState<string>("");
  const [newCategoryValue, setNewCategoryValue] =  useState<string>("");

  const [authRecoil, setAuthRecoil] = useRecoilState(authState);

  useEffect(() => {
    getCategoriesByUserId();
    AuthGateway.getPersistedUser().then( user => {
      if(user) {
        RecoilSignIn(setAuthRecoil, user.username, user.token)
      }
    }).catch(e => {
      console.log('getPersistedUser error')
      console.log(e);
    });
  }, []);

  const getCategoriesByUserId = () => {
    // GetCategoriesByUserId("sad").then((val: ICategory[]) => {
    //   setCategories(val);
    //   setLoading(false);
    // })
    CategoryGateway.getCategories().then( r => {
      setCategories(r);
      setLoading(false);
    });
  }

  const handleEditCategory = (id: string, name: string) => {
    setNowEdit(id);
    setNowEditValue(name);
  }

  const handleUpdateCategory = () => {
    const newCategories = [...categories];
    newCategories.find(c => c.id === nowEdit)!.name = nowEditValue;
    setCategories(newCategories);

    setNowEdit(null);
    setNowEditValue("");
  }

  const handleCancel = () => {
    setNowEdit(null);
    setNowEditValue("");
  }

  const handleRemove = (id: string) => {
    setCategories(prev => prev.filter(c => c.id !== id));
  }

  const handleCreate = () => {
    const newCategories = [...categories];
    newCategories.push({id: "123213", name: newCategoryValue});
    setCategories(newCategories);

    setNewCategoryValue("");
  }

  if(loading) {
    return(
      <Flex direction={'column'} justifyContent="center" alignItems={'center'} p="16px 0px">
        <Spinner size='xl' />
      </Flex>
    )
  }

  return (
    <Flex direction={'column'} justifyContent="center" alignItems={'center'} p="16px 0px">
      <Box mb={5} fontSize={'22'}>Categories</Box>
      <TableContainer width={'700px'}>
        <Table variant='striped' colorScheme='teal'>
          <Thead>
            <Tr>
              <Th>#</Th>
              <Th>Name</Th>
              <Th>Edit</Th>
              <Th>Remove</Th>
            </Tr>
          </Thead>
          <Tbody>
            {
              categories.map((val: ICategory, idx: number) => {
                return(
                  <Tr key={val.id}>
                    <Td>{idx}</Td>
                    <Td>
                      {
                        nowEdit == null || nowEdit !== val.id ? (
                          val.name
                        ) : (
                          <>
                            <Input border={'1px solid gray'} focusBorderColor='pink.400' htmlSize={6} width='auto' color='teal' value={nowEditValue} onChange={(e) => { setNowEditValue(e.target.value) }} />
                          </>
                        )
                      }
                    </Td>
                    <Td>
                      {
                        nowEdit == null || nowEdit !== val.id ? (
                          <>
                            <Button leftIcon={<MdBuild />} colorScheme='pink' variant='outline' onClick={() => handleEditCategory(val.id, val.name) } >Edit</Button>
                          </>
                        ) : (
                          <>
                            <Button leftIcon={<MdBuild />} colorScheme='pink' variant='outline' onClick={handleUpdateCategory}>Update</Button>
                            <Button leftIcon={<MdBuild />} colorScheme='pink' variant='outline' onClick={handleCancel}>Cancel</Button>
                          </>
                        )
                      }
                    </Td>
                    <Td>
                      <Button colorScheme='teal' size='md' onClick={() => handleRemove(val.id)}>Remove</Button>
                    </Td>
                  </Tr>
                )
              })
            }

          </Tbody>
          <Tfoot>
            <Tr>
              <Th colSpan={4}>
                <Input border={'1px solid gray'} focusBorderColor='pink.400' htmlSize={25} width='auto' color='teal' value={newCategoryValue} onChange={(e) => { setNewCategoryValue(e.target.value) }} />
                <Button ml={3} leftIcon={<MdBuild />} colorScheme='pink' variant='outline' onClick={handleCreate}>Create</Button>
              </Th>
            </Tr>
          </Tfoot>
        </Table>
      </TableContainer>
    </Flex>
  )
}
