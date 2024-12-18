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
import { IncomeType } from '@/types';
import EmojiPicker from 'emoji-picker-react';
import { Pen } from 'lucide-react';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

function EditIncome({
  income,
  refreshData,
}: {
  income: IncomeType;
  refreshData: () => void;
}) {
  const [emojiIcon, setEmojiIcon] = useState('');
  const [openEmojiPicker, setOpenEmojiPicker] = useState(false);
  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');

  useEffect(() => {
    if (income) {
      setEmojiIcon(income?.icon);
    }
  }, [income]);

  const onUpdateIncome = async () => {
    const data = {
      id: income?.id,
      name,
      amount,
      icon: emojiIcon,
    };

    const response = await fetch('/api/update-income', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        data,
      }),
    });

    const result = await response.json();

    if (result) {
      refreshData();
      toast('Income source updated!');
    }
  };

  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <Button className='flex gap-2'>
            <Pen /> Update
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Update Income Source</DialogTitle>
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
                  <h2 className='text-black font-medium my-1'>Name</h2>
                  <Input
                    placeholder='e.g. Home Decor'
                    defaultValue={income?.name}
                    onChange={(e) => {
                      setName(e.target.value);
                    }}
                  />
                </div>
                <div className='mt-2'>
                  <h2 className='text-black font-medium my-1'>Amount</h2>
                  <Input
                    placeholder='e.g. 100$'
                    defaultValue={income?.amount}
                    onChange={(e) => {
                      setAmount(e.target.value);
                    }}
                  />
                </div>
              </div>
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className='sn:justify-start'>
            <DialogClose asChild>
              <Button
                className='mt-5 w-full'
                disabled={!(name && amount)}
                onClick={() => onUpdateIncome()}
              >
                Update Income Source
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default EditIncome;
