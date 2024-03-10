/*!
 * Copyright 2023, Staffbase GmbH and contributors.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *     http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import React, { ReactElement, useEffect, useState } from "react";
import { BlockAttributes, WidgetApi} from "widget-sdk";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import axios from "axios";
import { apiUrl  } from "./constants";
import SimpleDirectory from "./form-controls/peopleDevelopment/simple-directory"

export interface MyfgsAsyncDirectoryProps extends BlockAttributes {
  widgetApi: WidgetApi;
}

export const MyfgsAsyncDirectory = ({widgetApi} : MyfgsAsyncDirectoryProps): ReactElement | null => {

  const [tabIndex, setTabIndex] = useState(0);
  const [activeTab , setActiveTab]= useState(100)
  

  useEffect(() => {
    widgetApi.getUserInformation().then((user:any) => {
      console.log("users, ", user)
      verifyToken(user);

    });
  }, []);

  const tabOnSelect = (index) => {
    setTabIndex(index)
    setActiveTab(activeTab+1)
  }
  const verifyToken = (info) => {
    const checkDirectoryAuthToken = localStorage.getItem("directoryAuthToken");
    if (checkDirectoryAuthToken) {
      let verifyToken = JSON.stringify({
        // userId: info?.externalID,
        // userId: "00uwskbw25UJUbQfl1t7",
        userId: "00uwsermqyJ8TMhIt1t7",

        token: checkDirectoryAuthToken,
      });

      let config = {
        method: "post",
        maxBodyLength: Infinity,
        url: `${apiUrl}auth/verify`,
        headers: {
          "Content-Type": "application/json",
        },
        data: verifyToken,
      };

      axios
        .request(config)
        .then((response) => {
          if (response.data.success) {
            // setIsLoggedIn(true);
          } else {
            authenticateUser(info);
          }
        })
        .catch((error) => {
          authenticateUser(info);
        });
    } else {
      authenticateUser(info);
    }
  };

  const authenticateUser = (info) => {
    let data = JSON.stringify({
        // userId: info?.externalID,
      //   userId: "00uwskbw25UJUbQfl1t7",
      userId: "00uwsermqyJ8TMhIt1t7",
    });

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: `${apiUrl}auth/login`,
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios
      .request(config)
      .then((response) => {
        // console.log(JSON.stringify(response.data));
        localStorage.setItem("directoryAuthToken", response.data.token);

        localStorage.setItem("loggedEmail", response.data.email);
        // setIsLoggedIn(true);
      })
      .catch((error) => {
        // console.log(error);
      });
  };
  return <>
     <div className="directory-main-div">
        <div className="header-title">
          <div className="back-page-div" style={{ padding: 0 }}>
            <a
              href="https://my.fgsglobal.com/content/page/65d73c0f2a81f60c054103fa"
              className="back-page-url"
            >
              <ArrowBackIosIcon style={{ height: 10, width: 10 }} />
              <span>Home</span>
            </a>
          </div>

          <div className="directory-page-title-name" style={{}}>Directory</div>
        </div>
        <Tabs
            className="dir-tabs"
            selectedIndex={tabIndex}
            onSelect={tabOnSelect}
          >
            <TabList className="dir-tablist">
              <Tab className="dir-tab">People</Tab>
              <Tab className="dir-tab">Knowledge</Tab>
            </TabList>

            <TabPanel>
            <div>
              <SimpleDirectory />
            </div>


            </TabPanel>
              <TabPanel>
              {tabIndex === 1 && (
              <>Business</>
              )}
              </TabPanel>
              </Tabs>
  </div>
  </>
};

