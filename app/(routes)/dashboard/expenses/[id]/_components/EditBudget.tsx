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
import { BudgetType } from '@/types';
import EmojiPicker from 'emoji-picker-react';
import { Pen } from 'lucide-react';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

function EditBudget({
  budget,
  refreshData,
}: {
  budget: BudgetType;
  refreshData: () => void;
}) {
  const [emojiIcon, setEmojiIcon] = useState('');
  const [openEmojiPicker, setOpenEmojiPicker] = useState(false);
  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');

  useEffect(() => {
    if (budget) {
      setEmojiIcon(budget?.icon);
    }
  }, [budget]);

  const onUpdateBudget = async () => {
    const data = {
      id: budget?.id,
      name,
      amount,
      icon: emojiIcon,
    };

    const response = await fetch('/api/update-budget', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        data,
      }),
    });

    const result = await response.json();

    if (result) {
      refreshData();
      toast('Budget updated!');
    }
  };

  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <Button className='flex gap-2'>
            <Pen />
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Update Budget</DialogTitle>
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
                    defaultValue={budget?.name}
                    onChange={(e) => {
                      setName(e.target.value);
                    }}
                  />
                </div>
                <div className='mt-2'>
                  <h2 className='text-black font-medium my-1'>Amount</h2>
                  <Input
                    placeholder='e.g. 100$'
                    defaultValue={budget?.amount}
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
                onClick={() => onUpdateBudget()}
              >
                Update Budget
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default EditBudget;
