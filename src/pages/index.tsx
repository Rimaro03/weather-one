import React, { useEffect, useState } from 'react'
import { Box, Container, Typography } from '@mui/material'
import { useRouter } from 'next/router'

export default function Home() {
  const router = useRouter();
  const place = router.query.place;

  useEffect(() => {
    if (!place || place?.length == 0) {
      router.push('/place')
    }
  }, [])

  return (
    <Container>
      <Box width={'30%'}></Box>
      <Box width={'70%'}></Box>
    </Container>
  )
}
