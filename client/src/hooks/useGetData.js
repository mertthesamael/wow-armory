import { useQuery } from "react-query";
import axios from "axios";



export const useGetData = (token,region) => {
    const fetchData = (token,region) => {
        
        return axios(`https://${region}.api.blizzard.com/data/wow/realm/index?namespace=dynamic-${region}&locale=en_US&access_token=${token}`)
        
    }

    return useQuery(["Profile Data", token,region] ,() => fetchData(token,region),{
        select: (data) => data.data,
      
    })
}


