/// <reference path="groupedItems.html" />
(function () {
    "use strict";

    var appView = Windows.UI.ViewManagement.ApplicationView;
    var appViewState = Windows.UI.ViewManagement.ApplicationViewState;
    var nav = WinJS.Navigation;
    var ui = WinJS.UI;
    var utils = WinJS.Utilities;
    var gridLayoutOptions = { groupHeaderPosition: 'top' };

    var groupedItemsPageControl = ui.Pages.define("/pages/groupedItems/groupedItems.html", {

        // This function is called whenever a user navigates to this page. It
        // populates the page elements with the app's data.
        ready: function (element, options) {

            // display only cmdListViewSettings and cmdSampleLayout command
            document.querySelector('#appbar').winControl.showOnlyCommands(['cmdListViewSettings', 'cmdSampleLayout'], true);

            var listView = element.querySelector('.groupeditemslist').winControl;
            listView.groupHeaderTemplate = element.querySelector('.headerTemplate');
            listView.itemTemplate = this.itemRenderer;
            this.initializeLayout(listView, appView.value);
            listView.element.focus();

            // handle events
            document.querySelector('.update-layout-button').addEventListener('click', listViewSettingsUpdated);
            listView.addEventListener('loadingstatechanged', listViewStateChanged);
        },

        // This function updates the ListView with new layouts
        initializeLayout: function (listView, viewState) {
            /// <param name="listView" value="WinJS.UI.ListView.prototype" />

            // the listView does not support snapped mode
            if (viewState != appViewState.snapped) {
                listView.itemDataSource = Data.items.dataSource;
                listView.groupDataSource = Data.groups.dataSource;
                listView.layout = new ui.GridLayout(gridLayoutOptions);
            }
        },

        // This function updates the page layout in response to viewState changes.
        updateLayout: function (element, viewState, lastViewState) {
            /// <param name="element" domElement="true" />
            /// <param name="viewState" value="Windows.UI.ViewManagement.ApplicationViewState" />
            /// <param name="lastViewState" value="Windows.UI.ViewManagement.ApplicationViewState" />

            var listView = document.querySelector('.groupeditemslist').winControl;
            if (lastViewState !== viewState) {
                if (lastViewState === appViewState.snapped || viewState === appViewState.snapped) {
                    var handler = function (e) {
                        listView.removeEventListener('contentanimating', handler, false);
                        e.preventDefault();
                    }
                    listView.addEventListener('contentanimating', handler, false);
                    this.initializeLayout(listView, viewState);
                }
            }
        },

        // This function renders the items in the listView
        itemRenderer: function (itemPromise) {

            return itemPromise.then(function (item) {

                // creates an element to contain the item
                var itemContainer = document.createElement('div');

                // add the item group and the item index to the container className
                var itemGroup = item.data.group.key;
                var itemIndex = Data.getItemsFromGroup(item.data.group).indexOf(item.data);
                itemContainer.className = itemGroup + ' item' + itemIndex;

                // update the item.data values
                item.data.title = 'Item ' + itemIndex;
                
                // add width and height values
                var itemStyle = ItemStylesRepository.getItemStyles(itemGroup, itemIndex);
                itemContainer.style.width = itemStyle.width;
                itemContainer.style.height = itemStyle.height;

                // Render template in container
                var itemTemplate = document.querySelector('.itemTemplate').winControl;
                itemTemplate.render(item.data, itemContainer);

                return { element: itemContainer };
            });
        }
    });

    // This function updates the listView layout according to the values set in the flyout
    function listViewSettingsUpdated() {
        var cellWidthElement = document.querySelector('#editListViewFlyout .cell-width-container .value');
        var cellHeightElement = document.querySelector('#editListViewFlyout .cell-height-container .value');
        var enableCellSpanningElement = document.querySelector('#editListViewFlyout #enableMultipleSizeLayout');
        var maxRowsElement = document.querySelector('#editListViewFlyout .max-rows-container .value')
        var listView = document.querySelector('.groupeditemslist').winControl;

        // update the GridLayout options
        if (cellWidthElement.value && cellHeightElement.value) {
            gridLayoutOptions.groupInfo = {
                enableCellSpanning: enableCellSpanningElement.winControl.checked,
                cellWidth: parseFloat(cellWidthElement.value),
                cellHeight: parseFloat(cellHeightElement.value)
            };
        }

        if (maxRowsElement.value) {
            gridLayoutOptions.maxRows = maxRowsElement.value;
        }

        groupedItemsPageControl.prototype.initializeLayout(listView, appView.value);
    }

    // This function checks if the items were bound and, if that's the case, updates the listView settings fields
    function listViewStateChanged(e) {

        // dataBound
        if (e && e.detail && !e.detail.scrolling) {
            ListViewSettings.updateValues();
        }
    }
})();
