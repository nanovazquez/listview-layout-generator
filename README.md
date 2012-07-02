ListViewLayoutGenerator
=======================

This is a sample application created in Windows Library for Javascript (WinJS) where you can design any layout for a WinJS.ListView.

Currently it supports the following features:
 * You can enable multi-sized items
 * You can set the **maxRows** property
 * You can add custom width & height for an item / group of items

## How to install

For this to work you need to be in a Windows 8 environment (you can download the setup from [here](http://windows.microsoft.com/en-US/windows-8/download) and the .ISO from [here](http://windows.microsoft.com/en-US/windows-8/iso/))
Also, you need to install Visual Studio 2012. Currently, the RC version can be downloaded from [here](http://www.microsoft.com/visualstudio/11/en-us).

## How to use

1. Open the **ListViewLayoutGenerator.sln** project with Visual Studio 2012.
2. Press F5 to start the application. Once the app is launched, press the right button to display the **appBar**.
3. Click the **Edit ListView** button to display the settings flyout.
4. In this flyout, you have two main panels:
      * In the **ListView Settings** panel, you can enable the multi-size ability of the listView, and you can also set the cellWidth and cellHeight values. Take into account that if multi-size is not enabled, these values will be ignored.
      * In the **Add item styles** panel, you can add styles for the items in the list. Specifically, you can set the item width and height.
5. Press the **Update Layout** button to see your changes.