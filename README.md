Wohnungen_data_grabber
======================

A data scrapper written with Google app script. Currently pulls data on room availability from all the student apartments available offered at [Studentenwerk](http://www.studentenwerk-berlin.de/wohnen) and feeds it into google spreadsheet. 

## Instructions for installing the script

1. Open any new google doc spreadsheet. Select menu item - tools and then script editor.
2. This opens a new tab with a dialog asking for the type of script. Select spreadsheet. 
3. Now, in the code editor, copy paste all the code from wohnungen_data_grabber.js. Press ctrl+s to save. 
4. Give a name to the project in subsequent dialog that appears. 
5. Now select menu item run and then select onOpen. A new window asking authorization appears, select continue and accept for the permissions.
6. Switch back to the tab with spreadsheet that we created initially. A new menu item named "wohnungen data grabber" should appear along with other menu items like file, edit, etc. Select "whonungen data grabber" and select get data. This gets data and puts it in the spreadsheet. 
7. Have fun sorting, comparing data from different aparatments. When a refresh on new data is needed, click on wohnungen data grabber and select get data again. 

## working prototype

There is already a spreadsheet with the script installed. Follow this [link](https://docs.google.com/spreadsheets/d/1NmNeaMSEhirvdhaWsU3BD4wXHyEt6tKr09oqZS5DFB4/edit?usp=sharing) to access the spreadsheet with the housing data. When a refresh on new data is needed, click on wohnungen data grabber menu item and select get data again. 
