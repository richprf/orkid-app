import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import React from 'react'

const Habits = () => {

    const {data} = useQuery({
        queryKey: ["habits"],
        queryFn : async () => {
           const res = await axios.get('http://localhost:3001/api/habit')
           return res.data
        }
    })

    console.log("data" , data)

  return (
    <div>
        {data.map((item:any , index:number) => (
            <div key={index}>
                {item.title}
                </div>
        ))}
    </div>
  )
}

export default Habits