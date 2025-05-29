"use client";
import React from 'react'
import { Provider } from 'react-redux';
import myStore from '@/script/store';

function StoreProvider({
    children,
  }: {
    children: React.ReactNode
  }) {
  return (
    <Provider store={myStore}>{children}</Provider>
  )
}

export default StoreProvider