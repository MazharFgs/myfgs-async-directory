import React, { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import axios from "axios";
import { apiUrl, getDirectoryAuthtoken, view_url} from "../../constants";
import PeopleDirectoryCard from "../../form-controls/PeopleDirectoryCard";
import {  animateScroll as scroll } from 'react-scroll';

import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

const PeopleDirectory = ({activeTab}) => {
    const [items, setItems] =useState([])
    const [limit, setLimit] = useState(0)
    const [hasMore, setHasMore] =useState(true)
    const [nextOffset, setNextOffset] = useState(0)
    const [totalCount, setTotalCount] = useState(0);

    useEffect(() => {
        console.log("I am fom user effect", activeTab)

        // 👇️ scroll to top on page load
        // window.scrollTo({left: activeTab, behavior: 'smooth'});
    }, [activeTab]);
    const scrollTo = () => {
        scroll.scrollTo(1000); // Scrolling to 100px from the top of the page.
      };
    useEffect(()=>{
        scrollTo();
      }, [])
  
    const fetchPeopleDirectoy = () => {
        console.log("fetchPeopleDirectoy")
        let config = {
          method: "get",
          maxBodyLength: Infinity,
          url: `${apiUrl}profiles/allProfiles?offset=${nextOffset}`,
          headers: {
            Authorization: getDirectoryAuthtoken(),
            "Content-Type": "application/json",
          },
        };
    
        axios
          .request(config)
          .then((response) => {

            setItems([...items, ...response?.data.response.data])
            setTotalCount(response?.data?.response?.total)
            setNextOffset(response?.data?.response?.offset + response?.data?.response?.limit)
            if((response?.data?.response?.offset + response?.data?.response?.limit) >= response?.data?.response?.total){
                setHasMore(false)
            }
          })
          .catch((error: any) => {
            console.log(error);
          });
      };

    
    console.log("items" , items)
  
    return (
        <>

        <div style={{height: 450}}>

       
          <InfiniteScroll
            dataLength={items.length}
            next={fetchPeopleDirectoy}
            hasMore={hasMore}
            // pullDownToRefresh
            // pullDownToRefreshContent={
            //   <h3 style={{ textAlign: 'center' }}>
            //     &#8595; Pull down to refresh
            //   </h3>
            // }
            // releaseToRefreshContent={
            //   <h3 style={{ textAlign: 'center' }}>&#8593; Release to refresh</h3>
            // }
            // refreshFunction={fetchPeopleDirectoy}
            // scrollableTarget="scrollableDiv"
            // useWindow={false}
            // getScrollParent={() => scrollParentRef}
            loader={ <Box sx={{ display: 'flex', marginTop: 5, justifyContent: "center" }}>
            <CircularProgress />
          </Box>}
          >
             <div
                  className="directory-filter-div"
                  style={{ display: "flex", flexWrap: "wrap" }}>
                
            { items.length > 0 && items.map((i, index) => (
              <div key={index}>
                <PeopleDirectoryCard 
                 person={i}
                 view_url=""
                
                />
              </div>
            ))}
            </div>
          </InfiniteScroll>
          </div>
          {/* </div> */}
        </>
      );
    }
export default PeopleDirectory
