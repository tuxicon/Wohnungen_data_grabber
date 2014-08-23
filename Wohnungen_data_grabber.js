/**
 * Created with JetBrains WebStorm.
 * User: Sai
 * Date: 6/17/13
 * Time: 2:33 PM
 * To change this template use File | Settings | File Templates.
 */
function getData() {
  var sheet = SpreadsheetApp.getActiveSheet();  

  var whonungen_website = "http://www.studentenwerk-berlin.de/wohnen/studentische_wohnanlagen/"
  var response = UrlFetchApp.fetch(whonungen_website + "index.html").getContentText();
  var htmlDoc = Xml.parse(response, true);
  var wrapperElements = htmlDoc.getElement().getElement("body").getElement("div").getElements()[0].getElements()[0].getElements()[1].getElements()[0].getElements()[6].getElements();

  var columnNames = ["Area", "House Name", "Address", "Type of apartment", "Num of rooms available.", "Number of rooms vacant", "Number of adults", "Number of kids", "Size", "Rent", "Waiting time", "Free from"];
  sheet.clear({ formatOnly: true, contentsOnly: true });
  sheet.appendRow(columnNames);

  for (var i in wrapperElements) {
    if (wrapperElements[i].getAttribute("class") != null)
      if (wrapperElements[i].getAttribute("class").getValue() == 'frame') {

        var wohnheimElements = wrapperElements[i].getElements();
        for (var j in wohnheimElements) {
          if (wohnheimElements[j].getAttribute("class") != null)
            if (wohnheimElements[j].getAttribute("class").getValue() == 'item') {

              //Logger.log(wohnheimElements[j].getElements()[1].getElements()[0].getElements()[0].getAttribute("href").getValue())
              var responseWH = UrlFetchApp.fetch(whonungen_website + wohnheimElements[j].getElements()[1].getElements()[0].getElements()[0].getAttribute("href").getValue()).getContentText();
              var htmlDocWH = Xml.parse(responseWH, true);
              //Logger use .toXmlString() for testing.
              //Logger.log(htmlDocWH.getElement().getElement("body").getElement("div").getElements()[0].getElements()[0].getElements()[1].getElements()[0].getElements()[6].getElements()[1].toXmlString());
              if (typeof (htmlDocWH.getElement().getElement("body").getElement("div").getElements()[0].getElements()[0].getElements()[1].getElements()[0].getElements()[6].getElements()[1].getElements()[4]) != "undefined") {
                var tableData = htmlDocWH.getElement().getElement("body").getElement("div").getElements()[0].getElements()[0].getElements()[1].getElements()[0].getElements()[6].getElements()[1].getElements()[4].getElements()[0].getElements();
                Logger.log(tableData.length)
                for (var k in tableData) {
                  if (tableData[k].getAttribute("class") != null)
                    if ((tableData[k].getAttribute("class").getValue() == 'even') || (tableData[k].getAttribute("class").getValue() == 'odd')) {
                      if (tableData[k].getElements()[0].getAttribute("colspan").getValue() != '10') {
                        sheet.appendRow([wrapperElements[i].getElements()[0].getText(), wohnheimElements[j].getElements()[1].getElements()[0].getElements()[0].getText(), wohnheimElements[j].getElements()[1].getText().replace(/ /g, '').replace(/^\s+|\s+$/g, ""), tableData[k].getElements()[0].getText(), tableData[k].getElements()[1].getText(), tableData[k].getElements()[2].getText(), tableData[k].getElements()[3].getText(), tableData[k].getElements()[4].getText(), tableData[k].getElements()[5].getText(), tableData[k].getElements()[7].getText(), tableData[k].getElements()[8].getText(), tableData[k].getElements()[9].getText()]);
                      }
                    }
                }
              } else {
                sheet.appendRow([wrapperElements[i].getElements()[0].getText(), 'NA', 'NA', 'NA', 'NA', 'NA', 'NA', 'NA', 'NA', 'NA', 'NA']);
              }

            }
        }

      }
  }
};

/**
 * Adds a custom menu to the active spreadsheet, containing a single menu item
 * for invoking the readRows() function specified above.
 * The onOpen() function, when defined, is automatically invoked whenever the
 * spreadsheet is opened.
 * For more information on using the Spreadsheet API, see
 * https://developers.google.com/apps-script/service_spreadsheet
 */
function onOpen(e) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet();
  var entries = [
    {
      name: "Get Data",
      functionName: "getData"
    }
  ];
  sheet.addMenu("wohnungen data grabber", entries);
};
