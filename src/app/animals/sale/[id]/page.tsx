"use client";

export default function SaleID({params}: {params: {id: string}}){
    return (
        <>
            
            <div className='w-full items-center justify-center p-8 border border-solid rounded-xl text-black text-center my-32 bg-sage2'>
                <p className='text-bold text-5xl'> {params.id} </p>
            </div>
        </>
    )
}