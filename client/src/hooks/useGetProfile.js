import { useQuery } from "react-query";
import axios from "axios";



export const useGetProfile = (token,charName,region,realm,method) => {
    
    const fetchProfileData = (token,charName,region,realm,method) => {
        
        return axios(`https://eu.api.blizzard.com/profile/wow/character/${realm}/${charName}/${method}?namespace=profile-${region}&locale=en_US&access_token=${token}`)
        
    }
    return useQuery(["Profile Data", token,charName,region,realm,method] ,() => fetchProfileData(token,charName,region,realm,method),{
        select: (data) => data?.data,
      
    })

    

}


