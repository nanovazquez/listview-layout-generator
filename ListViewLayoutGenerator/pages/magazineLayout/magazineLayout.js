/// <reference path="groupedItems.html" />
(function () {
    "use strict";

    var appView = Windows.UI.ViewManagement.ApplicationView;
    var appViewState = Windows.UI.ViewManagement.ApplicationViewState;
    var nav = WinJS.Navigation;
    var ui = WinJS.UI;
    var utils = WinJS.Utilities;

    // the listView's settings
    var gridLayoutOptions = {
        groupHeaderPosition: 'left',
        groupInfo: {
            enableCellSpanning: true,
            cellWidth: 1,
            cellHeight: 1,
        },
    };

    var magazineLayoutPageControl = ui.Pages.define("/pages/magazineLayout/magazineLayout.html", {

        // This function is called whenever a user navigates to this page. It
        // populates the page elements with the app's data.
        ready: function (element, options) {

            // hide all appbarIncons, but home
            document.querySelector('#appbar').winControl.showOnlyCommands(['cmdHome'], true);

            var listView = element.querySelector('.groupeditemslist').winControl;
            listView.groupHeaderTemplate = element.querySelector('.headerTemplate');
            listView.itemTemplate = this.itemRenderer;
            this.initializeLayout(listView, appView.value);
            listView.element.focus();
        },

        // This function renders the items in the listView
        itemRenderer: function (itemPromise) {

            return itemPromise.then(function (item) {

                // creates an element to contain the item
                var itemContainer = document.createElement('div');

                // add the item group and the item index to the container className
                var itemGroup = item.data.group.description.toLowerCase().replace(/ /g, '-');
                var itemIndex = Data.getItemsFromGroup(item.data.group).indexOf(item.data);
                itemContainer.className = itemGroup + ' item' + itemIndex;

                // Render template in container
                var itemTemplate = document.querySelector('.itemTemplate').winControl;
                itemTemplate.render(item.data, itemContainer);

                return { element: itemContainer };
            });
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
        }
    });
})();
