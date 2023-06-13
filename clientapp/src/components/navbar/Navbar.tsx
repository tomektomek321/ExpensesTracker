import { Box, Flex, Link, Text  } from '@chakra-ui/react'
import React from 'react'
import MenuWrapper from './MenuWrapper'

export const Navbar: React.FC = () => {
  return (
    <Flex
      bg="#FFFFFF"
      height="44px"
      padding="6px 12px"
      borderBottom={'1px solid #BBCCFF'}
      justifyContent="space-between"
    >
      <Link href="/">
        <Box width={{ base: "auto", md: "auto" }} mr={2} cursor="pointer">
          <Text fontSize="14pt" fontWeight={700}>
            ExpenseTracker
          </Text>
        </Box>
      </Link>
      <Flex justifyContent="space-between" alignItems="center">
        <MenuWrapper />
      </Flex>
    </Flex>
  )
}
