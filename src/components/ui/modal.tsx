"use client"

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "./dialog";

interface ModalProps {
    title: string;
    description: string;
    isOpen: boolean;
    onClose : ()=>void;
    className?: string; 
    children: React.ReactNode
}

export const Modal : React.FC <ModalProps> = ({
    title,
    description,
    isOpen,
    onClose,
    className,
    children
})=>{

    const onChange = (open: boolean)=>{
        //!open && onClose();
    }

    return <Dialog open={isOpen} onOpenChange={onChange} >
                    <DialogContent className={className}>
                        <DialogHeader>
                            <DialogTitle>{title}</DialogTitle>
                            <DialogDescription>{description}</DialogDescription>
                            <div>
                            {children}
                        </div>
                        </DialogHeader>
                        
                    </DialogContent>
            </Dialog>
}