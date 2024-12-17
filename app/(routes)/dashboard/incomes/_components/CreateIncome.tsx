'use client';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { useUser } from '@clerk/nextjs';
import EmojiPicker from 'emoji-picker-react';
import { useState } from 'react';
import { toast } from 'sonner';

function CreateIncome({ refreshData }: { refreshData: () => void }) {
  const { user } = useUser();
  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');
  const [emojiIcon, setEmojiIcon] = useState('😀');
  const [openEmojiPicker, setOpenEmojiPicker] = useState(false);

  const onCreateIncome = async () => {
    const data = {
      name,
      amount,
      createdBy: user?.primaryEmailAddress?.emailAddress as string,
      icon: emojiIcon,
    };

    const response = await fetch('/api/create-income', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        data,
      }),
    });

    console.log('data', data);
    const result = await response.json();
    console.log('result,', result);

    if (result) {
      refreshData();
      toast('New income source added!');
    }
  };

  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <div
            className='bg-slate-100 p-10 rounded-2xl
            items-center flex flex-col border-2 border-dashed
            cursor-pointer hover:shadow-md'
          >
            <h2 className='text-3xl'>+</h2>
            <h2>Add New Income Source</h2>
          </div>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Income Source</DialogTitle>
            <DialogDescription>
              <div className='mt-5'>
                <Button
                  variant='outline'
                  className='text-lg'
                  onClick={() => setOpenEmojiPicker(!openEmojiPicker)}
                >
                  {emojiIcon}
                </Button>
                <div className='absolute z-20'>
                  <EmojiPicker
                    open={openEmojiPicker}
                    onEmojiClick={(e) => {
                      setEmojiIcon(e.emoji);
                      setOpenEmojiPicker(false);
                    }}
                  />
                </div>
                <div className='mt-2'>
                  <h2 className='text-black font-medium my-1'>Source Name</h2>
                  <Input
                    placeholder='e.g. Youtube'
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className='mt-2'>
                  <h2 className='text-black font-medium my-1'>Montly Amount</h2>
                  <Input
                    type='number'
                    placeholder='e.g. 5000$'
                    onChange={(e) => setAmount(e.target.value)}
                  />
                </div>
              </div>
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className='sm:justify-start'>
            <DialogClose asChild>
              <Button
                disabled={!(name && amount)}
                onClick={() => onCreateIncome()}
                className='mt-5 w-full rounded-full'
              >
                Add Income Source
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default CreateIncome;
