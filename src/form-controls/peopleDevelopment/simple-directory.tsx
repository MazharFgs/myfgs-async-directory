import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { apiUrl, getDirectoryAuthtoken, view_url} from "../../constants";
import PeopleDirectoryCard from "../../form-controls/PeopleDirectoryCard";
import CircularProgress from '@mui/material/CircularProgress';
import AsyncSearch from "../async-search"

const SimpleDirectory = () => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [hasMore, setHasMore] =useState(true)
  const [nextOffset, setNextOffset] = useState(0)
  const [searchedValue, setSearchedValue] = useState("")

  useEffect(() => {
    console.log("searchedValue main"  , searchedValue)
    const loadUsers = async () => {
      try {
        setIsLoading(true);
        let fetchUrl="";
        if(searchedValue.length > 2) {
             fetchUrl= `${apiUrl}profiles/allProfiles?limit=20&offset=${nextOffset}&name=${searchedValue}`
        }else{
             fetchUrl= `${apiUrl}profiles/allProfiles?limit=20&offset=${nextOffset}`;

        }

        const response = await axios.get(
            fetchUrl,
          {
            headers: {
                Authorization: getDirectoryAuthtoken(),
              "Content-Type": "application/json",
            } 
        }
        );
        if(nextOffset > 0) {
            setUsers((users) => [...users, ...response?.data.response.data]);
        }else{
            setUsers([ ...response?.data.response.data]);
        }
        if((response?.data?.response?.offset + response?.data?.response?.limit) >= response?.data?.response?.total){
            setHasMore(false)
        }
        setErrorMsg('');
      } catch (error) {
        setErrorMsg('Error while loading data. Try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    loadUsers();
  }, [searchedValue, nextOffset]);

  const loadMore = () => {
    setIsLoading(true);

    setNextOffset(nextOffset + 10);
  };

  const handleSearchedValue = (val)=>{
    if(searchedValue !== val)
    {
        setIsLoading(true); 
        setSearchedValue(val)
        setUsers([])
         setNextOffset(0)
         setHasMore(true)
    }
   
    }
  return (
    <>
    <div
                  className="directory-search-main-div"
                  style={{ display: "flex", flexWrap: "wrap" }}
                >
                  <div
                    className="directory-select-seach"
                    style={{ width: "70%", textAlign: "center" }}
                  >
                    <div
                      className="directory-lable-search-hightlight"
                      style={{ width: "100%" }}
                    >
                      <label style={{ float: "left" }}>Find a Person</label>
                    </div>

                    <div
                      className="highlight-search-div"
                      style={{ width: "80%" }}
                    >
                          <AsyncSearch searchedValue={handleSearchedValue} />

                    </div>
                  </div>
                </div>


    <div
    className="directory-filter-div"
    style={{ display: "flex", flexWrap: "wrap" }}>
      {users && users.map((user , index) => (<div key={index}>
                <PeopleDirectoryCard 
                 person={user}
                 view_url={view_url}
                
                />
              </div>
              )
      
      )}
   
    </div>
       {/* {errorMsg && <p className="errorMsg">{errorMsg}</p>} */}
       { (hasMore && !isLoading) &&  <div className="load-more-option">
           <button onClick={loadMore} className="btn-grad">
            Load More
           </button>
         </div>}
         {isLoading && <div style={{display: 'flex' , justifyContent : "center"}}><CircularProgress /></div>}
         </>
  );
};

export default SimpleDirectory;