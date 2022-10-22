import { useQuery } from "react-query";
import axios from "axios";


export const useGetApi = (method, realm, name, region) => {

    const fetchData = (method, realm, name, region) => {
        
        const options = {
            method: 'GET',
            url:'http://localhost:5000/api',
            params:{
              charName:name,
              realm:realm,
              method:method,
              region:region}
          }
          return axios.request(options)
    }

    return useQuery(["Data", method, realm, name, region] ,() => fetchData(method, realm, name, region),{
        select: (data) => data.data.data,
        staleTime: 1000,
        refetchOnWindowFocus: true,
        refetchInterval: 30000,
    })
}
