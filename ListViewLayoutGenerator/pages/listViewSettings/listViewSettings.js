(function () {
    "use strict";

    var ui = WinJS.UI;

    var listViewSettingsPageControl = ui.Pages.define("/pages/listViewSettings/listViewSettings.html", {

        // This function is called whenever a user navigates to this page. It
        // populates the page elements with the app's data.
        ready: function (element, options) {

            // configure the 'add styles' list view
            var listView = document.querySelector('#stylesList').winControl;
            listView.itemDataSource = ItemStylesRepository.dataSource;
            listView.itemTemplate = this.stylesListItemRenderer;
            listView.layout = new WinJS.UI.ListLayout({ 'horizontal': false });

            // handle events
            element.querySelector('#addItem').addEventListener('click', insertItem);
            
        },
        stylesListItemRenderer: function (itemPromise) {

            return itemPromise.then(function (item) {

                // create a container for the item
                var itemContainer = document.createElement('div');

                // bind the template to the item and render it in the container
                var itemTemplate = document.querySelector('#itemStyleTemplate').winControl;
                itemTemplate.render(item.data, itemContainer);

                // attach the 'deleteItem' event properly
                itemContainer.querySelector('#deleteStyle').addEventListener('click', item.data.deleteItem);

                return { element: itemContainer };
            });
        }
    });

    // ListViewSettings menu
    function updateSettingsValues() {
        var listView = document.querySelector('.groupeditemslist').winControl;

        // fill the fields with the current listView settings
        var cellWidthElement = document.querySelector('#editListViewFlyout .cell-width-container .value');
        var cellHeightElement = document.querySelector('#editListViewFlyout .cell-height-container .value');
        var enableCellSpanningElement = document.querySelector('#editListViewFlyout #enableMultipleSizeLayout');
        var maxRowsElement = document.querySelector('#editListViewFlyout .max-rows-container .value')

        cellWidthElement.value = (listView.layout.groupInfo) ? listView.layout.groupInfo.cellWidth : listView.layout._itemWidth;
        cellHeightElement.value = (listView.layout.groupInfo) ? listView.layout.groupInfo.cellHeight : listView.layout._itemHeight;
        enableCellSpanningElement.winControl.checked = (listView.layout.groupInfo) ? listView.layout.groupInfo.enableCellSpanning : cellWidthElement.value != cellHeightElement.value;
        maxRowsElement.value = (listView.layout.maxRows) ? listView.layout.maxRows : '';
    }

    // AddStyles menu
    function insertItem() {

        // collect the data to insert
        var itemsClass = document.querySelector('input.item-class').value;
        var itemsGroups = document.querySelector('input.group-class').value;
        var itemWidth = parseFloat(document.querySelector('input.item-width').value);
        var itemHeight = parseFloat(document.querySelector('input.item-height').value);

        // if width or height is NaN, return
        if (isNaN(itemWidth) || isNaN(itemHeight)) return;

        // get items separated by comma (just in case, replacy common separators with a comma)
        var items = itemsClass.replace(/[,;|\-]/g, ",").split(',');
        var groups = itemsGroups.replace(/[,;|\-]/g, ",").split(',');

        // insert items in the list
        for (var i = 0; i < items.length; i++) {
            var itemClass = items[i].trim() || '*';

            for (var j = 0; j < groups.length; j++) {
                var itemGroup = groups[j].trim() || '*';
                var itemToAdd = {
                    itemClass: itemClass,
                    itemGroup: itemGroup,
                    itemWidth: itemWidth,
                    itemHeight: itemHeight
                };

                ItemStylesRepository.addItem(itemToAdd);
            }
        }
    }

    WinJS.Namespace.define("ListViewSettings", {
        updateValues: updateSettingsValues
    });
})();