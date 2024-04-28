import * as React from 'react'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '../../ui'
import { TrendingUp } from 'lucide-react'


interface IStaticCardProps {
    link: string
    title: string
    number: string | number
    percentage: string | number
    dropdown?: boolean
    dropdownOptions?: {
        label: string;
        value: string;
        action: () => void
    }
}
function StaticCard({ title, link, number, percentage, dropdown }: IStaticCardProps) {
    return (
        <Link href={link}>
            <Card className='w-full h-[159px]' >
                <CardHeader className='p-4 border-b' >
                    <CardTitle className='font-semibold' >
                        {title}
                    </CardTitle>
                    {dropdown ? 'dropdownHere' : ''}
                </CardHeader>
                <CardContent className='flex items-end h-3/4' >
                    <div className='flex justify-between items-center w-full' >
                        <h1 className='text-2xl font-bold' >{number}</h1>
                        <div className='p-1 rounded-full flex items-center justify-center gap-2 border border-success bg-success-50 text-success text-sm' >
                            <TrendingUp className='w-1/3' />
                            <p>{percentage}%</p>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </Link>
    )
}

export { StaticCard }