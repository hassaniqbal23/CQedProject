import { Button, Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, Input, Label } from '@/components/ui'
import React from 'react'

interface ModelProps {
    children: React.ReactNode
    openModelButton?: string | React.ReactNode
    header?: boolean | React.ReactNode
    footer?: boolean | React.ReactNode
    isVisible?: boolean
    headerTitle?: string
    headerDescription?: string
    onOkClick?: () => void
    showFooterCloseButton?: boolean
    footerOkButton?: React.ReactNode | string
}

function Model({ children, openModelButton, header, onOkClick, footer, headerTitle, headerDescription, showFooterCloseButton = true, footerOkButton }: ModelProps) {
    return (
        <Dialog>
            <DialogTrigger asChild>
                {openModelButton}
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    {header === true ? (
                        <><DialogTitle>{headerTitle}</DialogTitle>
                            <DialogDescription>
                                {headerDescription}
                            </DialogDescription>
                        </>
                    ) : header}
                </DialogHeader>
                {children}
                {footer === true ? <DialogFooter>
                    {showFooterCloseButton && <DialogClose asChild>
                        <Button type="button" variant={'ghost'}>
                            Close
                        </Button>
                    </DialogClose>}
                    <DialogClose asChild>
                        {typeof footerOkButton === 'string' ? <Button type="button" onClick={onOkClick}>
                            {footerOkButton}
                        </Button> : footerOkButton}

                    </DialogClose>

                </DialogFooter> : footer}
            </DialogContent>
        </Dialog>
    )
}

export default Model