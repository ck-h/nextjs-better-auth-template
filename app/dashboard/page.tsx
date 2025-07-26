"use client";

import { Button } from '@/components/ui/button';
import { authClient } from '@/lib/auth-client';
import React from 'react'

const DashboardPage = () => {
  const signOut = async () => {
  await authClient.signOut({
  fetchOptions: {
    onSuccess: () => {
      alert("You have been signed out successfully.");
    },
  },
});
  }
  return (
    <div>
      <h1>Dashboard</h1>
      <Button onClick={signOut}>Sign Out</Button>
    </div>
  )
}

export default DashboardPage