import { createContext, useState } from "react";

export const AppContext = createContext()

export const AppcontextProvider = (props) => {

    const [searchFilter,setSearchFilter] = useState({
        title: '',
        location: ''
    })

    const [isSearching,setIsSearching] = useState(false)

    const value = {
        searchFilter,
        setSearchFilter,
        isSearching,
        setIsSearching
    }

    return (
        <>
         <AppContext.Provider value={value}>
            {props.children}
         </AppContext.Provider>
        </>
    )
}
