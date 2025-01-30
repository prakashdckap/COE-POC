// klevu search 
// export const klevuSearchApi = () => {
//   let data = null;
//   window && window?.klevu &&
//     klevu?.interactive(async function () {
//       var options = {
//         theme: {
//           modules: {
//             resultInfiniteScroll: {
//               quickSearch: {
//                 enable: true,
//               },
//             },
//           },
//         },
//         url: {
//           landing: "/productSearch?q=",
//           protocol: "https:",
//           search: "https://uscs33v2.ksearchnet.com/cs/v2/search", // your search URL
//         },
//         search: {
//           minChars: 0,
//           searchBoxSelector: "#mobile-search",
//           apiKey: "klevu-171705475123117338", // your Klevu JS API Key
//         },
//         analytics: {
//           apiKey: "klevu-171705475123117338", // your Klevu JS API Key
//         },
//         recordQueries: [
//           {
//             id: "productSearch",
//             typeOfRequest: "SEARCH",
//             settings: {
//               typeOfRecords: ["KLEVU_PRODUCT"],
//             },
//           },
//         ],
//       };

//       data = await klevu(options);
//     });



//   // klevu.interactive(function () {
//   //   klevu({
//   //     powerUp: {
//   //       quick: false,
//   //     },
//   //   });
//   // });
//   // klevu.coreEvent.build({
//   //   name: "setRemoteConfigQuickOverride",
//   //   fire: function () {
//   //     if (
//   //       klevu.getSetting(
//   //         klevu,
//   //         "settings.flags.setRemoteConfigQuick.build",
//   //         false
//   //       )
//   //     ) {
//   //       return true;
//   //     }
//   //     return false;
//   //   },
//   //   maxCount: 150,
//   //   delay: 0,
//   // });

//   // klevu.coreEvent.attach("setRemoteConfigQuickOverride", {
//   //   name: "attachRemoteConfigQuickOverride",
//   //   fire: function () {
//   //     klevu.each(
//   //       klevu.search.extraSearchBox,
//   //       function (key, box) {
//   //         box
//   //           .getScope()
//   //           .chains.events.focus.addBefore("doSearch", {
//   //             name: "resetStoredProducts",
//   //             fire: function (data, scope) {
//   //               if (
//   //                 scope.kScope.data.context
//   //                   .triggeredFromInfiniteScroll
//   //               ) {
//   //               } else {
//   //                 scope.kScope.data.context.triggeredFromInfiniteScroll = false;
//   //                 data.context.existingResponse = [];
//   //                 var allCachedRequests =
//   //                   scope.kScope.cache.getAllCache().request;
//   //                 var queryIds = klevu.getObjectPath(
//   //                   data,
//   //                   "template.queryIds"
//   //                 );
//   //                 if (queryIds && queryIds.length) {
//   //                   klevu.each(queryIds, function (key, value) {
//   //                     klevu.setObjectPath(
//   //                       scope.kScope.data,
//   //                       "localOverrides.query." +
//   //                       value +
//   //                       ".settings.offset",
//   //                       0
//   //                     );
//   //                     if (
//   //                       allCachedRequests &&
//   //                       allCachedRequests.length
//   //                     ) {
//   //                       klevu.each(
//   //                         allCachedRequests,
//   //                         function (key, cacheReq) {
//   //                           if (cacheReq.id === value) {
//   //                             cacheReq.settings.clearCache =
//   //                               new Date().getTime();
//   //                           }
//   //                         }
//   //                       );
//   //                     }
//   //                   });
//   //                 }
//   //               }
//   //             },
//   //           });


//   //         box.getScope().chains.template.events.add({
//   //           name: "attachBoxContainerScrollEvent",
//   //           fire: function (data, scope) {
//   //             var target = klevu.getSetting(
//   //               scope.kScope.settings,
//   //               "settings.search.searchBoxTarget"
//   //             );
//   //             var listContainer = klevu.dom.find(
//   //               ".kuQuickResultsListContainer",
//   //               target
//   //             );
//   //             if (listContainer && listContainer.length) {
//   //               klevu.each(
//   //                 listContainer,
//   //                 function (key, element) {
//   //                   element.onscroll = function (event) {
//   //                     var infiniteScrollOffset = parseInt(
//   //                       klevu.getSetting(
//   //                         scope.kScope.settings,
//   //                         "settings.search.infiniteScrollOffset",
//   //                         200
//   //                       )
//   //                     );
//   //                     if (
//   //                       element.scrollTop +
//   //                       element.parentElement.clientHeight >=
//   //                       element.scrollHeight -
//   //                       infiniteScrollOffset
//   //                     ) {
//   //                       var hasAlreadyTriggered =
//   //                         klevu.getObjectPath(
//   //                           data,
//   //                           "context.triggeredFromInfiniteScroll"
//   //                         );
//   //                       if (!hasAlreadyTriggered) {
//   //                         var activeQueryId = klevu.getObjectPath(
//   //                           scope.kScope.data,
//   //                           "context.activeQueryId"
//   //                         );
//   //                         if (activeQueryId) {
//   //                           var kuLoadMoreBtn = klevu.dom.find(
//   //                             "." +
//   //                             activeQueryId +
//   //                             " .kuLoadMoreBtn",
//   //                             target
//   //                           );
//   //                           if (kuLoadMoreBtn.length) {
//   //                             kuLoadMoreBtn[0].click();
//   //                           }
//   //                         }
//   //                       }
//   //                     }
//   //                   };
//   //                 }
//   //               );
//   //             }
//   //           },
//   //         });


