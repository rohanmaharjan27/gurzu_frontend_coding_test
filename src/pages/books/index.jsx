import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getBooksAction } from 'src/store/actions/bookActions';

export default function Index() {

    const dispatch = useDispatch();

    const {bookList,loading}=useSelector((state)=>state.bookList);

    console.log("bookList",loading,bookList);

    useEffect(() => {
        dispatch(getBooksAction());
        return () => {
           // cleanup
        }
    }, [dispatch])
    
    return (
        <div>
            this is books market page
        </div>
    )
}