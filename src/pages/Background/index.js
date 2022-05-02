const attachTab = (tabId, ipData) => {
  chrome.storage.sync.get(
    [
      'ipData',
      'timezone',
      'timezoneMatchIP',
      'lat',
      'latitudeMatchIP',
      'lon',
      'longitudeMatchIP',
      'locale',
      'localeMatchIP',
      'userAgent',
    ],
    (result) => {
      if (
        result.timezone ||
        result.lat ||
        result.lon ||
        result.locale ||
        result.userAgent
      ) {
        chrome.debugger.attach({ tabId: tabId }, '1.3', function () {
          if (!chrome.runtime.lastError) {
            // chrome.debugger.sendCommand(
            //   { tabId: tabId },
            //   'Emulation.clearGeolocationOverride'
            // )

            // chrome.debugger.sendCommand(
            //   { tabId: tabId },
            //   'Emulation.clearIdleOverride'
            // )

            if (result.timezone) {
              chrome.debugger.sendCommand(
                { tabId: tabId },
                'Emulation.setTimezoneOverride',
                {
                  timezoneId: result.timezone,
                }
              )
            }

            if (result.locale) {
              chrome.debugger.sendCommand(
                { tabId: tabId },
                'Emulation.setLocaleOverride',
                {
                  locale: result.locale,
                }
              )
            }

            if (result.lat || result.lon) {
              chrome.debugger.sendCommand(
                { tabId: tabId },
                'Emulation.setGeolocationOverride',
                {
                  latitude: result.lat
                    ? parseFloat(result.lat)
                    : result.ipData.lat,
                  longitude: result.lon
                    ? parseFloat(result.lon)
                    : result.ipData.lon,
                  accuracy: 1,
                }
              )
            }

            if (result.userAgent) {
              chrome.debugger.sendCommand(
                { tabId: tabId },
                'Emulation.setUserAgentOverride',
                {
                  userAgent: result.userAgent,
                }
                // { acceptLanguage: "en-CA" },
                // { platform: "WebTV OS" }
              )
              // 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.51 Safari/537.69',
            }
          }
        })
      }
    }
  )
}

chrome.tabs.onUpdated.addListener((tabId, change, tab) => {
  attachTab(tabId)
})

// const attachTabs = (ipData) => {
//   chrome.debugger.getTargets((tabs) => {
//     console.log(tabs);
//     for (const tab in tabs) {
//       if (!tabs[tab].attached && tabs[tab].tabId) {
//           console.log('------------');
//           attachTab(tabs[tab].tabId, ipData);
//       }
//     }
//   });
// };

// fetch('http://ip-api.com/json/')
// .then((response) => response.json())
// .then((ipData) => {});

// Detects if there are posts for current url
// chrome.tabs.onCreated.addListener((tab) => {
//   console.log(tab.id)
//   attachTab(tab.id);
// });

// chrome.tabs.onUpdated.addListener((tabId, change, tab) => {
//   console.log(tabId)
// });

// chrome.tabs.onUpdated.addListener((tabId, change, tab) => {
//   chrome.debugger.attach({ tabId: tabId }, "1.3", function () {
//     if (!chrome.runtime.lastError) {
//       // console.log("attached debugger to tab: " + tabId);
//       // // https://chromedevtools.github.io/devtools-protocol/tot/ - "geolocation"

//       chrome.debugger.sendCommand(
//         { tabId: tabId },
//         "Emulation.setTimezoneOverride",
//         { timezoneId: "Asia/Shanghai" }
//       );
//     }
//   });
// });

// chrome.debugger.sendCommand(
//   { tabId: tabId },
//   "Emulation.setAutomationOverride",
//   {
//     enabled:
//       true,
//   },
// );