//   //         box
//   //           .getScope()
//   //           .template.setTemplate(
//   //             klevuQuickTemplateFiltersCustom,
//   //             "klevuQuickTemplateFilters",
//   //             true
//   //           );
//   //         box.getScope().chains.template.events.add({
//   //           name: "applyFilters",
//   //           fire: function (data, scope) {
//   //             var target = klevu.getSetting(
//   //               scope.kScope.settings,
//   //               "settings.search.searchBoxTarget"
//   //             );
//   //             klevu.each(
//   //               klevu.dom.find("#kuFilterOpener", target),
//   //               function (key, value) {
//   //                 klevu.event.attach(
//   //                   value,
//   //                   "click",
//   //                   function (event) {
//   //                     document
//   //                       .getElementsByTagName("body")[0]
//   //                       .classList.toggle("filter_opened");
//   //                   }
//   //                 );
//   //               }
//   //             );
//   //           },
//   //         });

//   //       try {
//   //         let arr = [];
//   //         box.getScope().chains.template.events.add({
//   //           name: "addToCartListener",
//   //           fire: function (data, scope) {
//   //             klevu.each(
//   //               klevu.dom.find(".quantity-box"),
//   //               function (key, value) {
//   //                 klevu.event.attach(value, "change", function (event) {
//   //                   let qtyInputData = event.target
//   //                     .closest(".quantity-box")
//   //                     .getElementsByClassName("klevu-qty__input")[0].value;
//   //                   let skuInput =
//   //                     event.target.closest(".quantity-box").dataset.sku;
//   //                   const box_qty =
//   //                     event.target.closest(".quantity-box").dataset.box_qty;
//   //                   let quantityBox = event.target.closest(".quantity-box");
//   //                   let inputElement =
//   //                     quantityBox.getElementsByClassName(skuInput)[0];

//   //                   if (qtyInputData >= 1) {
//   //                     if (box_qty) {
//   //                       let checkinput = qtyInputData / Number(box_qty);
//   //                       if (Number.isInteger(checkinput)) {
//   //                         if (inputElement) {
//   //                           inputElement.value = qtyInputData;
//   //                         }
//   //                       } else {
//   //                         handleStatusMessage(
//   //                           "error",
//   //                           `You can able to add quantity only in multiples of ${box_qty}`
//   //                         );
//   //                         if (qtyInputData > Number(box_qty)) {
//   //                           let roundvalue =
//   //                             qtyInputData - (qtyInputData % Number(box_qty));
//   //                           if (inputElement) {
//   //                             inputElement.value = roundvalue;
//   //                           }
//   //                         } else {
//   //                           if (inputElement) {
//   //                             inputElement.value = Number(box_qty);
//   //                           }
//   //                         }
//   //                       }
//   //                     } else {
//   //                       if (inputElement) {
//   //                         inputElement.value = qtyInputData;
//   //                       }
//   //                     }
//   //                   }

//   //                   const obj = { sku: skuInput, inputQty: inputElement.value };
//   //                   arr.push(obj);
//   //                 });
//   //               }
//   //             );

