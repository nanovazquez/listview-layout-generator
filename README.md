ListViewLayoutGenerator
=======================

This is a Metro style application created using the Windows Library for Javascript (WinJS) where you can design custom layouts for a WinJS.UI.ListView.

Currently it supports the following features:
 * You can enable **multi-sized** items
 * You can modify the **maxRows** property of the listView
 * You can set **custom width & height** for an item / group of items
 * **New!** You can add several item styles at once (separated by a comma)
 * **New!** Using item no. and group.no, you can style a single item in the list
 * **New!** Use asterisk/star to add styles for **all** the items or groups
 
## How to install

This appplication works in a Windows 8 environment.
 * You can download the setup from [here](http://windows.microsoft.com/en-US/windows-8/download)
 * Or you can download the .ISO from [here](http://windows.microsoft.com/en-US/windows-8/iso/)

Also, you need to install Visual Studio 2012.
 * Currently, the RC version can be downloaded from [here](http://www.microsoft.com/visualstudio/11/en-us).

## How to use

1. Open the **ListViewLayoutGenerator.sln** project with Visual Studio 2012.
2. Press F5 to start the application. Once the app is launched, press the right button to display the **appBar**.
3. Click the **Edit ListView** button to display the settings flyout.
4. In this flyout, you have two main panels:
 * In the **ListView Settings** panel, you can enable the multi-size ability of the listView, and set the cellWidth and cellHeight values. Take into account that if multi-size is not enabled, these values will be ignored.
 * In the **Add item styles** panel, you can add styles for the items in the list. Specifically, you can set the item width and height.

5. Press the **Update Layout** button to see your changes. 


Below is a sample of what you can achieve:

![sample application](https://github.com/nanovazquez/listview-layout-generator/raw/master/sample.png)