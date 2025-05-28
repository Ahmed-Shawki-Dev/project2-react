import {Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
import { ReactNode } from 'react';
// import { useState } from 'react'
// import Button from '../UI/Button';
interface IProps{
    isOpen:boolean;
    close:()=>void;
    title?:string;
    children:ReactNode;
}

const Modal=({isOpen,close,title,children}:IProps) =>{
return (
    <>


      <Dialog open={isOpen} as="div" className="relative z-10 focus:outline-none" onClose={close} __demoMode>
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex items-center justify-center min-h-full p-4 backdrop-blur-[1px]">
            <DialogPanel
              transition
              className=" shadow-xl w-full max-w-md rounded-xl bg-white p-6 duration-300 ease-out data-closed:transform-[scale(95%)] data-closed:opacity-0 "
            >
              <DialogTitle as="h3" className="font-medium text-black text-base/7">
              {title}
              </DialogTitle>
              <div className="mt-4">

          {children}
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </>
  )
}

export default Modal;