//   //             klevu.each(klevu.dom.find(".decrement"), function (key, value) {
//   //               klevu.event.attach(value, "click", function (event) {
//   //                 const sku = event.target.closest(".decrement").dataset.sku;
//   //                 const box_qty = event.target.closest(".quantity-box").dataset
//   //                   .box_qty
//   //                   ? event.target.closest(".quantity-box").dataset.box_qty
//   //                   : 1;
//   //                 let quantityBox = event.target.closest(".quantity-box");
//   //                 let inputElement = quantityBox.getElementsByClassName(sku)[0];
//   //                 const obj = {
//   //                   sku: sku,
//   //                   inputQty:
//   //                     inputElement.value > Number(box_qty)
//   //                       ? inputElement.value - Number(box_qty)
//   //                       : Number(box_qty),
//   //                 };
//   //                 if (inputElement.value > Number(box_qty)) {
//   //                   if (inputElement) {
//   //                     inputElement.value =
//   //                       Number(inputElement.value) - Number(box_qty);
//   //                   }
//   //                 }
//   //                 arr.find((ele) => ele.sku === sku)
//   //                   ? arr.forEach((ele) => {
//   //                       if (ele.sku === sku) {
//   //                         if (ele.inputQty > Number(box_qty)) {
//   //                           return (ele.inputQty = Number(inputElement.value));
//   //                         }
//   //                       } else {
//   //                         return ele;
//   //                       }
//   //                     })
//   //                   : arr.push(obj);
//   //                 console.log("arr", arr);
//   //               });
//   //             });

//   //             klevu.each(klevu.dom.find(".increment"), function (key, value) {
//   //               klevu.event.attach(value, "click", function (event) {
//   //                 let sku = event.target.closest(".increment")?.dataset.sku;
//   //                 const box_qty = event.target.closest(".increment").dataset
//   //                   .box_qty
//   //                   ? event.target.closest(".increment").dataset.box_qty
//   //                   : 1;
//   //                 let quantityBox = event.target.closest(".quantity-box");
//   //                 let inputElement = quantityBox.getElementsByClassName(sku)[0];
//   //                 if (inputElement) {
//   //                   inputElement.value =
//   //                     Number(inputElement.value) + Number(box_qty);
//   //                 }
//   //                 const obj = {
//   //                   sku: sku,
//   //                   inputQty:
//   //                     Number(box_qty) +
//   //                     Number(
//   //                       event.target.closest(".increment").dataset.box_qty
//   //                         ? event.target.closest(".increment").dataset.box_qty
//   //                         : 1
//   //                     ),
//   //                 };
//   //                 arr.find((ele) => ele.sku === sku)
//   //                   ? arr.forEach((ele) => {
//   //                       if (ele.sku === sku) {
//   //                         return (ele.inputQty = Number(inputElement.value));
//   //                       } else {
//   //                         return ele;
//   //                       }
//   //                     })
//   //                   : arr.push(obj);
//   //                 console.log("arr", arr);
//   //               });
//   //             });

//   //             klevu.each(klevu.dom.find(".kuAddtocart"), function (key, value) {
//   //               klevu.event.attach(value, "click", function (event) {
//   //                 const sku = event.target.closest(".kuAddtocart").dataset.sku;
//   //                 const main = arr.filter((ele) => ele.sku === sku);
//   //                 const box_qty =
//   //                   event.target.closest(".kuAddtocart").dataset.box_qty;
//   //                 const qty = main[main?.length - 1]?.inputQty
//   //                   ? main[main?.length - 1]?.inputQty
//   //                   : box_qty
//   //                   ? box_qty
//   //                   : 1;
//   //                 const price = event.target.closest(".kuAddtocart").dataset;
//   //                 if (qty >= box_qty) {
//   //                   console.log(
//   //                     "sku, price?.saleprice, qty",
//   //                     sku,
//   //                     price?.saleprice,
//   //                     qty
//   //                   );
//   //                   addToCart(sku, price?.saleprice, undefined, qty);
//   //                   setTimeout(() => {
//   //                     window.scroll({
//   //                       top: 0,
//   //                       left: 0,
//   //                       behavior: "smooth",
//   //                     });
//   //                   }, 800);
//   //                 }
//   //               });
//   //             });
//   //           },
//   //         });
//   //       } catch (error) {
//   //         console.log(error);
//   //       }

//   //       try {
//   //         box
//   //           .getScope()
//   //           .template.setHelper(
//   //             "isScreenWidthSmaller",
//   //             function isScreenWidthSmaller(screenWidth) {
//   //               if (!screenWidth) screenWidth = 767;
//   //               var widthOfScreen =
//   //                 window.innerWidth ||
//   //                 document.documentElement.clientWidth ||
//   //                 document.body.clientWidth;
//   //               return widthOfScreen <= screenWidth;
//   //             }
//   //           );
//   //       } catch (error) {
//   //         console.log(error);
//   //       }



//   //       // klevu.modifyRequest("all", function (data, scope) {
//   //       //   klevu.each(data.request.current.recordQueries, function (key, query) {
//   //       //     var options = 
//   //       //      [{
//   //       //         "key": "GuestRestricted",
//   //       //         "values": "Yes"
//   //       //       }]

//   //       //     klevu.setObjectPath(query, "filters.applyFilters.filters", options);
//   //       //   });
//   //       // });

