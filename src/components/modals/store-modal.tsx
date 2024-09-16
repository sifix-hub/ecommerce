"use client";

import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useStoreModal } from '@/hooks/use-store-modal';
import { Modal } from "@/components/ui/modal";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { useState, useTransition } from 'react';
import axios from 'axios';
import { useAuth } from '@clerk/nextjs';

const formSchema = z.object({
    name: z.string().min(1),
});

export const StoreModal = () => {
    const storeModal = useStoreModal();
    const [loading, setLoading] = useState(false);
    const [isPending, startTransition] = useTransition();
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
        },
    });

    const { getToken } = useAuth(); // Use Clerk to get authentication token

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        const token = await getToken(); // Get token from Clerk

        startTransition(async () => {
            try {
                const response = await axios.post('/api/store', values, {
                    headers: {
                        Authorization: `Bearer ${token}`, // Send token in Authorization header
                    },
                });
                console.log(response.data);
            } catch (error) {
                console.error("Failed to submit form", error);
            }
        });
    };

    return (
        <Modal
            title="Create store"
            description="Add a new store to manage products and categories"
            isOpen={storeModal.isOpen}
            onClose={storeModal.onClose}
            className='bg-red-50/20'
        >
            <div>
                <div className='space-y-4 py-2 pb-4 '>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)}>
                            <FormField
                                control={form.control}
                                name='name'
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Name</FormLabel>
                                        <FormControl>
                                            <Input placeholder='Ecommerce' {...field} disabled={isPending} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <div className='space-x-2 pt-6 flex items-center justify-end w-full'>
                                <Button variant='outline' onClick={storeModal.onClose} disabled={isPending}>Cancel</Button>
                                <Button type="submit" disabled={isPending}>{isPending ? 'Submitting...' : 'Continue'}</Button>
                            </div>
                        </form>
                    </Form>
                </div>
            </div>
        </Modal>
    );
};
