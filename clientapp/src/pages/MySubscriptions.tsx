import React, { useEffect, useState } from 'react';
import { Box, Button, Flex, Input, Spinner, Table, TableContainer, Tbody, Td, Text, Th, Thead, Tr } from '@chakra-ui/react';
import DatePicker from 'react-datepicker';
import { MdBuild } from 'react-icons/md';
import { AuthGateway } from '../domains/auth/auth-gateway';
import { RecoilSignIn } from '../atoms/auth-atom-utils';
import { useRecoilState } from 'recoil';
import { authState } from '../atoms/AuthAtom';
import { CategoryGateway } from '../domains/categories/categories-gateway';
import { ISubscription } from '../domains/models/Subscription';
import './MySubscriptions.css';
import 'react-datepicker/dist/react-datepicker.css';
import { ISubscriptionPayload } from '../domains/models/ISubscriptionPayload';
import { SubscriptionGateway } from '../domains/subscriptions/subscriptions-gateway';

interface EditSubscription {
  name: string;
  amount: number;
  renewalDate: Date;
}

export default function MySubscriptions() {

  const [loading, setLoading] =  useState<boolean>(true);
  const [subscriptions, setSubscriptions] =  useState<ISubscription[]>([]);
  const [nowEdit, setNowEdit] =  useState<string | null>(null);
  const [nowEditValue, setNowEditValue] =  useState<EditSubscription>({
    name: "",
    amount: 0,
    renewalDate: new Date(),
  });
  const [newSubscriptionValue, setNewSubscriptionValue] =  useState<EditSubscription>({
    name: "",
    amount: 0,
    renewalDate: new Date(),
  });
  const [selectedDate, setSelectedDate] = useState(null);
  const [editSelectedDate, setEditSelectedDate] = useState(null);
  const [authRecoil, setAuthRecoil] = useRecoilState(authState);

  useEffect(() => {
    getCategoriesByUserId();
    AuthGateway.getPersistedUser().then( user => {
      if(user) {
        RecoilSignIn(setAuthRecoil, user.username, user.token)
      }
      getMySubscriptions();
    }).catch(e => {
      console.log('getPersistedUser error')
      console.log(e);
    });
  }, []);


  const getMySubscriptions = () => {
    SubscriptionGateway.getSubscriptions().then( r => {
      console.log(r);
      setSubscriptions(r);
    })
  }

  const handleDateChange = (date: any) => {
    setSelectedDate(date);
  };

  const handleEditDateChange = (date: any) => {
    setEditSelectedDate(date);
  };

  const getCategoriesByUserId = () => {
    CategoryGateway.getCategories().then( r => {
      setLoading(false);
    });
  }

  const handleEditSubscription = (id: string, name: string) => {
    setNowEdit(id);
    setNowEditValue(prev => ({...prev, name}));
  }

  const handleUpdateSubscription = () => {
    const newSubscriptions = [...subscriptions];
    const idx = newSubscriptions.findIndex(c => c.id === nowEdit)!;
    newSubscriptions[idx].name = nowEditValue.name;
    newSubscriptions[idx].amount = nowEditValue.amount;
    newSubscriptions[idx].renewalDate = nowEditValue.renewalDate;
    setSubscriptions(newSubscriptions);

    setNowEdit(null);
    setNowEditValue({
      name: "",
      amount: 0,
      renewalDate: new Date(),
    });
  }

  const handleCancel = () => {
    setNowEdit(null);
    setNowEditValue({
      name: "",
      amount: 0,
      renewalDate: new Date(),
    });
  }

  const handleRemove = (id: string) => {
    setSubscriptions(prev => prev.filter(c => c.id !== id));
  }

  const handleCreate = () => {
    const newSubscriptions = [...subscriptions];

    const x: ISubscriptionPayload = {
      name: newSubscriptionValue.name, 
      amount: newSubscriptionValue.amount, 
      renewalDate: newSubscriptionValue.renewalDate,
    };

    SubscriptionGateway.addSubscription(x).then( r => {
      newSubscriptions.push(r);
      setSubscriptions(newSubscriptions);
  
      setNewSubscriptionValue({
        name: "",
        amount: 0,
        renewalDate: new Date(),
      });

    })


  }

  if(loading) {
    return(
      <Flex direction={'column'} justifyContent="center" alignItems={'center'} p="16px 0px">
        <Spinner size='xl' />
      </Flex>
    )
  }

  return (
    <Flex 
      direction={'column'} 
      justifyContent="center" 
      alignItems={'center'} 
      p="16px 0px"
      maxWidth={1500}
    >
      <Box mb={5} fontSize={'22'}>My Subscriptions</Box>
      <TableContainer width={'1000px'}>
        <Table variant='striped' colorScheme='teal'>
          <Thead>
            <Tr>
              <Th>#</Th>
              <Th>Name</Th>
              <Th>Amount</Th>
              <Th>Renewal Date</Th>
              <Th>Edit</Th>
              <Th>Remove</Th>
            </Tr>
          </Thead>
          <Tbody>
            {
              subscriptions.map((val: ISubscription, idx: number) => {
                return(
                  <Tr key={val.id}>
                    <Td>{idx}</Td>
                    <Td>
                      {
                        nowEdit == null || nowEdit !== val.id ? (
                          val.name
                        ) : (
                          <>
                            <Input 
                              border={'1px solid gray'} 
                              focusBorderColor='pink.400' 
                              htmlSize={6} 
                              width='auto' 
                              color='teal' 
                              value={nowEditValue.name} 
                              onChange={({ target: { name, value } }: React.ChangeEvent<HTMLInputElement>) => { 
                                setNowEditValue(prev => ({...prev, [name]: value})) 
                              }} 
                            />
                          </>
                        )
                      }
                    </Td>
                    <Td>
                      {
                        nowEdit == null || nowEdit !== val.id ? (
                          val.amount
                        ) : (
                          <>
                            <Input 
                              border={'1px solid gray'} 
                              focusBorderColor='pink.400' 
                              htmlSize={6} width='auto' 
                              color='teal' 
                              value={nowEditValue.amount} 
                              onChange={({ target: { name, value } }: React.ChangeEvent<HTMLInputElement>) => { 
                                setNowEditValue(prev => ({...prev, [name]: value}))
                              }} 
                            />
                          </>
                        )
                      }
                    </Td>
                    <Td>
                      {
                        nowEdit == null || nowEdit !== val.id ? (
                          val.renewalDate.toString()
                        ) : (
                          <DatePicker
                            name="renewalDate"
                            className="my-datepicker"
                            selected={editSelectedDate}
                            onChange={handleEditDateChange}
                            placeholderText="Wybierz datę"
                          />
                        )
                      }
                    </Td>
                    <Td>
                      {
                        nowEdit == null || nowEdit !== val.id ? (
                          <Button 
                            leftIcon={<MdBuild />} 
                            colorScheme='pink' 
                            variant='outline' 
                            onClick={() => handleEditSubscription(val.id, val.name) } 
                          >
                            Edit
                          </Button>
                        ) : (
                          <>
                            <Button 
                              leftIcon={<MdBuild />} 
                              colorScheme='pink' 
                              variant='outline' 
                              onClick={handleUpdateSubscription}
                            >
                              Update
                            </Button>
                            <Button 
                              leftIcon={<MdBuild />} 
                              colorScheme='pink' 
                              variant='outline' 
                              onClick={handleCancel}
                            >
                              Cancel
                            </Button>
                          </>
                        )
                      }
                    </Td>
                    <Td>
                      <Button 
                        colorScheme='teal' 
                        size='md' 
                        onClick={() => handleRemove(val.id)}
                      >
                        Remove
                      </Button>
                    </Td>
                  </Tr>
                )
              })
            }
          </Tbody>
        </Table>
        <Flex
          mt={3}
          py={3}
        >
          <Text fontSize={18}>
            Create new
          </Text>
        </Flex>
        <Flex>
          <Input 
            border={'1px solid gray'} 
            mr={3} 
            maxWidth={130} 
            name="name" 
            focusBorderColor='pink.400'
            placeholder='name'
            htmlSize={25} 
            width='auto' 
            color='teal' 
            value={newSubscriptionValue.name} 
            onChange={({ target: { name, value }}: React.ChangeEvent<HTMLInputElement>) => { 
              setNewSubscriptionValue(prev => ({...prev, [name]: value})) 
            }} 
          />
          <Input 
            border={'1px solid gray'} 
            mr={3} 
            maxWidth={130} 
            name="amount"
            placeholder='amount'
            focusBorderColor='pink.400' 
            htmlSize={25} 
            width='auto' 
            color='teal' 
            value={newSubscriptionValue.amount === 0 ? "" : newSubscriptionValue.amount}
            onChange={({ target: { name, value }}: React.ChangeEvent<HTMLInputElement>) => { 
              setNewSubscriptionValue(prev => ({...prev, [name]: value})) 
            }} 
          />
          <DatePicker
            name="renewalDate"
            className="my-datepicker"
            selected={selectedDate}
            onChange={handleDateChange}
            placeholderText="Wybierz datę"
          />
          <Button 
            ml={3} 
            leftIcon={<MdBuild />} 
            colorScheme='pink' 
            variant='outline' 
            onClick={handleCreate}
          >
            Create
          </Button>
        </Flex>
      </TableContainer>
    </Flex>
  )
}