//   //        klevu.modifyRequest("all", function (data, scope) {
//   //            klevu.each(data.request.current.recordQueries, function (key, query) {
//   //                if (query.id === "productList" && !customerToken) {
//   //                    klevu.setObjectPath(query, "filters.applyFilters.filters", [{
//   //                        "key": "GuestRestricted",
//   //                        "values": [
//   //                            "No"
//   //                        ],
//   //                        "settings": {
//   //                            "singleSelect": "false"
//   //                        }
//   //                    }]);
//   //                }
//   //            });
//   //        })

//   //       // klevu.modifyRequest("all", function (data, scope) {
//   //       //   klevu.each(data.request.current.recordQueries, function (key, query) {
//   //       //     if (!customerToken) {
//   //       //       try {
//   //       //         var groupCondition = {
//   //       //           groupOperator: "ANY_OF",
//   //       //           conditions: [
//   //       //             {
//   //       //               key: "GuestRestricted",
//   //       //               valueOperator: customerToken ? "INCLUDE" : "EXCLUDE",
//   //       //               singleSelect: false,
//   //       //               values: ["Yes"],
//   //       //             },
//   //       //           ],
//   //       //         };
//   //       //         klevu.setObjectPath(
//   //       //           query,
//   //       //           "settings.groupCondition",
//   //       //           groupCondition
//   //       //         );
//   //       //       } catch (error) {
//   //       //         console.log(error);
//   //       //       }
//   //       //     }
//   //       //   });
//   //       // });

//   //       // klevu.modifyRequest("all","productList", {
//   //       //   filters: {
//   //       //     filtersToReturn: {
//   //       //         GuestRestricted: "No"
//   //       //     }
//   //       //   }
//   //       // });


//   //       // klevu.modifyRequest("all", function(data, scope){
//   //       //   console.log('modifyRequest data',data);
//   //       // });

//   //       klevu.modifyRequest("all","productList", {
//   //         "boost": {
//   //               "filters": [
//   //                 {
//   //                   "key": "GuestRestricted",
//   //                   "values": ["No"]
//   //                 }
//   //               ]
//   //             }
//   //       });

//   //       // klevu.modifyRequest("all", function (data, scope) {
//   //       //   klevu.each(data.request.current.recordQueries, function (key, query) {
//   //       //     console.log('query', query)
//   //       //     var options = 
//   //       //       {
//   //       //         "key": "GuestRestricted",
//   //       //         "values": "Yes"

//   //       //       }

//   //       //     klevu.setObjectPath(query, "filters", options);
//   //       //   });
//   //       // });

//   //       // box.getScope().template.setTemplate(klevuQuickTemplateBaseCustom, "klevuTemplateBase", true);
//   //       // box.getScope().template.setTemplate(klevuQuickPageSuggestionsCustom, "klevuQuickPageSuggestions", true);
//   //       // box.getScope().template.setTemplate(klevuQuickProductBlockTitleHeaderCustom, "klevuQuickProductBlockTitleHeader", true);
//   //       // box.getScope().template.setTemplate(klevuTemplateNoResultFoundQuickCustom, "noResultsFoundQuick", true);
//   //     });

//   //     klevu({
//   //       powerUp: {
//   //         quick: true,
//   //       },
//   //     });
//   //   },
//   // });
//   // const klevuQuickTemplateFiltersCustom = `
//   //         <% if(data.query[dataLocal].filters.length > 0 ) { %>
//   //           <button id="kuFilterOpener">Filters</button>
//   //           <div class="kuFilters" role="navigation" data-position="left" aria-label="Product Filters" tabindex="0">
//   //               <% helper.each(data.query[dataLocal].filters,function(key,filter){ %>
//   //                   <% filter.isCollapsed = true;%>
//   //                   <% if(filter.type == "OPTIONS"){ %>
//   //                       <div class="kuFilterBox klevuFilter <%=(filter.multiselect)?'kuMulticheck':''%>" data-filter="<%=filter.key%>" <% if(filter.multiselect){ %> data-singleselect="false" <% } else { %> data-singleselect="true"<% } %>>
//   //                           <div class="kuFilterHead <%=(filter.isCollapsed) ? 'kuExpand' : 'kuCollapse'%>">
//   //                               <% var filter_label = (filter.label=="klevu_price") ? "price" : filter.label; %>
//   //                               <%=helper.translate(filter_label)%>
//   //                           </div>
//   //                           <div data-optionCount="<%= filter.options.length %>" class="kuFilterNames <%=(filter.isCollapsed) ? 'kuFilterCollapse' : ''%>">
//   //                               <ul>
//   //                                   <% helper.each(filter.options,function(key,filterOption){ %>
//   //                                       <li <% if(filterOption.selected ==true) { %> class="kuSelected"<% } %>>
//   //                                           <a 
//   //                                               target="_self" 
//   //                                               href="#" 
//   //                                               title="<%=helper.escapeHTML(filterOption.name)%>" 
//   //                                               class="klevuFilterOption<% if(filterOption.selected ==true) { %> klevuFilterOptionActive<% } %>" 
//   //                                               data-value="<%=helper.escapeHTML(filterOption.value)%>"
//   //                                               data-name="<%=helper.escapeHTML(filterOption.name)%>"
//   //                                           >
//   //                                               <span class="kuFilterIcon"></span>
//   //                                               <span class="kufacet-text"><%=filterOption.name%></span>
//   //                                               <% if(filterOption.selected ==true) { %>
//   //                                                   <span class="kuFilterCancel">X</span>
//   //                                               <% } else { %>
//   //                                                   <span class="kuFilterTotal"><%=filterOption.count%></span>
//   //                                               <% } %>
//   //                                           </a>
//   //                                       </li>

