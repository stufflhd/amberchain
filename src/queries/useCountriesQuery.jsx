import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchCountries = async () => {
    const response = await axios.get("https://restcountries.com/v3.1/all?fields=name,cca2,flags,idd");

    return response.data
        .filter(country => country.idd && country.idd.root)
        .map(country => ({
            code: country.cca2,
            name: country.name.common,
            flag: country.flags.svg || country.flags.png,
            dialCode: `${country.idd.root}${country.idd.suffixes ? country.idd.suffixes[0] || '' : ''}`,
        }))
        .sort((a, b) => a.name.localeCompare(b.name));
};

export const useCountriesQuery = () => {
    return useQuery({
        queryKey: ["countries"],
        queryFn: fetchCountries,
        staleTime: 1000 * 60 * 60 * 24,
        cacheTime: 1000 * 60 * 60 * 24,
        refetchOnWindowFocus: false,
        retry: 1,
    });
};