//   //                                   <%  }); %>
//   //                               </ul>
//   //                               <% if(filter.options.length > 5 ) { %>
//   //                                   <div class="kuShowOpt" tabindex="-1">
//   //                                       <span class="kuFilterDot"></span><span class="kuFilterDot"></span><span class="kuFilterDot"></span>
//   //                                   </div>
//   //                               <% } %>
//   //                           </div>
//   //                       </div>
//   //                   <% } else if(filter.type == "SLIDER")  { %>
//   //                       <div class="kuFilterBox klevuFilter" data-filter="<%=filter.key%>">
//   //                           <div class="kuFilterHead <%=(filter.isCollapsed) ? 'kuExpand' : 'kuCollapse'%>">
//   //                               <% var filter_label = (filter.label=="klevu_price") ? "price" : filter.label; %>
//   //                               <%=helper.translate(filter_label)%>
//   //                           </div>
//   //                           <div class="kuFilterNames sliderFilterNames <%=(filter.isCollapsed) ? 'kuFilterCollapse' : ''%>">                           
//   //                                 <div class="kuPriceSlider klevuSliderFilter" data-query = "<%=dataLocal%>">
//   //                                     <div data-querykey = "<%=dataLocal%>" class="noUi-target noUi-ltr noUi-horizontal noUi-background kuSliderFilter kuPriceRangeSliderFilter<%=dataLocal%>"></div>
//   //                                 </div>
//   //                           </div>
//   //                       </div>
//   //                   <% } else if (filter.type == "RATING")  { %>
//   //                       <div class="kuFilterBox klevuFilter <%=(filter.multiselect)?'kuMulticheck':''%>" data-filter="<%=filter.key%>" <% if(filter.multiselect){ %> data-singleselect="false" <% } else { %> data-singleselect="true"<% } %>>
//   //                           <div class="kuFilterHead <%=(filter.isCollapsed) ? 'kuExpand' : 'kuCollapse'%>">
//   //                               <%=helper.translate(filter.label)%>
//   //                           </div>
//   //                           <div data-optionCount="<%= filter.options.length %>" class="kuFilterNames <%= (filter.options.length < 5 ) ? 'kuFilterShowAll': '' %> <%=(filter.isCollapsed) ? 'kuFilterCollapse' : ''%>">
//   //                               <ul>
//   //                                   <% helper.each(filter.options,function(key,filterOption){ %>
//   //                                       <li <% if(filterOption.selected ==true) { %> class="kuSelected"<% } %>>
//   //                                           <a 
//   //                                               target="_self" 
//   //                                               href="#" 
//   //                                               title="<%=helper.escapeHTML(filterOption.name)%>" 
//   //                                               class="klevuFilterOption<% if(filterOption.selected ==true) { %> klevuFilterOptionActive<% } %>" 
//   //                                               data-value="<%=helper.escapeHTML(filterOption.value)%>"
//   //                                               data-name="<%=helper.escapeHTML(filterOption.name)%>"
//   //                                           >
//   //                                               <span class="kuFilterIcon"></span>
//   //                                               <span class="kufacet-text">
//   //                                                   <div class="klevuFacetStars">
//   //                                                       <div class="klevuFacetRating" style="width:<%=(20*Number(filterOption.name))%>%;"></div>
//   //                                                   </div>
//   //                                               </span>
//   //                                               <% if(filterOption.selected ==true) { %>
//   //                                                   <span class="kuFilterCancel">X</span>
//   //                                               <% } else { %>
//   //                                                   <span class="kuFilterTotal"><%=filterOption.count%></span>
//   //                                               <% } %>
//   //                                           </a>
//   //                                       </li>

//   //                                   <%  }); %>
//   //                               </ul>
//   //                           </div>
//   //                       </div>
//   //                   <% } else { %>
//   //                       <!-- Other Facets -->
//   //                   <% } %>
//   //               <% }); %>

//   //               <!-- <div class="kuFiltersFooter">
//   //                   <a target="_self" href="javascript:void(0)" class="kuBtn kuFacetsSlideOut kuMobileFilterCloseBtn" role="button" tabindex="0" area-label=""><%=helper.translate("Close")%></a>
//   //                 </div> -->


//   //           </div>
//   //           <% } %>
//   //         `;

//   // const klevuQuickProductBlockCustom = `
//   //         <% 
//   //             var updatedProductName = dataLocal.name;
//   //             if(klevu.search.modules.kmcInputs.base.getSkuOnPageEnableValue()) {
//   //                 if(klevu.dom.helpers.cleanUpSku(dataLocal.sku)) {
//   //                     updatedProductName += klevu.dom.helpers.cleanUpSku(dataLocal.sku);
//   //                 }
//   //             }
//   //         %>
//   //         <%=console.log(dataLocal)%>
//   //         <li ku-product-block data-id="<%=dataLocal.id%>" class="klevuProduct <%=dataLocal.GuestRestricted=="Yes" ? "GuestRestricted-product": "Not-GuestRestricted-product" %>">
//   //             <a title="" target="_self" href="<%=dataLocal.url%>" data-id="<%=dataLocal.id%>"  class="klevuQuickProductInnerBlock trackProductClick kuTrackRecentView">
//   //                 <div class="klevuProductItemTop">
//   //                     <div class="klevuQuickImgWrap">
//   //                         <div class="klevuQuickDiscountBadge"><strong><%=dataLocal.stickyLabelHead%></strong></div>
//   //                         <img src="<%=dataLocal.image%>" origin="<%=dataLocal.image%>" onerror="klevu.dom.helpers.cleanUpProductImage(this)" alt="<%=updatedProductName%>" />
//   //                         <div class=" Spec_sheet <%=dataLocal.spec_sheet!='' ? "there_spec_sheet" : "NO_spec_sheet" %>">
//   //                            <a target="_blank" href='<%=dataLocal.spec_sheet%>' class='Spec_sheet_button'><span class='Spec_sheet_icon'><span>Spec sheet</a>
//   //                        </div>
//   //                     </div>
//   //                 </div>

//   //                 <div class="klevuProductItemBottom">
//   //                     <div class="klevuQuickProductDescBlock">
//   //                        <div>
//   //                         <h1 class="klevuQuickProductName kuClippedOne brand_name"><%=dataLocal.dds_brand_name%></h1>
//   //                         <a title="" target="_self" href="<%=dataLocal.url%>" data-id="<%=dataLocal.id%>"  class="">
//   //                         <h1 class="klevuQuickProductName kuClippedtwo product_name"><%=dataLocal.name%></h1>
//   //                         <h2 class="klevuQuickProductName kuClippedOne product_sku"> Mfr Model # <span><%=dataLocal.dds_manufacturer_catalog_number%></span></h1>
//   //                         <h2 class="klevuQuickProductName kuClippedOne product_sku">Item # <span><%=dataLocal.sku%></span></h1>
//   //                         </a>
//   //                       </div>
//   //                       <a title="" target="_self" href="<%=dataLocal.url%>" data-id="<%=dataLocal.id%>"  class="klevu-product-desc">
//   //                       <div class="klevu-desc-l2 kuClippedtwo"> <%=dataLocal.shortDesc%></div>
//   //                       </a>
//   //                       <div class="card_footer">
//   //                       <div data-sku="<%= dataLocal.sku %>" data-box_qty="<%= dataLocal.box_qty %>" class="quantity-box">
//   //                        <button type="button" data-sku="<%= dataLocal.sku %>" class="decrement">
//   //                            -
//   //                        </button>
//   //                         <input type="number" name="quantity" id="quantity" class="klevu-qty__input <%= dataLocal.sku %>" min="<%=dataLocal.box_qty ? dataLocal.box_qty :1%>" value="<%=dataLocal.box_qty ? dataLocal.box_qty :1%>">
//   //                          <button type="button" data-sku="<%= dataLocal.sku %>" data-box_qty="<%= dataLocal.box_qty %>" class="increment">
//   //                           +
//   //                          </button>
//   //                        </div>
//   //                          <div class="kuRECSItemBottom">
//   //                          <button data-id="<%= dataLocal.id %>" data-qty="1" data-url="<%= dataLocal.url %>" data-sku="<%= dataLocal.sku %>" data-box_qty="<%= dataLocal.box_qty %>" data-salePrice="<%= dataLocal.salePrice %>"  class="kuAddtocart" data-class>Add to Cart</button>
//   //                        </div>
//   //                       </div>
//   //                       <h3 class="stock_status"><%=dataLocal.in_stock=='Yes' ? "<span class='in-stock'>In Stock <span class='in-stock-dot'></span></span>" : "<span>AVAILABLE FOR BACKORDER <span class='out-stock'></span></span>" %></h3> 
//   //                       <div class="klevuQuickProductDesc kuClippedOne">
//   //                           <div class="klevuSpectxt"><%=dataLocal.summaryAttribute%><span><%=dataLocal.stickyLabelText%></span></div>
//   //                       </div>
//   //                         <div class="klevuQuickProductDesc kuClippedOne">
//   //                             <div class="klevuSpectxt"><%=dataLocal.summaryAttribute%><span><%=dataLocal.stickyLabelText%></span></div>
//   //                         </div>
//   //                         <% if(dataLocal.inStock && dataLocal.inStock != "yes") { %>
//   //                             <%=helper.render('quickProductStock', scope, data, dataLocal) %>              
//   //                         <% } else { %>
//   //                         <% if(klevu.search.modules.kmcInputs.base.getShowPrices()) { %>
//   //                             <div class="klevuQuickProductPrice kuClippedOne">
//   //                                 <%
//   //                                     var kuTotalVariants = klevu.dom.helpers.cleanUpPriceValue(dataLocal.totalVariants);
//   //                                     var kuStartPrice = klevu.dom.helpers.cleanUpPriceValue(dataLocal.startPrice,dataLocal.currency);
//   //                                     var kuSalePrice = klevu.dom.helpers.cleanUpPriceValue(dataLocal.salePrice,dataLocal.currency);
//   //                                     var kuPrice = klevu.dom.helpers.cleanUpPriceValue(dataLocal.price,dataLocal.currency);
//   //                                 %>
//   //                                 <% if(!Number.isNaN(kuTotalVariants) && !Number.isNaN(kuStartPrice)) { %>                                
//   //                                     <div class="klevuQuickSalePrice kuStartPrice">
//   //                                         <span class="klevuQuickPriceGreyText"><%=helper.translate("Starting at")%></span>
//   //                                         <span><%=helper.processCurrency(dataLocal.currency,parseFloat(dataLocal.startPrice))%></span>                                
//   //                                     </div>
//   //                                 <% } else if(!Number.isNaN(kuSalePrice) && !Number.isNaN(kuPrice) && (kuPrice > kuSalePrice)){ %>
//   //                                     <span class="klevuQuickOrigPrice">
//   //                                         <%= helper.processCurrency(dataLocal.currency,parseFloat(dataLocal.price)) %>
//   //                                     </span>
//   //                                     <span class="klevuQuickSalePrice klevuQuickSpecialPrice">
//   //                                         <%=helper.processCurrency(dataLocal.currency,parseFloat(dataLocal.salePrice))%>
//   //                                     </span>
//   //                                 <% } else if(!Number.isNaN(kuSalePrice)) { %>
//   //                                     <span class="klevuQuickSalePrice">
//   //                                         <%= helper.processCurrency(dataLocal.currency,parseFloat(dataLocal.salePrice)) %>
//   //                                     </span>
//   //                                 <% } else if(!Number.isNaN(kuPrice)) { %>
//   //                                     <span class="klevuQuickSalePrice">
//   //                                         <%= helper.processCurrency(dataLocal.currency,parseFloat(dataLocal.price)) %>
//   //                                     </span>
//   //                                 <% } %>
//   //                             </div>
//   //                             <%=helper.render('searchResultProductVATLabelQuick', scope, data, dataLocal) %>
//   //                             <% } %>
//   //                         <% } %>
//   //                         <%=helper.render('klevuQuickProductRating',scope,data,dataLocal) %>
//   //                     </div>
//   //                 </div>
//   //                 <div class="kuClearLeft"></div>
//   //             </a>
//   //             <%=helper.render('quickSearchProductAddToCart',scope,data,dataLocal) %>     
//   //         </li>`;

//   // klevu.interactive(function () {
//   //   klevu({
//   //     powerUp: {
//   //       landing: false,
//   //       catnav: false,
//   //       quick: false,
//   //     },
//   //   });
//   // });

//   // // Quick Search
//   // klevu.coreEvent.build({
//   //   name: "setRemoteConfigQuickOverride",
//   //   fire: function () {
//   //     if (
//   //       klevu.getSetting(
//   //         klevu,
//   //         "settings.flags.setRemoteConfigQuick.build",
//   //         false
//   //       )
//   //     ) {
//   //       return true;
//   //     }
//   //     return false;
//   //   },
//   //   maxCount: 150,
//   //   delay: 100,
//   // });

//   // klevu.coreEvent.attach("setRemoteConfigQuickOverride", {
//   //   name: "attachRemoteConfigQuickOverride",
//   //   fire: function () {
//   //     klevu.each(klevu.search.extraSearchBox, function (key, box) {
//   //       box
//   //         .getScope()
//   //         .template.setTemplate(
//   //           klevuQuickProductBlockCustom,
//   //           "klevuQuickProductBlock",
//   //           true
//   //         );
//   //       // box.getScope().template.setTemplate(klevuQuickTemplateBaseCustom, "klevuTemplateBase", true);
//   //       // box.getScope().template.setTemplate(klevuQuickPageSuggestionsCustom, "klevuQuickPageSuggestions", true);
//   //       // box.getScope().template.setTemplate(klevuQuickProductBlockTitleHeaderCustom, "klevuQuickProductBlockTitleHeader", true);
//   //       // box.getScope().template.setTemplate(klevuTemplateNoResultFoundQuickCustom, "noResultsFoundQuick", true);
//   //     });

//   //     klevu({
//   //       powerUp: {
//   //         quick: true,
//   //       },
//   //     });
//   //   },
//   // });

//   // // Landing & Catnav
//   // klevu.coreEvent.build({
//   //   name: "setRemoteConfigLandingOverride",
//   //   fire: function () {
//   //     if (
//   //       klevu.getSetting(
//   //         klevu,
//   //         "settings.flags.setRemoteConfigLanding.build"
//   //       ) ||
//   //       klevu.getSetting(klevu, "settings.flags.setRemoteConfigCatnav.build")
//   //     ) {
//   //       if (
//   //         klevu.getSetting(klevu, "settings.flags.setRemoteConfigLanding.build")
//   //       ) {
//   //         window.pageType = "landing";
//   //         window.setRemoteConfig = "setRemoteConfigLanding";
//   //       }
//   //       if (
//   //         klevu.getSetting(klevu, "settings.flags.setRemoteConfigCatnav.build")
//   //       ) {
//   //         window.pageType = "catnav";
//   //         window.setRemoteConfig = "setRemoteConfigCatnav";
//   //       }
//   //       return true;
//   //     }
//   //     return false;
//   //   },
//   //   maxCount: 150,
//   //   delay: 100,
//   // });

//   // klevu.coreEvent.attach("setRemoteConfigLandingOverride", {
//   //   name: "attachRemoteConfigLandingOverride",
//   //   fire: function () {
//   //     document.getElementsByTagName("body")[0].classList.add("ku-klevu");

//   //     // TEMPLATES:
//   //     klevu.search[window.pageType]
//   //       .getScope()
//   //       .template.setTemplate(
//   //         klevuLandingTemplateResultsCustom,
//   //         "results",
//   //         true
//   //       );
//   //     klevu.search[window.pageType]
//   //       .getScope()
//   //       .template.setTemplate(
//   //         klevuLandingTemplateProductBlockCustom,
//   //         "productBlock",
//   //         true
//   //       );
//   //     klevu.search[window.pageType]
//   //       .getScope()
//   //       .template.setTemplate(
//   //         klevuLandingTemplateFiltersCustom,
//   //         "filters",
//   //         true
//   //       );
//   //     // klevu.search[window.pageType].getScope().template.setTemplate(klevuLandingTemplateLimitCustom, "limit", true);
//   //     // klevu.search[window.pageType].getScope().template.setTemplate(klevuLandingResultsShowingCustom, "resultsShowing", true);
//   //     // klevu.search[window.pageType].getScope().template.setTemplate(klevuLandingTemplateTabResultsCustom, "tab-results", true);
//   //     // klevu.search[window.pageType].getScope().template.setTemplate(landingPageProductAddToCartCustom, "landingPageProductAddToCart", true);
//   //     // klevu.search[window.pageType].getScope().template.setTemplate(klevuLandingTemplateInfiniteScrollDownCustom, "klevuLandingTemplateInfiniteScrollDown", true);
//   //     // klevu.search[window.pageType].getScope().template.setTemplate(klevuLandingTemplateSortByCustom, "sortBy", true);

//   //     if (window.pageType === "landing") {
//   //       klevu({ powerUp: { landing: true } });
//   //     }
//   //     if (window.pageType === "catnav") {
//   //       klevu({ powerUp: { catnav: true } });
//   //     }
//   //   },
//   // });

//   if (data) {
//     return data;
//   }
// };
